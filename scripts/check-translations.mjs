#!/usr/bin/env node
/**
 * Translation drift detector.
 *
 * Walks content/articles, joins each source `<base>.md` to its translations
 * `<base>.<lang>.md` by frontmatter `id`, and reports per locale:
 *
 *   ✓ UP-TO-DATE       sourceHash matches current source
 *   ⚠ OUTDATED         sourceHash differs (or absent) → source was edited
 *                      after translation
 *   ✗ MISSING          no translation file at all
 *
 * Exit code:
 *   0   every translation in every locale is up to date
 *   2   only soft warnings (outdated translations exist)
 *   1   missing translations exist (treat as a hard signal that work is needed,
 *       but the script never blocks CI by itself — wire it into a non-blocking
 *       comment if you want to keep PRs moving)
 *
 * Output is plain text by default, or JSON with `--json` for machine
 * consumption (e.g. a GitHub Action that posts a sticky comment).
 *
 * Filters:
 *   --locale de               only check German
 *   --only path/glob          only check matching source files (substring match)
 *   --include-empty           include articles whose body is empty (default: skip)
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { SUPPORTED_LOCALES } from './i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content/articles');

// scripts/i18n.mjs is the build-side source of truth and intentionally mirrors
// the runtime registry in src/lib/i18n/languages.ts. Keep them in sync.
const LOCALE_CODES = SUPPORTED_LOCALES;
const DEFAULT_LOCALE = 'en';

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
	const out = { locale: null, only: null, json: false, includeEmpty: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--locale') out.locale = argv[++i];
		else if (a === '--only') out.only = argv[++i];
		else if (a === '--json') out.json = true;
		else if (a === '--include-empty') out.includeEmpty = true;
		else if (a === '-h' || a === '--help') {
			console.log(
				'Usage: check-translations.mjs [--locale <code>] [--only <substring>] [--json] [--include-empty]'
			);
			process.exit(0);
		}
	}
	return out;
}

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

function parseFilename(name) {
	if (!name.endsWith('.md')) return null;
	const noExt = name.slice(0, -3);
	const dot = noExt.lastIndexOf('.');
	if (dot > 0) {
		const candidate = noExt.slice(dot + 1);
		if (LOCALE_CODES.includes(candidate)) {
			return { base: noExt.slice(0, dot), lang: candidate };
		}
	}
	return { base: noExt, lang: DEFAULT_LOCALE };
}

function md5short(s) {
	return createHash('md5').update(s).digest('hex').slice(0, 8);
}

/** Group every (source, translation) by source path. */
async function buildIndex() {
	const all = await walkMd(ARTICLES_DIR);
	const groups = new Map(); // sourcePath → { source, translations: { lang → { path, hashStored } } }

	for (const filePath of all) {
		const fileName = path.basename(filePath);
		const parsed = parseFilename(fileName);
		if (!parsed) continue;

		const dir = path.dirname(filePath);
		const sourcePath = path.join(dir, `${parsed.base}.md`);

		const raw = await readFile(filePath, 'utf8');
		const fm = matter(raw);
		if (!args.includeEmpty && !fm.content.trim()) continue;

		if (!groups.has(sourcePath)) {
			groups.set(sourcePath, { source: null, translations: {} });
		}
		const entry = groups.get(sourcePath);
		if (parsed.lang === DEFAULT_LOCALE) {
			entry.source = {
				path: filePath,
				raw,
				body: fm.content,
				data: fm.data,
				hashCurrent: md5short(raw)
			};
		} else {
			entry.translations[parsed.lang] = {
				path: filePath,
				hashStored: typeof fm.data.sourceHash === 'string' ? fm.data.sourceHash : null,
				data: fm.data
			};
		}
	}

	// Drop entries that lack a default-locale source — they're orphans.
	for (const [k, v] of groups) {
		if (!v.source) groups.delete(k);
	}
	return groups;
}

function relFromRoot(p) {
	return path.relative(ROOT, p);
}

async function main() {
	const groups = await buildIndex();
	const rows = [];

	const targetLocales = args.locale
		? [args.locale]
		: LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE);

	for (const [, group] of [...groups.entries()].sort()) {
		const sourceRel = relFromRoot(group.source.path);
		if (args.only && !sourceRel.includes(args.only)) continue;

		for (const locale of targetLocales) {
			const t = group.translations[locale];
			if (!t) {
				rows.push({ source: sourceRel, locale, status: 'missing' });
				continue;
			}
			if (t.hashStored !== group.source.hashCurrent) {
				rows.push({
					source: sourceRel,
					locale,
					status: 'outdated',
					stored: t.hashStored,
					current: group.source.hashCurrent
				});
			} else {
				rows.push({ source: sourceRel, locale, status: 'up-to-date' });
			}
		}
	}

	if (args.json) {
		console.log(JSON.stringify({ rows, generatedAt: new Date().toISOString() }, null, 2));
		process.exit(rowsExitCode(rows));
	}

	// Plain-text report grouped by locale.
	const byLocale = new Map();
	for (const r of rows) {
		if (!byLocale.has(r.locale)) byLocale.set(r.locale, []);
		byLocale.get(r.locale).push(r);
	}

	console.log(`\nTranslation status — ${rows.length} (article × locale) pairs\n${'='.repeat(48)}\n`);
	for (const [locale, list] of byLocale) {
		const counts = countByStatus(list);
		const total = list.length;
		const coverage = (((total - counts.missing) / total) * 100).toFixed(0);
		console.log(`Locale: ${locale}  (${coverage}% coverage)`);
		console.log(
			`  ${counts['up-to-date']} up to date · ${counts.outdated} outdated · ${counts.missing} missing`
		);
		for (const r of list) {
			if (r.status === 'up-to-date') console.log(`  ✓ ${r.source}`);
			else if (r.status === 'outdated')
				console.log(`  ⚠ ${r.source}  (sourceHash: ${r.stored ?? '∅'} → ${r.current})`);
			else console.log(`  ✗ ${r.source}  MISSING`);
		}
		console.log('');
	}

	process.exit(rowsExitCode(rows));
}

function countByStatus(rows) {
	const counts = { 'up-to-date': 0, outdated: 0, missing: 0 };
	for (const r of rows) counts[r.status]++;
	return counts;
}

function rowsExitCode(rows) {
	const c = countByStatus(rows);
	if (c.missing > 0) return 1;
	if (c.outdated > 0) return 2;
	return 0;
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
