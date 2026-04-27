<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { ArticleDownloads } from '$lib/server/downloads';

  let { downloads }: { downloads: ArticleDownloads } = $props();

  const FORMAT_LABELS: Record<string, { label: string; icon: string; hint: string }> = {
    md: {
      label: 'Markdown',
      icon: 'tabler:markdown',
      hint: 'Plain text · best for git, wikis, or your own editor'
    },
    docx: {
      label: 'Word (.docx)',
      icon: 'tabler:file-type-doc',
      hint: 'Opens in Word, Google Docs, Pages, LibreOffice'
    },
    odt: {
      label: 'OpenDocument (.odt)',
      icon: 'tabler:file-type-doc',
      hint: 'Open standard · LibreOffice, Word, Google Docs'
    }
  };

</script>

{#if downloads.type === 'index'}
  <section
    id="downloads"
    class="not-prose rounded-xl border border-border bg-surface/50 p-6 sm:p-8 my-8"
  >
    <header class="space-y-2 mb-6">
      <h2 class="text-2xl font-bold text-text-primary flex items-center gap-2">
        <Icon icon="tabler:package" class="w-6 h-6 text-primary" />
        Download all templates
      </h2>
      <p class="text-text-secondary text-sm">
        Every template, bundled as a zip. Pick the format that fits how your community works.
      </p>
      <p class="text-text-tertiary text-xs">Generated {downloads.generated}</p>
    </header>

    <div class="grid gap-3 sm:grid-cols-3">
      {#each downloads.formats as fmt}
        {@const info = FORMAT_LABELS[fmt]}
        <a
          href={downloads.bundles[fmt]}
          download
          class="flex flex-col gap-1 rounded-lg border border-border bg-background hover:border-primary hover:bg-surface transition-colors p-4 group"
        >
          <span class="flex items-center gap-2 font-semibold text-text-primary">
            <Icon icon={info.icon} class="w-5 h-5 text-primary" />
            {info.label}
            <Icon
              icon="tabler:download"
              class="w-4 h-4 ml-auto text-text-tertiary group-hover:text-primary"
            />
          </span>
          <span class="text-xs text-text-tertiary">{info.hint}</span>
          <span class="text-xs text-text-tertiary">.zip · all {downloads.templates.length} templates</span>
        </a>
      {/each}
    </div>

    <details class="mt-6 group">
      <summary class="cursor-pointer text-sm font-medium text-text-primary hover:text-primary list-none flex items-center gap-2">
        <Icon icon="tabler:chevron-right" class="w-4 h-4 transition-transform group-open:rotate-90" />
        Download a single template
      </summary>
      <div class="mt-4 space-y-4 pl-2">
        {#each Array.from(new Set(downloads.templates.map((t) => t.layer))) as layer}
          <div>
            <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide mb-2">
              {layer.replace(/^layer-/, 'Layer ')}
            </h3>
            <ul class="space-y-1.5">
              {#each downloads.templates.filter((t) => t.layer === layer) as t}
                <li class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <a href={`/articles/${t.slug}`} class="text-text-primary hover:text-primary font-medium">
                    {t.title}
                  </a>
                  <span class="flex items-center gap-2 text-xs text-text-tertiary">
                    {#each downloads.formats as fmt}
                      <a
                        href={t.files[fmt]}
                        download
                        class="hover:text-primary underline-offset-2 hover:underline"
                        title={`Download ${t.title} as ${FORMAT_LABELS[fmt].label}`}>{fmt}</a
                      >
                    {/each}
                  </span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </details>
  </section>
{:else if downloads.type === 'single'}
  <section
    class="not-prose rounded-xl border border-border bg-surface/50 p-5 my-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
  >
    <div class="space-y-1">
      <h2 class="text-base font-semibold text-text-primary flex items-center gap-2">
        <Icon icon="tabler:download" class="w-5 h-5 text-primary" />
        Download this template
      </h2>
      <p class="text-xs text-text-tertiary">
        Generated {downloads.generated} ·
        <a href="/articles/rcos-templates#downloads" class="text-primary hover:underline">
          Download all templates
        </a>
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each downloads.formats as fmt}
        {@const info = FORMAT_LABELS[fmt]}
        <a
          href={downloads.files[fmt]}
          download
          title={info.hint}
          class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background hover:border-primary hover:bg-surface transition-colors px-3 py-1.5 text-sm font-medium text-text-primary"
        >
          <Icon icon={info.icon} class="w-4 h-4 text-primary" />
          {info.label}
        </a>
      {/each}
    </div>
  </section>
{:else if downloads.type === 'spec'}
  <section
    class="not-prose rounded-xl border border-border bg-surface/50 p-5 my-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
  >
    <div class="space-y-1">
      <h2 class="text-base font-semibold text-text-primary flex items-center gap-2">
        <Icon icon="tabler:file-download" class="w-5 h-5 text-primary" />
        Download full specification
      </h2>
      <p class="text-xs text-text-tertiary">
        Single Markdown file with all sections · Generated {downloads.generated}
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each downloads.formats as fmt}
        {@const info = FORMAT_LABELS[fmt]}
        <a
          href={downloads.files[fmt]}
          download
          title={info.hint}
          class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background hover:border-primary hover:bg-surface transition-colors px-3 py-1.5 text-sm font-medium text-text-primary"
        >
          <Icon icon={info.icon} class="w-4 h-4 text-primary" />
          {info.label}
        </a>
      {/each}
    </div>
  </section>
{/if}
