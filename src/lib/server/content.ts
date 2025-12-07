import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compile } from 'mdsvex';

const CONTENT_ROOT = 'content';

type JsonValue = Record<string, unknown>;

export type JsonEntry<T extends JsonValue = JsonValue> = T & {
  id: string;
  slug: string;
};

export type ArticleMeta = JsonEntry<{
  title?: string;
  summary?: string;
  parentId?: string | null;
  order?: number;
  icon?: string;
  climate?: string[] | string;
  budget?: string[] | string;
  size?: string[] | string;
  attachments?: { file: string; caption?: string }[];
  [key: string]: unknown;
}>;

export type ArticleBody = {
  slug: string;
  body: string;
  data: Record<string, unknown>;
};

function resolvePath(...segments: string[]) {
  return path.join(process.cwd(), CONTENT_ROOT, ...segments);
}

export async function readJsonCollection<T extends JsonValue = JsonValue>(subdir: string) {
  const dir = resolvePath(subdir);
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch (error) {
    console.warn(`[content] Unable to read collection "${subdir}":`, error);
    return [] as JsonEntry<T>[];
  }

  const items: JsonEntry<T>[] = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const slug = file.replace(/\.json$/, '');
    try {
      const raw = await fs.readFile(path.join(dir, file), 'utf8');
      const data = JSON.parse(raw) as T;
      items.push({ ...data, id: slug, slug });
    } catch (error) {
      console.warn(`[content] Failed to parse ${subdir}/${file}:`, error);
    }
  }
  return items;
}

export async function readArticleMeta(): Promise<ArticleMeta[]> {
  const dir = resolvePath('articles');
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch (error) {
    console.warn('[content] Unable to read articles:', error);
    return [];
  }

  const items: ArticleMeta[] = [];
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/\.md$/, '');
    try {
      const raw = await fs.readFile(path.join(dir, file), 'utf8');
      const parsed = matter(raw);
      items.push({ ...parsed.data, id: slug, slug });
    } catch (error) {
      console.warn(`[content] Failed to parse article ${file}:`, error);
    }
  }
  return items;
}

export async function readArticleBody(slug: string): Promise<ArticleBody | null> {
  const file = resolvePath('articles', `${slug}.md`);
  try {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    const compiled = await compile(parsed.content);
    
    return {
      slug,
      body: compiled?.code || parsed.content,
      data: parsed.data
    };
  } catch (error) {
    console.warn(`[content] Failed to load article body for slug "${slug}":`, error);
    return null;
  }
}

export async function compileMarkdown(markdown: string): Promise<string> {
  try {
    const compiled = await compile(markdown);
    return compiled?.code || markdown;
  } catch (error) {
    console.warn('[content] Failed to compile markdown:', error);
    return markdown;
  }
}
