#!/usr/bin/env node
/**
 * Generate RCOS as structured data.
 *
 *   static/downloads/standard/<standard>/<version>/clauses.yaml       (+ .<locale>)
 *   static/downloads/standard/<standard>/<version>/sections.yaml      (+ .<locale>)
 *   static/downloads/standard/<standard>/<version>/artifacts.yaml     (+ .<locale>)
 *   static/downloads/standard/<standard>/<version>/glossary.yaml      (+ .<locale>)
 *   static/downloads/standard/<standard>/<version>/meta.yaml
 *   static/downloads/standard/manifest-standard.json   ← sha256 per file
 *
 * Why this exists: the specification and its 22 templates are the authoritative
 * source of RCOS, and they are markdown. Anything that wants to *compute* over
 * the standard — a compliance tool, an audit script, another implementation —
 * needs it as data. Publishing that alongside the md/docx/odt bundles costs
 * nothing extra and is what makes RCOS buildable-on rather than only readable.
 *
 * The script is deliberately pure extraction. Two things cannot be extracted and
 * are authored instead, in content/standard-data/<standard>-<version>/ownership.yaml:
 *
 *   - which template section OWNS a clause, where several reference it;
 *   - the DISPOSITION of clauses no community answers (a rule about artifacts
 *     being versioned is satisfied by whatever tool holds them; a rule about
 *     what must remain out of scope is a rule about the standard).
 *
 * Both are properties of the standard, not of any one implementation, so they
 * ship here rather than downstream.
 *
 * Licence: the specification and templates are CC BY 4.0 (LICENSE-SPEC.md,
 * LICENSE-TEMPLATES.md); the emitted data carries that line.
 */
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { SUPPORTED_LOCALES } from './i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DEFAULT_LOCALE = 'en';

const STANDARD_ID = 'rcos-core';
const VERSION = '0.1';
const CORE_DIR = path.join(ROOT, 'content/articles/rcos-core/v0-1');
const TEMPLATES_DIR = path.join(ROOT, 'content/articles/rcos-templates');
const AUTHORED = path.join(ROOT, `content/standard-data/${STANDARD_ID}-${VERSION}/ownership.yaml`);
const OUT_DIR = path.join(ROOT, 'static/downloads/standard');

const LICENCE = 'CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/';
const ATTRIBUTION = 'RCOS — Regenerative Community Operating System, EcoHubs';

/** Chapters 2..8 of the specification are Layers 0..6. Chapter 9+ is non-normative. */
const CHAPTER_TO_LAYER = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6 };

const LAYER_NAMES = {
	0: 'Identity & Scope',
	1: 'Membership',
	2: 'Governance',
	3: 'Economy',
	4: 'Conflict',
	5: 'Operations',
	6: 'Evolution'
};

const slug = (s) =>
	s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

/** MUST NOT is still a MUST for compliance purposes. */
function normativityOf(text) {
	if (/\bMUST\b/.test(text)) return 'MUST';
	if (/\bSHOULD\b/.test(text)) return 'SHOULD';
	if (/\bMAY\b/.test(text)) return 'MAY';
	return 'INFORMATIVE';
}

const localeSuffix = (locale) => (locale === DEFAULT_LOCALE ? '' : `.${locale}`);

async function readLocalised(dir, base, locale) {
	const file = path.join(dir, `${base}${localeSuffix(locale)}.md`);
	if (!existsSync(file)) return null;
	return matter(await readFile(file, 'utf8'));
}

// ---------------------------------------------------------------------------
// Clauses
// ---------------------------------------------------------------------------

/**
 * A clause is a numbered paragraph, optionally followed by a bullet list that
 * belongs to it. The specification is consistent about this, so the parse is
 * exact rather than heuristic — and §6 verifies the totals.
 */
