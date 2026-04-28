#!/usr/bin/env node
/**
 * Generate the combined RCOS Core v0.1 single-MD spec, one file per locale.
 *
 *   static/downloads/<locale>/rcos-core-v0-1.md
 *   static/downloads/manifest-core.json
 *
 * For each locale, sections are pulled in the requested locale where a
 * `<base>.<lang>.md` translation exists, falling back to the default-locale
 * source otherwise. The preamble, section labels (TOC, About RCOS Core), and
 * the spec title are localized; in-section bodies render in whichever locale
 * actually exists. Untranslated sections show a small inline notice.
 */
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { getStrings, SUPPORTED_LOCALES } from './i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'static/downloads');

const SITE_URL = process.env.PUBLIC_APP_URL || 'https://blueprint.ecohubs.community';
const DEFAULT_LOCALE = 'en';
const today = new Date().toISOString().slice(0, 10);

function stripFrontmatter(raw) {
	const parsed = matter(raw);
	return { data: parsed.data, body: parsed.content.trimStart() };
}

function absolutizeLinks(body, locale) {
	const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
	return body.replace(/\]\((\/[^)]+)\)/g, (_m, p) => `](${SITE_URL}${localePrefix}${p})`);
}

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
 * Load all translations of a single file. Returns an object keyed by locale
 * code; absent locales are simply not in the result. The base path is the
 * source filename without lang suffix.
 */
async function loadAllLocales(dir, baseName) {
	const out = {};
	for (const loc of SUPPORTED_LOCALES) {
		const fileName = loc === DEFAULT_LOCALE ? `${baseName}.md` : `${baseName}.${loc}.md`;
		const full = path.join(dir, fileName);
		if (!existsSync(full)) continue;
		out[loc] = stripFrontmatter(await readFile(full, 'utf8'));
	}
	return out;
}

async function readSection(dir, baseName, locale) {
	const all = await loadAllLocales(dir, baseName);
	const requested = all[locale];
	const source = all[DEFAULT_LOCALE];
	const chosen = requested ?? source;
	if (!chosen) return null;
	return {
		title: chosen.data.title ?? source?.data?.title ?? baseName,
		order: typeof source?.data?.order === 'number' ? source.data.order : 999,
		body: absolutizeLinks(chosen.body.trim(), locale),
		isFallback: !requested && locale !== DEFAULT_LOCALE
	};
}

const slugify = (s) =>
	s
		.toLowerCase()
		.replace(/\./g, '')
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');

