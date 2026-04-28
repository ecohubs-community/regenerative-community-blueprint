<script lang="ts">
	import { filteredResults, status, query } from '$lib/stores/search';
	import SearchResultCard from './SearchResultCard.svelte';
	import { m } from '$lib/i18n';
</script>

<div class="space-y-6">
	{#if $status === 'loading'}
		<p class="text-text-secondary">{m('search.searching')}</p>
	{:else if $query.trim() && $filteredResults.length === 0}
		<p class="text-text-secondary">{m('search.no_results')}</p>
	{:else if $filteredResults.length > 0}
		<div class="space-y-4">
			{#each $filteredResults as result}
				<SearchResultCard {result} />
			{/each}
		</div>
	{/if}
</div>
