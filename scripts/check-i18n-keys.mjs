#!/usr/bin/env node
/**
 * Compare keys in src/lib/i18n/messages/en.json against every other locale's bundle.
 * Reports keys that are missing or extra per locale, plus keys whose values still
 * equal the English source (a strong hint they were copy-pasted but not translated).
 *
 * Exit codes:
 *   0 — all locales fully cover the source set, no untranslated mirrors
 *   1 — at least one locale has missing keys (hard failure)
 *   2 — only soft warnings (extras / suspected untranslated mirrors)
 *
 * Run manually:    node scripts/check-i18n-keys.mjs
 * Or via package.json: pnpm run check:i18n
 */

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, '..', 'src/lib/i18n/messages');
const SOURCE = 'en';

async function loadBundle(code) {
	const raw = await readFile(path.join(MESSAGES_DIR, `${code}.json`), 'utf8');
	return JSON.parse(raw);
}

function keysOf(obj) {
	return new Set(Object.keys(obj));
}

function diff(sourceKeys, targetKeys) {
	const missing = [...sourceKeys].filter((k) => !targetKeys.has(k));
	const extra = [...targetKeys].filter((k) => !sourceKeys.has(k));
	return { missing, extra };
}

function findUntranslated(source, target) {
	const out = [];
	for (const [key, value] of Object.entries(source)) {
		if (target[key] && target[key] === value) out.push(key);
	}
	return out;
}

async function main() {
	const files = (await readdir(MESSAGES_DIR)).filter((f) => f.endsWith('.json'));
	const codes = files.map((f) => f.replace(/\.json$/, ''));

	if (!codes.includes(SOURCE)) {
		console.error(`error: source bundle ${SOURCE}.json not found in ${MESSAGES_DIR}`);
		process.exit(1);
	}

	const source = await loadBundle(SOURCE);
	const sourceKeys = keysOf(source);
	const targets = codes.filter((c) => c !== SOURCE);

	let hardFail = false;
	let softWarn = false;

	console.log(`\nChecking ${targets.length} locale${targets.length === 1 ? '' : 's'} against ${SOURCE}.json (${sourceKeys.size} keys)\n`);

	for (const code of targets) {
		const bundle = await loadBundle(code);
		const { missing, extra } = diff(sourceKeys, keysOf(bundle));
		const untranslated = findUntranslated(source, bundle);

		const coverage = (((sourceKeys.size - missing.length) / sourceKeys.size) * 100).toFixed(0);
		console.log(`Locale: ${code}  (${coverage}% coverage)`);

		if (missing.length > 0) {
			hardFail = true;
			console.log(`  MISSING (${missing.length}):`);
			for (const k of missing) console.log(`    - ${k}`);
		}
		if (extra.length > 0) {
			softWarn = true;
			console.log(`  EXTRA — keys not present in ${SOURCE} (${extra.length}):`);
			for (const k of extra) console.log(`    + ${k}`);
		}
		if (untranslated.length > 0) {
			softWarn = true;
			console.log(`  UNTRANSLATED — value identical to source (${untranslated.length}):`);
			for (const k of untranslated) console.log(`    ~ ${k}`);
		}
		if (missing.length === 0 && extra.length === 0 && untranslated.length === 0) {
			console.log(`  ✓ all keys translated`);
		}
		console.log('');
	}

	if (hardFail) {
		console.error('FAIL: at least one locale is missing keys.');
		process.exit(1);
	}
	if (softWarn) {
		console.warn('WARN: extra keys or suspected untranslated values found.');
		process.exit(2);
	}
	console.log('OK: every locale fully covers the source set.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
