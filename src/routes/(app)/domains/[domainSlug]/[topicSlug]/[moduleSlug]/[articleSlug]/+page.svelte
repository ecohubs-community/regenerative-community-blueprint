<script lang="ts">
  import { page } from '$app/state';
  import { getDomainBySlug, getTopicBySlug, getModuleBySlug, getArticleBySlug } from '$lib/stores/graph';
  import RelatedModules from '$lib/components/content/RelatedModules.svelte';
  import RelatedArticles from '$lib/components/content/RelatedArticles.svelte';

  let { data } = $props();

  const domain = $derived(() => getDomainBySlug(page.params.domainSlug!));
  const topic = $derived(() => getTopicBySlug(page.params.topicSlug!));
  const module = $derived(() => getModuleBySlug(page.params.moduleSlug!));
  const articleMeta = $derived(() => getArticleBySlug(page.params.articleSlug!));
</script>

{#if domain() && topic() && module() && articleMeta() && data.article}
  <article class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gradient">{articleMeta()!.title}</h1>
      <p class="text-text-secondary">{articleMeta()!.summary}</p>
      <div class="flex flex-wrap gap-2 mt-3">
        {#each articleMeta()!.climate as c}
          <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{c}</span>
        {/each}
        {#each articleMeta()!.budget as b}
          <span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">{b}</span>
        {/each}
        {#each articleMeta()!.size as s}
          <span class="text-xs px-2 py-1 rounded-full bg-forest-100 text-forest-800">{s}</span>
        {/each}
      </div>
    </header>

    <section class="prose prose-primary text-text-primary max-w-none">
      {@html data.article.body}
    </section>

    {#if articleMeta()!.attachments && articleMeta()!.attachments!.length > 0}
      <section>
        <h2 class="text-xl font-semibold mb-3">Attachments</h2>
        <ul class="space-y-2">
          {#each articleMeta()!.attachments as att}
            <li>
              <a href={att.file} class="text-text-accent hover:underline" download>
                📎 {att.file}
                {#if att.caption}
                  <span class="text-sm text-text-secondary ml-2">({att.caption})</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    <RelatedModules article={articleMeta()!} />
    <RelatedArticles article={articleMeta()!} />
  </article>
{:else}
  <section class="space-y-4">
    <h1 class="text-3xl font-bold text-text-primary">Article not found</h1>
    <p class="text-text-secondary">The article you requested does not exist.</p>
  </section>
{/if}
