#!/usr/bin/env node
/**
 * Generate per-locale download artifacts for every RCOS template.
 *
 *   static/downloads/<locale>/<format>/<layer>/<template>.<ext>
 *   static/downloads/<locale>/rcos-templates-<format>.zip      ← per-locale bundle
 *   static/downloads/manifest-templates.json                   ← root manifest
 *
 * For each registered locale:
 *   - Walk content/articles/rcos-templates and detect translations via
 *     `<base>.<lang>.md` siblings.
 *   - Emit one file per (template, format), using the localized body when a
 *     translation exists and the source body otherwise. The preamble is always
 *     in the locale's language; if the body is fallback, the preamble notes it.
 *   - Bundle the locale's outputs into ZIPs.
 *
 * Per-template `availableLocales` in the manifest reflects the locales for
 * which a real translation exists — the UI uses this to dim "EN-only" entries.
 *
 * Pandoc is required for docx/odt output. The script aborts with install
 * instructions if it's missing — Vercel doesn't have pandoc, so deploys serve
 * the committed artifacts as static assets.
 */
import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile, mkdir, rm, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { getStrings, SUPPORTED_LOCALES } from './i18n.mjs';

function run(cmd, args, { input, cwd } = {}) {
	return new Promise((resolve, reject) => {
		const p = spawn(cmd, args, { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
		let stdout = '';
		let stderr = '';
		p.stdout.on('data', (d) => (stdout += d));
		p.stderr.on('data', (d) => (stderr += d));
		p.on('error', reject);
		p.on('close', (code) => {
			if (code === 0) resolve({ stdout, stderr });
			else reject(new Error(`${cmd} exited ${code}: ${stderr}`));
		});
		if (input != null) p.stdin.end(input);
		else p.stdin.end();
	});
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'content/articles/rcos-templates');
const OUT_DIR = path.join(ROOT, 'static/downloads');
const LOGO_PNG = path.join(__dirname, 'logo.png');

const SITE_URL = process.env.PUBLIC_APP_URL || 'https://blueprint.ecohubs.community';
const DEFAULT_LOCALE = 'en';

const FORMATS = ['md', 'docx', 'odt'];

const today = new Date().toISOString().slice(0, 10);

/** ---- file scanning ---- */

async function walkMd(dir) {
	const out = [];
	for (const name of await readdir(dir)) {
		const full = path.join(dir, name);
		const s = await stat(full);
		if (s.isDirectory()) out.push(...(await walkMd(full)));
		else if (name.endsWith('.md')) out.push(full);
	}
	return out;
}

/**
 * Parse `<base>.md` or `<base>.<lang>.md` filenames.
 * Returns null for non-markdown files. Unknown lang suffixes are treated as
 * default-locale files, matching the runtime scanner's behavior.
 */
function parseFilename(name) {
	if (!name.endsWith('.md')) return null;
	const noExt = name.slice(0, -3);
	const dot = noExt.lastIndexOf('.');
	if (dot > 0) {
		const candidate = noExt.slice(dot + 1);
		if (SUPPORTED_LOCALES.includes(candidate)) {
			return { base: noExt.slice(0, dot), lang: candidate };
		}
	}
	return { base: noExt, lang: DEFAULT_LOCALE };
}

/**
 * Group all template files by their relPath ignoring locale suffix, so each
 * template appears once with its source + translations attached.
 *
 * Example output (one entry):
 *   {
 *     relPath: 'layer-0/identity-constraints-register.md',
 *     id: 't2e1fdh8',
 *     layer: 'layer-0',
 *     translations: {
 *       en: { filePath, data, body, lang: 'en' },
 *       de: { filePath, data, body, lang: 'de' }   // present iff translation exists
 *     }
 *   }
 */
async function readTemplateGroups() {
	const all = await walkMd(TEMPLATES_DIR);
	const groups = new Map();

	for (const filePath of all) {
		const fileName = path.basename(filePath);
		const parsed = parseFilename(fileName);
		if (!parsed) continue;

		const dir = path.dirname(filePath);
		const baseRel = path.relative(TEMPLATES_DIR, path.join(dir, `${parsed.base}.md`));
		const raw = await readFile(filePath, 'utf8');
		const fm = matter(raw);
		if (!fm.content.trim()) continue;

		if (!groups.has(baseRel)) {
			groups.set(baseRel, {
				relPath: baseRel,
				layer: baseRel.split('/')[0] || '',
				translations: {}
			});
		}
		groups.get(baseRel).translations[parsed.lang] = {
			filePath,
			data: fm.data,
			body: fm.content.trimStart(),
			lang: parsed.lang
		};
	}

	// Resolve `id` from the source's frontmatter for stable cross-references.
	for (const group of groups.values()) {
		group.id = group.translations[DEFAULT_LOCALE]?.data?.id ?? null;
	}

	return [...groups.values()].sort((a, b) => a.relPath.localeCompare(b.relPath));
}

/** ---- preambles & body transforms ---- */

function articleUrl(relPath, locale) {
	const noExt = relPath.replace(/\.md$/, '');
	const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
	return `${SITE_URL}${localePrefix}/articles/rcos-templates/${noExt}`;
}

function templatesIndexUrl(locale) {
	const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
	return `${SITE_URL}${localePrefix}/articles/rcos-templates`;
}

function preambleForMd({ title, sourceUrl, locale, isFallback }) {
	const s = getStrings(locale);
	const lines = [
		`**${s.siteName}**`,
		``,
		`# ${title}`,
		``,
		`- **${s.generated}:** ${today}`,
		`- **${s.source}:** [${sourceUrl}](${sourceUrl})`,
		`- **${s.allTemplates}:** [${templatesIndexUrl(locale)}](${templatesIndexUrl(locale)})`
	];
	if (isFallback) lines.push(``, `> _${s.translatedFromEnglish}_`);
	lines.push(``, `---`, ``);
	return lines.join('\n');
}

// pandoc input: commonmark+attributes+raw_html
function preambleForPandoc({ title, sourceUrl, locale, isFallback }) {
	const s = getStrings(locale);
	const lines = [
		`![RCOS](${LOGO_PNG}){width=64px}  **${s.siteName}**`,
		``,
		`# ${title}`,
		``,
		`- **${s.generated}:** ${today}`,
		`- **${s.source}:** <${sourceUrl}>`,
		`- **${s.allTemplates}:** <${templatesIndexUrl(locale)}>`
	];
	if (isFallback) lines.push(``, `> _${s.translatedFromEnglish}_`);
	lines.push(``, `---`, ``);
	return lines.join('\n');
}

function preambleForFormat({ title, sourceUrl, format, locale, isFallback }) {
	return format === 'md'
		? preambleForMd({ title, sourceUrl, locale, isFallback })
		: preambleForPandoc({ title, sourceUrl, locale, isFallback });
}

function absolutizeLinks(body, locale) {
	// Rewrite root-relative markdown links to absolute, locale-prefixed URLs.
	const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
	return body.replace(/\]\((\/[^)]+)\)/g, (_m, p) => `](${SITE_URL}${localePrefix}${p})`);
}