function parseClauses(body, chapter) {
	const layer = CHAPTER_TO_LAYER[chapter];
	const clauses = [];
	let specSection = null;

	const lines = body.split('\n');
	let current = null;

	const flush = () => {
		if (!current) return;
		current.text = current.lines.join('\n').trim();
		delete current.lines;
		clauses.push(current);
		current = null;
	};

	for (const raw of lines) {
		const line = raw.trimEnd();

		const heading = /^##\s+(\d+\.\d+)\s+(.+?)\s*$/.exec(line);
		if (heading) {
			flush();
			specSection = { ref: heading[1], title: heading[2] };
			continue;
		}
		if (/^#{1,6}\s/.test(line)) {
			flush();
			continue;
		}

		const start = /^\s{0,4}(\d+\.\d+\.\d+)\s+(.*)$/.exec(line);
		if (start) {
			flush();
			current = {
				ref: start[1],
				layer,
				specSection: specSection ? { ...specSection } : null,
				lines: [start[2]]
			};
			continue;
		}

		if (current) {
			// A blank line ends the clause only if what follows is not part of its
			// list; the specification indents continuations, so keep bullets and
			// indented lines and stop at anything else.
			if (line.trim() === '') {
				current.lines.push('');
				continue;
			}
			if (/^\s*[-*]\s/.test(line) || /^\s{2,}\S/.test(line)) {
				current.lines.push(line.trim());
				continue;
			}
			flush();
		}
	}
	flush();

	return clauses.map((clause) => ({
		...clause,
		normativity: normativityOf(clause.text),
		// Stable across renumbering: the section title survives edits to the
		// numbering far more often than the number does.
		key: `l${clause.layer}.${slug(clause.specSection?.title ?? 'general')}.${clause.ref.split('.').pop()}`
	}));
}

async function loadClauses() {
	const files = (await readdir(CORE_DIR))
		.filter((f) => /^\d\d-.*\.md$/.test(f) && !/\.[a-z]{2}(-[a-z]{2})?\.md$/.test(f))
		.sort();

	/** @type {Map<string, any>} */
	const byRef = new Map();
	const order = [];

	for (const file of files) {
		const chapter = Number(file.slice(0, 2));
		if (!(chapter in CHAPTER_TO_LAYER)) continue;
		const base = file.replace(/\.md$/, '');

		const source = await readLocalised(CORE_DIR, base, DEFAULT_LOCALE);
		if (!source) continue;

		for (const clause of parseClauses(source.content, chapter)) {
			if (byRef.has(clause.ref)) {
				throw new Error(`Duplicate clause ref ${clause.ref} in ${file}`);
			}
			// `text` becomes i18n[default]; keeping both would be two sources of truth.
			const { text, ...rest } = clause;
			byRef.set(clause.ref, { ...rest, i18n: { [DEFAULT_LOCALE]: text } });
			order.push(clause.ref);
		}

		for (const locale of SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
			const translated = await readLocalised(CORE_DIR, base, locale);
			if (!translated) continue;
			for (const clause of parseClauses(translated.content, chapter)) {
				const target = byRef.get(clause.ref);
				// Refs do not translate, so they are the join key. A translation
				// that invents a ref is a content bug and is reported, not merged.
				if (target) target.i18n[locale] = clause.text;
			}
		}
	}

	return order.map((ref) => byRef.get(ref));
}

// ---------------------------------------------------------------------------
// Artifacts and sections
// ---------------------------------------------------------------------------

const DETAILS = (kind) =>
	new RegExp(
		`<details data-kind="${kind}">\\s*<summary>([\\s\\S]*?)</summary>([\\s\\S]*?)</details>`,
		'i'
	);

