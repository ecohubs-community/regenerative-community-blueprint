<script lang="ts">
  import { page } from '$app/stores';
  import { articleBySlug, getArticleBreadcrumbs, getParentArticle } from '$lib/stores/graph';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Icon from '@iconify/svelte';
  import type { Article } from '$lib/server/graph';
  import SEO from '$lib/components/seo/SEO.svelte';
  import { buildArticleSchema, buildBreadcrumbSchema } from '$lib/utils/jsonld';
  import TemplateDownloads from '$lib/components/templates/TemplateDownloads.svelte';
  import { m } from '$lib/i18n';
  import { localized } from '$lib/i18n/path';
  import { DEFAULT_LOCALE } from '$lib/i18n/languages';

  let { data } = $props();

  const slug = $derived($page.params.slug ?? '');
  const article = $derived($articleBySlug.get(slug));
  const breadcrumbs = $derived(article ? getArticleBreadcrumbs(article) : []);
  const parent = $derived(article ? getParentArticle(article) : undefined);
  const locale = $derived(data.locale ?? DEFAULT_LOCALE);
</script>

<SEO
  title={article?.title || m('articles.fallback_default')}
  description={article?.summary || ''}
  url={`/articles/${slug}`}
  type="article"
  jsonLd={article ? [buildArticleSchema(article, breadcrumbs), buildBreadcrumbSchema(breadcrumbs)] : undefined}
  locale={data.locale}
  availableLocales={data.availableLocales}
/>

{#if article}
  <div class="max-w-4xl mx-auto space-y-8 pb-12">
    <!-- Article hierarchy breadcrumbs (no Home / Articles) -->
    {#if breadcrumbs.length > 1}
      <nav class="flex items-center gap-2 text-sm text-text-tertiary">
        {#each breadcrumbs as crumb, i}
          {#if i > 0}
            <Icon icon="tabler:chevron-right" class="w-4 h-4" />
          {/if}

          {#if i < breadcrumbs.length - 1}
            <a href={localized(`/articles/${crumb.slug}`, locale)} class="hover:text-primary transition-colors">
              {crumb.title}
            </a>
          {:else}
            <span class="text-text-primary font-medium">{crumb.title}</span>
          {/if}
        {/each}
      </nav>
    {/if}

    <!-- Article Header -->
    <header class="space-y-4">
      <h1 class="text-4xl font-bold text-text-primary">{article.title}</h1>
      {#if article.summary}
        <p class="text-xl text-text-secondary">{article.summary}</p>
      {/if}
      
      <!-- Tags -->
      {#if article.tags?.length}
        <div class="flex flex-wrap gap-2">
          {#each article.tags as tag}
            <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>

    {#if data.downloads && (data.downloads.type === 'single' || data.downloads.type === 'spec')}
      <TemplateDownloads downloads={data.downloads} />
    {/if}

    <!-- Article Content -->
    <article class="prose prose-article prose-lg max-w-none ">
      {#if data.body}
        {@html data.body}
      {:else}
        <p class="text-text-tertiary italic">{m('articles.no_content')}</p>
      {/if}
    </article>

    {#if data.downloads && data.downloads.type === 'index'}
      <TemplateDownloads downloads={data.downloads} />
    {/if}

    <!-- Child Articles -->
    {#if article.children.length > 0}
      <section class="pt-8 border-t border-border">
        <h2 class="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Icon icon="tabler:hierarchy" class="w-6 h-6" />
          {m('articles.sub_articles')}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          {#each article.children as child}
            <Card href={localized(`/articles/${child.slug}`, locale)} class="flex flex-col">
              <h3 class="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                {child.title}
              </h3>
              {#if child.summary}
                <p class="text-sm text-text-secondary mt-2 line-clamp-2">{child.summary}</p>
              {/if}
              {#if child.children.length > 0}
                <p class="text-xs text-text-tertiary mt-2">
                  {m(child.children.length === 1 ? 'articles.sub_article_count_one' : 'articles.sub_article_count_other', { count: child.children.length })}
                </p>
              {/if}
            </Card>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Navigation -->
    <nav class="pt-8 border-t border-border flex justify-between">
      {#if parent}
        <Button variant="outline" href={localized(`/articles/${parent.slug}`, locale)}>
          <Icon icon="tabler:arrow-left" class="w-4 h-4 mr-2" />
          {parent.title}
        </Button>
      {:else}
        <Button variant="outline" href={localized('/articles', locale)}>
          <Icon icon="tabler:arrow-left" class="w-4 h-4 mr-2" />
          {m('nav.all_articles')}
        </Button>
      {/if}
    </nav>
  </div>
{:else}
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
      <Icon icon="tabler:file-off" class="w-8 h-8 text-gray-400" />
    </div>
    <h2 class="text-xl font-semibold text-text-primary mb-2">{m('articles.not_found.title')}</h2>
    <p class="text-gray-500 mb-4">{m('articles.not_found.body')}</p>
    <Button href={localized('/articles', locale)}>{m('articles.not_found.cta')}</Button>
  </div>
{/if}