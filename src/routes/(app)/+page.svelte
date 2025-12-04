<script lang="ts">
  import { domains, topics, modules, articles } from '$lib/stores/graph';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';

  // Calculate stats
  let stats = $derived([
    { label: 'Domains', value: $domains.length },
    { label: 'Topics', value: $topics.length },
    { label: 'Modules', value: $modules.length },
    { label: 'Articles', value: $articles.length }
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
        A comprehensive knowledge platform for designing, building, and sustaining regenerative communities. Explore our curated domains, topics, and modules.
      </p>
      
      <div class="flex flex-wrap justify-center gap-4">
        <Button variant="primary" size="lg" href="/domains">Explore Domains</Button>
        <Button variant="outline" size="lg" href="/about">Learn More</Button>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-border/50">
        {#each stats as stat}
          <div class="text-center">
            <div class="text-3xl font-bold text-primary">{stat.value}</div>
            <div class="text-sm font-medium text-text-tertiary uppercase tracking-wider">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Domains Grid -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-text-primary">Domains</h2>
        <p class="text-text-secondary mt-2">Core areas of regenerative design and implementation</p>
      </div>
      <Button variant="ghost" href="/domains" class="hidden md:inline-flex">View All Domains →</Button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each $domains as domain}
        {@const topicCount = domain.topicIds.length}
        {@const moduleCount = domain.topicIds
          .map((tid) => $topics.find((t) => t.id === tid))
          .reduce((sum, t) => sum + (t?.moduleIds.length ?? 0), 0)}
        
        <Card href="/domains/{domain.slug}" class="h-full flex flex-col">
          <div class="mb-4">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-light/20 text-primary-dark">
              <!-- Placeholder icon based on first letter -->
              <span class="font-bold font-serif">{domain.title.charAt(0)}</span>
            </span>
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{domain.title}</h3>
          <p class="text-text-secondary mb-4 flex-1 line-clamp-3">{domain.description}</p>
          
          <div class="pt-4 mt-auto border-t border-border flex gap-4 text-xs font-medium text-text-tertiary">
            <span>{topicCount} Topics</span>
            <span>{moduleCount} Modules</span>
          </div>
        </Card>
      {/each}
    </div>
    
    <div class="mt-6 md:hidden text-center">
      <Button variant="outline" href="/domains" class="w-full">View All Domains</Button>
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
        {@const module = $modules.find((m) => m.id === article.moduleIds[0])}
        {@const topic = $topics.find((t) => t.id === module?.topicId)}
        {@const domain = $domains.find((d) => d.id === topic?.domainId)}
        
        <Card href="/domains/{domain?.slug}/{topic?.slug}/{module?.slug}/{article.slug}" class="h-full flex flex-col">
          <div class="flex items-center gap-2 mb-3 text-xs font-medium text-primary">
            <span class="bg-[--color-primary-light]/10 px-2 py-1 rounded-full">{domain?.title}</span>
          </div>
          
          <h3 class="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          <p class="text-sm text-text-secondary mb-4 flex-1 line-clamp-3">
            {article.summary}
          </p>
          
          <div class="text-xs text-text-tertiary truncate">
            {topic?.title} › {module?.title}
          </div>
        </Card>
      {/each}
    </div>
  </section>
</div>
