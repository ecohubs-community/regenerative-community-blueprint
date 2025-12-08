<script lang="ts">
  import { page } from '$app/state';
  import { articleTree } from '$lib/stores/graph';
  import Icon from '@iconify/svelte';
  import type { Article } from '$lib/server/graph';

  // Optional props
  interface Props {
    maxDepth?: number;
  }

  const props: Props = $props();
  const maxDepth = $derived(props.maxDepth ?? 4);

  // Track expanded state for each article
  let expandedIds = $state<Set<string>>(new Set());

  function toggleExpanded(id: string) {
    if (expandedIds.has(id)) {
      expandedIds.delete(id);
    } else {
      expandedIds.add(id);
    }
    expandedIds = new Set(expandedIds);
  }

  function isActive(slug: string): boolean {
    return page.url.pathname === `/articles/${slug}`;
  }

  function isParentOfActive(article: Article): boolean {
    const currentPath = page.url.pathname;
    if (!currentPath.startsWith('/articles/')) return false;
    
    function checkChildren(node: Article): boolean {
      if (currentPath === `/articles/${node.slug}`) return true;
      return node.children.some((child: Article) => checkChildren(child));
    }
    
    return article.children.some((child: Article) => checkChildren(child));
  }
</script>

<nav class="space-y-1">
  <div class="mb-4">
    <a 
      href="/articles" 
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors {page.url.pathname === '/articles' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}"
    >
      <Icon icon="tabler:home" class="w-4 h-4" />
      All Articles
    </a>
  </div>

  {#if $articleTree.length > 0}
    <div class="space-y-0.5">
      {#each $articleTree as article}
        {@render NavItem({ node: article, level: 0 })}
      {/each}
    </div>
  {:else}
    <div class="px-3 py-4 text-sm text-text-tertiary text-center">
      No articles yet
    </div>
  {/if}
</nav>

{#snippet NavItem({ node, level }: { node: Article; level: number })}
  {@const hasChildren = node.children.length > 0}
  {@const isExpanded = hasChildren && (expandedIds.has(node.id) || isParentOfActive(node))}

  <div>
    <div class="flex items-center">
      {#if hasChildren && level < maxDepth}
        <button
          onclick={() => toggleExpanded(node.id)}
          class="p-1 rounded hover:bg-surface-hover text-text-tertiary"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <Icon 
            icon={isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right'} 
            class="w-4 h-4 transition-transform -ml-1" 
          />
        </button>
      {:else}
        <span class="w-5"></span>
      {/if}
      
      <a
        href="/articles/{node.slug}"
        class={`flex-1 min-w-0 flex items-center gap-2 px-2 ${level === 0 ? 'py-1.5' : 'py-1'} text-sm rounded-lg transition-colors ${isActive(node.slug) ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}`}
      >
        <Icon icon={node.icon || 'tabler:file-text'} class="w-4 h-4 min-w-4 max-w-4" />
        <span class="truncate">{node.title}</span>
      </a>
    </div>

    {#if hasChildren && isExpanded && level < maxDepth}
      <div class="ml-2 pl-4 border-l border-border mt-0.5 space-y-0.5">
        {#each node.children as child}
          {@render NavItem({ node: child, level: level + 1 })}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}
