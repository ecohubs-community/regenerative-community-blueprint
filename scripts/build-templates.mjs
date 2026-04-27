#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile, mkdir, rm, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

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
const SITE_NAME = 'RCOS — Regenerative Community Operating System';
const TEMPLATES_INDEX_URL = `${SITE_URL}/articles/rcos-templates`;

const FORMATS = ['md', 'docx', 'odt'];

const today = new Date().toISOString().slice(0, 10);

async function walk(dir) {
	const out = [];
	for (const name of await readdir(dir)) {
		const full = path.join(dir, name);
		const s = await stat(full);
		if (s.isDirectory()) out.push(...(await walk(full)));
		else if (name.endsWith('.md')) out.push(full);
	}
	return out;
}

function stripFrontmatter(raw) {
	const parsed = matter(raw);
	return { data: parsed.data, body: parsed.content.trimStart() };
}

function articleUrl(relPath) {
	const noExt = relPath.replace(/\.md$/, '');
	return `${SITE_URL}/articles/rcos-templates/${noExt}`;
}

function preambleForMd({ title, sourceUrl }) {
	return [
		`**${SITE_NAME}**`,
		``,
		`# ${title}`,
		``,
		`- **Generated:** ${today}`,
		`- **Source (latest version):** [${sourceUrl}](${sourceUrl})`,
		`- **All RCOS templates:** [${TEMPLATES_INDEX_URL}](${TEMPLATES_INDEX_URL})`,
		``,
		`---`,
		``
	].join('\n');
}

// For pandoc (docx/odt). Uses commonmark+attributes image syntax for sizing.
function preambleForPandoc({ title, sourceUrl }) {
	return [
		`![RCOS](${LOGO_PNG}){width=64px}  **${SITE_NAME}**`,
		``,
		`# ${title}`,
		``,
		`- **Generated:** ${today}`,
		`- **Source (latest version):** <${sourceUrl}>`,
		`- **All RCOS templates:** <${TEMPLATES_INDEX_URL}>`,
		``,
		`---`,
		``
	].join('\n');
}

function absolutizeLinks(body) {
	// Rewrite root-relative markdown links to absolute SITE_URL
	return body.replace(/\]\((\/[^)]+)\)/g, (_m, p) => `](${SITE_URL}${p})`);
}

function flattenDetails(body) {
	const re = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
	return body.replace(re, (_m, summaryRaw, contentRaw) => {
		const summary = summaryRaw.trim().replace(/\?$/, '?');
		const isRationale = /^why\b/i.test(summary);
		const label = isRationale ? 'Rationale' : 'Instructions';
		const cleanedContent = contentRaw
			.trim()
			.split('\n')
			.map((l) => (l.length ? `> ${l}` : `>`))
			.join('\n');
		return `> **${label} — ${summary.replace(/[?:.]$/, '')}**\n>\n${cleanedContent}\n`;
	});
}

function bodyForFormat(body, format) {
	const absolute = absolutizeLinks(body);
	if (format === 'md') return absolute;
	return flattenDetails(absolute);
}

function preambleForFormat({ title, sourceUrl, format }) {
	return format === 'md'
		? preambleForMd({ title, sourceUrl })
		: preambleForPandoc({ title, sourceUrl });
}


// Only wipe paths owned by this script — leave sibling outputs (e.g. core spec) alone.
async function cleanTemplateOutputs() {
	await mkdir(OUT_DIR, { recursive: true });
	const ownedDirs = ['md', 'docx', 'odt'];
	for (const d of ownedDirs) {
		const p = path.join(OUT_DIR, d);
		if (existsSync(p)) await rm(p, { recursive: true, force: true });
	}
	const ownedFiles = [
		...FORMATS.map((f) => `rcos-templates-${f}.zip`),
		'manifest-templates.json'
	];
	for (const f of ownedFiles) {
		const p = path.join(OUT_DIR, f);
		if (existsSync(p)) await rm(p, { force: true });
	}
}

async function generateOne({ filePath, relPath, format }) {
	const raw = await readFile(filePath, 'utf8');
	const { data, body } = stripFrontmatter(raw);
	if (!body.trim()) return null;
	const title = data.title || path.basename(filePath, '.md');
	const sourceUrl = articleUrl(relPath);

	const preamble = preambleForFormat({ title, sourceUrl, format });
	const transformedBody = bodyForFormat(body, format);
	const fullMd = `${preamble}${transformedBody}`;

	const outRel = relPath.replace(/\.md$/, `.${format}`);
	const outPath = path.join(OUT_DIR, format, outRel);
	await mkdir(path.dirname(outPath), { recursive: true });

	if (format === 'md') {
		await writeFile(outPath, fullMd, 'utf8');
		return outPath;
	}

	// pandoc for docx / odt — commonmark with attributes (for image sizing) + raw_html
	const args = [
		'-f',
		'commonmark_x+attributes+raw_html-yaml_metadata_block',
		'-t',
		format,
		'-o',
		outPath,
		'--metadata',
		`title-meta=${title}` // sets doc properties only, no visual title
	];
	await run('pandoc', args, { input: fullMd, cwd: __dirname });
	return outPath;
}

