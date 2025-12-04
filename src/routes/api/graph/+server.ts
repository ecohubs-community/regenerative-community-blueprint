import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT = 'content';

async function readJsonFiles(folder: string) {
  const dir = path.join(process.cwd(), folder);
  try {
    const files = await fs.readdir(dir);
    const items = [];
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      const txt = await fs.readFile(path.join(dir, f), 'utf8');
      items.push(JSON.parse(txt));
    }
    return items;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function readArticles() {
  const dir = path.join(process.cwd(), `${CONTENT}/articles`);
  try {
    const files = await fs.readdir(dir);
    const items = [];
    for (const f of files) {
      if (!f.endsWith('.md')) continue;
      const txt = await fs.readFile(path.join(dir, f), 'utf8');
      const parsed = matter(txt);
      items.push({
        slug: f.replace(/\.md$/, ''),
        ...parsed.data
      });
    }
    return items;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const GET: RequestHandler = async () => {
  const domains = await readJsonFiles(`${CONTENT}/domains`);
  const topics = await readJsonFiles(`${CONTENT}/topics`);
  const modules = await readJsonFiles(`${CONTENT}/modules`);
  const articles = await readArticles();

  // Build simple graph structure
  const graph = {
    domains: domains.map(d => ({ ...d })),
    topics: topics.map(t => ({ ...t })),
    modules: modules.map(m => ({ ...m })),
    articles: articles.map(a => ({ ...a }))
  };

  return new Response(JSON.stringify(graph), {
    headers: { 'Content-Type': 'application/json' }
  });
};