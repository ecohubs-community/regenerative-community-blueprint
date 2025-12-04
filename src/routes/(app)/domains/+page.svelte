<script lang="ts">
  import { domains, topics, modules, articles } from '$lib/stores/graph';
  import Card from '$lib/components/common/Card.svelte';
</script>

<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-bold text-gradient">Domains</h1>
    <p class="text-text-secondary">Top-level areas of the EcoHubs knowledge base.</p>
  </header>

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each $domains as domain}
      {@const topicCount = domain.topicIds.length}
      {@const moduleCount = domain.topicIds
        .map((tid) => $topics.find((t) => t.id === tid))
        .reduce((sum, t) => sum + (t?.moduleIds.length ?? 0), 0)}
      {@const articleCount = domain.topicIds
        .map((tid) => $topics.find((t) => t.id === tid))
        .flatMap((t) => t?.moduleIds.map((mid) => $modules.find((m) => m.id === mid)) ?? [])
        .reduce((sum, m) => sum + (m?.articleIds.length ?? 0), 0)}
      <Card href="/domains/{domain.slug}">
        <h2 class="text-xl font-semibold text-text-primary mb-2">{domain.title}</h2>
        <p class="text-sm text-text-secondary mb-3">{domain.description}</p>
        <div class="text-xs text-text-tertiary">
          {topicCount} topics · {moduleCount} modules · {articleCount} articles
        </div>
      </Card>
    {/each}
  </div>
</section>
