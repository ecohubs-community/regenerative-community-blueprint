import { writable, derived } from 'svelte/store';
import MiniSearch from 'minisearch';

export type SearchResult = {
  id: string;
  slug: string;
  title: string;
  snippet?: string;
  meta?: string;
  parentId?: string | null;
};

export const searchIndex = writable<MiniSearch<SearchResult>>();
export const query = writable('');
export const results = writable<SearchResult[]>([]);
export const status = writable<'idle' | 'loading' | 'ready'>('idle');

// Keep as alias for backwards compatibility with SearchResults component
export const filteredResults = results;

export function setQuery(q: string) {
  query.set(q);
  runSearch();
}

function runSearch() {
  let idx: MiniSearch<SearchResult> | undefined;
  searchIndex.subscribe((v) => (idx = v))();

  let q: string | undefined;
  query.subscribe((v) => (q = v))();

  if (!idx) {
    results.set([]);
    status.set('idle');
    return;
  }

  if (!q?.trim()) {
    results.set([]);
    status.set('ready');
    return;
  }

  status.set('loading');
  const raw = idx.search(q, { fuzzy: 0.2, prefix: true });
  const mapped: SearchResult[] = raw.map((doc) => ({
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    snippet: doc.snippet,
    meta: doc.meta,
    parentId: doc.parentId
  }));
  results.set(mapped);
  status.set('ready');
}