async function buildIndexMd(files) {
	const lines = [
		`# RCOS Templates`,
		``,
		`- **Generated:** ${today}`,
		`- **Source:** [${TEMPLATES_INDEX_URL}](${TEMPLATES_INDEX_URL})`,
		``,
		`This bundle contains every RCOS template, ready to copy and adapt for your community.`,
		``,
		`Each template includes a rationale block (why the section exists) and instructions (how to fill it in).`,
		``,
		`## Templates`,
		``
	];
	const byLayer = new Map();
	for (const f of files) {
		const layer = f.relPath.split('/')[0];
		if (!byLayer.has(layer)) byLayer.set(layer, []);
		byLayer.get(layer).push(f);
	}
	for (const layer of [...byLayer.keys()].sort()) {
		lines.push(`### ${layer}`, ``);
		for (const f of byLayer.get(layer)) {
			lines.push(`- [${f.title}](${f.relPath})`);
		}
		lines.push(``);
	}
	return lines.join('\n');
}

async function zipFormat(format) {
	const dir = path.join(OUT_DIR, format);
	const zipPath = path.join(OUT_DIR, `rcos-templates-${format}.zip`);
	if (existsSync(zipPath)) await rm(zipPath);
	await run('zip', ['-r', '-q', zipPath, '.'], { cwd: dir });
	return zipPath;
}

async function main() {
	if (!existsSync(LOGO_PNG)) {
		throw new Error(`Logo missing at ${LOGO_PNG}. Run sips conversion first.`);
	}
	console.log(`Cleaning template outputs in ${OUT_DIR}`);
	await cleanTemplateOutputs();

	// Copy logo to public location for md downloads to reference
	await copyFile(LOGO_PNG, path.join(ROOT, 'static/rcos-logo.png'));

	const allFiles = await walk(TEMPLATES_DIR);
	const templateFiles = [];
	for (const filePath of allFiles) {
		const relPath = path.relative(TEMPLATES_DIR, filePath);
		const raw = await readFile(filePath, 'utf8');
		const { data, body } = stripFrontmatter(raw);
		if (!body.trim()) continue; // skip empty layer index files
		templateFiles.push({ filePath, relPath, title: data.title || relPath });
	}

	console.log(`Found ${templateFiles.length} templates.`);

	for (const format of FORMATS) {
		console.log(`\n→ Generating ${format} ...`);
		for (const f of templateFiles) {
			process.stdout.write(`  ${f.relPath} → ${format}\n`);
			await generateOne({ filePath: f.filePath, relPath: f.relPath, format });
		}
		// add an INDEX file listing all templates with relative links
		const idx = await buildIndexMd(templateFiles);
		const idxPath = path.join(OUT_DIR, format, `INDEX.${format === 'md' ? 'md' : format}`);
		if (format === 'md') {
			await writeFile(idxPath, idx, 'utf8');
		} else {
			await run(
				'pandoc',
				['-f', 'gfm', '-t', format, '-o', idxPath, '--metadata', 'title-meta=RCOS Templates'],
				{ input: idx, cwd: __dirname }
			);
		}
	}

	console.log(`\n→ Zipping bundles ...`);
	for (const format of FORMATS) {
		const zip = await zipFormat(format);
		console.log(`  ${path.relative(ROOT, zip)}`);
	}

	// Manifest for the UI
	const manifest = {
		generated: today,
		formats: FORMATS,
		bundles: Object.fromEntries(FORMATS.map((f) => [f, `/downloads/rcos-templates-${f}.zip`])),
		templates: templateFiles.map((f) => ({
			relPath: f.relPath.replace(/\\/g, '/'),
			title: f.title,
			files: Object.fromEntries(
				FORMATS.map((fmt) => [
					fmt,
					`/downloads/${fmt}/${f.relPath.replace(/\\/g, '/').replace(/\.md$/, `.${fmt}`)}`
				])
			)
		}))
	};
	await writeFile(path.join(OUT_DIR, 'manifest-templates.json'), JSON.stringify(manifest, null, 2));
	console.log(`\nDone. ${templateFiles.length} templates × ${FORMATS.length} formats.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
