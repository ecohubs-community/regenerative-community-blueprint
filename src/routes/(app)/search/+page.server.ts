import { buildGraph } from '$lib/server/graph';
import { readArticleBody } from '$lib/server/content';
import MiniSearch from 'minisearch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const graph = await buildGraph();

  const documents = [
    ...graph.domains.map((d) => ({ id: d.id, type: 'domain' as const, slug: d.slug, title: d.title, body: d.description ?? '' })),
    ...graph.topics.map((t) => ({ id: t.id, type: 'topic' as const, slug: t.slug, title: t.title, body: t.description ?? '' })),
    ...graph.modules.map((m) => ({ id: m.id, type: 'module' as const, slug: m.slug, title: m.title, body: m.description ?? '' })),
    ...await Promise.all(
      graph.articles.map(async (a) => {
        const article = await readArticleBody(a.slug);
        const snippet = article?.body ? article.body.slice(0, 300).replace(/\n/g, ' ') : '';
        return {
          id: a.id,
          type: 'article' as const,
          slug: a.slug,
          title: a.title,
          body: [a.summary ?? '', snippet].join(' '),
          climate: a.climate,
          budget: a.budget,
          size: a.size
        };
      })
    )
  ];

  const miniSearch = new MiniSearch({
    fields: ['title', 'body'],
    storeFields: ['id', 'type', 'slug', 'title', 'climate', 'budget', 'size'],
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
