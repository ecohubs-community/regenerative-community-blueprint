<script lang="ts">
  import { page } from '$app/state';
  import { articleTree } from '$lib/stores/graph';
  import Icon from '@iconify/svelte';
  import type { Article } from '$lib/server/graph';

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
        {@const hasChildren = article.children.length > 0}
        {@const isExpanded = expandedIds.has(article.id) || isParentOfActive(article)}
        
        <div>
          <div class="flex items-center">
            {#if hasChildren}
              <button
                onclick={() => toggleExpanded(article.id)}
                class="p-1 rounded hover:bg-surface-hover text-text-tertiary"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                <Icon 
                  icon={isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right'} 
                  class="w-4 h-4 transition-transform" 
                />
              </button>
            {:else}
              <span class="w-6"></span>
            {/if}
            
            <a
              href="/articles/{article.slug}"
              class="flex-1 flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors {isActive(article.slug) ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}"
            >
              <Icon icon={article.icon || 'tabler:file-text'} class="w-4 h-4 shrink-0" />
              <span class="truncate">{article.title}</span>
            </a>
          </div>

          {#if hasChildren && isExpanded}
            <div class="ml-4 pl-2 border-l border-border mt-0.5 space-y-0.5">
              {#each article.children as child}
                {@const childHasChildren = child.children.length > 0}
                {@const childIsExpanded = expandedIds.has(child.id) || isParentOfActive(child)}
                
                <div>
                  <div class="flex items-center">
                    {#if childHasChildren}
                      <button
                        onclick={() => toggleExpanded(child.id)}
                        class="p-1 rounded hover:bg-surface-hover text-text-tertiary"
                        aria-label={childIsExpanded ? 'Collapse' : 'Expand'}
                      >
                        <Icon 
                          icon={childIsExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right'} 
                          class="w-3 h-3 transition-transform" 
                        />
                      </button>
                    {:else}
                      <span class="w-5"></span>
                    {/if}
                    
                    <a
                      href="/articles/{child.slug}"
                      class="flex-1 flex items-center gap-2 px-2 py-1 text-sm rounded-lg transition-colors {isActive(child.slug) ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}"
                    >
                      <Icon icon={child.icon || 'tabler:file-text'} class="w-3.5 h-3.5 shrink-0" />
                      <span class="truncate">{child.title}</span>
                    </a>
                  </div>

                  {#if childHasChildren && childIsExpanded}
                    <div class="ml-4 pl-2 border-l border-border mt-0.5 space-y-0.5">
                      {#each child.children as grandchild}
                        <a
                          href="/articles/{grandchild.slug}"
                          class="flex items-center gap-2 px-2 py-1 text-sm rounded-lg transition-colors {isActive(grandchild.slug) ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}"
                        >
                          <Icon icon={grandchild.icon || 'tabler:file-text'} class="w-3 h-3 shrink-0" />
                          <span class="truncate">{grandchild.title}</span>
                        </a>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="px-3 py-4 text-sm text-text-tertiary text-center">
      No articles yet
    </div>
  {/if}
</nav>
