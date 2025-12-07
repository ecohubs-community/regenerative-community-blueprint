import { readArticleMeta } from './content';

/**
 * Unified Article - the single content type in the new system
 * Articles can have parent-child relationships forming a tree hierarchy
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
  climate?: string[];
  budget?: string[];
  size?: string[];
  tags?: string[];
  attachments?: { file: string; caption?: string }[];
};

export type ArticleTree = Article[];

export type Graph = {
  articles: Article[];
  articleTree: ArticleTree;
};

/**
 * Build the unified article graph with tree structure
 */
export async function buildGraph(): Promise<Graph> {
  const articleTree = await buildArticleTree();
  const articles = flattenArticleTree(articleTree);
  
  return {
    articles,
    articleTree
  };
}

/**
 * Build a unified article tree from articles with parentId relationships
 */
export async function buildArticleTree(): Promise<ArticleTree> {
  const rawArticles = await readArticleMeta();
  
  const articleMap = new Map<string, Article>();
  
  // First pass: create all article nodes
  for (const entry of rawArticles) {
    const id = entry.id || entry.slug;
    const article: Article = {
      id,
      slug: entry.slug,
      title: coerceTitle(entry.title, entry.slug),
      summary: coerceOptionalString(entry.summary),
      icon: coerceOptionalString(entry.icon),
      parentId: entry.parentId as string | null | undefined,
      order: coerceOptionalNumber(entry.order),
      children: [],
      climate: normalizeList(entry.climate),
      budget: normalizeList(entry.budget),
      size: normalizeList(entry.size),
      tags: normalizeList(entry.tags),
      attachments: Array.isArray(entry.attachments) ? entry.attachments : undefined
    };
    articleMap.set(id, article);
  }
  
  // Second pass: build tree structure
  const rootArticles: Article[] = [];
  
  articleMap.forEach((article) => {
    if (article.parentId && articleMap.has(article.parentId)) {
      const parent = articleMap.get(article.parentId)!;
      parent.children.push(article);
    } else {
      rootArticles.push(article);
    }
  });
  
  // Sort by order, then by title
  sortArticles(rootArticles);
  return rootArticles;
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
  articles.forEach(article => {
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
