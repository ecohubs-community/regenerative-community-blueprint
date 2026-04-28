#!/usr/bin/env node
/**
 * Normalize German technical terms across `.de.md` translations so the
 * vocabulary stays consistent regardless of which translator (or session)
 * produced each file.
 *
 * Today this fixes one specific inconsistency: the RCOS "Layer N" concept
 * was rendered three different ways in the corpus — "Layer 4", "Schicht 1",
 * "Ebene 0" — depending on which file got translated when. The parent
 * article (rcos-layers.de.md → "RCOS-Schichten") and the established
 * German technical convention both point to "Schicht", so we normalize on
 * that.
 *
 *   pnpm run normalize:de-terms                    # apply
 *   pnpm run normalize:de-terms -- --dry-run       # preview
 *
 * Idempotent: running it twice is a no-op. Locale-pluggable via the
 * REPLACEMENTS table; mirror this for other locales as they get added.
 *
 * Why a script and not a re-translation pass: the bodies are otherwise
 * fine — only the noun for one concept needs swapping. Re-translating ~30
 * articles to fix one term wastes Claude Code usage and translator review
 * time.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content/articles');

// Per-locale rules. Each rule is [regex, replacement] applied in order;
// list longer / more-specific patterns first if you add ones that overlap.
const REPLACEMENTS = {
	de: [
		// "Ebene N" and "Layer N" → "Schicht N" (the parent article's term).
		// Word boundaries protect against false matches in slugs like `layer-0`,
		// which use kebab-case anyway. Number range 0–9 covers RCOS layers.
		[/\bLayer (\d)\b/g, 'Schicht $1'],
		[/\bEbene (\d)\b/g, 'Schicht $1']
	]
};

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
	const out = { locale: 'de', dryRun: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--locale') out.locale = argv[++i];
		else if (a === '--dry-run') out.dryRun = true;
		else if (a === '-h' || a === '--help') {
			console.log('Usage: normalize-de-terms.mjs [--locale <code>] [--dry-run]');
			process.exit(0);
		}
	}
	if (!REPLACEMENTS[out.locale]) {
		console.error(
			`error: no replacement table for locale "${out.locale}". Add one to scripts/normalize-de-terms.mjs.`
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
		out = out.replace(pattern, (match, ...rest) => {
			replacements++;
			return typeof replacement === 'function' ? replacement(match, ...rest) : match.replace(pattern, replacement);
		});
	}
	return { out, replacements };
}

// The above is overly clever; keep it simple — string-style replacement with
// regex captures works fine and is what we actually need here.
function normalizeSimple(content, table) {
	let out = content;
	let replacements = 0;
	for (const [pattern, replacement] of table) {
		const before = out;
		out = out.replace(pattern, replacement);
		// Count occurrences by re-running the regex over the original input.
		const matches = before.match(pattern);
		if (matches) replacements += matches.length;
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
		const { out, replacements } = normalizeSimple(raw, table);
		if (replacements === 0 || out === raw) continue;

		changedFiles++;
		totalReplacements += replacements;
		console.log(`  ${rel} — ${replacements} replacement${replacements === 1 ? '' : 's'}`);

		if (!args.dryRun) await writeFile(filePath, out, 'utf8');
	}

	const verb = args.dryRun ? 'Would normalize' : 'Normalized';
	console.log(
		`\n${verb} ${totalReplacements} term${totalReplacements === 1 ? '' : 's'} across ${changedFiles} file${changedFiles === 1 ? '' : 's'} (locale: ${args.locale}).`
	);
	if (args.dryRun) console.log('--dry-run: no files were modified.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
