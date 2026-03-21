<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { ArticleFrontmatter } from '$lib/types/article';

	let {
		frontmatter = $bindable<ArticleFrontmatter>({}),
		readonly = false,
		onchange = () => {}
	}: {
		frontmatter: ArticleFrontmatter;
		readonly?: boolean;
		onchange?: () => void;
	} = $props();

	// Tags autocomplete state
	let availableTags = $state<string[]>([]);
	let tagSearchQuery = $state('');
	let showTagSuggestions = $state(false);
	let tagInputRef: HTMLInputElement;

	// Load available tags from all articles
	async function loadTags() {
		try {
			const response = await fetch('/api/content/tree?format=tree');
			if (response.ok) {
				const data = await response.json();
				// Extract unique tags from all articles
				const tagSet = new Set<string>();
				function extractTags(nodes: any[]) {
					for (const node of nodes) {
						if (Array.isArray(node.tags)) {
							node.tags.forEach((tag: string) => tagSet.add(tag));
						}
						if (node.children) {
							extractTags(node.children);
						}
					}
				}
				extractTags(data.articles || []);
				availableTags = Array.from(tagSet).sort();
			}
		} catch (error) {
			console.error('Failed to load tags:', error);
		}
	}

	onMount(() => {
		loadTags();
	});

	// Filtered tag suggestions - show matching existing tags or allow creating new
	const filteredTags = $derived(() => {
		const currentTags = frontmatter.tags || [];
		const query = tagSearchQuery.trim().toLowerCase();
		
		if (!query) {
			return availableTags.filter(t => !currentTags.includes(t)).slice(0, 10);
		}
		
		return availableTags.filter(
			(t) => t.toLowerCase().includes(query) && !currentTags.includes(t)
		);
	});

	// Check if the current query is a new tag (not in available tags)
	const isNewTag = $derived(() => {
		const query = tagSearchQuery.trim();
		if (!query) return false;
		const currentTags = frontmatter.tags || [];
		return !availableTags.includes(query) && !currentTags.includes(query);
	});

	function addTag(tag: string) {
		if (readonly) return;
		const trimmedTag = tag.trim();
		if (!trimmedTag) return;
		
		const current = Array.isArray(frontmatter.tags) ? [...frontmatter.tags] : [];
		if (!current.includes(trimmedTag)) {
			current.push(trimmedTag);
			frontmatter.tags = current;
			// Also add to available tags for future suggestions
			if (!availableTags.includes(trimmedTag)) {
				availableTags = [...availableTags, trimmedTag].sort();
			}
			onchange();
		}
		tagSearchQuery = '';
		showTagSuggestions = false;
	}

	function removeTag(tag: string) {
		if (readonly) return;
		const current = Array.isArray(frontmatter.tags) ? [...frontmatter.tags] : [];
		const index = current.indexOf(tag);
		if (index > -1) {
			current.splice(index, 1);
			frontmatter.tags = current;
			onchange();
		}
	}

	function handleTagKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			const query = tagSearchQuery.trim();
			if (query) {
				// Add the first suggestion or create new tag
				if (filteredTags().length > 0) {
					addTag(filteredTags()[0]);
				} else {
					addTag(query);
				}
			}
		} else if (event.key === 'Escape') {
			showTagSuggestions = false;
		}
	}

	function handleInputChange() {
		onchange();
	}

	// Close dropdowns when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.tag-autocomplete')) {
			showTagSuggestions = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="space-y-5">
	<!-- Title -->
	<div>
		<label for="meta-title" class="block text-sm font-medium text-gray-700 mb-1.5">
			Title
		</label>
		<input
			id="meta-title"
			type="text"
			bind:value={frontmatter.title}
			oninput={handleInputChange}
			placeholder="Article title"
			disabled={readonly}
			class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500 transition-shadow"
		/>
	</div>

	<!-- Summary -->
	<div>
		<label for="meta-summary" class="block text-sm font-medium text-gray-700 mb-1.5">
			Summary
		</label>
		<textarea
			id="meta-summary"
			bind:value={frontmatter.summary}
			oninput={handleInputChange}
			placeholder="Brief summary of the article"
			disabled={readonly}
			rows="3"
			class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500 resize-none transition-shadow"
		></textarea>
	</div>

	<!-- Tags Autocomplete -->
	<div class="tag-autocomplete relative">
		<span id="tags-label" class="block text-sm font-medium text-gray-700 mb-1.5">Tags</span>

		<!-- Selected tags -->
		{#if (frontmatter.tags || []).length > 0}
			<div class="flex flex-wrap gap-1.5 mb-2">
				{#each frontmatter.tags || [] as tag}
					<span
						class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-md"
					>
						{tag}
						{#if !readonly}
							<button
								type="button"
								onclick={() => removeTag(tag)}
								aria-label="Remove {tag}"
								class="hover:text-purple-900"
							>
								<Icon icon="tabler:x" class="w-3 h-3" />
							</button>
						{/if}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Search input -->
		<div class="relative">
			<input
				bind:this={tagInputRef}
				type="text"
				bind:value={tagSearchQuery}
				onfocus={() => (showTagSuggestions = true)}
				onkeydown={handleTagKeydown}
				placeholder="Type to add tags..."
				disabled={readonly}
				class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500 transition-shadow pr-8"
			/>
			<Icon icon="tabler:tag" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
		</div>

		<!-- Suggestions dropdown -->
		{#if showTagSuggestions && (filteredTags().length > 0 || isNewTag())}
			<div
				class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto"
			>
				{#if isNewTag()}
					<button
						type="button"
						onclick={() => addTag(tagSearchQuery)}
						class="w-full px-3 py-2 text-left text-sm hover:bg-purple-50 transition-colors flex items-center gap-2 border-b border-gray-100"
					>
						<Icon icon="tabler:plus" class="w-4 h-4 text-purple-600" />
						<span class="text-purple-700">Create tag "<span class="font-medium">{tagSearchQuery.trim()}</span>"</span>
					</button>
				{/if}
				{#each filteredTags() as tag}
					<button
						type="button"
						onclick={() => addTag(tag)}
						class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
					>
						<span class="text-gray-900">{tag}</span>
					</button>
				{/each}
			</div>
		{/if}
		
		<p class="mt-1.5 text-xs text-gray-400">Press Enter to add a tag, or select from suggestions</p>
	</div>


</div>
