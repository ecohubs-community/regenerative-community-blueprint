<script lang="ts">
  import { page } from '$app/stores';
  import { domains, topics, modules, articles, getDomainBySlug } from '$lib/stores/graph';
  import type { Topic } from '$lib/server/graph';
  import Card from '$lib/components/common/Card.svelte';

  const domain = $derived(() => getDomainBySlug($page.params.domainSlug!));
  const domainTopics = $derived(() => {
    const d = domain();
    if (!d) return [];
    return d.topicIds
      .map((tid) => $topics.find((t) => t.id === tid))
      .filter((t): t is Topic => Boolean(t));
  });
</script>

{#if domain()}
  <section class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gradient">{domain()!.title}</h1>
      <p class="text-text-secondary">{domain()!.description}</p>
    </header>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Topics</h2>
      {#if domainTopics().length === 0}
        <p class="text-tertiary">No topics found.</p>
      {:else}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each domainTopics() as topic}
            {@const moduleCount = topic.moduleIds.length}
            {@const articleCount = topic.moduleIds
              .map((mid: string) => $modules.find((m) => m.id === mid))
              .reduce((sum: number, m) => sum + (m?.articleIds.length ?? 0), 0)}
            <Card href="/domains/{domain()!.slug}/{topic.slug}">
              <h3 class="text-lg font-semibold text-primary mb-1">{topic.title}</h3>
              <p class="text-sm text-text-secondary mb-2">{topic.description}</p>
              <div class="text-xs text-text-tertiary">
                {moduleCount} modules · {articleCount} articles
              </div>
            </Card>
          {/each}
        </div>
      {/if}
    </section>
  </section>
{:else}
  <section class="space-y-4">
    <h1 class="text-3xl font-bold text-primary">Domain not found</h1>
    <p class="text-secondary">The domain you requested does not exist.</p>
  </section>
{/if}
