<script lang="ts">
  import { page } from '$app/state';
  import { articles, getDomainBySlug, getTopicBySlug, getModuleBySlug } from '$lib/stores/graph';
  import type { Article } from '$lib/server/graph';
  import Card from '$lib/components/common/Card.svelte';

  const domain = $derived(() => getDomainBySlug(page.params.domainSlug!));
  const topic = $derived(() => getTopicBySlug(page.params.topicSlug!));
  const module = $derived(() => getModuleBySlug(page.params.moduleSlug!));
  const moduleArticles = $derived(() => {
    const m = module();
    if (!m) return [];
    return m.articleIds
      .map((aid) => $articles.find((a) => a.id === aid))
      .filter((a): a is Article => Boolean(a));
  });
</script>

{#if domain() && topic() && module()}
  <section class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gradient">{module()!.title}</h1>
      <p class="text-text-secondary">{module()!.description}</p>
    </header>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Articles</h2>
      {#if moduleArticles().length === 0}
        <p class="text-tertiary">No articles found.</p>
      {:else}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each moduleArticles() as article}
            <Card href="/domains/{domain()!.slug}/{topic()!.slug}/{module()!.slug}/{article.slug}">
              <h3 class="text-lg font-semibold text-primary mb-1">{article.title}</h3>
              <p class="text-sm text-text-secondary mb-2">{article.summary}</p>
              <div class="flex flex-wrap gap-1 mb-2">
                {#each article.climate as c}
                  <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{c}</span>
                {/each}
                {#each article.budget as b}
                  <span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-900">{b}</span>
                {/each}
                {#each article.size as s}
                  <span class="text-xs px-2 py-1 rounded-full bg-forest-100 text-forest-800">{s}</span>
                {/each}
              </div>
            </Card>
          {/each}
        </div>
      {/if}
    </section>
  </section>
{:else}
  <section class="space-y-4">
    <h1 class="text-3xl font-bold text-primary">Module not found</h1>
    <p class="text-secondary">The module you requested does not exist.</p>
  </section>
{/if}
