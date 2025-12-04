<script lang="ts">
  import { page } from '$app/stores';
  import type { SearchResult } from '$lib/stores/search';

  let { result } = $props();

  function hrefForResult(r: SearchResult) {
    switch (r.type) {
      case 'domain':
        return `/domains/${r.slug}`;
      case 'topic':
        return `/domains/${$page.params.domainSlug}/${r.slug}`;
      case 'module':
        return `/domains/${$page.params.domainSlug}/${$page.params.topicSlug}/${r.slug}`;
      case 'article':
        return `/domains/${$page.params.domainSlug}/${$page.params.topicSlug}/${$page.params.moduleSlug}/${r.slug}`;
      default:
        return '#';
    }
  }

  function typeLabel(r: SearchResult) {
    switch (r.type) {
      case 'domain':
        return 'Domain';
      case 'topic':
        return 'Topic';
      case 'module':
        return 'Module';
      case 'article':
        return 'Article';
      default:
        return '';
    }
  }
</script>

<a href={hrefForResult(result)} class="block glass-card p-lg rounded-xl transition-all hover:translate-y-[-2px] hover:shadow-lg">
  <div class="flex items-start justify-between mb-2">
    <h3 class="text-lg font-semibold text-primary">{result.title}</h3>
    <span class="text-xs px-2 py-1 rounded-full bg-surface text-tertiary">
      {typeLabel(result)}
    </span>
  </div>
  {#if result.snippet}
    <p class="text-sm text-secondary mb-2">{@html result.snippet}</p>
  {/if}
  {#if result.meta}
    <p class="text-xs text-tertiary">{result.meta}</p>
  {/if}
</a>
