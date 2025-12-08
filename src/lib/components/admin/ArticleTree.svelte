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
		draggedNode?: ArticleTreeNode | null;
		dropTarget?: { id: string; position: 'inside' | 'before' | 'after' } | null;
	}

	const props: Props = $props();
	const nodes = $derived(props.nodes ?? []);
	const selectedPath = $derived(props.selectedPath ?? null);
	const expandedIds = $derived(props.expandedIds ?? new Set<string>());
	const level = $derived(props.level ?? 0);
	const draggedNode = $derived(props.draggedNode ?? null);
	const dropTarget = $derived(props.dropTarget ?? null);

	const dispatch = createEventDispatcher<{
		select: string;
		toggle: string;
		addChild: { parentId: string; parentPath: string };
		rename: { id: string; path: string; currentTitle: string };
		delete: { id: string; path: string; title: string };
		dragstart: ArticleTreeNode;
		dragend: void;
		dragover: { node: ArticleTreeNode; position: 'inside' | 'before' | 'after' };
		drop: { draggedNode: ArticleTreeNode; targetNode: ArticleTreeNode | null; position: 'inside' | 'before' | 'after' | 'root' };
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

	// Drag & Drop handlers
	function handleDragStart(event: DragEvent, node: ArticleTreeNode) {
		if (!event.dataTransfer) return;
		
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/plain', node.id);
		
		// Add a small delay to allow the drag image to be captured
		setTimeout(() => {
			dispatch('dragstart', node);
		}, 0);
	}

	function handleDragEnd() {
		dispatch('dragend');
	}

	function handleDragOver(event: DragEvent, node: ArticleTreeNode) {
		event.preventDefault();
		if (!event.dataTransfer) return;
		
		event.dataTransfer.dropEffect = 'move';
		
		// Don't allow dropping on itself or its descendants
		if (draggedNode && (draggedNode.id === node.id || isDescendant(draggedNode, node.id))) {
			return;
		}

		// Determine drop position based on mouse position within the element
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const y = event.clientY - rect.top;
		const height = rect.height;
		
		let position: 'inside' | 'before' | 'after';
		if (y < height * 0.25) {
			position = 'before';
		} else if (y > height * 0.75) {
			position = 'after';
		} else {
			position = 'inside';
		}

		dispatch('dragover', { node, position });
	}

	function handleDragLeave(event: DragEvent) {
		// Only clear if we're leaving the tree item entirely
		const relatedTarget = event.relatedTarget as HTMLElement;
		if (!relatedTarget || !(event.currentTarget as HTMLElement).contains(relatedTarget)) {
			// Don't dispatch here - let parent handle clearing
		}
	}

	function handleDrop(event: DragEvent, node: ArticleTreeNode) {
		event.preventDefault();
		event.stopPropagation();
		
		if (!draggedNode || draggedNode.id === node.id) return;
		
		// Don't allow dropping on descendants
		if (isDescendant(draggedNode, node.id)) return;

		const position = dropTarget?.position || 'inside';
		dispatch('drop', { draggedNode, targetNode: node, position });
	}

	// Check if targetId is a descendant of node
	function isDescendant(node: ArticleTreeNode, targetId: string): boolean {
		if (!node.children) return false;
		for (const child of node.children) {
			if (child.id === targetId) return true;
			if (isDescendant(child, targetId)) return true;
		}
		return false;
	}

	// Get drop indicator classes
	function getDropIndicatorClass(node: ArticleTreeNode): string {
		if (!dropTarget || dropTarget.id !== node.id) return '';
		
		switch (dropTarget.position) {
			case 'before':
				return 'before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-blue-500';
			case 'after':
				return 'after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-blue-500';
			case 'inside':
				return 'ring-2 ring-blue-500 ring-inset bg-blue-50';
			default:
				return '';
		}
	}
</script>

<ul class="space-y-0.5" role="tree">
	{#each nodes as node (node.id)}
		{@const isExpanded = expandedIds.has(node.id)}
		{@const hasChildren = node.children && node.children.length > 0}
		{@const isSelected = selectedPath === node.path}
		{@const badge = node.changeStatus ? getStatusBadge(node.changeStatus) : null}
		{@const isDragging = draggedNode?.id === node.id}
		{@const isDropTarget = dropTarget?.id === node.id}
		
		<li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined}>
			<div 
				role="group"
				class="group flex items-center gap-1 rounded-md transition-colors relative
					{isSelected ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}
					{node.changeStatus === 'removed' ? 'opacity-60 line-through' : ''}
					{isDragging ? 'opacity-50' : ''}
					{getDropIndicatorClass(node)}"
				style="padding-left: {level * 12 + 4}px"
				draggable="true"
				ondragstart={(e) => handleDragStart(e, node)}
				ondragend={handleDragEnd}
				ondragover={(e) => handleDragOver(e, node)}
				ondragleave={handleDragLeave}
				ondrop={(e) => handleDrop(e, node)}
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
					{draggedNode}
					{dropTarget}
					on:select
					on:toggle
					on:addChild
					on:rename
					on:delete
					on:dragstart
					on:dragend
					on:dragover
					on:drop
				/>
			{/if}
		</li>
	{/each}
</ul>
