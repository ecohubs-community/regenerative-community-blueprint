<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { searchIndex, setQuery, query } from '$lib/stores/search';
  import { onMount } from 'svelte';
  import MiniSearch from 'minisearch';
  import type { SearchResult } from '$lib/stores/search';
  import SearchResults from '$lib/components/search/SearchResults.svelte';
  import SEO from '$lib/components/seo/SEO.svelte';

  let { data } = $props();

  onMount(() => {
    const idx = MiniSearch.loadJSON(JSON.stringify(data.searchIndex), {
      fields: ['title', 'body'],
      storeFields: ['id', 'slug', 'title', 'parentId'],
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: { title: 2 }
      }
    }) as MiniSearch<SearchResult>;
    searchIndex.set(idx);
  });

  $effect(() => {
    if (!browser) return;
    const q = $page.url.searchParams.get('q') ?? '';
    setQuery(q);
  });
</script>

<SEO title="Search" url="/search" noindex={true} locale={data.locale} />

<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-bold text-gradient">Search</h1>
    <p class="text-text-secondary">Results for: <strong>{$query || '(empty)'}</strong></p>
  </header>

  <SearchResults />
</section>
