#!/usr/bin/env node
/**
 * Normalize RFC-2119 normative keywords in already-translated `.<lang>.md`
 * articles to the conventional uppercase target-language equivalents.
 *
 * Why this exists: the original translate.mjs prompt told the model to keep
 * MUST / MAY / SHOULD unchanged in line with RFC 2119 convention. For
 * languages where there's an established translation of those keywords (most
 * European languages do), German readers in particular find a sentence like
 * "Jeder Mechanismus MUST explizit sein" jarring. Re-translating 27+ articles
 * just to swap a few words wastes API budget and translator-review time, so
 * this script does an in-place token-level replacement instead. Going forward
 * the prompt is updated so new translations come out in German on the first
 * pass.
 *
 *   pnpm run normalize:rfc-keywords -- --locale de
 *   pnpm run normalize:rfc-keywords -- --locale de --dry-run
 *
 * Idempotent: if a file already uses German keywords, the regex doesn't match
 * and the file is left untouched. Adding more locales is a matter of dropping
 * a new entry into REPLACEMENTS below.
 *
 * Token-level safety:
 *   - Replacements are applied longest-match-first (MUST NOT before MUST,
 *     SHOULD NOT before SHOULD) — order matters.
 *   - `\b` word boundaries protect against false matches inside identifiers.
 *   - Only ALL-UPPERCASE matches are replaced, so lowercase prose ("you must
 *     pay attention") stays as it is — that's the user's German wording, not
 *     a normative keyword.
 *   - Backticked code spans (\`MUST\`) ARE replaced, because the documents
 *     refer to the keyword *itself*, and the German equivalent is the German
 *     normative keyword (\`MUSS\`). If the user prefers raw English keywords
 *     in code spans they can opt out per-locale by editing REPLACEMENTS.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content/articles');

// Per-locale keyword tables. Order within each table matters — apply
// longest-match patterns first so two-word phrases don't get half-replaced.
const REPLACEMENTS = {
	de: [
		[/\bMUST NOT\b/g, 'DARF NICHT'],
		[/\bSHOULD NOT\b/g, 'SOLLTE NICHT'],
		[/\bMUST\b/g, 'MUSS'],
		[/\bSHOULD\b/g, 'SOLLTE'],
		[/\bMAY\b/g, 'KANN'],
		[/\bRECOMMENDED\b/g, 'EMPFOHLEN'],
		[/\bREQUIRED\b/g, 'ERFORDERLICH']
		// OPTIONAL stays the same in German — same word.
	],
	es: [
		// Spanish convention for RFC 2119 normative keywords. Most published
		// Spanish translations of internet RFCs use these forms. Order matters:
		// negated forms first so "MUST" doesn't snag inside "MUST NOT".
		[/\bMUST NOT\b/g, 'NO DEBE'],
		[/\bSHOULD NOT\b/g, 'NO DEBERÍA'],
		[/\bMUST\b/g, 'DEBE'],
		[/\bSHOULD\b/g, 'DEBERÍA'],
		[/\bMAY\b/g, 'PUEDE'],
		[/\bRECOMMENDED\b/g, 'RECOMENDADO'],
		[/\bREQUIRED\b/g, 'REQUERIDO'],
		[/\bOPTIONAL\b/g, 'OPCIONAL']
	]
};

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
	const out = { locale: null, dryRun: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--locale') out.locale = argv[++i];
		else if (a === '--dry-run') out.dryRun = true;
		else if (a === '-h' || a === '--help') {
			console.log('Usage: normalize-rfc-keywords.mjs --locale <code> [--dry-run]');
			process.exit(0);
		}
	}
	if (!out.locale) {
		console.error('error: --locale is required (e.g. --locale de)');
		process.exit(1);
	}
	if (!REPLACEMENTS[out.locale]) {
		console.error(
			`error: no replacement table for locale "${out.locale}". Add one to scripts/normalize-rfc-keywords.mjs.`
		);
		process.exit(1);
	}
	return out;
}

async function walkLangMd(dir, suffix) {
	const out = [];
	for (const name of await readdir(dir)) {
		const full = path.join(dir, name);
		const s = await stat(full);
		if (s.isDirectory()) out.push(...(await walkLangMd(full, suffix)));
		else if (name.endsWith(suffix)) out.push(full);
	}
	return out;
}

function normalize(content, table) {
	let out = content;
	let replacements = 0;
	for (const [pattern, replacement] of table) {
		out = out.replace(pattern, () => {
			replacements++;
			return replacement;
		});
	}
	return { out, replacements };
}

async function main() {
	const suffix = `.${args.locale}.md`;
	const files = await walkLangMd(ARTICLES_DIR, suffix);
	const table = REPLACEMENTS[args.locale];

	let changedFiles = 0;
	let totalReplacements = 0;

	for (const filePath of files) {
		const rel = path.relative(ROOT, filePath);
		const raw = await readFile(filePath, 'utf8');
		const { out, replacements } = normalize(raw, table);
		if (replacements === 0) continue;

		changedFiles++;
		totalReplacements += replacements;
		console.log(`  ${rel} — ${replacements} replacement${replacements === 1 ? '' : 's'}`);

		if (!args.dryRun) await writeFile(filePath, out, 'utf8');
	}

	const verb = args.dryRun ? 'Would normalize' : 'Normalized';
	console.log(
		`\n${verb} ${totalReplacements} keyword${totalReplacements === 1 ? '' : 's'} across ${changedFiles} file${changedFiles === 1 ? '' : 's'} (locale: ${args.locale}).`
	);
	if (args.dryRun) console.log('--dry-run: no files were modified.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
