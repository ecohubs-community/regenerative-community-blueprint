import type { Graph, Article, ArticleTree } from '$lib/server/graph';
import { writable, derived } from 'svelte/store';

// Main graph store
export const graph = writable<Graph>();

// Flat list of all articles
export const articles = derived(graph, ($graph) => $graph?.articles ?? []);

// Hierarchical article tree
export const articleTree = derived(graph, ($graph) => $graph?.articleTree ?? []);

// Lookup article by slug
export const articleBySlug = derived(articles, ($articles) => {
  const map = new Map<string, Article>();
  for (const a of $articles) map.set(a.slug, a);
  return map;
});

// Lookup article by ID
export const articleById = derived(articles, ($articles) => {
  const map = new Map<string, Article>();
  for (const a of $articles) map.set(a.id, a);
  return map;
});

// Get root-level articles (no parent)
export const rootArticles = derived(articles, ($articles) => 
  $articles.filter(a => !a.parentId)
);

// Helper function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  let value: Article | undefined;
  articleBySlug.subscribe((map) => (value = map.get(slug)))();
  return value;
}

// Helper function to get article by ID
export function getArticleById(id: string): Article | undefined {
  let value: Article | undefined;
  articleById.subscribe((map) => (value = map.get(id)))();
  return value;
}

// Helper function to get children of an article
export function getChildArticles(parentId: string): Article[] {
  let children: Article[] = [];
  articles.subscribe(($articles) => {
    children = $articles.filter(a => a.parentId === parentId);
  })();
  return children;
}

// Helper function to get parent of an article
export function getParentArticle(article: Article): Article | undefined {
  if (!article.parentId) return undefined;
  return getArticleById(article.parentId);
}

// Helper function to get breadcrumb path for an article
export function getArticleBreadcrumbs(article: Article): Article[] {
  const breadcrumbs: Article[] = [];
  let current: Article | undefined = article;
  
  while (current) {
    breadcrumbs.unshift(current);
    current = current.parentId ? getArticleById(current.parentId) : undefined;
  }
  
  return breadcrumbs;
}
