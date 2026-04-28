import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compile, type MdsvexCompileOptions } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import { DEFAULT_LOCALE, LOCALE_CODES } from '$lib/i18n/languages';

const mdsvexOptions = {
  rehypePlugins: [rehypeSlug]
} as unknown as MdsvexCompileOptions;

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
  attachments?: { file: string; caption?: string }[];
  filePath?: string;
  /** BCP-47 locale this metadata describes (default `en` for unsuffixed files). */
  lang?: string;
  /** First 8 chars of MD5(source content) at translation time. Optional staleness check. */
  sourceHash?: string;
  [key: string]: unknown;
}>;

export type ArticleBody = {
  slug: string;
  body: string;
  data: Record<string, unknown>;
  filePath?: string;
  /** Locale of the *served* body. May differ from the requested locale on fallback. */
  lang: string;
  /** True if the body is the default-locale source serving as fallback. */
  isFallback: boolean;
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
 * Parse an article filename into its base name (without extension or lang suffix)
 * and detected locale.
 *
 *   00-introduction.md       → { base: '00-introduction', lang: 'en' (default) }
 *   00-introduction.de.md    → { base: '00-introduction', lang: 'de' }
 *   _index.md                → { base: '_index',          lang: 'en' }
 *   _index.de.md             → { base: '_index',          lang: 'de' }
 *
 * Files whose `.lang.md` suffix is not in the registered LOCALE_CODES (e.g. a
 * stray `notes.txt.md`) are treated as default-locale articles. This is the safe
 * default: an unknown suffix is more likely a typo or unrelated naming convention
 * than an unconfigured locale.
 */
function parseArticleFilename(entry: string): { base: string; lang: string } | null {
  if (!entry.endsWith('.md')) return null;
  const noExt = entry.slice(0, -'.md'.length);
  const dot = noExt.lastIndexOf('.');
  if (dot > 0) {
    const candidate = noExt.slice(dot + 1);
    if (LOCALE_CODES.includes(candidate)) {
      return { base: noExt.slice(0, dot), lang: candidate };
    }
  }
  return { base: noExt, lang: DEFAULT_LOCALE };
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
 *
 * Translations: a sibling file `<name>.<lang>.md` is parsed as an additional
 * ArticleMeta entry sharing the same `slug` and `id` as the source, with
 * `lang: <lang>`. Callers downstream group by `id` to pick the right locale.
 */
export async function readArticleMeta(): Promise<ArticleMeta[]> {
  const articlesDir = resolvePath('articles');
  const items: ArticleMeta[] = [];

  // Map to track folder articles by their path for parent resolution.
  // Keyed on (path, lang) so per-locale folder articles register independently —
  // but in practice folder articles use the source `_index.md`, so this is mostly
  // populated for lang=en.
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

    // Sort: process folder index files first, then default-locale files before
    // their translations (so id resolution from frontmatter is consistent).
    entries.sort((a, b) => {
      const aIdx = a.startsWith('_index.');
      const bIdx = b.startsWith('_index.');
      if (aIdx !== bIdx) return aIdx ? -1 : 1;
      // Default-locale (no lang suffix) before translations
      const aParsed = parseArticleFilename(a);
      const bParsed = parseArticleFilename(b);
      const aDefault = aParsed?.lang === DEFAULT_LOCALE && !a.includes('.');
      const bDefault = bParsed?.lang === DEFAULT_LOCALE && !b.includes('.');
      if (aDefault !== bDefault) return aDefault ? -1 : 1;
      return a.localeCompare(b);
    });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        const subRelativePath = relativePath ? `${relativePath}/${entry}` : entry;
        await scanDirectory(fullPath, subRelativePath);
        continue;
      }

      const parsedName = parseArticleFilename(entry);
      if (!parsedName) continue;

      try {
        const raw = await fs.readFile(fullPath, 'utf8');
        const parsed = matter(raw);

        // Determine slug and parent based on file location (using the base name,
        // independent of locale suffix — translations live at the same slug).
        let slug: string;
        let parentPath: string | null = null;

        const isIndex = parsedName.base === '_index';

        if (isIndex) {
          slug = stripNumericPrefix(relativePath);
          const parentFolder = relativePath.split('/').slice(0, -1).join('/');
          parentPath = parentFolder || null;
        } else {
          if (relativePath) {
            slug = `${stripNumericPrefix(relativePath)}/${stripNumericPrefix(parsedName.base)}`;
            parentPath = relativePath;
          } else {
            slug = stripNumericPrefix(parsedName.base);
            parentPath = null;
          }
        }

        const orderFromPrefix = extractNumericPrefix(
          isIndex ? relativePath.split('/').pop() || '' : parsedName.base
        );

        // Use frontmatter id if present, otherwise generate from slug.
        // Translations MUST set their `id` in frontmatter to match the source —
        // otherwise the slug-derived fallback would still match because the slug
        // is identical, but we recommend setting it explicitly.
        const id = (parsed.data.id as string | undefined) || slug.replace(/\//g, '-');

        // Determine parentId: prefer frontmatter, then derive from folder structure.
        // For translations of folder index articles, use the registered (en) parent id.
        let parentId = parsed.data.parentId as string | null | undefined;
        if (parentId === undefined && parentPath) {
          parentId = folderArticleIds.get(parentPath) || null;
        }

        // Register this article's ID for its path so children can find their parent.
        // Only the default-locale `_index.md` registers (translations should have
        // matching ids, so it doesn't matter which one wins).
        if (isIndex && relativePath && parsedName.lang === DEFAULT_LOCALE) {
          folderArticleIds.set(relativePath, id);
        }

        items.push({
          ...parsed.data,
          id,
          slug,
          parentId,
          order: (parsed.data.order as number | undefined) ?? orderFromPrefix ?? 0,
          filePath: fullPath,
          lang: (parsed.data.lang as string | undefined) ?? parsedName.lang
        });
      } catch (error) {
        console.warn(`[content] Failed to parse article ${fullPath}:`, error);
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

/**
 * Read an article's body, preferring the requested locale and falling back to
 * the default locale source if no translation exists.
 *
 * Returns `lang` (the locale actually served) and `isFallback` (true when the
 * served body is the default-locale source). UI uses `isFallback` to render
 * the "Available in English only" banner.
 */
export async function readArticleBody(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<ArticleBody | null> {
  const articles = await readArticleMeta();

  // Find candidates by slug; prefer the requested locale, fall back to default.
  const candidates = articles.filter((a) => a.slug === slug);
  const requested = candidates.find((a) => a.lang === locale);
  const fallback = candidates.find((a) => a.lang === DEFAULT_LOCALE);
  const chosen = requested ?? fallback;

  if (chosen?.filePath) {
    try {
      const raw = await fs.readFile(chosen.filePath as string, 'utf8');
      const parsed = matter(raw);
      const compiled = await compile(parsed.content, mdsvexOptions);

      return {
        slug,
        body: compiled?.code || parsed.content,
        data: parsed.data,
        filePath: chosen.filePath as string,
        lang: chosen.lang ?? DEFAULT_LOCALE,
        isFallback: chosen !== requested && locale !== DEFAULT_LOCALE
      };
    } catch (error) {
      console.warn(`[content] Failed to read article file ${chosen.filePath}:`, error);
    }
  }

  // Fallback for slugs that might not be in the meta scan yet (e.g. newly created).
  // Only honors default-locale paths since this is a recovery branch.
  const possiblePaths = [
    resolvePath('articles', `${slug}.md`),
    resolvePath('articles', slug, '_index.md')
  ];

  for (const filePath of possiblePaths) {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = matter(raw);
      const compiled = await compile(parsed.content, mdsvexOptions);

      return {
        slug,
        body: compiled?.code || parsed.content,
        data: parsed.data,
        filePath,
        lang: DEFAULT_LOCALE,
        isFallback: locale !== DEFAULT_LOCALE
      };
    } catch {
      // Try next path
    }
  }

  console.warn(`[content] Failed to load article body for slug "${slug}" (locale=${locale})`);
  return null;
}

export async function compileMarkdown(markdown: string): Promise<string> {
  try {
    const compiled = await compile(markdown, mdsvexOptions);
    return compiled?.code || markdown;
  } catch (error) {
    console.warn('[content] Failed to compile markdown:', error);
    return markdown;
  }
}
