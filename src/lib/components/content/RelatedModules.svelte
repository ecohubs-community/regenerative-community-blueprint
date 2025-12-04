<script lang="ts">
  import { modules, topics, domains } from '$lib/stores/graph';
  import type { Article } from '$lib/server/graph';
  import Card from '$lib/components/common/Card.svelte';

  let { article }: { article: Article } = $props();

  const related = $derived(() => {
    return article.moduleIds
      .map((mid) => $modules.find((m) => m.id === mid))
      .filter((m): m is import('$lib/server/graph').Module => Boolean(m))
      .map((m) => {
        const topic = $topics.find((t) => t.id === m.topicId);
        const domain = $domains.find((d) => d.id === topic?.domainId);
        return { module: m, topic, domain };
      });
  });
</script>

{#if related().length > 0}
  <section>
    <h2 class="text-xl font-semibold mb-3">Modules</h2>
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {#each related() as { module, topic, domain }}
        <Card href="/domains/{domain?.slug}/{topic?.slug}/{module.slug}">
          <h3 class="text-lg font-semibold text-primary mb-1">{module.title}</h3>
          <p class="text-sm text-text-secondary mb-2">{module.description}</p>
          <div class="text-xs text-text-tertiary">
            {domain?.title} → {topic?.title}
          </div>
        </Card>
      {/each}
    </div>
  </section>
{/if}
