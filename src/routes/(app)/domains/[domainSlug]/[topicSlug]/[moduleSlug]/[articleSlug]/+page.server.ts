import { readArticleBody } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const article = await readArticleBody(params.articleSlug!);
  if (!article) {
    throw new Error('Article not found');
  }
  return { article };
};
