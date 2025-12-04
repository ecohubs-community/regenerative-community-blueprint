import { buildGraph } from '$lib/server/graph';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
  const graph = await buildGraph();
  return { graph };
};
