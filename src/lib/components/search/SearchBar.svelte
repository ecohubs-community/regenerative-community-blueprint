<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { m } from '$lib/i18n';
	import { localized } from '$lib/i18n/path';
	import { DEFAULT_LOCALE } from '$lib/i18n/languages';

	let query = $state('');
	let inputEl: HTMLInputElement;

	const locale = $derived((page.data?.locale as string | undefined) ?? DEFAULT_LOCALE);

	function handleSearch() {
		const q = query.trim();
		if (q) {
			goto(`${localized('/search', locale)}?q=${encodeURIComponent(q)}`);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSearch();
		}
	}
</script>

<div class="relative">
	<input
		bind:this={inputEl}
		bind:value={query}
		type="search"
		placeholder={m('nav.search_placeholder')}
		class="w-full px-4 py-2 rounded-full bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent border-0"
		onkeydown={handleKeydown}
	/>
	<button
		onclick={handleSearch}
		aria-label={m('nav.search_button')}
		class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-surface-elevated"
	>
		<Icon icon="tabler:search" class="w-5 h-5 text-text-secondary" />
	</button>
</div>
