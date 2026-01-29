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
  filePath?: string;
  [key: string]: unknown;
}>;

export type ArticleBody = {
  slug: string;
  body: string;
  data: Record<string, unknown>;
  filePath?: string;
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

/**
 * Recursively read articles from nested folder structure.
 * Supports both flat structure (articles/*.md) and nested folders.
 * 
 * Folder structure determines hierarchy:
 * - articles/governance/_index.md -> slug: "governance", parentId: null
 * - articles/governance/consent.md -> slug: "governance/consent", parentId derived from "governance"
 * - articles/governance/consent/_index.md -> slug: "governance/consent", parentId: "governance"
 * 
 * Numeric prefixes (01-, 02-) are stripped from slugs but used for ordering.
 */
export async function readArticleMeta(): Promise<ArticleMeta[]> {
  const articlesDir = resolvePath('articles');
  const items: ArticleMeta[] = [];
  
  // Map to track folder articles by their path for parent resolution
  const folderArticleIds = new Map<string, string>();
  
  async function scanDirectory(dir: string, relativePath: string = '') {
    let entries: string[] = [];
    try {
      entries = await fs.readdir(dir);
    } catch (error) {
      if (relativePath === '') {
        console.warn('[content] Unable to read articles:', error);
      }
      return;
    }
    
    // Sort entries to process _index.md first (so folder articles are registered before children)
    entries.sort((a, b) => {
      if (a === '_index.md') return -1;
      if (b === '_index.md') return 1;
      return a.localeCompare(b);
    });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = await fs.stat(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively scan subdirectory
        const subRelativePath = relativePath ? `${relativePath}/${entry}` : entry;
        await scanDirectory(fullPath, subRelativePath);
      } else if (entry.endsWith('.md')) {
        try {
          const raw = await fs.readFile(fullPath, 'utf8');
          const parsed = matter(raw);
          
          // Determine slug and parent based on file location
          let slug: string;
          let parentPath: string | null = null;
          
          if (entry === '_index.md') {
            // Folder article: slug is the folder path
            slug = stripNumericPrefix(relativePath);
            // Parent is the parent folder
            const parentFolder = relativePath.split('/').slice(0, -1).join('/');
            parentPath = parentFolder || null;
          } else {
            // Regular article file
            const fileName = entry.replace(/\.md$/, '');
            if (relativePath) {
              slug = `${stripNumericPrefix(relativePath)}/${stripNumericPrefix(fileName)}`;
              parentPath = relativePath;
            } else {
              slug = stripNumericPrefix(fileName);
              parentPath = null;
            }
          }
          
          // Extract order from numeric prefix if present
          const orderFromPrefix = extractNumericPrefix(entry === '_index.md' ? relativePath.split('/').pop() || '' : entry);
          
          // Use frontmatter id if present, otherwise generate from slug
          const id = parsed.data.id || slug.replace(/\//g, '-');
          
          // Determine parentId: prefer frontmatter, then derive from folder structure
          let parentId = parsed.data.parentId;
          if (parentId === undefined && parentPath) {
            // Look up the parent folder's article ID
            parentId = folderArticleIds.get(parentPath) || null;
          }
          
          // Register this article's ID for its path (for child resolution)
          if (entry === '_index.md' && relativePath) {
            folderArticleIds.set(relativePath, id);
          }
          
          items.push({
            ...parsed.data,
            id,
            slug,
            parentId,
            order: parsed.data.order ?? orderFromPrefix ?? 0,
            filePath: fullPath
          });
        } catch (error) {
          console.warn(`[content] Failed to parse article ${fullPath}:`, error);
        }
      }
    }
  }
  
  await scanDirectory(articlesDir);
  return items;
}

/**
 * Strip numeric prefix like "01-" from a path segment
 */
function stripNumericPrefix(segment: string): string {
  return segment.replace(/^\d+-/, '');
}

/**
 * Extract numeric prefix from a path segment (e.g., "01-governance" -> 1)
 */
function extractNumericPrefix(segment: string): number | undefined {
  const match = segment.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : undefined;
}

export async function readArticleBody(slug: string): Promise<ArticleBody | null> {
  // Use readArticleMeta to find the correct file path for this slug
  // This correctly handles numeric prefixes (01-, 02-) which are stripped from slugs
  const articles = await readArticleMeta();
  const article = articles.find(a => a.slug === slug);
  
  if (article?.filePath) {
    try {
      const raw = await fs.readFile(article.filePath, 'utf8');
      const parsed = matter(raw);
      const compiled = await compile(parsed.content);
      
      return {
        slug,
        body: compiled?.code || parsed.content,
        data: parsed.data,
        filePath: article.filePath
      };
    } catch (error) {
      console.warn(`[content] Failed to read article file ${article.filePath}:`, error);
    }
  }

  // Fallback for slugs that might not be in the meta scan yet (e.g. newly created)
  const possiblePaths = [
    resolvePath('articles', `${slug}.md`),
    resolvePath('articles', slug, '_index.md'),
  ];
  
  for (const filePath of possiblePaths) {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = matter(raw);
      const compiled = await compile(parsed.content);
      
      return {
        slug,
        body: compiled?.code || parsed.content,
        data: parsed.data,
        filePath
      };
    } catch {
      // Try next path
    }
  }
  
  console.warn(`[content] Failed to load article body for slug "${slug}"`);
  return null;
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
