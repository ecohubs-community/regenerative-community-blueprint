#!/usr/bin/env node
/**
 * AI-assisted bulk translation via the Claude API.
 *
 * Walks content/articles, finds articles missing or outdated in a target locale,
 * and produces `<base>.<lang>.md` translations using Claude. Idempotent — skips
 * up-to-date translations whose stored `sourceHash` already matches the current
 * source file.
 *
 *   pnpm run translate -- --locale de
 *   pnpm run translate -- --locale de --only rcos-core/v0-1
 *   pnpm run translate -- --locale de --dry-run
 *   pnpm run translate -- --locale de --force      # re-translate even if up-to-date
 *
 * Requires ANTHROPIC_API_KEY in the environment. The script uses Claude Opus 4.7
 * with adaptive thinking and prompt caching on the stable system prompt — the
 * per-call cost after the first article in a run is dominated by cached reads
 * (~10% of base input pricing).
 *
 * Output goes through `gray-matter` post-processing: `lang` and `sourceHash`
 * are added/updated to the frontmatter on disk regardless of what the model
 * returns, so missing fields are not a translation failure.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import Anthropic from '@anthropic-ai/sdk';
import { SUPPORTED_LOCALES } from './i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content/articles');
const DEFAULT_LOCALE = 'en';

// Human-readable language names for the translation prompt. Keep in sync with
// scripts/i18n.mjs / src/lib/i18n/languages.ts when adding a locale.
const LANGUAGE_NAMES = {
	de: 'German (Deutsch)',
	es: 'Spanish (Español)',
	pt: 'Portuguese (Português)',
	fr: 'French (Français)'
};

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
	const out = {
		locale: null,
		only: null,
		dryRun: false,
		force: false,
		model: 'claude-opus-4-7',
		concurrency: 1
	};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--locale') out.locale = argv[++i];
		else if (a === '--only') out.only = argv[++i];
		else if (a === '--dry-run') out.dryRun = true;
		else if (a === '--force') out.force = true;
		else if (a === '--model') out.model = argv[++i];
		else if (a === '--concurrency') out.concurrency = parseInt(argv[++i], 10);
		else if (a === '-h' || a === '--help') {
			console.log(
				'Usage: translate.mjs --locale <code> [--only <substring>] [--dry-run] [--force] [--model <id>] [--concurrency N]'
			);
			process.exit(0);
		}
	}
	if (!out.locale) {
		console.error('error: --locale is required (e.g. --locale de)');
		process.exit(1);
	}
	if (out.locale === DEFAULT_LOCALE) {
		console.error(`error: cannot translate to the default locale (${DEFAULT_LOCALE})`);
		process.exit(1);
	}
	if (!SUPPORTED_LOCALES.includes(out.locale)) {
		console.error(
			`error: locale "${out.locale}" is not registered. Supported: ${SUPPORTED_LOCALES.join(', ')}`
		);
		process.exit(1);
	}
	return out;
}

/* ---------------- file walk + grouping ---------------- */

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
		if (SUPPORTED_LOCALES.includes(candidate)) {
			return { base: noExt.slice(0, dot), lang: candidate };
		}
	}
	return { base: noExt, lang: DEFAULT_LOCALE };
}

function md5short(s) {
	return createHash('md5').update(s).digest('hex').slice(0, 8);
}

/**
 * Build a list of jobs: each job is one (source, targetLocale) pair that needs
 * translating, with the current source content + hash and the target file path.
 *
 * Skips:
 *   - empty source bodies
 *   - sources with no frontmatter `id` (we'd have nothing stable to anchor on)
 *   - up-to-date translations (sourceHash matches), unless --force
 */
async function buildJobs() {
	const all = await walkMd(ARTICLES_DIR);
	const groups = new Map();

	for (const filePath of all) {
		const fileName = path.basename(filePath);
		const parsed = parseFilename(fileName);
		if (!parsed) continue;

		const dir = path.dirname(filePath);
		const sourcePath = path.join(dir, `${parsed.base}.md`);

		if (!groups.has(sourcePath)) {
			groups.set(sourcePath, { source: null, translations: {} });
		}
		const entry = groups.get(sourcePath);

		const raw = await readFile(filePath, 'utf8');
		const fm = matter(raw);
		if (parsed.lang === DEFAULT_LOCALE) {
			entry.source = { path: filePath, raw, body: fm.content, data: fm.data };
		} else {
			entry.translations[parsed.lang] = {
				path: filePath,
				data: fm.data,
				hashStored: typeof fm.data.sourceHash === 'string' ? fm.data.sourceHash : null
			};
		}
	}

	const jobs = [];
	for (const [, group] of [...groups.entries()].sort()) {
		const source = group.source;
		if (!source || !source.body.trim()) continue;
		if (!source.data.id) continue; // skip orphan files without frontmatter id

		const sourceRel = path.relative(ROOT, source.path);
		if (args.only && !sourceRel.includes(args.only)) continue;

		const t = group.translations[args.locale];
		const sourceHash = md5short(source.raw);
		const targetPath = source.path.replace(/\.md$/, `.${args.locale}.md`);

		const status = !t ? 'missing' : t.hashStored === sourceHash ? 'up-to-date' : 'outdated';
		if (status === 'up-to-date' && !args.force) continue;

		jobs.push({
			sourcePath: source.path,
			sourceRel,
			sourceRaw: source.raw,
			sourceData: source.data,
			sourceHash,
			targetPath,
			targetRel: path.relative(ROOT, targetPath),
			status
		});
	}

	return jobs;
}