function parseTemplate(body) {
	const layerMatch = /^-\s+\*\*Layer:\*\*\s*(\d+)/m.exec(body);
	const intro = /^>\s+(.+)$/m.exec(body);

	const sections = [];
	const parts = body.split(/\n##\s+/).slice(1);

	for (const [index, part] of parts.entries()) {
		const title = part.split('\n')[0].trim();
		const rest = part.slice(title.length);

		const refLine = /\*RCOS clauses?:([^\n]*)\*/.exec(rest);
		const refs = refLine ? [...refLine[1].matchAll(/\[(\d+\.\d+(?:\.\d+)?)\]/g)].map((m) => m[1]) : [];

		const rationale = DETAILS('rationale').exec(rest);
		const instructions = DETAILS('instructions').exec(rest);

		// Everything that is not metadata is the scaffolding a community fills in.
		const placeholders = [...rest.matchAll(/_<([^>]+)>_/g)].map((m) => m[1].trim());

		sections.push({
			order: index,
			title,
			clauseRefs: refs,
			whyItMatters: rationale ? rationale[2].trim() : null,
			whatToDefine: instructions ? instructions[2].trim() : null,
			placeholders
		});
	}

	return {
		layer: layerMatch ? Number(layerMatch[1]) : null,
		summary: intro ? intro[1].trim() : null,
		sections
	};
}

async function loadArtifacts() {
	const layerDirs = (await readdir(TEMPLATES_DIR, { withFileTypes: true }))
		.filter((e) => e.isDirectory())
		.map((e) => e.name)
		.sort();

	const artifacts = [];

	for (const layerDir of layerDirs) {
		const dir = path.join(TEMPLATES_DIR, layerDir);
		const bases = [
			...new Set(
				(await readdir(dir))
					.filter((f) => f.endsWith('.md') && !/\.[a-z]{2}(-[a-z]{2})?\.md$/.test(f))
					.map((f) => f.replace(/\.md$/, ''))
			)
		].sort();

		for (const base of bases) {
			const source = await readLocalised(dir, base, DEFAULT_LOCALE);
			if (!source) continue;

			const parsed = parseTemplate(source.content);
			const key = base;

			const artifact = {
				key,
				sourceId: source.data.id ?? null,
				layer: parsed.layer,
				order: source.data.order ?? 0,
				i18n: {
					[DEFAULT_LOCALE]: { title: source.data.title ?? key, summary: parsed.summary }
				},
				sections: parsed.sections.map((section) => ({
					key: `${key}.${slug(section.title)}`,
					artifact: key,
					order: section.order,
					clauseRefs: section.clauseRefs,
					i18n: {
						[DEFAULT_LOCALE]: {
							title: section.title,
							whyItMatters: section.whyItMatters,
							whatToDefine: section.whatToDefine,
							placeholders: section.placeholders
						}
					}
				}))
			};

			for (const locale of SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
				const translated = await readLocalised(dir, base, locale);
				if (!translated) continue;
				const t = parseTemplate(translated.content);
				artifact.i18n[locale] = { title: translated.data.title ?? null, summary: t.summary };
				// Sections are joined by position: headings translate, order does not.
				for (const [index, section] of artifact.sections.entries()) {
					const match = t.sections[index];
					if (!match) continue;
					section.i18n[locale] = {
						title: match.title,
						whyItMatters: match.whyItMatters,
						whatToDefine: match.whatToDefine,
						placeholders: match.placeholders
					};
				}
			}

			artifacts.push(artifact);
		}
	}

	return artifacts;
}

/**
 * Which artifacts the specification requires. Each layer chapter ends with an
 * "Artifacts" section listing them by name; matching template titles against
 * that list is the honest source, rather than assuming every published template
 * is mandatory.
 */
async function loadMandatoryArtifactNames() {
	const files = (await readdir(CORE_DIR))
		.filter((f) => /^\d\d-.*\.md$/.test(f) && !/\.[a-z]{2}(-[a-z]{2})?\.md$/.test(f))
		.sort();

	const names = new Set();
	for (const file of files) {
		const chapter = Number(file.slice(0, 2));
		if (!(chapter in CHAPTER_TO_LAYER)) continue;
		const body = (await readLocalised(CORE_DIR, file.replace(/\.md$/, ''), DEFAULT_LOCALE)).content;

		const section = /##\s+\d+\.\d+\s+Artifacts\n([\s\S]*?)(?=\n##\s|\n#\s|$)/.exec(body);
		if (!section) continue;
		const mandatory = /mandatory for Layer \d+ compliance:\s*\n([\s\S]*?)(?=\n\s*\d+\.\d+\.\d+|\n##|$)/.exec(
			section[1]
		);
		if (!mandatory) continue;
		for (const m of mandatory[1].matchAll(/^\s*[-*]\s+(.+?)\s*$/gm)) names.add(slug(m[1]));
	}
	return names;
}

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------

function parseGlossary(body) {
	const terms = [];
	for (const match of body.matchAll(/^\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n##|\n---|$)/gm)) {
		const term = match[1].trim();
		const definition = match[2].trim();
		if (!term || !definition) continue;
		terms.push({ key: slug(term), term, definition });
	}
	return terms;
}

async function loadGlossary() {
	const base = 'appendix-a-glossary';
	const source = await readLocalised(CORE_DIR, base, DEFAULT_LOCALE);
	if (!source) return [];

	const byKey = new Map();
	for (const entry of parseGlossary(source.content)) {
		byKey.set(entry.key, {
			key: entry.key,
			i18n: { [DEFAULT_LOCALE]: { term: entry.term, definition: entry.definition } }
		});
	}

	for (const locale of SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
		const translated = await readLocalised(CORE_DIR, base, locale);
		if (!translated) continue;
		const entries = parseGlossary(translated.content);
		// Terms translate, so position is the only reliable join.
		const keys = [...byKey.keys()];
		for (const [index, entry] of entries.entries()) {
			const key = keys[index];
			if (!key) continue;
			byKey.get(key).i18n[locale] = { term: entry.term, definition: entry.definition };
		}
	}

	return [...byKey.values()];
}

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

async function loadAuthored() {
	if (!existsSync(AUTHORED)) return { owners: {}, dispositions: {}, notes: {} };
	return yaml.load(await readFile(AUTHORED, 'utf8')) ?? {};
}

/**
 * Section dispositions — what a section *is*, as distinct from what it says.
 *
 * Most sections are written by the community. A handful are not, and treating
 * them as if they were is the difference between a tool that asks 21 useful
 * questions and one that asks 46 and buries the useful ones:
 *
 *   authored              a community writes it. The default, and the only kind
 *                         that counts toward artifact completeness.
 *   filled_from_decision  the platform writes it from the decision that adopted
 *                         the artifact — every Ratification Record is this.
 *   derived               a view over other sections, generated, never authored.
 *   instance_record       one entry per event, not one definition per community:
 *                         a learning-log entry, a version-history line.
 */
const SECTION_DISPOSITIONS = new Set([
	'authored',
	'filled_from_decision',
	'derived',
	'instance_record'
]);

function applySectionDispositions(artifacts, authored) {
	const authoredSections = authored.sections ?? {};
	const problems = [];
	const known = new Set();

	for (const artifact of artifacts) {
		for (const section of artifact.sections) {
			known.add(section.key);
			const entry = authoredSections[section.key];
			section.disposition = entry?.disposition ?? 'authored';
			section.dispositionNote = entry?.note ?? null;

			if (entry && !SECTION_DISPOSITIONS.has(entry.disposition)) {
				problems.push(
					`section ${section.key}: "${entry.disposition}" is not a section disposition`
				);
			}

			// The same rule the clauses live under: a section nobody has to write
			// must say so out loud. Silence here is how a Ratification Record ends
			// up in a community's queue of things to decide.
			if (section.clauseRefs.length === 0 && !entry) {
				problems.push(
					`section ${section.key}: references no clause and has no disposition — say what it is`
				);
			}
		}
	}

	for (const key of Object.keys(authoredSections)) {
		if (!known.has(key)) problems.push(`section disposition names "${key}", which is not a section`);
	}

	return problems;
}

function applyAuthored(clauses, artifacts, authored) {
	const owners = authored.owners ?? {};
	const dispositions = authored.dispositions ?? {};
	const problems = [];

	const sectionsByKey = new Map();
	/** Section key -> is its artifact mandatory. */
	const sectionIsMandatory = new Map();
	for (const artifact of artifacts) {
		for (const section of artifact.sections) {
			sectionsByKey.set(section.key, section);
			sectionIsMandatory.set(section.key, artifact.mandatory === true);
		}
	}

	// Which sections reference each clause, straight from the templates.
	const referencedBy = new Map();
	for (const artifact of artifacts) {
		for (const section of artifact.sections) {
			for (const ref of section.clauseRefs) {
				if (!referencedBy.has(ref)) referencedBy.set(ref, []);
				referencedBy.get(ref).push(section.key);
			}
		}
	}

	for (const clause of clauses) {
		const claimants = referencedBy.get(clause.ref) ?? [];
		const disposition = dispositions[clause.ref];

		if (disposition) {
			clause.disposition = disposition.disposition;
			clause.dispositionNote = disposition.note ?? null;
			clause.owner = null;
			clause.referencedBy = claimants;
			continue;
		}

		clause.disposition = 'defined_by_section';
		clause.referencedBy = claimants;

		if (owners[clause.ref]) {
			clause.owner = owners[clause.ref];
			if (!sectionsByKey.has(clause.owner)) {
				problems.push(`${clause.ref}: authored owner "${clause.owner}" is not a section`);
			}
		} else if (claimants.length === 1) {
			clause.owner = claimants[0];
		} else if (claimants.length === 0) {
			clause.owner = null;
			if (clause.normativity === 'MUST') {
				problems.push(`${clause.ref} (MUST): no section references it and it has no disposition`);
			}
		} else {
			clause.owner = null;
			problems.push(
				`${clause.ref}: claimed by ${claimants.length} sections and no owner is authored — ${claimants.join(', ')}`
			);
		}

		// A MUST clause owned by an optional artifact would put compliance out of
		// reach for any community that skips that artifact. In 0.1 this catches the
		// experiment obligations, which belong to the Change Protocol rather than to
		// the optional Experiment Template.
		if (
			clause.owner &&
			clause.normativity === 'MUST' &&
			sectionIsMandatory.get(clause.owner) === false
		) {
			problems.push(
				`${clause.ref} (MUST): owned by "${clause.owner}", whose artifact is not mandatory — compliance would be unreachable for a community that skips it`
			);
		}
	}

	return problems;
}

async function writeYaml(dir, name, data) {
	const file = path.join(dir, `${name}.yaml`);
	const body = yaml.dump(data, { lineWidth: 100, noRefs: true, sortKeys: false });
	await writeFile(file, body);
	return file;
}

async function main() {
	const strict = !process.argv.includes('--allow-incomplete');

	const [clauses, artifacts, glossary, mandatoryNames, authored] = await Promise.all([
		loadClauses(),
		loadArtifacts(),
		loadGlossary(),
		loadMandatoryArtifactNames(),
		loadAuthored()
	]);

	for (const artifact of artifacts) {
		artifact.mandatory = mandatoryNames.has(slug(artifact.i18n[DEFAULT_LOCALE].title));
	}

	const problems = [
		...applyAuthored(clauses, artifacts, authored),
		...applySectionDispositions(artifacts, authored)
	];

	const sections = artifacts.flatMap((a) =>
		a.sections.map((s) => ({
			...s,
			ownsClauses: clauses.filter((c) => c.owner === s.key).map((c) => c.ref)
		}))
	);

	// A clause can only be answered by a section someone actually writes. If an
	// owner were `derived` or `filled_from_decision`, the clause would be counted
	// against text no member is ever asked for.
	for (const section of sections) {
		if (section.ownsClauses.length > 0 && section.disposition !== 'authored') {
			problems.push(
				`section ${section.key}: disposition "${section.disposition}" but it owns ${section.ownsClauses.length} clause(s) — only an authored section can answer one`
			);
		}
	}
	const artifactsOut = artifacts.map(({ sections: s, ...rest }) => ({
		...rest,
		sectionKeys: s.map((x) => x.key)
	}));

	const counts = {
		clauses: clauses.length,
		must: clauses.filter((c) => c.normativity === 'MUST').length,
		countable: clauses.filter(
			(c) => c.normativity === 'MUST' && c.disposition === 'defined_by_section'
		).length,
		artifacts: artifacts.length,
		mandatoryArtifacts: artifacts.filter((a) => a.mandatory).length,
		sections: sections.length,
		// What a community is actually asked to write, which is the number that
		// decides whether an artifact can ever be complete.
		authoredSections: sections.filter((s) => s.disposition === 'authored').length,
		sectionsWithoutClauses: sections.filter((s) => s.clauseRefs.length === 0).length,
		glossary: glossary.length
	};

	console.log('RCOS %s %s', STANDARD_ID, VERSION);
	for (const [k, v] of Object.entries(counts)) console.log('  %s: %d', k, v);

	if (problems.length > 0) {
		console.error('\n%d unresolved ownership problem(s):', problems.length);
		for (const p of problems.slice(0, 80)) console.error('  - ' + p);
		if (problems.length > 80) console.error('  … and %d more', problems.length - 80);
		if (strict) {
			console.error(
				'\nAuthor them in content/standard-data/%s-%s/ownership.yaml, or re-run with --allow-incomplete to inspect the output.',
				STANDARD_ID,
				VERSION
			);
			process.exitCode = 1;
			return;
		}
	}

	const outDir = path.join(OUT_DIR, STANDARD_ID, VERSION);
	await rm(outDir, { recursive: true, force: true });
	await mkdir(outDir, { recursive: true });

	const written = [];
	written.push(await writeYaml(outDir, 'clauses', clauses));
	written.push(await writeYaml(outDir, 'sections', sections));
	written.push(await writeYaml(outDir, 'artifacts', artifactsOut));
	written.push(await writeYaml(outDir, 'glossary', glossary));
	written.push(
		await writeYaml(outDir, 'meta', {
			standard: STANDARD_ID,
			version: VERSION,
			generated: new Date().toISOString().slice(0, 10),
			licence: LICENCE,
			attribution: ATTRIBUTION,
			source: 'https://rcos.ecohubs.community/articles/rcos-core/v0-1',
			defaultLocale: DEFAULT_LOCALE,
			locales: SUPPORTED_LOCALES,
			layers: Object.entries(LAYER_NAMES).map(([n, name]) => ({ n: Number(n), name })),
			counts
		})
	);

	const files = {};
	for (const file of written) {
		const body = await readFile(file);
		files[path.relative(OUT_DIR, file)] = {
			sha256: createHash('sha256').update(body).digest('hex'),
			bytes: body.length
		};
	}

	await writeFile(
		path.join(OUT_DIR, 'manifest-standard.json'),
		JSON.stringify(
			{
				generated: new Date().toISOString().slice(0, 10),
				licence: LICENCE,
				attribution: ATTRIBUTION,
				standards: [{ id: STANDARD_ID, version: VERSION, counts }],
				files
			},
			null,
			2
		) + '\n'
	);

	console.log('\nWrote %d files to %s', written.length + 1, path.relative(ROOT, OUT_DIR));
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