async function buildCoreV01ForLocale(locale) {
	const v01Dir = path.join(ROOT, 'content/articles/rcos-core/v0-1');
	const corePath = path.join(ROOT, 'content/articles');
	const v01ParentDir = path.join(ROOT, 'content/articles/rcos-core');

	if (!existsSync(v01Dir) || !existsSync(path.join(v01ParentDir, 'v0-1.md'))) {
		console.warn(`[build-core] rcos-core/v0-1 content not found, skipping locale ${locale}`);
		return null;
	}

	const s = getStrings(locale);

	// v0.1 parent metadata block (everything after the leading # / ## headings).
	const v01Parent = await loadAllLocales(v01ParentDir, 'v0-1');
	const parentChosen = v01Parent[locale] ?? v01Parent[DEFAULT_LOCALE];
	const v01Meta = parentChosen
		? parentChosen.body.replace(/^\s*#[^\n]*\n+##[^\n]*\n+/, '').trim()
		: '';

	// "About RCOS Core" — the parent of the spec article itself, lives at
	// content/articles/rcos-core.md (one level up from v0-1.md).
	const aboutAll = await loadAllLocales(corePath, 'rcos-core');
	const aboutChosen = aboutAll[locale] ?? aboutAll[DEFAULT_LOCALE];
	const aboutSection = aboutChosen
		? {
				title: s.aboutCore,
				body: absolutizeLinks(aboutChosen.body.trim(), locale),
				isFallback: !aboutAll[locale] && locale !== DEFAULT_LOCALE
		  }
		: null;

	// Per-section files (00-introduction.md, 01-...). Group by base name.
	const allEntries = (await readdir(v01Dir)).filter((n) => n.endsWith('.md'));
	const baseNames = new Set();
	for (const name of allEntries) {
		const parsed = parseFilename(name);
		if (parsed) baseNames.add(parsed.base);
	}
	const sections = [];
	for (const base of baseNames) {
		const section = await readSection(v01Dir, base, locale);
		if (section) sections.push(section);
	}
	sections.sort((a, b) => a.order - b.order);

	const sourceUrl = `${SITE_URL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}/articles/rcos-core/v0-1`;

	const tocEntries = [
		...(aboutSection ? [aboutSection.title] : []),
		...sections.map((sec) => sec.title)
	];
	const toc = tocEntries.map((t) => `- [${t}](#${slugify(t)})`).join('\n');

	const renderSection = (sec) => {
		const fallbackNote = sec.isFallback ? `\n\n> _${s.translatedFromEnglish}_\n` : '';
		return `# ${sec.title}${fallbackNote}\n\n${sec.body}\n`;
	};

	const allBlocks = [...(aboutSection ? [aboutSection] : []), ...sections]
		.map(renderSection)
		.join('\n\n---\n\n');

	const doc = [
		`**${s.siteName}**`,
		``,
		`# ${s.coreSpecTitle}`,
		``,
		`- **${s.generated}:** ${today}`,
		`- **${s.source}:** [${sourceUrl}](${sourceUrl})`,
		``,
		v01Meta,
		``,
		`## ${s.toc}`,
		``,
		toc,
		``,
		`---`,
		``,
		allBlocks,
		``
	].join('\n');

	await mkdir(path.join(OUT_DIR, locale), { recursive: true });
	const outPath = path.join(OUT_DIR, locale, 'rcos-core-v0-1.md');
	await writeFile(outPath, doc, 'utf8');

	// Locales for which any section had a real translation. Always includes the
	// default locale (which is always "translated", trivially).
	const hasAnyRealTranslation =
		locale === DEFAULT_LOCALE ||
		sections.some((sec) => !sec.isFallback) ||
		(aboutSection ? !aboutSection.isFallback : false);

	return {
		locale,
		title: s.coreSpecTitle,
		generated: today,
		formats: ['md'],
		files: { md: `/downloads/${locale}/rcos-core-v0-1.md` },
		hasAnyRealTranslation
	};
}

async function main() {
	console.log('Building RCOS Core v0.1 spec, per-locale ...');

	// Clean old per-locale spec outputs (without nuking template artifacts).
	for (const loc of SUPPORTED_LOCALES) {
		const file = path.join(OUT_DIR, loc, 'rcos-core-v0-1.md');
		if (existsSync(file)) await rm(file);
	}
	// Legacy single-file output from before per-locale support.
	const legacyPath = path.join(OUT_DIR, 'rcos-core-v0-1.md');
	if (existsSync(legacyPath)) await rm(legacyPath);

	const entries = [];
	for (const loc of SUPPORTED_LOCALES) {
		const entry = await buildCoreV01ForLocale(loc);
		if (entry) {
			entries.push(entry);
			console.log(`  ${loc}: ${entry.files.md}`);
		}
	}

	const manifestPath = path.join(OUT_DIR, 'manifest-core.json');
	if (existsSync(manifestPath)) await rm(manifestPath, { force: true });

	const manifest = {
		generated: today,
		defaultLocale: DEFAULT_LOCALE,
		locales: SUPPORTED_LOCALES,
		entries: entries.length
			? [
					{
						slug: 'rcos-core/v0-1',
						titles: Object.fromEntries(entries.map((e) => [e.locale, e.title])),
						generated: today,
						formats: ['md'],
						files: Object.fromEntries(entries.map((e) => [e.locale, e.files])),
						availableLocales: entries
							.filter((e) => e.hasAnyRealTranslation)
							.map((e) => e.locale)
					}
			  ]
			: []
	};
	await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
	console.log(`Wrote ${path.relative(ROOT, manifestPath)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
