<script lang="ts">
  import { articles, rootArticles } from '$lib/stores/graph';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Icon from '@iconify/svelte';
  import SEO from '$lib/components/seo/SEO.svelte';
  import { buildWebSiteSchema } from '$lib/utils/jsonld';
  import { m } from '$lib/i18n';
  import { localized } from '$lib/i18n/path';
  import { DEFAULT_LOCALE } from '$lib/i18n/languages';

  let { data } = $props();

  const locale = $derived(data.locale ?? DEFAULT_LOCALE);

  let stats = $derived([
    { label: m('home.stats.articles'), value: $articles.length },
    { label: m('home.stats.root_topics'), value: $rootArticles.length }
  ]);
</script>

<SEO
  title={m('site.name')}
  description={m('site.description')}
  url="/"
  type="website"
  jsonLd={buildWebSiteSchema()}
  locale={data.locale}
/>

<div class="space-y-16 pb-12">
  <!-- Hero Section -->
  <section class="relative rounded-2xl overflow-hidden bg-linear-to-br from-forest-50 to-blue-50 dark:from-forest-900 dark:to-blue-900 border border-border">
    <div class="absolute inset-0 opacity-10 dark:opacity-20" style="background-image: radial-gradient(var(--color-primary) 1px, transparent 1px); background-size: 24px 24px;"></div>
    
    <div class="relative z-10 px-xl py-3xl text-center max-w-3xl mx-auto">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-gradient mb-6 leading-tight">
        {m('home.title')}
      </h1>


      <!-- Video -->
      <div class="mt-10 mb-10 max-w-2xl mx-auto w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/YNQN5PxXPt0"
          title={m('home.video_title')}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>

      <p class="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
        {m('home.intro')}
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <Button variant="primary" size="lg" href={localized('/articles', locale)}>{m('home.cta.explore_articles')}</Button>
        <Button variant="secondary" size="lg" href={localized('/articles/rcos-templates#downloads', locale)} class="gap-2">
          <Icon icon="tabler:download" class="w-4 h-4" /> {m('home.cta.download_templates')}
        </Button>
        <Button variant="outline" size="lg" href="https://ecohubs.community" target="_blank" class="gap-2">{m('home.cta.learn_more')} <Icon icon="tabler:arrow-up-right" class="w-4 h-4" />  </Button>
      </div>

      <iframe src="https://player.rss.com/the-regenerative-future-podcast/2620815?theme=dark&v=2&skip=false" width="100%" height="195px" title="Redesigning Community: Inside the Regenerative Com" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen scrolling="no" class="rounded-xl mt-10"><a href="https://rss.com/podcasts/the-regenerative-future-podcast/2620815/">Redesigning Community: Inside the Regenerative Com | RSS.com</a></iframe>

      <!-- Stats Row -->
      <div class="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-border/50">
        {#each stats as stat}
          <div class="text-center">
            <div class="text-3xl font-bold text-primary">{stat.value}</div>
            <div class="text-sm font-medium text-text-tertiary uppercase tracking-wider">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Root Articles Grid -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-text-primary">{m('home.topics.heading')}</h2>
        <p class="text-text-secondary mt-2">{m('home.topics.subheading')}</p>
      </div>
      <Button variant="ghost" href={localized('/articles', locale)} class="hidden md:inline-flex">{m('home.topics.view_all')}</Button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each $rootArticles as article}
        {@const childCount = article.children.length}

        <Card href={localized(`/articles/${article.slug}`, locale)} class="h-full flex flex-col">
          <div class="mb-4">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-light/20 text-primary-dark">
              <span class="font-bold font-serif">{article.title.charAt(0)}</span>
            </span>
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
          <p class="text-text-secondary mb-4 flex-1 line-clamp-3">{article.summary || ''}</p>

          {#if childCount > 0}
            <div class="pt-4 mt-auto border-t border-border flex gap-4 text-xs font-medium text-text-tertiary">
              <span>{m(childCount === 1 ? 'articles.sub_article_count_one' : 'articles.sub_article_count_other', { count: childCount })}</span>
            </div>
          {/if}
        </Card>
      {/each}
    </div>

    <div class="mt-6 md:hidden text-center">
      <Button variant="outline" href={localized('/articles', locale)} class="w-full">{m('home.topics.view_all_mobile')}</Button>
    </div>
  </section>

  <!-- Recent Articles -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-text-primary">{m('home.recent.heading')}</h2>
        <p class="text-text-secondary mt-2">{m('home.recent.subheading')}</p>
      </div>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each $articles.slice(0, 6) as article}
        <Card href={localized(`/articles/${article.slug}`, locale)} class="h-full flex flex-col">
          <h3 class="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p class="text-sm text-text-secondary mb-4 flex-1 line-clamp-3">
            {article.summary || ''}
          </p>
        </Card>
      {/each}
    </div>
  </section>
</div>
