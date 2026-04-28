import { buildGraph } from '$lib/server/graph';
import { readArticleBody } from '$lib/server/content';
import { DEFAULT_LOCALE } from '$lib/i18n/languages';
import MiniSearch from 'minisearch';
import type { PageServerLoad } from './$types';

export const prerender = true;

/**
 * Build a per-locale search index. Article titles and bodies are pulled in the
 * requested locale (with default-locale fallback for untranslated articles, so
 * the full article set stays searchable on every locale).
 */
export const load: PageServerLoad = async ({ params }) => {
  const locale = params.lang ?? DEFAULT_LOCALE;
  const graph = await buildGraph(locale);

  const documents = await Promise.all(
    graph.articles.map(async (a) => {
      const article = await readArticleBody(a.slug, locale);
      const snippet = article?.body ? article.body.slice(0, 300).replace(/\n/g, ' ') : '';
      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        body: [a.summary ?? '', snippet].join(' '),
        parentId: a.parentId
      };
    })
  );

  const miniSearch = new MiniSearch({
    fields: ['title', 'body'],
    storeFields: ['id', 'slug', 'title', 'parentId'],
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
      boost: { title: 2 }
    }
  });

  miniSearch.addAll(documents);

  return {
    graph,
    searchIndex: miniSearch.toJSON()
  };
};
