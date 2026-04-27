#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'static/downloads');

const SITE_URL = process.env.PUBLIC_APP_URL || 'https://blueprint.ecohubs.community';
const SITE_NAME = 'RCOS — Regenerative Community Operating System';
const today = new Date().toISOString().slice(0, 10);

function stripFrontmatter(raw) {
	const parsed = matter(raw);
	return { data: parsed.data, body: parsed.content.trimStart() };
}

function absolutizeLinks(body) {
	return body.replace(/\]\((\/[^)]+)\)/g, (_m, p) => `](${SITE_URL}${p})`);
}

async function buildCoreV01() {
	const dir = path.join(ROOT, 'content/articles/rcos-core/v0-1');
	const v01ParentPath = path.join(ROOT, 'content/articles/rcos-core/v0-1.md');
	const corePath = path.join(ROOT, 'content/articles/rcos-core.md');
	if (!existsSync(dir) || !existsSync(v01ParentPath)) {
		console.warn('rcos-core/v0-1 content not found, skipping.');
		return null;
	}

	const v01Parent = stripFrontmatter(await readFile(v01ParentPath, 'utf8'));
	// drop the parent's leading `# ...` and `## ...` headings — we use our own title.
	const v01Meta = v01Parent.body.replace(/^\s*#[^\n]*\n+##[^\n]*\n+/, '').trim();

	let aboutSection = null;
	if (existsSync(corePath)) {
		const core = stripFrontmatter(await readFile(corePath, 'utf8'));
		aboutSection = {
			title: 'About RCOS Core',
			body: absolutizeLinks(core.body.trim())
		};
	}

	const names = (await readdir(dir)).filter((n) => n.endsWith('.md')).sort();
	const sections = [];
	for (const name of names) {
		const { data, body } = stripFrontmatter(await readFile(path.join(dir, name), 'utf8'));
		sections.push({
			title: data.title || path.basename(name, '.md'),
			order: typeof data.order === 'number' ? data.order : 999,
			body: absolutizeLinks(body.trim())
		});
	}
	sections.sort((a, b) => a.order - b.order);

	const sourceUrl = `${SITE_URL}/articles/rcos-core/v0-1`;
	const slugify = (s) =>
		s
			.toLowerCase()
			.replace(/\./g, '')
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-');

	const tocEntries = [
		...(aboutSection ? [aboutSection.title] : []),
		...sections.map((s) => s.title)
	];
	const toc = tocEntries.map((t) => `- [${t}](#${slugify(t)})`).join('\n');

	const allBlocks = [
		...(aboutSection ? [aboutSection] : []),
		...sections
	]
		.map((s) => `# ${s.title}\n\n${s.body}\n`)
		.join('\n\n---\n\n');

	const doc = [
		`**${SITE_NAME}**`,
		``,
		`# RCOS Core Specification — v0.1`,
		``,
		`- **Generated:** ${today}`,
		`- **Source (latest version):** [${sourceUrl}](${sourceUrl})`,
		``,
		v01Meta,
		``,
		`## Table of Contents`,
		``,
		toc,
		``,
		`---`,
		``,
		allBlocks,
		``
	].join('\n');

	await mkdir(OUT_DIR, { recursive: true });
	const outPath = path.join(OUT_DIR, 'rcos-core-v0-1.md');
	await writeFile(outPath, doc, 'utf8');
	return {
		slug: 'rcos-core/v0-1',
		title: 'RCOS Core Specification — v0.1',
		generated: today,
		formats: ['md'],
		files: { md: '/downloads/rcos-core-v0-1.md' }
	};
}

async function main() {
	console.log('Building RCOS Core v0.1 single-file MD ...');
	const entry = await buildCoreV01();

	const manifestPath = path.join(OUT_DIR, 'manifest-core.json');
	if (existsSync(manifestPath)) await rm(manifestPath, { force: true });

	const manifest = {
		generated: today,
		entries: entry ? [entry] : []
	};
	await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
	console.log(entry ? `Wrote ${path.relative(ROOT, entry.files.md.replace(/^\//, 'static/'))}` : 'No core entry written.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
