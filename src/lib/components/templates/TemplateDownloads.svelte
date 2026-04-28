<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import type { ArticleDownloads } from '$lib/server/downloads';
	import { m } from '$lib/i18n';
	import { localized } from '$lib/i18n/path';
	import { DEFAULT_LOCALE } from '$lib/i18n/languages';

	let { downloads }: { downloads: ArticleDownloads } = $props();

	const locale = $derived((page.data?.locale as string | undefined) ?? DEFAULT_LOCALE);

	// Format metadata is stable; the labels and hints are translated.
	const FORMAT_INFO: Record<string, { icon: string; labelKey: string; hintKey: string }> = {
		md: {
			icon: 'tabler:markdown',
			labelKey: 'downloads.format.md.label',
			hintKey: 'downloads.format.md.hint'
		},
		docx: {
			icon: 'tabler:file-type-doc',
			labelKey: 'downloads.format.docx.label',
			hintKey: 'downloads.format.docx.hint'
		},
		odt: {
			icon: 'tabler:file-type-doc',
			labelKey: 'downloads.format.odt.label',
			hintKey: 'downloads.format.odt.hint'
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
				{m('downloads.heading.all')}
			</h2>
			<p class="text-text-secondary text-sm">
				{m('downloads.intro.all')}
			</p>
			<p class="text-text-tertiary text-xs">
				{m('downloads.generated', { date: downloads.generated })}
			</p>
		</header>

		<div class="grid gap-3 sm:grid-cols-3">
			{#each downloads.formats as fmt}
				{@const info = FORMAT_INFO[fmt]}
				<a
					href={downloads.bundles[fmt]}
					download
					class="flex flex-col gap-1 rounded-lg border border-border bg-background hover:border-primary hover:bg-surface transition-colors p-4 group"
				>
					<span class="flex items-center gap-2 font-semibold text-text-primary">
						<Icon icon={info.icon} class="w-5 h-5 text-primary" />
						{m(info.labelKey)}
						<Icon
							icon="tabler:download"
							class="w-4 h-4 ml-auto text-text-tertiary group-hover:text-primary"
						/>
					</span>
					<span class="text-xs text-text-tertiary">{m(info.hintKey)}</span>
					<span class="text-xs text-text-tertiary"
						>{m('downloads.bundle_caption', { count: downloads.templates.length })}</span
					>
				</a>
			{/each}
		</div>

		<details class="mt-6 group">
			<summary
				class="cursor-pointer text-sm font-medium text-text-primary hover:text-primary list-none flex items-center gap-2"
			>
				<Icon
					icon="tabler:chevron-right"
					class="w-4 h-4 transition-transform group-open:rotate-90"
				/>
				{m('downloads.toggle_single')}
			</summary>
			<div class="mt-4 space-y-4 pl-2">
				{#each Array.from(new Set(downloads.templates.map((t) => t.layer))) as layer}
					<div>
						<h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide mb-2">
							{m('downloads.layer_label', { layer: layer.replace(/^layer-/, '') })}
						</h3>
						<ul class="space-y-1.5">
							{#each downloads.templates.filter((t) => t.layer === layer) as t}
								<li class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
									<a
										href={localized(`/articles/${t.slug}`, locale)}
										class="text-text-primary hover:text-primary font-medium"
									>
										{t.title}
									</a>
									<span class="flex items-center gap-2 text-xs text-text-tertiary">
										{#each downloads.formats as fmt}
											<a
												href={t.files[fmt]}
												download
												class="hover:text-primary underline-offset-2 hover:underline"
												title={m('downloads.format.download_as', {
													title: t.title,
													format: m(FORMAT_INFO[fmt].labelKey)
												})}>{fmt}</a
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
				{m('downloads.heading.single')}
			</h2>
			<p class="text-xs text-text-tertiary">
				{m('downloads.generated_inline', { date: downloads.generated })}
				<a
					href={localized('/articles/rcos-templates#downloads', locale)}
					class="text-primary hover:underline"
				>
					{m('downloads.all_link')}
				</a>
			</p>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each downloads.formats as fmt}
				{@const info = FORMAT_INFO[fmt]}
				<a
					href={downloads.files[fmt]}
					download
					title={m(info.hintKey)}
					class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background hover:border-primary hover:bg-surface transition-colors px-3 py-1.5 text-sm font-medium text-text-primary"
				>
					<Icon icon={info.icon} class="w-4 h-4 text-primary" />
					{m(info.labelKey)}
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
				{m('downloads.heading.spec')}
			</h2>
			<p class="text-xs text-text-tertiary">
				{m('downloads.spec.intro', { date: downloads.generated })}
			</p>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each downloads.formats as fmt}
				{@const info = FORMAT_INFO[fmt]}
				<a
					href={downloads.files[fmt]}
					download
					title={m(info.hintKey)}
					class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background hover:border-primary hover:bg-surface transition-colors px-3 py-1.5 text-sm font-medium text-text-primary"
				>
					<Icon icon={info.icon} class="w-4 h-4 text-primary" />
					{m(info.labelKey)}
				</a>
			{/each}
		</div>
	</section>
{/if}
