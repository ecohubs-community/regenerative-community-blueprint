<script lang="ts">
  import { page } from '$app/state';
  import { domainBySlug, topicBySlug, modules } from '$lib/stores/graph';
  import type { Module } from '$lib/server/graph';
  import Card from '$lib/components/common/Card.svelte';

  const domain = $derived(() => $domainBySlug.get(page.params.domainSlug!));
  const topic = $derived(() => $topicBySlug.get(page.params.topicSlug!));
  const topicModules = $derived(() => {
    const t = topic();
    if (!t) return [];
    return t.moduleIds
      .map((mid) => $modules.find((m) => m.id === mid))
      .filter((m): m is Module => Boolean(m));
  });
</script>

{#if domain() && topic()}
  <section class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gradient">{topic()!.title}</h1>
      <p class="text-text-secondary">{topic()!.description}</p>
    </header>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Modules</h2>
      {#if topicModules().length === 0}
        <p class="text-tertiary">No modules found.</p>
      {:else}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each topicModules() as module}
            {@const articleCount = module.articleIds.length}
            <Card href="/domains/{domain()!.slug}/{topic()!.slug}/{module.slug}">
              <h3 class="text-lg font-semibold text-primary mb-1">{module.title}</h3>
              <p class="text-sm text-text-secondary mb-2">{module.description}</p>
              <div class="text-xs text-text-tertiary">
                {articleCount} articles
              </div>
            </Card>
          {/each}
        </div>
      {/if}
    </section>
  </section>
{:else}
  <section class="space-y-4">
    <h1 class="text-3xl font-bold text-primary">Topic not found</h1>
    <p class="text-text-secondary">The topic you requested does not exist.</p>
  </section>
{/if}
