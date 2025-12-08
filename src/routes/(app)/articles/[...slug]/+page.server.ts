import { readArticleBody } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const article = await readArticleBody(params.slug);
  
  return {
    body: article?.body || null
  };
};
