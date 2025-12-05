<script lang="ts">
  import { page } from '$app/state';
  import { getArticleBySlug } from '$lib/stores/graph';
  import RelatedModules from '$lib/components/content/RelatedModules.svelte';
  import RelatedArticles from '$lib/components/content/RelatedArticles.svelte';
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import type { ArticleBody } from '$lib/server/content';
  import { graph } from '$lib/stores/graph';

  let { data } = $props();

  // Temporary fix: initialize graph store from page data
  $effect(() => {
    if (data.graph) {
      graph.set(data.graph);
    }
  });

  const articleMeta = $derived(() => getArticleBySlug(page.params.articleSlug!));

  // Type the article data properly
  const article = $derived(() => data.article as ArticleBody | null);
</script>

{#if article()}
  <article class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gradient">{article()!.data.title || 'Untitled'}</h1>
      <p class="text-text-secondary">{article()!.data.summary || 'No summary'}</p>
      <div class="flex flex-wrap gap-2 mt-3">
        {#each (article()!.data.climate as string[]) || [] as c}
          <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{c}</span>
        {/each}
        {#each (article()!.data.budget as string[]) || [] as b}
          <span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">{b}</span>
        {/each}
        {#each (article()!.data.size as string[]) || [] as s}
          <span class="text-xs px-2 py-1 rounded-full bg-forest-100 text-forest-800">{s}</span>
        {/each}
      </div>
    </header>

    <MarkdownRenderer content={article()!.body} />

    {#if article()!.data.attachments && (article()!.data.attachments as { file: string; caption?: string }[]).length > 0}
      <section>
        <h2 class="text-xl font-semibold mb-3">Attachments</h2>
        <ul class="space-y-2">
          {#each (article()!.data.attachments as { file: string; caption?: string }[]) as att}
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

    {#if articleMeta()}
      <RelatedModules article={articleMeta()!} />
      <RelatedArticles article={articleMeta()!} />
    {/if}
  </article>
{:else}
  <section class="space-y-4">
    <h1 class="text-3xl font-bold text-text-primary">Article not found</h1>
    <p class="text-text-secondary">The article you requested does not exist.</p>
  </section>
{/if}
