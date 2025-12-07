<script lang="ts">
  import { articles, rootArticles, articleTree } from '$lib/stores/graph';
  import Card from '$lib/components/common/Card.svelte';
  import Icon from '@iconify/svelte';
  import type { Article } from '$lib/server/graph';

  // Recursive component to render article tree
  function getChildCount(article: Article): number {
    let count = article.children.length;
    for (const child of article.children) {
      count += getChildCount(child);
    }
    return count;
  }
</script>

<svelte:head>
  <title>Articles - Regenerative Community Blueprint</title>
</svelte:head>

<div class="space-y-8 pb-12">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-text-primary">All Articles</h1>
      <p class="text-text-secondary mt-2">Browse all knowledge articles organized hierarchically</p>
    </div>
    <div class="text-sm text-text-tertiary">
      {$articles.length} articles total
    </div>
  </div>

  <!-- Root Level Articles -->
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each $rootArticles as article}
      {@const totalChildren = getChildCount(article)}
      
      <Card href="/articles/{article.slug}" class="h-full flex flex-col">
        <div class="mb-4">
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-light/20 text-primary-dark">
            <span class="font-bold font-serif">{article.title.charAt(0)}</span>
          </span>
        </div>
        <h3 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p class="text-text-secondary mb-4 flex-1 line-clamp-3">
          {article.summary || ''}
        </p>
        
        {#if totalChildren > 0}
          <div class="pt-4 mt-auto border-t border-border flex items-center gap-2 text-xs font-medium text-text-tertiary">
            <Icon icon="tabler:hierarchy" class="w-4 h-4" />
            <span>{totalChildren} sub-article{totalChildren !== 1 ? 's' : ''}</span>
          </div>
        {/if}
      </Card>
    {/each}
  </div>

  {#if $rootArticles.length === 0}
    <div class="text-center py-16">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon icon="tabler:file-text" class="w-8 h-8 text-gray-400" />
      </div>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">No articles yet</h2>
      <p class="text-gray-500">Articles will appear here once they are created.</p>
    </div>
  {/if}
</div>
