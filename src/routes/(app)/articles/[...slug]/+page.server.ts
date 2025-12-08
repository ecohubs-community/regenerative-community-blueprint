import { buildGraph } from '$lib/server/graph';
import { readArticleBody } from '$lib/server/content';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
  const graph = await buildGraph();
  // Generate params for every article so SvelteKit can prerender /articles/[...slug]
  return graph.articles.map((article) => ({ slug: article.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const article = await readArticleBody(params.slug);
  
  return {
    body: article?.body || null
  };
};