/* ---------------- Claude call ---------------- */

const SYSTEM_PROMPT = `You are a professional translator for technical documentation about regenerative community organizing systems (RCOS) — small intentional communities, governance, decision-making, resource sharing, and conflict resolution.

You translate one markdown article at a time. Output ONLY the translated markdown file (frontmatter + body). No commentary, no explanation, no code fences wrapping the whole document.

Rules:

1. **Frontmatter**
   - Keep YAML frontmatter keys in English (\`id\`, \`title\`, \`summary\`, \`parentId\`, \`order\`, etc.).
   - Translate ONLY the *values* of \`title\` and \`summary\` (if present). Quote string values that contain colons or other YAML metacharacters.
   - Leave \`id\`, \`parentId\`, \`order\`, and any other structural fields exactly as in the source.
   - The caller will add or update \`lang\` and \`sourceHash\` after you respond — you can omit them.

2. **Links and slugs**
   - Preserve every link target verbatim — never translate slugs in URLs.
   - \`/articles/governance/consent\` stays \`/articles/governance/consent\` even if you translate the link text.

3. **Code, tables, HTML**
   - Preserve all fenced code blocks (their content is code, not prose).
   - Preserve table structure and column counts; translate cell text only.
   - Preserve all HTML tags verbatim, including \`<details>\`, \`<summary>\`, and \`data-kind\` attributes. Translate the *text inside* \`<summary>\` and inside \`<details>\` blocks.

4. **Identifiers and references**
   - Keep clause references like "§2.4.1", section numbers, "RFC-style" keywords (\`MUST\`, \`MUST NOT\`, \`SHOULD\`, \`MAY\`), and ISO/RFC document IDs unchanged.
   - Keep technical terms that are conventionally kept in English in the target language (e.g., "API", "Git", "Markdown", "MD5") — translate the surrounding prose only.

5. **Tone and register**
   - Match the source register (formal for spec-like documents, more conversational for templates).
   - For German: prefer informal "du"/"ihr" addressing the reader, matching the source's friendly-but-precise voice. Use natural German technical vocabulary (e.g., "Gemeinschaft" for "community", "Vorlage" for "template").
   - For other languages: prefer the natural informal register a community organizer would use, unless the source is clearly formal.`;

function buildUserPrompt(job) {
	const language = LANGUAGE_NAMES[args.locale] ?? args.locale;
	return `Translate the following markdown article to ${language}. Output ONLY the translated markdown — frontmatter first, then a blank line, then the body — with no commentary or wrapping code fence.

\`\`\`markdown
${job.sourceRaw}
\`\`\``;
}

/**
 * Call Claude with prompt-caching on the system block (it's identical across
 * every job in this run, so the second-onward articles read from cache at ~10%
 * of base price). Streams to avoid request timeouts on long articles.
 */
async function translateOne(client, job) {
	const stream = client.messages.stream({
		model: args.model,
		max_tokens: 16000,
		thinking: { type: 'adaptive' },
		system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
		messages: [{ role: 'user', content: buildUserPrompt(job) }]
	});

	const finalMessage = await stream.finalMessage();

	const textBlocks = finalMessage.content.filter((b) => b.type === 'text');
	const text = textBlocks.map((b) => b.text).join('').trim();

	const usage = finalMessage.usage;
	return { text, usage, stopReason: finalMessage.stop_reason };
}

/**
 * Strip an outer ```markdown ... ``` fence if the model wrapped its output
 * despite the instruction not to. Belt-and-braces; usually a no-op.
 */
