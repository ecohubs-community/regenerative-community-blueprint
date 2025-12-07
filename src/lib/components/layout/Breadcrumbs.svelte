<script lang="ts">
  import { page } from '$app/state';
  import Icon from '@iconify/svelte';

  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  // Build breadcrumbs from current path
  const breadcrumbs = $derived(() => {
    const path = page.url.pathname;
    const items: BreadcrumbItem[] = [];

    // Home is always first
    if (path !== '/') {
      items.push({ label: 'Home', href: '/' });
    }

    // Parse path segments
    const segments = path.split('/').filter(Boolean);
    let currentPath = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      
      // Format the label nicely
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Last segment is current page (no link)
      if (i === segments.length - 1) {
        items.push({ label });
      } else {
        items.push({ label, href: currentPath });
      }
    }

    return items;
  });
</script>

{#if breadcrumbs().length > 1}
  <nav aria-label="Breadcrumb" class="flex items-center gap-1 text-sm text-text-tertiary">
    {#each breadcrumbs() as crumb, i}
      {#if i > 0}
        <Icon icon="tabler:chevron-right" class="w-4 h-4 text-text-tertiary/50" />
      {/if}
      
      {#if crumb.href}
        <a 
          href={crumb.href} 
          class="hover:text-text-primary transition-colors"
        >
          {crumb.label}
        </a>
      {:else}
        <span class="text-text-secondary font-medium truncate max-w-[200px]">
          {crumb.label}
        </span>
      {/if}
    {/each}
  </nav>
{/if}