// Locale-aware <details> flattener — keys on data-kind so the heuristic doesn't
// depend on English summary text. See scripts/migrate-template-details.mjs.
function flattenDetails(body, locale) {
	const s = getStrings(locale);
	const re = /<details(?:\s+data-kind="(rationale|instructions)")?[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
	return body.replace(re, (_m, dataKind, summaryRaw, contentRaw) => {
		const summary = summaryRaw.trim();
		const kind = dataKind ?? (/^\s*how\b/i.test(summary) ? 'instructions' : 'rationale');
		const label = s[kind] ?? s.rationale;
		const cleanedContent = contentRaw
			.trim()
			.split('\n')
			.map((l) => (l.length ? `> ${l}` : `>`))
			.join('\n');
		return `> **${label} — ${summary.replace(/[?:.]$/, '')}**\n>\n${cleanedContent}\n`;
	});
}

function bodyForFormat(body, format, locale) {
	const absolute = absolutizeLinks(body, locale);
	if (format === 'md') return absolute;
	return flattenDetails(absolute, locale);
}

/** ---- output management ---- */

async function cleanTemplateOutputs() {
	await mkdir(OUT_DIR, { recursive: true });

	// Per-locale subdirs we own.
	for (const locale of SUPPORTED_LOCALES) {
		const localeDir = path.join(OUT_DIR, locale);
		if (existsSync(localeDir)) await rm(localeDir, { recursive: true, force: true });
	}

	// Legacy flat layout left over from before per-locale outputs — clean if present.
	for (const fmt of FORMATS) {
		const legacyDir = path.join(OUT_DIR, fmt);
		if (existsSync(legacyDir)) await rm(legacyDir, { recursive: true, force: true });
		const legacyZip = path.join(OUT_DIR, `rcos-templates-${fmt}.zip`);
		if (existsSync(legacyZip)) await rm(legacyZip, { force: true });
	}

	const manifestPath = path.join(OUT_DIR, 'manifest-templates.json');
	if (existsSync(manifestPath)) await rm(manifestPath, { force: true });
}

async function ensurePandoc() {
	try {
		await run('pandoc', ['--version']);
	} catch {
		console.error(
			'\nERROR: pandoc is required to build template downloads but was not found on PATH.\n' +
				'  macOS:  brew install pandoc\n' +
				'  Linux:  apt install pandoc  (or your distro equivalent)\n' +
				'  Other:  https://pandoc.org/installing.html\n\n' +
				'Note: this script only needs to run when template content changes.\n' +
				'The generated files in static/downloads/ are committed to the repo,\n' +
				'so deploys (e.g. Vercel) do not need pandoc installed.\n'
		);
		process.exit(1);
	}
}

/** Pick the best body for (group, locale): translation if present, source otherwise. */
function chooseBody(group, locale) {
	const requested = group.translations[locale];
	const source = group.translations[DEFAULT_LOCALE];
	if (requested) return { ...requested, isFallback: false };
	if (source) return { ...source, isFallback: locale !== DEFAULT_LOCALE };
	return null;
}

async function generateOne({ group, locale, format }) {
	const chosen = chooseBody(group, locale);
	if (!chosen) return null;

	const data = group.translations[locale]?.data ?? group.translations[DEFAULT_LOCALE]?.data ?? {};
	const title = data.title || path.basename(group.relPath, '.md');
	const sourceUrl = articleUrl(group.relPath, locale);

	const preamble = preambleForFormat({
		title,
		sourceUrl,
		format,
		locale,
		isFallback: chosen.isFallback
	});
	const transformedBody = bodyForFormat(chosen.body, format, locale);
	const fullMd = `${preamble}${transformedBody}`;

	const outRel = group.relPath.replace(/\.md$/, `.${format}`);
	const outPath = path.join(OUT_DIR, locale, format, outRel);
	await mkdir(path.dirname(outPath), { recursive: true });

	if (format === 'md') {
		await writeFile(outPath, fullMd, 'utf8');
		return outPath;
	}

	const args = [
		'-f',
		'commonmark_x+attributes+raw_html-yaml_metadata_block',
		'-t',
		format,
		'-o',
		outPath,
		'--metadata',
		`title-meta=${title}`
	];
	await run('pandoc', args, { input: fullMd, cwd: __dirname });
	return outPath;
}

async function buildIndexMd(groups, locale) {
	const s = getStrings(locale);
	const lines = [
		`# ${s.bundleHeading}`,
		``,
		`- **${s.generated}:** ${today}`,
		`- **${s.source}:** [${templatesIndexUrl(locale)}](${templatesIndexUrl(locale)})`,
		``,
		s.bundleIntro,
		``,
		s.bundleNote,
		``,
		`## ${s.bundleSectionHeading}`,
		``
	];
	const byLayer = new Map();
	for (const g of groups) {
		const layer = g.layer;
		if (!byLayer.has(layer)) byLayer.set(layer, []);
		byLayer.get(layer).push(g);
	}
	for (const layer of [...byLayer.keys()].sort()) {
		lines.push(`### ${layer}`, ``);
		for (const g of byLayer.get(layer)) {
			const data = g.translations[locale]?.data ?? g.translations[DEFAULT_LOCALE]?.data ?? {};
			const title = data.title || g.relPath;
			lines.push(`- [${title}](${g.relPath})`);
		}
		lines.push(``);
	}
	return lines.join('\n');
}

async function zipFormat(locale, format) {
	const dir = path.join(OUT_DIR, locale, format);
	const zipPath = path.join(OUT_DIR, locale, `rcos-templates-${format}.zip`);
	if (existsSync(zipPath)) await rm(zipPath);
	await run('zip', ['-r', '-q', zipPath, '.'], { cwd: dir });
	return zipPath;
}

/** ---- main ---- */

async function main() {
	await ensurePandoc();
	if (!existsSync(LOGO_PNG)) {
		throw new Error(`Logo missing at ${LOGO_PNG}. Run sips conversion first.`);
	}

	console.log(`Cleaning template outputs in ${OUT_DIR}`);
	await cleanTemplateOutputs();

	// Logo for md downloads to reference (locale-agnostic asset).
	await copyFile(LOGO_PNG, path.join(ROOT, 'static/rcos-logo.png'));

	const groups = await readTemplateGroups();
	console.log(`Found ${groups.length} templates.`);

	for (const locale of SUPPORTED_LOCALES) {
		console.log(`\n=== Locale: ${locale} ===`);
		for (const format of FORMATS) {
			console.log(`  Generating ${format} ...`);
			for (const g of groups) {
				process.stdout.write(`    ${g.relPath} → ${format}\n`);
				await generateOne({ group: g, locale, format });
			}
			// Per-locale INDEX file
			const idx = await buildIndexMd(groups, locale);
			const idxRel = `INDEX.${format === 'md' ? 'md' : format}`;
			const idxPath = path.join(OUT_DIR, locale, format, idxRel);
			if (format === 'md') {
				await writeFile(idxPath, idx, 'utf8');
			} else {
				const s = getStrings(locale);
				await run(
					'pandoc',
					['-f', 'gfm', '-t', format, '-o', idxPath, '--metadata', `title-meta=${s.bundleHeading}`],
					{ input: idx, cwd: __dirname }
				);
			}
		}

		console.log(`  Zipping bundles ...`);
		for (const format of FORMATS) {
			const zip = await zipFormat(locale, format);
			console.log(`    ${path.relative(ROOT, zip)}`);
		}
	}

	// Manifest with new schema (per-locale bundles + per-template files).
	const manifest = {
		generated: today,
		defaultLocale: DEFAULT_LOCALE,
		locales: SUPPORTED_LOCALES,
		formats: FORMATS,
		bundles: Object.fromEntries(
			SUPPORTED_LOCALES.map((loc) => [
				loc,
				Object.fromEntries(
					FORMATS.map((fmt) => [fmt, `/downloads/${loc}/rcos-templates-${fmt}.zip`])
				)
			])
		),
		templates: groups.map((g) => {
			const titles = {};
			const files = {};
			for (const loc of SUPPORTED_LOCALES) {
				const data = g.translations[loc]?.data ?? g.translations[DEFAULT_LOCALE]?.data ?? {};
				titles[loc] = data.title || g.relPath;
				files[loc] = Object.fromEntries(
					FORMATS.map((fmt) => [
						fmt,
						`/downloads/${loc}/${fmt}/${g.relPath.replace(/\.md$/, `.${fmt}`)}`
					])
				);
			}
			return {
				id: g.id,
				relPath: g.relPath.replace(/\\/g, '/'),
				layer: g.layer,
				titles,
				files,
				availableLocales: Object.keys(g.translations).sort()
			};
		})
	};
	await writeFile(path.join(OUT_DIR, 'manifest-templates.json'), JSON.stringify(manifest, null, 2));
	console.log(
		`\nDone. ${groups.length} templates × ${FORMATS.length} formats × ${SUPPORTED_LOCALES.length} locales.`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
