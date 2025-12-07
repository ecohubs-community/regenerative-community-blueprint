<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	interface Article {
		id: string;
		title: string;
		slug: string;
		path: string;
	}

	let {
		isOpen = $bindable(false),
		onSelect = (_article: Article) => {},
		onClose = () => {}
	}: {
		isOpen: boolean;
		onSelect: (article: Article) => void;
		onClose: () => void;
	} = $props();

	let articles = $state<Article[]>([]);
	let searchQuery = $state('');
	let isLoading = $state(false);
	let selectedIndex = $state(0);

	// Filter articles by search query
	const filteredArticles = $derived(() => {
		if (!searchQuery.trim()) return articles.slice(0, 20);
		const query = searchQuery.toLowerCase();
		return articles.filter(a => 
			a.title.toLowerCase().includes(query) ||
			a.slug.toLowerCase().includes(query)
		).slice(0, 20);
	});

	async function loadArticles() {
		isLoading = true;
		try {
			const response = await fetch('/api/content/tree?format=tree');
			if (response.ok) {
				const data = await response.json();
				// Flatten the tree to get all articles
				const flatArticles: Article[] = [];
				function flatten(nodes: any[]) {
					for (const node of nodes) {
						flatArticles.push({
							id: node.id,
							title: node.title,
							slug: node.slug,
							path: node.path
						});
						if (node.children?.length > 0) {
							flatten(node.children);
						}
					}
				}
				flatten(data.articles || []);
				articles = flatArticles;
			}
		} catch (error) {
			console.error('Failed to load articles:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleSelect(article: Article) {
		onSelect(article);
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		const filtered = filteredArticles();
		
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			if (filtered[selectedIndex]) {
				handleSelect(filtered[selectedIndex]);
			}
		} else if (event.key === 'Escape') {
			isOpen = false;
			onClose();
		}
	}

	// Reset selection when search changes
	$effect(() => {
		searchQuery;
		selectedIndex = 0;
	});

	onMount(() => {
		loadArticles();
	});
</script>

{#if isOpen}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 cursor-default"
		onclick={() => { isOpen = false; onClose(); }}
		aria-label="Close modal"
	></button>

	<!-- Modal -->
	<div class="fixed inset-0 flex items-center justify-center z-50 p-4">
		<div 
			class="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col overflow-hidden"
			role="dialog"
			aria-modal="true"
			aria-labelledby="article-link-title"
		>
			<!-- Header -->
			<div class="px-4 py-3 border-b border-gray-100">
				<div class="flex items-center justify-between mb-3">
					<h2 id="article-link-title" class="text-lg font-semibold text-gray-900 flex items-center gap-2">
						<Icon icon="tabler:link" class="w-5 h-5 text-blue-600" />
						Link to Article
					</h2>
					<button
						onclick={() => { isOpen = false; onClose(); }}
						class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
						aria-label="Close"
					>
						<Icon icon="tabler:x" class="w-5 h-5 text-gray-500" />
					</button>
				</div>
				
				<!-- Search input -->
				<div class="relative">
					<Icon 
						icon="tabler:search" 
						class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
					/>
					<input
						type="text"
						bind:value={searchQuery}
						onkeydown={handleKeydown}
						placeholder="Search articles..."
						class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg 
							focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						autofocus
					/>
				</div>
			</div>

			<!-- Article list -->
			<div class="flex-1 overflow-y-auto">
				{#if isLoading}
					<div class="flex items-center justify-center py-8">
						<Icon icon="tabler:loader-2" class="w-5 h-5 text-gray-400 animate-spin" />
						<span class="ml-2 text-sm text-gray-500">Loading articles...</span>
					</div>
				{:else if filteredArticles().length === 0}
					<div class="text-center py-8 text-gray-500">
						<Icon icon="tabler:file-off" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
						<p class="text-sm">No articles found</p>
					</div>
				{:else}
					<div class="py-2">
						{#each filteredArticles() as article, index (article.id)}
							<button
								type="button"
								onclick={() => handleSelect(article)}
								class="w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors
									{index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}"
							>
								<Icon 
									icon="tabler:file-text" 
									class="w-4 h-4 shrink-0 {index === selectedIndex ? 'text-blue-600' : 'text-gray-400'}" 
								/>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate">{article.title}</p>
									<p class="text-xs text-gray-500 truncate">{article.path}</p>
								</div>
								{#if index === selectedIndex}
									<span class="text-xs text-blue-600 font-medium">Enter ↵</span>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Footer hint -->
			<div class="px-4 py-2 border-t border-gray-100 bg-gray-50">
				<p class="text-xs text-gray-500">
					<Icon icon="tabler:info-circle" class="w-3.5 h-3.5 inline-block mr-1" />
					Links use article IDs for stability when titles or paths change
				</p>
			</div>
		</div>
	</div>
{/if}
