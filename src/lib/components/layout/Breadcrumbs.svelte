<script lang="ts">
  import { page } from '$app/state';
  import { domainBySlug, topicBySlug, moduleBySlug, articleBySlug } from '$lib/stores/graph';

  const segments = $derived(() => {
    const { params } = page;
    const items: { label: string; href?: string }[] = [{ label: 'Home', href: '/' }];

    // Access stores reactively using $
    const domainMap = $domainBySlug;
    const topicMap = $topicBySlug;
    const moduleMap = $moduleBySlug;
    const articleMap = $articleBySlug;

    if (params.domainSlug) {
      const domain = domainMap.get(params.domainSlug);
      if (domain) items.push({ label: domain.title, href: `/domains/${domain.slug}` });
    }

    if (params.domainSlug && params.topicSlug) {
      const topic = topicMap.get(params.topicSlug);
      if (topic) items.push({ label: topic.title, href: `/domains/${params.domainSlug}/${topic.slug}` });
    }

    if (params.domainSlug && params.topicSlug && params.moduleSlug) {
      const module = moduleMap.get(params.moduleSlug);
      if (module) items.push({ label: module.title, href: `/domains/${params.domainSlug}/${params.topicSlug}/${module.slug}` });
    }

    if (params.domainSlug && params.topicSlug && params.moduleSlug && params.articleSlug) {
      const article = articleMap.get(params.articleSlug);
      if (article) items.push({ label: article.title });
    }

    return items;
  });
</script>

<nav aria-label="Breadcrumb">
  <ol class="flex items-center space-x-2 text-sm text-text-secondary">
    {#each segments() as segment, i}
      <li class="flex items-center">
        {#if segment.href}
          <a href={segment.href} class="hover:text-text-primary transition-colors">
            {segment.label}
          </a>
        {:else}
          <span class="text-text-primary font-medium">{segment.label}</span>
        {/if}
        {#if i < segments().length - 1}
          <svg class="w-4 h-4 mx-2 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
