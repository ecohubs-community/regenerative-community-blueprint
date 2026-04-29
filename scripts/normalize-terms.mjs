#!/usr/bin/env node
/**
 * Normalize project-specific technical terms across `.<lang>.md` translations
 * so the vocabulary stays consistent regardless of which translator (or
 * session) produced each file. Locale-pluggable: drop a new entry into
 * REPLACEMENTS to add a target language.
 *
 *   pnpm run normalize:terms -- --locale de        # German
 *   pnpm run normalize:terms -- --locale es        # Spanish
 *   pnpm run normalize:terms -- --locale de --dry-run
 *
 * Today this owns the RCOS "Layer N" concept across locales — the German
 * corpus had drifted into using three different words ("Layer", "Schicht",
 * "Ebene") for the same idea, and we want the same kind of stability for
 * Spanish from day one. The parent article uses the locale-specific
 * convention ("Schichten" / "Capas") so the children should match.
 *
 * Idempotent: running it twice is a no-op. Why a script rather than a
 * re-translation pass: the bodies are otherwise fine — only the noun for
 * one concept needs swapping. Re-translating ~30 articles to fix one term
 * wastes API budget / Claude Code usage and translator review time.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content/articles');

// Per-locale rules. Each rule is [regex, replacement] applied in order;
// list longer / more-specific patterns first if you add ones that overlap.
//
// Word boundaries (\b) protect against false matches in slugs like `layer-0`
// (kebab-case anyway). Number range 0–9 covers RCOS layers; widen if needed.
const REPLACEMENTS = {
	de: [
		// "Layer N" and "Ebene N" → "Schicht N" (the parent article's term).
		[/\bLayer (\d)\b/g, 'Schicht $1'],
		[/\bEbene (\d)\b/g, 'Schicht $1']
	],
	es: [
		// "Layer N" → "Capa N" — the standard Spanish term in protocol-stack
		// contexts (cf. "capas OSI"). "Nivel" is also seen in some literature
		// but "Capa" is more specific to layered architectures and matches the
		// parent article's "Capas RCOS" convention.
		[/\bLayer (\d)\b/g, 'Capa $1'],
		[/\bNivel (\d)\b/g, 'Capa $1']
	],
	fr: [
		// "Layer N" → "Couche N" — the standard French term in protocol-stack
		// contexts (cf. "couches OSI"). "Niveau" is also seen but "Couche" is
		// more specific to layered architectures and matches the parent
		// article's "Couches RCOS" convention.
		[/\bLayer (\d)\b/g, 'Couche $1'],
		[/\bNiveau (\d)\b/g, 'Couche $1']
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
			console.log('Usage: normalize-terms.mjs [--locale <code>] [--dry-run]');
			process.exit(0);
		}
	}
	if (!REPLACEMENTS[out.locale]) {
		console.error(
			`error: no replacement table for locale "${out.locale}". Add one to scripts/normalize-terms.mjs.`
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
		const { out, replacements } = normalize(raw, table);
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