function stripCodeFence(s) {
	const m = s.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n?```\s*$/);
	return m ? m[1] : s;
}

/**
 * Apply post-processing the model isn't responsible for: stamp `lang` and
 * `sourceHash` onto the translated frontmatter, drop any structural fields
 * the model accidentally renamed (we trust the source for `id`/`parentId`/`order`).
 */
function finalizeOutput(translatedRaw, job) {
	const cleaned = stripCodeFence(translatedRaw.trim());
	const fm = matter(cleaned);

	// Authority for structural fields is the source — overwrite anything the
	// model "translated" by accident.
	fm.data.id = job.sourceData.id;
	if (job.sourceData.parentId !== undefined) fm.data.parentId = job.sourceData.parentId;
	if (job.sourceData.order !== undefined) fm.data.order = job.sourceData.order;

	fm.data.lang = args.locale;
	fm.data.sourceHash = job.sourceHash;

	return matter.stringify(fm.content, fm.data);
}

/* ---------------- cost tracking ---------------- */

// Pricing (USD per 1M tokens) for the models we routinely use. If the user
// passes --model X and X isn't in this table, we still translate but skip cost
// estimation for that run — printed as "?".
const PRICING = {
	'claude-opus-4-7': { input: 5.0, output: 25.0, cacheWrite: 6.25, cacheRead: 0.5 },
	'claude-opus-4-6': { input: 5.0, output: 25.0, cacheWrite: 6.25, cacheRead: 0.5 },
	'claude-sonnet-4-6': { input: 3.0, output: 15.0, cacheWrite: 3.75, cacheRead: 0.3 },
	'claude-haiku-4-5': { input: 1.0, output: 5.0, cacheWrite: 1.25, cacheRead: 0.1 }
};

function estimateCost(usage, model) {
	const p = PRICING[model];
	if (!p) return null;
	const input = ((usage.input_tokens ?? 0) * p.input) / 1_000_000;
	const output = ((usage.output_tokens ?? 0) * p.output) / 1_000_000;
	const cacheW = ((usage.cache_creation_input_tokens ?? 0) * p.cacheWrite) / 1_000_000;
	const cacheR = ((usage.cache_read_input_tokens ?? 0) * p.cacheRead) / 1_000_000;
	return input + output + cacheW + cacheR;
}

/* ---------------- main ---------------- */

async function main() {
	if (!args.dryRun && !process.env.ANTHROPIC_API_KEY) {
		console.error('error: ANTHROPIC_API_KEY is not set in the environment.');
		process.exit(1);
	}

	const jobs = await buildJobs();

	if (jobs.length === 0) {
		console.log(`Nothing to translate for locale "${args.locale}". (Use --force to re-translate up-to-date files.)`);
		process.exit(0);
	}

	console.log(`\nLocale: ${args.locale}  (${LANGUAGE_NAMES[args.locale] ?? args.locale})`);
	console.log(`Model:  ${args.model}\n`);
	console.log(`Plan: ${jobs.length} article${jobs.length === 1 ? '' : 's'} to translate`);
	for (const j of jobs) {
		console.log(`  ${j.status.padEnd(10)} ${j.sourceRel}  →  ${j.targetRel}`);
	}

	if (args.dryRun) {
		console.log('\n--dry-run: no API calls made.');
		process.exit(0);
	}

	const client = new Anthropic();

	let totalCost = 0;
	let unknownCost = false;
	let successes = 0;
	let failures = 0;

	console.log('');
	for (let i = 0; i < jobs.length; i++) {
		const job = jobs[i];
		const prefix = `[${i + 1}/${jobs.length}]`;
		process.stdout.write(`${prefix} ${job.sourceRel} ... `);

		try {
			const { text, usage, stopReason } = await translateOne(client, job);
			if (stopReason !== 'end_turn') {
				console.log(`\n  WARN: stop_reason = ${stopReason} (output may be truncated)`);
			}
			const out = finalizeOutput(text, job);
			await writeFile(job.targetPath, out, 'utf8');

			const cost = estimateCost(usage, args.model);
			if (cost == null) unknownCost = true;
			else totalCost += cost;

			const cacheReadPct = usage.cache_read_input_tokens
				? ` (${Math.round(
						(usage.cache_read_input_tokens /
							(usage.cache_read_input_tokens + (usage.input_tokens ?? 0))) *
							100
					)}% cached)`
				: '';
			console.log(
				`done · ${usage.input_tokens ?? 0}+${usage.output_tokens ?? 0} tokens${cacheReadPct}` +
					(cost != null ? ` · ~$${cost.toFixed(4)}` : '')
			);
			successes++;
		} catch (err) {
			failures++;
			if (err instanceof Anthropic.APIError) {
				console.log(`FAIL · ${err.status} ${err.message}`);
			} else {
				console.log(`FAIL · ${err?.message ?? err}`);
			}
		}
	}

	console.log(`\nDone. ${successes} succeeded, ${failures} failed.`);
	if (!unknownCost) console.log(`Estimated cost: ~$${totalCost.toFixed(4)}`);
	else console.log('Estimated cost: ? (model pricing not in PRICING table)');

	process.exit(failures > 0 ? 1 : 0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
