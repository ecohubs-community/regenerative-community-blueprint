<script lang="ts">
  import { page } from '$app/stores';
  import { domainTree } from '$lib/stores/graph';
  import { closeSidebar } from '$lib/stores/ui';
</script>

<nav aria-label="Knowledge structure" class="pb-12">
  {#each $domainTree as domain}
    <section class="mb-6">
      <h2 class="font-bold text-sm text-primary uppercase tracking-wider px-2 mb-2">{domain.title}</h2>
      
      {#if domain.topics.length === 0}
        <p class="text-sm text-text-tertiary px-2">No topics</p>
      {:else}
        <ul class="space-y-1 ml-2 border-l border-border">
          {#each domain.topics as topic}
            <li>
              <a
                href="/domains/{domain.slug}/{topic.slug}"
                class="block pl-4 py-1.5 text-sm text-text-secondary border-l-2 border-transparent -ml-px hover:text-primary hover:border-primary/50 transition-colors aria-current-page:border-primary aria-current-page:text-primary aria-current-page:font-medium"
                onclick={closeSidebar}
                aria-current={$page.url.pathname.includes(`/${topic.slug}`) && !$page.url.pathname.includes(`/${topic.slug}/`) ? 'page' : undefined}
              >
                {topic.title}
              </a>
              {#if topic.modules.length > 0}
                <ul class="space-y-1">
                  {#each topic.modules as module}
                    <li>
                      <a
                        href="/domains/{domain.slug}/{topic.slug}/{module.slug}"
                        class="block pl-8 py-1.5 text-sm text-text-tertiary border-l-2 border-transparent -ml-px hover:text-text-primary hover:border-border transition-colors aria-current-page:border-primary aria-current-page:text-primary"
                        onclick={closeSidebar}
                        aria-current={$page.url.pathname.includes(`/${module.slug}`) ? 'page' : undefined}
                      >
                        {module.title}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/each}
</nav>
