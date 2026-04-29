#!/usr/bin/env node
/**
 * AI-assisted bulk translation, provider-agnostic.
 *
 * Walks content/articles, finds articles missing or outdated for a target locale,
 * and produces `<base>.<lang>.md` translations using a configurable LLM backend.
 * Idempotent — skips up-to-date translations whose stored `sourceHash` already
 * matches the current source.
 *
 * Providers:
 *
 *   --provider claude-cli      (default)  Uses your Claude Code subscription via
 *                                         the local `claude` binary in print mode
 *                                         (`claude -p`). No API key needed; counts
 *                                         against your Claude Code usage limits.
 *
 *   --provider anthropic-api              Uses the Anthropic API directly via
 *                                         @anthropic-ai/sdk. Requires
 *                                         ANTHROPIC_API_KEY. Pay-per-token, but
 *                                         supports prompt caching so the cost
 *                                         is dominated by the first article.
 *
 *   --provider gemini                     Uses Google Gemini via @google/genai.
 *                                         Requires GEMINI_API_KEY (free tier from
 *                                         https://aistudio.google.com/apikey).
 *                                         Generous free quota and strong on
 *                                         multilingual translation.
 *
 * Auto-selection: with no `--provider` flag, the script picks the first
 * available option in the order anthropic-api → gemini → claude-cli, based on
 * which API key is set in the environment. Set ANTHROPIC_API_KEY/GEMINI_API_KEY
 * to switch backends without passing a flag, or pass `--provider` to override.
 *
 * Examples:
 *   pnpm run translate -- --locale de
 *   pnpm run translate -- --locale de --provider gemini
 *   pnpm run translate -- --locale de --only rcos-core/v0-1 --dry-run
 *   pnpm run translate -- --locale de --force      # re-translate even if up-to-date
 *
 * Output post-processing is provider-agnostic: `lang` and `sourceHash` are
 * stamped onto the frontmatter on disk regardless of what the model returns.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
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
		includeEmpty: false,
		provider: null,
		model: null
	};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--locale') out.locale = argv[++i];
		else if (a === '--only') out.only = argv[++i];
		else if (a === '--dry-run') out.dryRun = true;
		else if (a === '--force') out.force = true;
		else if (a === '--include-empty') out.includeEmpty = true;
		else if (a === '--provider') out.provider = argv[++i];
		else if (a === '--model') out.model = argv[++i];
		else if (a === '-h' || a === '--help') {
			console.log(
				'Usage: translate.mjs --locale <code> [--provider <claude-cli|anthropic-api|gemini>]\n' +
					'                     [--only <substring>] [--dry-run] [--force]\n' +
					'                     [--include-empty] [--model <id>]\n\n' +
					'  --include-empty   also translate articles whose body is empty (frontmatter only),\n' +
					'                    so the title gets localized for structural shell pages.'
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
	const skipped = { emptyBody: 0, missingId: 0, upToDate: 0, filtered: 0 };

	for (const [, group] of [...groups.entries()].sort()) {
		const source = group.source;
		if (!source) continue;
		if (!source.data.id) {
			skipped.missingId++;
			continue;
		}
		if (!args.includeEmpty && !source.body.trim()) {
			skipped.emptyBody++;
			continue;
		}

		const sourceRel = path.relative(ROOT, source.path);
		if (args.only && !sourceRel.includes(args.only)) {
			skipped.filtered++;
			continue;
		}

		const t = group.translations[args.locale];
		const sourceHash = md5short(source.raw);
		const targetPath = source.path.replace(/\.md$/, `.${args.locale}.md`);

		const status = !t ? 'missing' : t.hashStored === sourceHash ? 'up-to-date' : 'outdated';
		if (status === 'up-to-date' && !args.force) {
			skipped.upToDate++;
			continue;
		}

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

	return { jobs, skipped };
}

/* ---------------- prompts ---------------- */

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
   - Keep clause references like "§2.4.1", section numbers, and ISO/RFC document IDs (e.g. "RFC 2119") unchanged.
   - **Translate RFC-2119-style normative keywords** (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY, REQUIRED, RECOMMENDED, OPTIONAL) to their conventional UPPERCASE equivalents in the target language so the normative emphasis is preserved.
     - **German**: MUST → MUSS, MUST NOT → DARF NICHT, SHOULD → SOLLTE, SHOULD NOT → SOLLTE NICHT, MAY → KANN, REQUIRED → ERFORDERLICH, RECOMMENDED → EMPFOHLEN, OPTIONAL → OPTIONAL.
     - **Spanish**: MUST → DEBE, MUST NOT → NO DEBE, SHOULD → DEBERÍA, SHOULD NOT → NO DEBERÍA, MAY → PUEDE, REQUIRED → REQUERIDO, RECOMMENDED → RECOMENDADO, OPTIONAL → OPCIONAL.
     - **French**: MUST → DOIT, MUST NOT → NE DOIT PAS, SHOULD → DEVRAIT, SHOULD NOT → NE DEVRAIT PAS, MAY → PEUT, REQUIRED → REQUIS, RECOMMENDED → RECOMMANDÉ, OPTIONAL → OPTIONNEL.
     Apply this both inside backticks (\`DEBE\`) and inline in prose. For other languages, use the established translation of RFC 2119 keywords; if none is established, keep the English original.
   - Keep technical terms that are conventionally kept in English in the target language (e.g., "API", "Git", "Markdown", "MD5") — translate the surrounding prose only.

5. **Tone and register**
   - Match the source register (formal for spec-like documents, more conversational for templates).
   - For German: prefer informal "du"/"ihr" addressing the reader, matching the source's friendly-but-precise voice. Use natural German technical vocabulary (e.g., "Gemeinschaft" for "community", "Vorlage" for "template").
   - For French: prefer informal "tu"/"vous" addressing the reader as appropriate to the source's friendly-but-precise voice (default to "tu" for templates and conversational content, "vous" for formal spec-like documents). Use natural French technical vocabulary (e.g., "communauté" for "community", "modèle" for "template").
   - For other languages: prefer the natural informal register a community organizer would use, unless the source is clearly formal.

6. **Glossary — keep this consistent across articles**
   - **Layer N** (the RCOS protocol-stack concept):
     - **German**: → **Schicht N**. Always "Schicht", never "Ebene" or "Layer". Examples: "Layer 0" → "Schicht 0", "Layer 2 governance" → "Governance auf Schicht 2".
     - **Spanish**: → **Capa N**. Always "Capa", never "Nivel" or "Layer". Examples: "Layer 0" → "Capa 0", "Layer 2 governance" → "gobernanza en la Capa 2".
     - **French**: → **Couche N**. Always "Couche", never "Niveau" or "Layer". Examples: "Layer 0" → "Couche 0", "Layer 2 governance" → "gouvernance à la Couche 2".
   - Applies in titles, prose, and inside backticks. For other languages, pick the natural translation of "layer" used in protocol-stack contexts and apply it consistently.`;
   
function buildUserPrompt(job) {
	const language = LANGUAGE_NAMES[args.locale] ?? args.locale;
	return `Translate the following markdown article to ${language}. Output ONLY the translated markdown — frontmatter first, then a blank line, then the body — with no commentary or wrapping code fence.

\`\`\`markdown
${job.sourceRaw}
\`\`\``;
}

/* ---------------- providers ---------------- */

/**
 * Each provider implements:
 *   async translate({ systemPrompt, userPrompt, model }) → { text, usage, stopReason }
 *
 * `usage` may be null when the backend doesn't report token counts (e.g. claude-cli
 * with text output). `stopReason` is best-effort and used only to warn about
 * truncation; treat anything other than 'end_turn'/'stop' as suspicious.
 */

function run(cmd, argv, { input, cwd } = {}) {
	return new Promise((resolve, reject) => {
		const p = spawn(cmd, argv, { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
		let stdout = '';
		let stderr = '';
		p.stdout.on('data', (d) => (stdout += d));
		p.stderr.on('data', (d) => (stderr += d));
		p.on('error', reject);
		p.on('close', (code) => {
			if (code === 0) resolve({ stdout, stderr });
			else reject(new Error(`${cmd} exited ${code}: ${stderr || stdout}`));
		});
		if (input != null) p.stdin.end(input);
		else p.stdin.end();
	});
}

const providers = {
	'claude-cli': {
		envHint: null, // no API key required
		defaultModel: null, // Claude Code picks based on subscription
		async ensure() {
			try {
				await run('claude', ['--version']);
			} catch {
				throw new Error(
					'claude CLI not found on PATH. Install Claude Code from https://docs.claude.com/en/docs/claude-code, or use --provider anthropic-api / --provider gemini.'
				);
			}
		},
		async translate({ systemPrompt, userPrompt }) {
			// `claude -p` runs in print mode: reads optional prompt from arg or stdin,
			// prints the model's response to stdout, exits. We pass the user prompt via
			// stdin so its contents aren't subject to argv length limits or shell-quoting
			// surprises, and append our translation rules to the default system prompt.
			const argv = ['-p', '--append-system-prompt', systemPrompt];
			const { stdout } = await run('claude', argv, { input: userPrompt });
			return {
				text: stdout.trim(),
				usage: null, // claude-cli text output doesn't expose token counts
				stopReason: 'end_turn'
			};
		}
	},

	'anthropic-api': {
		envHint: 'ANTHROPIC_API_KEY',
		defaultModel: 'claude-opus-4-7',
		_client: null,
		async ensure() {
			if (!process.env.ANTHROPIC_API_KEY) {
				throw new Error('ANTHROPIC_API_KEY is not set in the environment.');
			}
			const { default: Anthropic } = await import('@anthropic-ai/sdk');
			this._client = new Anthropic();
			this._Anthropic = Anthropic;
		},
		async translate({ systemPrompt, userPrompt, model }) {
			// Streaming + cache_control on the system block: subsequent calls in the
			// same run read at ~10% of base input pricing.
			const stream = this._client.messages.stream({
				model: model ?? this.defaultModel,
				max_tokens: 16000,
				thinking: { type: 'adaptive' },
				system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
				messages: [{ role: 'user', content: userPrompt }]
			});
			const finalMessage = await stream.finalMessage();
			const text = finalMessage.content
				.filter((b) => b.type === 'text')
				.map((b) => b.text)
				.join('')
				.trim();
			return {
				text,
				usage: finalMessage.usage,
				stopReason: finalMessage.stop_reason
			};
		}
	},

	gemini: {
		envHint: 'GEMINI_API_KEY',
		defaultModel: 'gemini-2.5-flash',
		_client: null,
		async ensure() {
			if (!process.env.GEMINI_API_KEY) {
				throw new Error(
					'GEMINI_API_KEY is not set. Create a free key at https://aistudio.google.com/apikey.'
				);
			}
			const { GoogleGenAI } = await import('@google/genai');
			this._client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
		},
		async translate({ systemPrompt, userPrompt, model }) {
			const response = await this._client.models.generateContent({
				model: model ?? this.defaultModel,
				contents: userPrompt,
				config: { systemInstruction: systemPrompt }
			});
			const usage = response.usageMetadata
				? {
						input_tokens: response.usageMetadata.promptTokenCount ?? 0,
						output_tokens: response.usageMetadata.candidatesTokenCount ?? 0,
						cache_creation_input_tokens: 0,
						cache_read_input_tokens: response.usageMetadata.cachedContentTokenCount ?? 0
					}
				: null;
			return {
				text: (response.text ?? '').trim(),
				usage,
				stopReason: response.candidates?.[0]?.finishReason ?? 'STOP'
			};
		}
	}
};

/**
 * Auto-pick a provider when the user doesn't specify --provider:
 *   anthropic-api  if ANTHROPIC_API_KEY is set
 *   else gemini    if GEMINI_API_KEY is set
 *   else claude-cli (subscription-backed, free for the user)
 *
 * The default favors paid APIs when keys are present because they're the
 * highest-quality / most predictable backends; falls through to claude-cli
 * which is the most widely available "free" option for users who already have
 * a Claude Code subscription but no API key.
 */
function autoSelectProvider() {
	if (process.env.ANTHROPIC_API_KEY) return 'anthropic-api';
	if (process.env.GEMINI_API_KEY) return 'gemini';
	return 'claude-cli';
}

/* ---------------- output post-processing ---------------- */

function stripCodeFence(s) {
	const m = s.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n?```\s*$/);
	return m ? m[1] : s;
}

/**
 * Models occasionally leak a reasoning preamble ("Now I have good context for
 * terminology consistency. Let me produce the translation.") before the actual
 * markdown output, despite the prompt saying "output ONLY the translated
 * markdown". When that happens, the leading prose ends up in the body and the
 * intended frontmatter ends up inside the body too.
 *
 * If we can find a frontmatter block (`---\n...\n---`) in the response, slice
 * the response from there and discard anything before it. That recovers a
 * well-formed file even when the model went chatty.
 *
 * Idempotent: a clean response (frontmatter at byte 0) passes through unchanged.
 */
function trimPreamble(s) {
	// Match a YAML frontmatter block anywhere in the string. Multiline-mode `^`
	// means the opening `---` must be at the start of a line.
	const fmMatch = s.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/m);
	if (!fmMatch || fmMatch.index === 0) return s; // no preamble to strip
	return s.slice(fmMatch.index);
}

function finalizeOutput(translatedRaw, job) {
	const cleaned = trimPreamble(stripCodeFence(translatedRaw.trim()));
	const fm = matter(cleaned);

	// Sanity check: every translation must produce a non-empty `title`. If the
	// model returned an empty body or got tripped up by a malformed frontmatter
	// block, fail loudly so the file isn't silently corrupted on disk. The job
	// stays "missing" in the drift report and the caller can re-run.
	if (!fm.data.title || typeof fm.data.title !== 'string' || !fm.data.title.trim()) {
		throw new Error(
			`provider returned no translated \`title\` in frontmatter — refusing to write a broken file`
		);
	}

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

// Pricing per 1M tokens in USD. Used only for an end-of-run cost estimate;
// claude-cli has no per-token cost (it's subscription-backed) so it's omitted.
const PRICING = {
	'claude-opus-4-7': { input: 5.0, output: 25.0, cacheWrite: 6.25, cacheRead: 0.5 },
	'claude-opus-4-6': { input: 5.0, output: 25.0, cacheWrite: 6.25, cacheRead: 0.5 },
	'claude-sonnet-4-6': { input: 3.0, output: 15.0, cacheWrite: 3.75, cacheRead: 0.3 },
	'claude-haiku-4-5': { input: 1.0, output: 5.0, cacheWrite: 1.25, cacheRead: 0.1 },
	// Gemini paid pricing — irrelevant on the free tier, but useful as a
	// reference if someone pushes past the free quota.
	'gemini-2.5-flash': { input: 0.3, output: 2.5, cacheWrite: 0, cacheRead: 0.075 },
	'gemini-2.5-pro': { input: 1.25, output: 10.0, cacheWrite: 0, cacheRead: 0.31 },
	'gemini-2.0-flash': { input: 0.1, output: 0.4, cacheWrite: 0, cacheRead: 0.025 }
};

function estimateCost(usage, model) {
	if (!usage) return null;
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
	const providerName = args.provider ?? autoSelectProvider();
	const provider = providers[providerName];
	if (!provider) {
		console.error(
			`error: unknown provider "${providerName}". Choose: ${Object.keys(providers).join(', ')}`
		);
		process.exit(1);
	}
	const model = args.model ?? provider.defaultModel;

	const { jobs, skipped } = await buildJobs();

	console.log(`\nLocale:   ${args.locale}  (${LANGUAGE_NAMES[args.locale] ?? args.locale})`);
	console.log(`Provider: ${providerName}${model ? `  (model: ${model})` : ''}`);
	console.log(`Plan:     ${jobs.length} article${jobs.length === 1 ? '' : 's'} to translate`);
	if (jobs.length === 0) {
		console.log('\nNothing to translate. Reasons sources were skipped:');
		console.log(`  ${skipped.upToDate}   already up-to-date in ${args.locale} (use --force to re-translate)`);
		console.log(`  ${skipped.emptyBody}   body is empty / frontmatter-only (use --include-empty to translate the title anyway)`);
		console.log(`  ${skipped.filtered}   excluded by --only "${args.only ?? ''}"`);
		console.log(`  ${skipped.missingId}   no \`id\` in frontmatter (orphan source)`);
		process.exit(0);
	}
	for (const j of jobs) {
		console.log(`  ${j.status.padEnd(10)} ${j.sourceRel}  →  ${j.targetRel}`);
	}

	if (args.dryRun) {
		console.log('\n--dry-run: no API/CLI calls made.');
		process.exit(0);
	}

	try {
		await provider.ensure();
	} catch (err) {
		console.error(`\nerror: ${err.message}`);
		process.exit(1);
	}

	let totalCost = 0;
	let unknownCost = false;
	let successes = 0;
	let failures = 0;
	const startedAt = Date.now();

	console.log('');
	for (let i = 0; i < jobs.length; i++) {
		const job = jobs[i];
		const prefix = `[${i + 1}/${jobs.length}]`;
		process.stdout.write(`${prefix} ${job.sourceRel} ... `);

		try {
			const { text, usage, stopReason } = await provider.translate({
				systemPrompt: SYSTEM_PROMPT,
				userPrompt: buildUserPrompt(job),
				model
			});
			const isTerminal =
				stopReason === 'end_turn' || stopReason === 'STOP' || stopReason === 'stop';
			if (!isTerminal) {
				console.log(`\n  WARN: stop_reason = ${stopReason} (output may be truncated)`);
			}
			if (!text) {
				throw new Error('provider returned empty text');
			}

			const out = finalizeOutput(text, job);
			await writeFile(job.targetPath, out, 'utf8');

			let costStr = '';
			if (usage) {
				const cost = estimateCost(usage, model);
				if (cost == null) unknownCost = true;
				else totalCost += cost;
				const cacheReadPct = usage.cache_read_input_tokens
					? ` (${Math.round(
							(usage.cache_read_input_tokens /
								(usage.cache_read_input_tokens + (usage.input_tokens ?? 0))) *
								100
						)}% cached)`
					: '';
				costStr =
					` · ${usage.input_tokens ?? 0}+${usage.output_tokens ?? 0} tokens${cacheReadPct}` +
					(cost != null ? ` · ~$${cost.toFixed(4)}` : '');
			}
			console.log(`done${costStr}`);
			successes++;
		} catch (err) {
			failures++;
			const msg = err?.message ?? String(err);
			console.log(`FAIL · ${msg}`);
		}
	}

	const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(0);
	console.log(`\nDone in ${elapsedSec}s. ${successes} succeeded, ${failures} failed.`);
	if (providerName === 'claude-cli') {
		console.log('Cost: subscription-backed (Claude Code) — no per-token charge.');
	} else if (!unknownCost && totalCost > 0) {
		console.log(`Estimated cost: ~$${totalCost.toFixed(4)}`);
	} else if (unknownCost) {
		console.log('Estimated cost: ? (model not in PRICING table)');
	}

	process.exit(failures > 0 ? 1 : 0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
