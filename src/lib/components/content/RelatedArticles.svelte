<script lang="ts">
  import { articles, modules, topics, domains } from '$lib/stores/graph';
  import type { Article } from '$lib/server/graph';
  import Card from '$lib/components/common/Card.svelte';

  let { article }: { article: Article } = $props();

  const related = $derived(() => {
    const sharedModuleIds = new Set(article.moduleIds);
    return $articles
      .filter((a) => a.id !== article.id && a.moduleIds.some((mid) => sharedModuleIds.has(mid)))
      .map((a) => {
        const module = $modules.find((m) => m.id === a.moduleIds[0]);
        const topic = $topics.find((t) => t.id === module?.topicId);
        const domain = $domains.find((d) => d.id === topic?.domainId);
        return { article: a, module, topic, domain };
      });
  });
</script>

{#if related().length > 0}
  <section>
    <h2 class="text-xl font-semibold mb-3">Related Articles</h2>
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {#each related() as { article: a, module, topic, domain }}
        <Card href="/domains/{domain?.slug}/{topic?.slug}/{module?.slug}/{a.slug}">
          <h3 class="text-lg font-semibold text-primary mb-1">{a.title}</h3>
          <p class="text-sm text-text-secondary mb-2">{a.summary}</p>
          <div class="text-xs text-text-tertiary">
            {domain?.title} → {topic?.title} → {module?.title}
          </div>
        </Card>
      {/each}
    </div>
  </section>
{/if}
