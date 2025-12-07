import { writable, derived } from 'svelte/store';
import MiniSearch from 'minisearch';

export type SearchResult = {
  id: string;
  slug: string;
  title: string;
  snippet?: string;
  meta?: string;
  parentId?: string | null;
  climate?: string[];
  budget?: string[];
  size?: string[];
};

export const searchIndex = writable<MiniSearch<SearchResult>>();
export const query = writable('');
export const filters = writable({
  climate: new Set<string>(),
  budget: new Set<string>(),
  size: new Set<string>()
});
export const results = writable<SearchResult[]>([]);
export const status = writable<'idle' | 'loading' | 'ready'>('idle');

export const hasActiveFilters = derived(
  filters,
  ($filters) => $filters.climate.size + $filters.budget.size + $filters.size.size > 0
);

export const filteredResults = derived(
  [results, filters],
  ([$results, $filters]) =>
    $results.filter((r) => {
      return (
        ($filters.climate.size === 0 || r.climate?.some((c) => $filters.climate.has(c))) &&
        ($filters.budget.size === 0 || r.budget?.some((b) => $filters.budget.has(b))) &&
        ($filters.size.size === 0 || r.size?.some((s) => $filters.size.has(s)))
      );
    })
);

export function setQuery(q: string) {
  query.set(q);
  runSearch();
}

export function toggleFilter(type: 'climate' | 'budget' | 'size', value: string) {
  filters.update(($filters) => {
    const set = $filters[type];
    if (set.has(value)) set.delete(value);
    else set.add(value);
    return { ...$filters, [type]: set };
  });
  runSearch();
}

export function clearFilters() {
  filters.set({
    climate: new Set(),
    budget: new Set(),
    size: new Set()
  });
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
    parentId: doc.parentId,
    climate: doc.climate,
    budget: doc.budget,
    size: doc.size
  }));
  results.set(mapped);
  status.set('ready');
}
