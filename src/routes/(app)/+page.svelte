<script lang="ts">
  import { articles, rootArticles } from '$lib/stores/graph';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';

  // Calculate stats
  let stats = $derived([
    { label: 'Articles', value: $articles.length },
    { label: 'Root Topics', value: $rootArticles.length }
  ]);
</script>

<div class="space-y-16 pb-12">
  <!-- Hero Section -->
  <section class="relative rounded-2xl overflow-hidden bg-linear-to-br from-forest-50 to-blue-50 dark:from-forest-900 dark:to-blue-900 border border-border">
    <div class="absolute inset-0 opacity-10 dark:opacity-20" style="background-image: radial-gradient(var(--color-primary) 1px, transparent 1px); background-size: 24px 24px;"></div>
    
    <div class="relative z-10 px-xl py-3xl text-center max-w-3xl mx-auto">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-gradient mb-6 leading-tight">
        Regenerative Community Blueprint
      </h1>
      <p class="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
        A comprehensive knowledge platform for designing, building, and sustaining regenerative communities. Explore our curated articles and guides.
      </p>
      
      <div class="flex flex-wrap justify-center gap-4">
        <Button variant="primary" size="lg" href="/articles">Explore Articles</Button>
        <Button variant="outline" size="lg" href="/about">Learn More</Button>
      </div>

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
        <h2 class="text-3xl font-bold text-text-primary">Topics</h2>
        <p class="text-text-secondary mt-2">Main areas of regenerative design and implementation</p>
      </div>
      <Button variant="ghost" href="/articles" class="hidden md:inline-flex">View All Articles →</Button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each $rootArticles as article}
        {@const childCount = article.children.length}
        
        <Card href="/articles/{article.slug}" class="h-full flex flex-col">
          <div class="mb-4">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-light/20 text-primary-dark">
              <span class="font-bold font-serif">{article.title.charAt(0)}</span>
            </span>
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
          <p class="text-text-secondary mb-4 flex-1 line-clamp-3">{article.summary || ''}</p>
          
          {#if childCount > 0}
            <div class="pt-4 mt-auto border-t border-border flex gap-4 text-xs font-medium text-text-tertiary">
              <span>{childCount} Sub-article{childCount !== 1 ? 's' : ''}</span>
            </div>
          {/if}
        </Card>
      {/each}
    </div>
    
    <div class="mt-6 md:hidden text-center">
      <Button variant="outline" href="/articles" class="w-full">View All Articles</Button>
    </div>
  </section>

  <!-- Recent Articles -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-text-primary">Recent Articles</h2>
        <p class="text-text-secondary mt-2">Latest updates and knowledge contributions</p>
      </div>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each $articles.slice(0, 6) as article}
        <Card href="/articles/{article.slug}" class="h-full flex flex-col">
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
