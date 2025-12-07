<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import ArticleTree from './ArticleTree.svelte';
	import type { ArticleTreeNode } from '$lib/types/article';

	interface FileChange {
		filename: string;
		status: 'added' | 'modified' | 'removed' | 'renamed';
	}

	interface Props {
		articles?: ArticleTreeNode[];
		isLoading?: boolean;
		selectedPath?: string | null;
		workspaceChanges?: FileChange[];
	}

	const props: Props = $props();
	const articles = $derived(props.articles ?? []);
	const isLoading = $derived(props.isLoading ?? false);
	const selectedPath = $derived(props.selectedPath ?? null);
	const workspaceChanges = $derived(props.workspaceChanges ?? []);

	// Track expanded nodes
	let expandedIds = $state(new Set<string>());

	// Search/filter
	let searchQuery = $state('');

	const dispatch = createEventDispatcher<{
		select: string;
		addArticle: { parentId: string | null; parentPath: string | null };
	}>();

	// Build a map of changed files for quick lookup
	const changedFilesMap = $derived(() => {
		const map = new Map<string, FileChange>();
		for (const change of workspaceChanges) {
			const normalizedPath = change.filename.replace(/^content\//, '');
			map.set(normalizedPath, change);
		}
		return map;
	});

	// Apply change status to tree nodes
	function applyChangeStatus(nodes: ArticleTreeNode[]): ArticleTreeNode[] {
		const changesMap = changedFilesMap();
		return nodes.map(node => {
			const change = changesMap.get(node.path);
			return {
				...node,
				hasChanges: !!change,
				changeStatus: change?.status,
				children: node.children ? applyChangeStatus(node.children) : []
			};
		});
	}

	// Filter articles by search query
	function filterArticles(nodes: ArticleTreeNode[], query: string): ArticleTreeNode[] {
		if (!query.trim()) return nodes;
		
		const lowerQuery = query.toLowerCase();
		
		return nodes.reduce<ArticleTreeNode[]>((acc, node) => {
			const matchesTitle = node.title.toLowerCase().includes(lowerQuery);
			const filteredChildren = filterArticles(node.children, query);
			
			if (matchesTitle || filteredChildren.length > 0) {
				acc.push({
					...node,
					children: filteredChildren
				});
				// Auto-expand nodes with matching children
				if (filteredChildren.length > 0) {
					expandedIds.add(node.id);
				}
			}
			return acc;
		}, []);
	}

	const displayedArticles = $derived(() => {
		const withStatus = applyChangeStatus(articles);
		return filterArticles(withStatus, searchQuery);
	});

	function handleSelect(event: CustomEvent<string>) {
		dispatch('select', event.detail);
	}

	function handleToggle(event: CustomEvent<string>) {
		const id = event.detail;
		if (expandedIds.has(id)) {
			expandedIds.delete(id);
		} else {
			expandedIds.add(id);
		}
		expandedIds = new Set(expandedIds); // Trigger reactivity
	}

	function handleAddChild(event: CustomEvent<{ parentId: string; parentPath: string }>) {
		dispatch('addArticle', { 
			parentId: event.detail.parentId, 
			parentPath: event.detail.parentPath 
		});
	}

	function handleAddRootArticle() {
		dispatch('addArticle', { parentId: null, parentPath: null });
	}

	// Expand all nodes that have children
	function expandAll() {
		const collectIds = (nodes: ArticleTreeNode[]) => {
			nodes.forEach(node => {
				if (node.children.length > 0) {
					expandedIds.add(node.id);
					collectIds(node.children);
				}
			});
		};
		collectIds(articles);
		expandedIds = new Set(expandedIds);
	}

	// Collapse all nodes
	function collapseAll() {
		expandedIds = new Set();
	}
</script>

<div class="flex flex-col h-full">
	<!-- Header with search and add button -->
	<div class="px-3 py-3 border-b border-gray-200 space-y-3">
		<!-- Title and Add button -->
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Articles</h2>
			<button
				type="button"
				onclick={handleAddRootArticle}
				class="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
			>
				<Icon icon="tabler:plus" class="w-4 h-4" />
				New
			</button>
		</div>

		<!-- Search input -->
		<div class="relative">
			<Icon 
				icon="tabler:search" 
				class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
			/>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search articles..."
				class="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md 
					focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
			{#if searchQuery}
				<button
					type="button"
					onclick={() => searchQuery = ''}
					class="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600"
				>
					<Icon icon="tabler:x" class="w-3.5 h-3.5" />
				</button>
			{/if}
		</div>

		<!-- Expand/Collapse controls -->
		{#if articles.length > 0}
			<div class="flex items-center gap-2 text-xs">
				<button
					type="button"
					onclick={expandAll}
					class="text-gray-500 hover:text-gray-700"
				>
					Expand all
				</button>
				<span class="text-gray-300">|</span>
				<button
					type="button"
					onclick={collapseAll}
					class="text-gray-500 hover:text-gray-700"
				>
					Collapse all
				</button>
			</div>
		{/if}
	</div>

	<!-- Tree content -->
	<div class="flex-1 overflow-y-auto px-2 py-2">
		{#if isLoading}
			<div class="flex items-center justify-center py-8">
				<Icon icon="tabler:loader-2" class="w-5 h-5 text-gray-400 animate-spin" />
				<span class="ml-2 text-sm text-gray-500">Loading articles...</span>
			</div>
		{:else if displayedArticles().length === 0}
			<div class="text-center py-8">
				{#if searchQuery}
					<p class="text-sm text-gray-500">No articles match "{searchQuery}"</p>
					<button
						type="button"
						onclick={() => searchQuery = ''}
						class="mt-2 text-xs text-blue-600 hover:text-blue-800"
					>
						Clear search
					</button>
				{:else}
					<div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
						<Icon icon="tabler:file-text" class="w-6 h-6 text-gray-400" />
					</div>
					<p class="text-sm text-gray-500 mb-2">No articles yet</p>
					<button
						type="button"
						onclick={handleAddRootArticle}
						class="text-sm text-blue-600 hover:text-blue-800"
					>
						Create your first article
					</button>
				{/if}
			</div>
		{:else}
			<ArticleTree
				nodes={displayedArticles()}
				{selectedPath}
				{expandedIds}
				on:select={handleSelect}
				on:toggle={handleToggle}
				on:addChild={handleAddChild}
			/>
		{/if}
	</div>
</div>
