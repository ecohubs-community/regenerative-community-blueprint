<script lang="ts">
  import type { SearchResult } from '$lib/stores/search';

  let { result } = $props();

  function hrefForResult(r: SearchResult) {
    return `/articles/${r.slug}`;
  }
</script>

<a href={hrefForResult(result)} class="block glass-card p-lg rounded-xl transition-all hover:translate-y-[-2px] hover:shadow-lg">
  <div class="flex items-start justify-between mb-2">
    <h3 class="text-lg font-semibold text-primary">{result.title}</h3>
    <span class="text-xs px-2 py-1 rounded-full bg-surface text-tertiary">
      Article
    </span>
  </div>
  {#if result.snippet}
    <p class="text-sm text-secondary mb-2">{@html result.snippet}</p>
  {/if}
  {#if result.meta}
    <p class="text-xs text-tertiary">{result.meta}</p>
  {/if}
</a>
