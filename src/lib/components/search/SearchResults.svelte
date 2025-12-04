<script lang="ts">
  import { filteredResults, status, query } from '$lib/stores/search';
  import SearchResultCard from './SearchResultCard.svelte';
</script>

<div class="space-y-6">
  {#if $status === 'loading'}
    <p class="text-text-secondary">Searching…</p>
  {:else if $query.trim() && $filteredResults.length === 0}
    <p class="text-text-secondary">No results found.</p>
  {:else if $filteredResults.length > 0}
    <div class="space-y-4">
      {#each $filteredResults as result}
        <SearchResultCard {result} />
      {/each}
    </div>
  {/if}
</div>
