import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { buildGraph } from '$lib/server/graph';

export const GET: RequestHandler = async () => {
  const graph = await buildGraph();
  return json(graph);
};