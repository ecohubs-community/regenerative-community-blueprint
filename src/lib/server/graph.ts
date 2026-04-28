import { readArticleMeta, type ArticleMeta } from './content';
import { DEFAULT_LOCALE } from '$lib/i18n/languages';

/**
 * Unified Article — the single content type in the system.
 * Articles can have parent-child relationships forming a tree hierarchy.
 *
 * `lang`              — locale of the served metadata (may be DEFAULT_LOCALE on fallback).
 * `availableLocales`  — every locale this article exists in (for hreflang / switcher dimming).
 * `isFallback`        — true if the requested locale was not the served one.
 */
export type Article = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  icon?: string;
  parentId?: string | null;
  order?: number;
  children: Article[];
  tags?: string[];
  attachments?: { file: string; caption?: string }[];
  lang: string;
  availableLocales: string[];
  isFallback: boolean;
};

export type ArticleTree = Article[];

export type Graph = {
  articles: Article[];
  articleTree: ArticleTree;
  locale: string;
};

/**
 * Build the article graph for a given locale.
 *
 * Strategy: read every article × every locale, group by `id`, and for each
 * article pick the entry in `locale` if it exists, otherwise the default-locale
 * entry. Structural fields (slug, parentId, order) come from the *source*
 * article — translations never override structure, so the tree shape stays
 * stable across locales.
 *
 * `availableLocales` is computed per article from the set of files actually
 * present, so the language switcher can dim locales without translations.
 */
export async function buildGraph(locale: string = DEFAULT_LOCALE): Promise<Graph> {
  const rawArticles = await readArticleMeta();

  // Group entries by id. Each group has up to one entry per locale.
  const groups = new Map<string, Map<string, ArticleMeta>>();
  for (const entry of rawArticles) {
    const id = (entry.id as string) || entry.slug;
    if (!groups.has(id)) groups.set(id, new Map());
    groups.get(id)!.set(entry.lang ?? DEFAULT_LOCALE, entry);
  }

  // Resolve each group to an Article in the requested locale (with fallback).
  const articleMap = new Map<string, Article>();
  for (const [id, byLang] of groups) {
    const source = byLang.get(DEFAULT_LOCALE);
    if (!source) {
      // No default-locale source — use whichever exists. This shouldn't normally
      // happen (translations require a source) but we degrade gracefully.
      const first = byLang.values().next().value;
      if (!first) continue;
      articleMap.set(id, toArticle(first, [...byLang.keys()], false));
      continue;
    }

    const requested = byLang.get(locale);
    const chosen = requested ?? source;
    const isFallback = !requested && locale !== DEFAULT_LOCALE;

    // Translations carry localized title/summary but inherit structural fields
    // (slug, parentId, order) from the source — that way moving an article in
    // English moves all translations too.
    const merged: ArticleMeta = {
      ...source,
      title: chosen.title ?? source.title,
      summary: chosen.summary ?? source.summary,
      lang: chosen.lang ?? DEFAULT_LOCALE,
      filePath: chosen.filePath
    };

    articleMap.set(id, toArticle(merged, [...byLang.keys()].sort(), isFallback));
  }

  const articleTree = buildTree(articleMap);
  const articles = flattenArticleTree(articleTree);

  return { articles, articleTree, locale };
}

function toArticle(entry: ArticleMeta, availableLocales: string[], isFallback: boolean): Article {
  return {
    id: (entry.id as string) || entry.slug,
    slug: entry.slug,
    title: coerceTitle(entry.title, entry.slug),
    summary: coerceOptionalString(entry.summary),
    icon: coerceOptionalString(entry.icon),
    parentId: entry.parentId as string | null | undefined,
    order: coerceOptionalNumber(entry.order),
    children: [],
    tags: normalizeList(entry.tags),
    attachments: Array.isArray(entry.attachments) ? entry.attachments : undefined,
    lang: entry.lang ?? DEFAULT_LOCALE,
    availableLocales,
    isFallback
  };
}

function buildTree(articleMap: Map<string, Article>): ArticleTree {
  const rootArticles: Article[] = [];
  articleMap.forEach((article) => {
    if (article.parentId && articleMap.has(article.parentId)) {
      const parent = articleMap.get(article.parentId)!;
      parent.children.push(article);
    } else {
      rootArticles.push(article);
    }
  });
  sortArticles(rootArticles);
  return rootArticles;
}

/**
 * Build the unified article tree directly (kept for compatibility with callers
 * that don't need the flat list).
 */
export async function buildArticleTree(locale: string = DEFAULT_LOCALE): Promise<ArticleTree> {
  return (await buildGraph(locale)).articleTree;
}

/**
 * Flatten article tree into a flat array
 */
function flattenArticleTree(tree: ArticleTree): Article[] {
  const result: Article[] = [];

  function traverse(articles: Article[]) {
    for (const article of articles) {
      result.push(article);
      if (article.children.length > 0) {
        traverse(article.children);
      }
    }
  }

  traverse(tree);
  return result;
}

/**
 * Sort articles recursively by order, then by title
 */
function sortArticles(articles: Article[]) {
  articles.sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return a.title.localeCompare(b.title);
  });
  articles.forEach((article) => {
    if (article.children.length > 0) {
      sortArticles(article.children);
    }
  });
}

// Helper functions
function coerceTitle(value: unknown, fallback: string) {
  const str = coerceOptionalString(value) ?? fallback;
  return str.trim() || fallback;
}

function coerceOptionalString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  }
  return undefined;
}

function coerceOptionalNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  return undefined;
}

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item): item is string => Boolean(item));
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
}
