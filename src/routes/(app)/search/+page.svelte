<script lang="ts">
  import { page } from '$app/stores';
  import { searchIndex, setQuery } from '$lib/stores/search';
  import { onMount } from 'svelte';
  import MiniSearch from 'minisearch';
  import type { SearchResult } from '$lib/stores/search';
  import SearchFilters from '$lib/components/search/SearchFilters.svelte';
  import SearchResults from '$lib/components/search/SearchResults.svelte';

  let { data } = $props();

  onMount(() => {
    const idx = MiniSearch.loadJSON(JSON.stringify(data.searchIndex), {
      fields: ['title', 'body'],
      storeFields: ['id', 'type', 'slug', 'title', 'climate', 'budget', 'size'],
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: { title: 2 }
      }
    }) as MiniSearch<SearchResult>;
    searchIndex.set(idx);
    const q = $page.url.searchParams.get('q') ?? '';
    setQuery(q);
  });
</script>

<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-bold text-gradient">Search</h1>
    <p class="text-text-secondary">Results for: <strong>{$page.url.searchParams.get('q') || '(empty)'}</strong></p>
  </header>

  <SearchFilters />
  <SearchResults />
</section>
