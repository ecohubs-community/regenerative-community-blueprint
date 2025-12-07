<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import CrepeEditor from '$lib/components/CrepeEditor.svelte';
	import type { ArticleTreeNode, EditorContent } from '$lib/types/article';

	interface Props {
		content: EditorContent;
		filePath: string;
		childArticles?: ArticleTreeNode[];
		onSave?: (content: EditorContent) => Promise<void>;
		onOpenSidebar?: () => void;
	}

	let { 
		content = $bindable(),
		filePath,
		childArticles = [],
		onSave,
		onOpenSidebar
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		titleChange: string;
		selectChild: string;
		addChild: void;
	}>();

	let titleInput: HTMLInputElement;
	let isEditingTitle = $state(false);

	function handleTitleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const newTitle = target.value;
		if (content.frontmatter) {
			content.frontmatter.title = newTitle;
		}
		dispatch('titleChange', newTitle);
	}

	function handleTitleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			isEditingTitle = false;
			titleInput?.blur();
		}
		if (event.key === 'Escape') {
			isEditingTitle = false;
			titleInput?.blur();
		}
	}

	function handleChildClick(child: ArticleTreeNode) {
		dispatch('selectChild', child.path);
	}

	function handleAddChild() {
		dispatch('addChild');
	}

	// Get icon for child article
	function getChildIcon(child: ArticleTreeNode): string {
		return child.icon || 'tabler:file-text';
	}
</script>

<div class="flex flex-col h-full">
	<!-- Title Section -->
	<div class="px-4 pt-6 pb-4 border-b border-gray-100">
		<div class="max-w-4xl mx-auto">
			<!-- Breadcrumb / Path indicator -->
			<div class="text-xs text-gray-400 mb-2 font-mono">
				{filePath}
			</div>
			
			<!-- Editable Title -->
			<input
				bind:this={titleInput}
				type="text"
				value={content.frontmatter?.title || ''}
				oninput={handleTitleChange}
				onkeydown={handleTitleKeydown}
				onfocus={() => isEditingTitle = true}
				onblur={() => isEditingTitle = false}
				placeholder="Untitled"
				class="w-full text-3xl font-bold text-gray-900 bg-transparent border-none outline-none 
					placeholder:text-gray-300 focus:ring-0 p-0
					{isEditingTitle ? 'bg-gray-50 -mx-2 px-2 rounded' : ''}"
			/>
		</div>
	</div>

	<!-- Editor Section -->
	<div class="flex-1 overflow-y-auto">
		<CrepeEditor
			bind:content={content}
			{onSave}
			showSidebarButton={!!onOpenSidebar}
			onOpenSidebar={onOpenSidebar}
		/>

		<!-- Child Articles Section -->
		{#if childArticles.length > 0 || true}
			<div class="max-w-4xl mx-auto px-4 py-8 border-t border-gray-100">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
						<Icon icon="tabler:hierarchy" class="w-4 h-4" />
						Child Articles
					</h3>
					<button
						type="button"
						onclick={handleAddChild}
						class="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 
							hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
					>
						<Icon icon="tabler:plus" class="w-3.5 h-3.5" />
						Add child
					</button>
				</div>

				{#if childArticles.length > 0}
					<div class="grid gap-2">
						{#each childArticles as child (child.id)}
							<button
								type="button"
								onclick={() => handleChildClick(child)}
								class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 
									rounded-lg text-left transition-colors group"
							>
								<div class="w-8 h-8 rounded-lg bg-white border border-gray-200 
									flex items-center justify-center shrink-0 group-hover:border-blue-300">
									<Icon icon={getChildIcon(child)} class="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-medium text-gray-900 truncate">{child.title}</p>
									{#if child.children.length > 0}
										<p class="text-xs text-gray-500">{child.children.length} sub-article{child.children.length !== 1 ? 's' : ''}</p>
									{/if}
								</div>
								<Icon icon="tabler:chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
							</button>
						{/each}
					</div>
				{:else}
					<div class="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
						<Icon icon="tabler:files" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
						<p class="text-sm text-gray-500 mb-2">No child articles yet</p>
						<button
							type="button"
							onclick={handleAddChild}
							class="text-sm text-blue-600 hover:text-blue-800"
						>
							Add the first child article
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
