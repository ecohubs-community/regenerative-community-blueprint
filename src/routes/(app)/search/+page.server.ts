import { buildGraph } from '$lib/server/graph';
import { readArticleBody } from '$lib/server/content';
import MiniSearch from 'minisearch';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
  const graph = await buildGraph();

  const documents = await Promise.all(
    graph.articles.map(async (a) => {
      const article = await readArticleBody(a.slug);
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
