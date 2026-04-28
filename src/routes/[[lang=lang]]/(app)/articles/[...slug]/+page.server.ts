import { buildGraph } from '$lib/server/graph';
import { readArticleBody } from '$lib/server/content';
import { getArticleDownloads } from '$lib/server/downloads';
import { DEFAULT_LOCALE } from '$lib/i18n/languages';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
  // Use the default-locale graph for entry enumeration. Non-default locale
  // routes are reached via crawling from links emitted by LanguageSwitcher,
  // which the prerender crawler follows automatically.
  const graph = await buildGraph(DEFAULT_LOCALE);
  return graph.articles.map((article) => ({ slug: article.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const locale = params.lang ?? DEFAULT_LOCALE;
  const article = await readArticleBody(params.slug, locale);
  const downloads = getArticleDownloads(params.slug, locale);

  // Look up the article in the locale-specific graph so the page can render at
  // SSR without depending on the client-side store. Also yields availableLocales
  // (which locales this article actually exists in — drives switcher dimming
  // and SEO hreflang alternates) and the resolved children list (locale-aware).
  const graph = await buildGraph(locale);
  const meta = graph.articles.find((a) => a.slug === params.slug);
  const breadcrumbs = meta ? buildBreadcrumbs(graph.articles, meta.id) : [];
  const parent = meta?.parentId ? graph.articles.find((a) => a.id === meta.parentId) : undefined;

  return {
    article: meta ?? null,
    breadcrumbs,
    parent: parent ?? null,
    body: article?.body || null,
    bodyLang: article?.lang ?? locale,
    bodyIsFallback: article?.isFallback ?? false,
    downloads,
    availableLocales: meta?.availableLocales ?? [DEFAULT_LOCALE]
  };
};

function buildBreadcrumbs(
  all: Array<{ id: string; slug: string; title: string; parentId?: string | null }>,
  startId: string
) {
  const byId = new Map(all.map((a) => [a.id, a] as const));
  const out: Array<{ id: string; slug: string; title: string }> = [];
  let cur = byId.get(startId);
  while (cur) {
    out.unshift({ id: cur.id, slug: cur.slug, title: cur.title });
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }
  return out;
}
