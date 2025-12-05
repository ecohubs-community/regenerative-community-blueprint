import { readArticleBody } from '$lib/server/content';
import { buildGraph } from '$lib/server/graph';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const [article, graph] = await Promise.all([
    readArticleBody(params.articleSlug!),
    buildGraph()
  ]);
  if (!article) {
    throw new Error('Article not found');
  }
  return { article, graph };
};
