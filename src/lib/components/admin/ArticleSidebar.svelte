<script lang="ts">
	import ArticleMetadataEditor from './ArticleMetadataEditor.svelte';
	import WorkspaceStatus from './WorkspaceStatus.svelte';
	import Icon from '@iconify/svelte';
	import type { EditorContent } from '$lib/types/article';

	let {
		isOpen = $bindable(false),
		content = $bindable<EditorContent>({ frontmatter: {}, content: '' }),
		filePath = '',
		readonly = false,
		onchange = () => {},
		onPublish = async (_action: string) => {},
	}: {
		isOpen: boolean;
		content: EditorContent;
		filePath: string;
		readonly?: boolean;
		onchange?: () => void;
		onPublish?: (action: string) => Promise<void>;
	} = $props();

	let activeTab = $state<'metadata' | 'status'>('metadata');

	function closeSidebar() {
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeSidebar();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Backdrop -->
{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:bg-transparent md:backdrop-blur-none cursor-default"
		onclick={closeSidebar}
		aria-label="Close sidebar"
	></button>
{/if}

<!-- Sidebar Panel -->
<aside
	class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col {isOpen
		? 'translate-x-0'
		: 'translate-x-full'}"
>
	<!-- Header -->
	<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
		<h2 class="text-base font-semibold text-gray-900">Article Settings</h2>
		<button
			onclick={closeSidebar}
			class="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
			aria-label="Close sidebar"
		>
			<Icon icon="tabler:x" class="w-5 h-5 text-gray-500" />
		</button>
	</div>

	<!-- Tabs -->
	<div class="flex border-b border-gray-100">
		<button
			onclick={() => (activeTab = 'metadata')}
			class="flex-1 px-4 py-2.5 text-sm font-medium transition-colors {activeTab === 'metadata'
				? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
				: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}"
		>
			Metadata
		</button>
		<button
			onclick={() => (activeTab = 'status')}
			class="flex-1 px-4 py-2.5 text-sm font-medium transition-colors {activeTab === 'status'
				? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
				: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}"
		>
			Status
		</button>
	</div>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto">
		{#if activeTab === 'metadata'}
			<div class="p-4">
				<ArticleMetadataEditor
					bind:frontmatter={content.frontmatter}
					{readonly}
					{onchange}
				/>
			</div>
		{:else}
			<div class="p-4">
				<WorkspaceStatus {filePath} {content} {onPublish} />
			</div>
		{/if}
	</div>

</aside>
