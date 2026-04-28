#!/usr/bin/env node
/**
 * One-shot migration: stamp `data-kind="rationale|instructions"` onto every
 * <details> block in content/articles/rcos-templates so the locale-aware
 * downloads pipeline can identify intent without parsing English-language
 * <summary> text.
 *
 * Heuristic mirrors the prior English-only matcher in build-templates.mjs:
 *   - <summary>How…</summary>      → data-kind="instructions"
 *   - everything else              → data-kind="rationale"
 *
 * Idempotent: <details> blocks that already carry data-kind are left alone.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'content/articles/rcos-templates');

function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) out.push(...walk(full));
		else if (name.endsWith('.md')) out.push(full);
	}
	return out;
}

function classify(summary) {
	return /^\s*how\b/i.test(summary) ? 'instructions' : 'rationale';
}

async function migrate(filePath) {
	const raw = await readFile(filePath, 'utf8');

	let count = 0;
	const next = raw.replace(
		/<details(\s[^>]*)?>\s*<summary>([\s\S]*?)<\/summary>/g,
		(match, attrs = '', summary) => {
			if (/data-kind=/.test(attrs)) return match; // already migrated
			const kind = classify(summary);
			count++;
			return `<details data-kind="${kind}"${attrs}>\n<summary>${summary}</summary>`;
		}
	);

	if (count > 0 && next !== raw) {
		await writeFile(filePath, next, 'utf8');
	}
	return count;
}

async function main() {
	const files = walk(TEMPLATES_DIR);
	let total = 0;
	let touched = 0;
	for (const f of files) {
		const n = await migrate(f);
		if (n > 0) {
			touched++;
			total += n;
			console.log(`  ${path.relative(ROOT, f)} — ${n} block${n === 1 ? '' : 's'} stamped`);
		}
	}
	console.log(`\nMigrated ${total} <details> block${total === 1 ? '' : 's'} across ${touched} file${touched === 1 ? '' : 's'}.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
