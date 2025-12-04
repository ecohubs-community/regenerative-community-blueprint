import type { Graph, Domain, Topic, Module, Article } from '$lib/server/graph';
import { writable, derived } from 'svelte/store';

export const graph = writable<Graph>();
export const domains = derived(graph, ($graph) => $graph?.domains ?? []);
export const topics = derived(graph, ($graph) => $graph?.topics ?? []);
export const modules = derived(graph, ($graph) => $graph?.modules ?? []);
export const articles = derived(graph, ($graph) => $graph?.articles ?? []);

export const domainBySlug = derived(domains, ($domains) => {
  const map = new Map<string, Domain>();
  for (const d of $domains) map.set(d.slug, d);
  return map;
});

export const topicBySlug = derived(topics, ($topics) => {
  const map = new Map<string, Topic>();
  for (const t of $topics) map.set(t.slug, t);
  return map;
});

export const moduleBySlug = derived(modules, ($modules) => {
  const map = new Map<string, Module>();
  for (const m of $modules) map.set(m.slug, m);
  return map;
});

export const articleBySlug = derived(articles, ($articles) => {
  const map = new Map<string, Article>();
  for (const a of $articles) map.set(a.slug, a);
  return map;
});

export const domainTree = derived([domains, topics, modules], ([$domains, $topics, $modules]) => {
  return $domains.map((domain) => ({
    ...domain,
    topics: domain.topicIds
      .map((tid) => $topics.find((t) => t.id === tid))
      .filter((t): t is Topic => Boolean(t))
      .map((topic) => ({
        ...topic,
        modules: topic.moduleIds
          .map((mid) => $modules.find((m) => m.id === mid))
          .filter((m): m is Module => Boolean(m))
      }))
  }));
});

export function getDomainBySlug(slug: string) {
  let value: Domain | undefined;
  domainBySlug.subscribe((map) => (value = map.get(slug)))();
  return value;
}

export function getTopicBySlug(slug: string) {
  let value: Topic | undefined;
  topicBySlug.subscribe((map) => (value = map.get(slug)))();
  return value;
}

export function getModuleBySlug(slug: string) {
  let value: Module | undefined;
  moduleBySlug.subscribe((map) => (value = map.get(slug)))();
  return value;
}

export function getArticleBySlug(slug: string) {
  let value: Article | undefined;
  articleBySlug.subscribe((map) => (value = map.get(slug)))();
  return value;
}
