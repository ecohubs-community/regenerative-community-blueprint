<script lang="ts">
	import type { SearchResult } from '$lib/stores/search';
	import { page } from '$app/state';
	import { m } from '$lib/i18n';
	import { localized } from '$lib/i18n/path';
	import { DEFAULT_LOCALE } from '$lib/i18n/languages';

	let { result } = $props();

	const locale = $derived((page.data?.locale as string | undefined) ?? DEFAULT_LOCALE);

	function hrefForResult(r: SearchResult) {
		return localized(`/articles/${r.slug}`, locale);
	}
</script>

<a
	href={hrefForResult(result)}
	class="block glass-card p-lg rounded-xl transition-all hover:translate-y-[-2px] hover:shadow-lg"
>
	<div class="flex items-start justify-between mb-2">
		<h3 class="text-lg font-semibold text-primary">{result.title}</h3>
		<span class="text-xs px-2 py-1 rounded-full bg-surface text-tertiary">
			{m('articles.fallback_default')}
		</span>
	</div>
	{#if result.snippet}
		<p class="text-sm text-secondary mb-2">{@html result.snippet}</p>
	{/if}
	{#if result.meta}
		<p class="text-xs text-tertiary">{result.meta}</p>
	{/if}
</a>
