<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import ArticleTree from './ArticleTree.svelte';
	import type { ArticleTreeNode } from '$lib/types/article';
	import { DEFAULT_ICONS } from '$lib/types/article';

	interface Props {
		nodes: ArticleTreeNode[];
		selectedPath?: string | null;
		expandedIds?: Set<string>;
		level?: number;
	}

	const props: Props = $props();
	const nodes = $derived(props.nodes ?? []);
	const selectedPath = $derived(props.selectedPath ?? null);
	const expandedIds = $derived(props.expandedIds ?? new Set<string>());
	const level = $derived(props.level ?? 0);

	const dispatch = createEventDispatcher<{
		select: string;
		toggle: string;
		addChild: { parentId: string; parentPath: string };
		rename: { id: string; path: string; currentTitle: string };
		delete: { id: string; path: string; title: string };
	}>();

	function handleSelect(node: ArticleTreeNode) {
		dispatch('select', node.path);
	}

	function handleToggle(node: ArticleTreeNode, event: MouseEvent) {
		event.stopPropagation();
		dispatch('toggle', node.id);
	}

	function handleAddChild(node: ArticleTreeNode, event: MouseEvent) {
		event.stopPropagation();
		dispatch('addChild', { parentId: node.id, parentPath: node.path });
	}

	function getIcon(node: ArticleTreeNode): string {
		if (node.icon) return node.icon;
		if (node.children && node.children.length > 0) return DEFAULT_ICONS.folder;
		return DEFAULT_ICONS.document;
	}

	function getStatusBadge(status: string): { icon: string; color: string; label: string } {
		switch (status) {
			case 'added':
				return { icon: 'tabler:plus', color: 'text-green-600 bg-green-100', label: 'New' };
			case 'modified':
				return { icon: 'tabler:pencil', color: 'text-blue-600 bg-blue-100', label: 'Draft' };
			case 'removed':
				return { icon: 'tabler:trash', color: 'text-red-600 bg-red-100', label: 'Deleted' };
			case 'renamed':
				return { icon: 'tabler:arrows-right', color: 'text-purple-600 bg-purple-100', label: 'Renamed' };
			default:
				return { icon: 'tabler:file', color: 'text-gray-600 bg-gray-100', label: 'Changed' };
		}
	}
</script>

<ul class="space-y-0.5" role="tree">
	{#each nodes as node (node.id)}
		{@const isExpanded = expandedIds.has(node.id)}
		{@const hasChildren = node.children && node.children.length > 0}
		{@const isSelected = selectedPath === node.path}
		{@const badge = node.changeStatus ? getStatusBadge(node.changeStatus) : null}
		
		<li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined}>
			<div 
				class="group flex items-center gap-1 rounded-md transition-colors
					{isSelected ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}
					{node.changeStatus === 'removed' ? 'opacity-60 line-through' : ''}"
				style="padding-left: {level * 12 + 4}px"
			>
				<!-- Expand/Collapse button -->
				<button
					type="button"
					onclick={(e) => handleToggle(node, e)}
					class="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200 transition-colors shrink-0
						{hasChildren ? 'visible' : 'invisible'}"
					aria-label={isExpanded ? 'Collapse' : 'Expand'}
				>
					<Icon 
						icon="tabler:chevron-right" 
						class="w-3.5 h-3.5 text-gray-500 transition-transform {isExpanded ? 'rotate-90' : ''}" 
					/>
				</button>

				<!-- Main clickable area -->
				<button
					type="button"
					onclick={() => handleSelect(node)}
					class="flex-1 flex items-center gap-2 py-1.5 pr-2 text-left min-w-0"
				>
					<!-- Icon -->
					<Icon 
						icon={getIcon(node)} 
						class="w-4 h-4 shrink-0 {isSelected ? 'text-blue-600' : 'text-gray-500'}" 
					/>
					
					<!-- Title -->
					<span class="truncate text-sm {isSelected ? 'font-medium' : ''}">{node.title}</span>
					
					<!-- Status badge -->
					{#if badge}
						<span 
							class="flex items-center gap-0.5 px-1 py-0.5 rounded text-xs font-medium shrink-0 {badge.color}" 
							title={badge.label}
						>
							<Icon icon={badge.icon} class="w-3 h-3" />
						</span>
					{/if}
				</button>

				<!-- Add child button (visible on hover) -->
				<button
					type="button"
					onclick={(e) => handleAddChild(node, e)}
					class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 
						opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
					aria-label="Add child article"
					title="Add child article"
				>
					<Icon icon="tabler:plus" class="w-3.5 h-3.5 text-gray-500" />
				</button>
			</div>

			<!-- Children (recursive) -->
			{#if hasChildren && isExpanded}
				<ArticleTree
					nodes={node.children}
					{selectedPath}
					{expandedIds}
					level={level + 1}
					on:select
					on:toggle
					on:addChild
					on:rename
					on:delete
				/>
			{/if}
		</li>
	{/each}
</ul>
