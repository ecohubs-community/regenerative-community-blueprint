import { readArticleMeta, readJsonCollection, type ArticleMeta, type JsonEntry } from './content';

type DomainData = {
  title?: string;
  description?: string;
  order?: number;
};

type TopicData = {
  title?: string;
  domain?: string;
  description?: string;
  order?: number;
};

type ModuleData = {
  title?: string;
  topic?: string;
  description?: string;
  order?: number;
};

type DomainJson = JsonEntry<DomainData>;
type TopicJson = JsonEntry<TopicData>;
type ModuleJson = JsonEntry<ModuleData>;

export type Domain = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  order?: number;
  topicIds: string[];
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  order?: number;
  domainId: string;
  moduleIds: string[];
};

export type Module = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  order?: number;
  topicId: string;
  articleIds: string[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  moduleIds: string[];
  topicIds: string[];
  domainIds: string[];
  climate: string[];
  budget: string[];
  size: string[];
  attachments?: { file: string; caption?: string }[];
};

export type RawGraph = {
  domains: DomainJson[];
  topics: TopicJson[];
  modules: ModuleJson[];
  articles: ArticleMeta[];
};

export type Graph = {
  domains: Domain[];
  topics: Topic[];
  modules: Module[];
  articles: Article[];
};

export async function loadRawGraph(): Promise<RawGraph> {
  const [domains, topics, modules, articles] = await Promise.all([
    readJsonCollection<DomainData>('domains'),
    readJsonCollection<TopicData>('topics'),
    readJsonCollection<ModuleData>('modules'),
    readArticleMeta()
  ]);

  return {
    domains: domains as DomainJson[],
    topics: topics as TopicJson[],
    modules: modules as ModuleJson[],
    articles
  };
}

export async function buildGraph(): Promise<Graph> {
  const raw = await loadRawGraph();

  const domains = new Map<string, Domain>();
  const domainTitleMap = new Map<string, string>();
  for (const entry of raw.domains) {
    const id = entry.slug;
    const title = coerceTitle(entry.title, id);
    const domain: Domain = {
      id,
      slug: entry.slug,
      title,
      description: coerceOptionalString(entry.description),
      order: coerceOptionalNumber(entry.order),
      topicIds: []
    };
    domains.set(id, domain);
    domainTitleMap.set(normalize(title), id);
  }

  const topics = new Map<string, Topic>();
  const topicTitleMap = new Map<string, string>();
  for (const entry of raw.topics) {
    const id = entry.slug;
    const title = coerceTitle(entry.title, id);
    const domainId = resolveByTitle(entry.domain, domainTitleMap);
    if (!domainId) {
      console.warn(`[graph] Topic "${title}" missing valid domain reference.`);
      continue;
    }

    const topic: Topic = {
      id,
      slug: entry.slug,
      title,
      description: coerceOptionalString(entry.description),
      order: coerceOptionalNumber(entry.order),
      domainId,
      moduleIds: []
    };
    topics.set(id, topic);
    topicTitleMap.set(normalize(title), id);
    domains.get(domainId)?.topicIds.push(id);
  }

  const modules = new Map<string, Module>();
  const moduleTitleMap = new Map<string, string>();
  for (const entry of raw.modules) {
    const id = entry.slug;
    const title = coerceTitle(entry.title, id);
    const topicId = resolveByTitle(entry.topic, topicTitleMap);
    if (!topicId) {
      console.warn(`[graph] Module "${title}" missing valid topic reference.`);
      continue;
    }

    const module: Module = {
      id,
      slug: entry.slug,
      title,
      description: coerceOptionalString(entry.description),
      order: coerceOptionalNumber(entry.order),
      topicId,
      articleIds: []
    };
    modules.set(id, module);
    moduleTitleMap.set(normalize(title), id);
    topics.get(topicId)?.moduleIds.push(id);
  }

  const articles: Article[] = [];
  for (const entry of raw.articles) {
    const id = entry.slug;
    const title = coerceTitle(entry.title, id);
    const moduleIds = normalizeList(entry.modules)
      .map((moduleTitle) => resolveByTitle(moduleTitle, moduleTitleMap))
      .filter((value): value is string => Boolean(value));

    const topicIds = dedupe(
      moduleIds
        .map((moduleId) => modules.get(moduleId)?.topicId)
        .filter((value): value is string => Boolean(value))
    );

    const domainIds = dedupe(
      topicIds
        .map((topicId) => topics.get(topicId)?.domainId)
        .filter((value): value is string => Boolean(value))
    );

    const article: Article = {
      id,
      slug: entry.slug,
      title,
      summary: coerceOptionalString(entry.summary),
      moduleIds,
      topicIds,
      domainIds,
      climate: normalizeList(entry.climate),
      budget: normalizeList(entry.budget),
      size: normalizeList(entry.size),
      attachments: Array.isArray(entry.attachments) ? entry.attachments : undefined
    };

    moduleIds.forEach((moduleId) => modules.get(moduleId)?.articleIds.push(id));
    articles.push(article);
  }

  return {
    domains: Array.from(domains.values()),
    topics: Array.from(topics.values()),
    modules: Array.from(modules.values()),
    articles
  };
}

function normalize(value?: string) {
  return (value ?? '').trim().toLowerCase();
}

function coerceTitle(value: unknown, fallback: string) {
  const str = coerceOptionalString(value) ?? fallback;
  return str.trim() || fallback;
}

function coerceOptionalString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  }
  return undefined;
}

function coerceOptionalNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  return undefined;
}

function resolveByTitle(value: unknown, map: Map<string, string>) {
  if (typeof value !== 'string') return undefined;
  const key = normalize(value);
  return key ? map.get(key) : undefined;
}

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item): item is string => Boolean(item));
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
}

function dedupe<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}
