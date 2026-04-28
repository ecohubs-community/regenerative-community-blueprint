<script lang="ts">
  import { page } from '$app/state';
  import Icon from '@iconify/svelte';
  import { m } from '$lib/i18n';
  import { localized, stripLocale } from '$lib/i18n/path';
  import { DEFAULT_LOCALE } from '$lib/i18n/languages';

  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  const locale = $derived((page.data?.locale as string | undefined) ?? DEFAULT_LOCALE);

  // Build breadcrumbs from the canonical path so locale prefix doesn't appear as a crumb.
  // Well-known top-level segments resolve to localized labels via the messages bundle;
  // anything else falls back to a slug-capitalized label (e.g. "rcos-core" → "Rcos Core").
  // Article-detail pages bypass this component entirely (see AppShell.svelte) and render
  // their own breadcrumbs from the locale-aware article graph, so this fallback only
  // matters for non-article routes (currently just /, /articles, /search).
  function labelForSegment(segment: string): string {
    const key = `breadcrumb.segment.${segment}`;
    const localized = m(key);
    if (localized !== key) return localized;
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const breadcrumbs = $derived(() => {
    const path = stripLocale(page.url.pathname);
    const items: BreadcrumbItem[] = [];

    if (path !== '/') {
      items.push({ label: m('nav.home'), href: localized('/', locale) });
    }

    const segments = path.split('/').filter(Boolean);
    let currentPath = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      const label = labelForSegment(segment);
      if (i === segments.length - 1) {
        items.push({ label });
      } else {
        items.push({ label, href: localized(currentPath, locale) });
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
