<script lang="ts">
  import { page } from '$app/state';
  import { articleTree } from '$lib/stores/graph';
  import Icon from '@iconify/svelte';
  import type { Article } from '$lib/server/graph';
  import { untrack } from 'svelte';

  // Optional props
  interface Props {
    maxDepth?: number;
  }

  const props: Props = $props();
  const maxDepth = $derived(props.maxDepth ?? 4);

  // Track expanded state for each article
  let expandedIds = $state<Set<string>>(new Set());

  // Auto-expand parents when the active article changes
  $effect(() => {
    const currentPath = page.url.pathname;
    const tree = $articleTree;
    
    if (currentPath.startsWith('/articles/')) {
      const slug = currentPath.replace('/articles/', '');
      untrack(() => {
        const parentIds = getParentIds(tree, slug);
        if (parentIds) {
          let changed = false;
          parentIds.forEach(id => {
            if (!expandedIds.has(id)) {
              expandedIds.add(id);
              changed = true;
            }
          });
          if (changed) {
            expandedIds = new Set(expandedIds);
          }
        }
      });
    }
  });

  function getParentIds(nodes: Article[], targetSlug: string, parents: string[] = []): string[] | null {
    for (const node of nodes) {
      if (node.slug === targetSlug) {
        return parents;
      }
      if (node.children.length > 0) {
        const result = getParentIds(node.children, targetSlug, [...parents, node.id]);
        if (result) return result;
      }
    }
    return null;
  }

  function toggleExpanded(id: string) {
    if (expandedIds.has(id)) {
      expandedIds.delete(id);
    } else {
      expandedIds.add(id);
    }
    expandedIds = new Set(expandedIds);
  }

  function expandAll() {
    const allIds = new Set<string>();
    function collect(nodes: Article[]) {
      for (const node of nodes) {
        if (node.children.length > 0) {
          allIds.add(node.id);
          collect(node.children);
        }
      }
    }
    collect($articleTree);
    expandedIds = allIds;
  }

  function collapseAll() {
    expandedIds = new Set();
  }

  function isActive(slug: string): boolean {
    return page.url.pathname === `/articles/${slug}`;
  }
</script>

<nav class="space-y-1">
  <div class="mb-4 space-y-2">
    <a 
      href="/articles" 
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors {page.url.pathname === '/articles' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}"
    >
      <Icon icon="tabler:home" class="w-4 h-4" />
      All Articles
    </a>

    {#if $articleTree.length > 0}
      <div class="flex items-center gap-2 px-3 text-xs">
        <button
          type="button"
          onclick={expandAll}
          class="text-text-tertiary hover:text-text-secondary transition-colors"
        >
          Expand all
        </button>
        <span class="text-border">|</span>
        <button
          type="button"
          onclick={collapseAll}
          class="text-text-tertiary hover:text-text-secondary transition-colors"
        >
          Collapse all
        </button>
      </div>
    {/if}
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
  {@const isExpanded = hasChildren && expandedIds.has(node.id)}

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
