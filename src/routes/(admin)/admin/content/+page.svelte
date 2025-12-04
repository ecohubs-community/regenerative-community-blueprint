<script lang="ts">
	import { onMount } from 'svelte';
	import { contentSidebarMode, setContentSidebarMode } from '$lib/stores/ui';
	import SimpleEditor from '$lib/components/SimpleEditor.svelte';
	import ContentPreview from '$lib/components/ContentPreview.svelte';
	import PublishingWorkflow from '$lib/components/PublishingWorkflow.svelte';
	import ContentSidebar from '$lib/components/ContentSidebar.svelte';

	interface ContentNode {
		path: string;
		type: 'file' | 'dir';
		name: string;
		children?: ContentNode[];
		content_type?: 'domain' | 'topic' | 'module' | 'article';
		metadata?: Record<string, any>;
	}

	interface Frontmatter {
		title?: string;
		climate?: string[];
		budget?: string;
		size?: string;
		modules?: string[];
		description?: string;
		domain?: string;
		topic?: string;
		[key: string]: unknown;
	}

	interface EditorContent {
		frontmatter: Frontmatter;
		content: string;
	}

	let contentTree = $state<ContentNode[]>([]);
	let isLoadingTree = $state(true);
	let selectedFile = $state<string | null>(null);
	let fileContent = $state<EditorContent | null>(null);
	let isLoadingFile = $state(false);
	let isSaving = $state(false);
	let activeTab = $state<'edit' | 'preview' | 'publish'>('edit');
	let showNewContentDialog = $state(false);
	let newContentType = $state<'domain' | 'topic' | 'module' | 'article' | null>(null);
	let newContentParent = $state<string | null>(null);
	let newContentName = $state('');
	let newContentTitle = $state('');
	let currentSidebarMode = $state<'main' | 'content'>('content');

	async function loadContentTree() {
		try {
			const response = await fetch('/api/content/tree');
			if (response.ok) {
				const data = await response.json();
				contentTree = data.tree || [];
			}
		} catch (error) {
			console.error('Failed to load content tree:', error);
		} finally {
			isLoadingTree = false;
		}
	}

	async function loadFileContent(path: string) {
		if (selectedFile === path) return; // Already loaded

		selectedFile = path;
		isLoadingFile = true;

		try {
			const response = await fetch(`/api/content/${encodeURIComponent(path)}`);
			if (response.ok) {
				const data = await response.json();
				fileContent = {
					frontmatter: data.frontmatter || {},
					content: data.content || ''
				};
			} else {
				fileContent = null;
			}
		} catch (error) {
			console.error('Failed to load file content:', error);
			fileContent = null;
		} finally {
			isLoadingFile = false;
		}
	}

	async function saveContent(content: EditorContent) {
		if (!selectedFile) return;

		isSaving = true;
		try {
			const response = await fetch(`/api/content/${selectedFile}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: content.content,
					frontmatter: content.frontmatter,
					message: `Update ${selectedFile}`
				})
			});

			if (!response.ok) {
				throw new Error('Failed to save content');
			}
			
			// Return success for the editor to update its status
			return Promise.resolve();
		} catch (error) {
			console.error('Failed to save content:', error);
			throw error;
		} finally {
			isSaving = false;
		}
	}

	async function deleteFile() {
		if (!selectedFile) return;

		if (!confirm(`Are you sure you want to delete ${selectedFile}?`)) {
			return;
		}

		try {
			const response = await fetch('/api/content/delete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ path: selectedFile })
			});

			if (response.ok) {
				// Clear selection and reload tree
				selectedFile = null;
				fileContent = null;
				await loadContentTree();
			} else {
				console.error('Failed to delete file');
			}
		} catch (error) {
			console.error('Failed to delete file:', error);
		}
	}

	async function handlePublish(action: string) {
		if (!selectedFile) return;

		try {
			const response = await fetch('/api/content/publish', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					path: selectedFile,
					action
				})
			});

			if (!response.ok) {
				throw new Error('Failed to execute publish action');
			}

			const result = await response.json();
			console.log('Publish action completed:', result);
			
			// Show success message
			alert(`Successfully executed ${action} action for ${selectedFile}`);
		} catch (error) {
			console.error('Publish action failed:', error);
			throw error;
		}
	}

	onMount(() => {
		loadContentTree();
		
		// Listen for content selection from layout sidebar
		const handleContentSelectEvent = (event: Event) => {
			const customEvent = event as CustomEvent<string>;
			handleSelect(customEvent.detail);
		};
		
		// Listen for add content events from layout sidebar
		const handleAddContentEvent = (event: Event) => {
			const customEvent = event as CustomEvent<{ type: 'domain' | 'topic' | 'module' | 'article'; parent: string | null }>;
			handleAddContent(customEvent.detail.type, customEvent.detail.parent);
		};
		
		window.addEventListener('contentSelect', handleContentSelectEvent);
		window.addEventListener('addContent', handleAddContentEvent);
		
		return () => {
			window.removeEventListener('contentSelect', handleContentSelectEvent);
			window.removeEventListener('addContent', handleAddContentEvent);
		};
	});

	function handleSelect(path: string) {
		// Only load content for articles (markdown files)
		if (path.endsWith('.md')) {
			loadFileContent(path);
		}
	}

	function handleAddContent(type: 'domain' | 'topic' | 'module' | 'article', parent: string | null) {
		newContentType = type;
		newContentParent = parent;
		newContentName = '';
		newContentTitle = '';
		showNewContentDialog = true;
	}

	async function createNewContent() {
		if (!newContentType || !newContentTitle) return;
		
		// Auto-generate filename from title
		const autoGeneratedName = newContentTitle
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
		
		const fileName = newContentName || autoGeneratedName;
		
		try {
			let path = '';
			let content = '';
			let frontmatter: Record<string, any> = {};
			
			switch (newContentType) {
				case 'domain':
					path = `domains/${fileName}.json`;
					content = JSON.stringify({
						title: newContentTitle,
						description: ''
					}, null, 2);
					break;
				case 'topic':
					path = `topics/${fileName}.json`;
					content = JSON.stringify({
						title: newContentTitle,
						domain: newContentParent,
						description: ''
					}, null, 2);
					break;
				case 'module':
					path = `modules/${fileName}.json`;
					content = JSON.stringify({
						title: newContentTitle,
						topic: newContentParent,
						description: ''
					}, null, 2);
					break;
				case 'article':
					path = `articles/${fileName}.md`;
					frontmatter = {
						title: newContentTitle,
						modules: [newContentParent],
						climate: [],
						budget: '',
						size: '',
						summary: ''
					};
					content = 'Content goes here...';
					break;
			}
			
			const response = await fetch(`/api/content/${path}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content,
					frontmatter,
					message: `Create new ${newContentType}: ${newContentTitle}`
				})
			});
			
			if (response.ok) {
				// Reset form and reload tree
				showNewContentDialog = false;
				newContentType = null;
				newContentParent = null;
				newContentName = '';
				newContentTitle = '';
				await loadContentTree();
				
				// Notify layout to reload content tree
				window.dispatchEvent(new CustomEvent('reloadContentTree'));
				
				// Select the newly created file only if it's an article
				if (newContentType === 'article') {
					await loadFileContent(path);
				}
			} else {
				const error = await response.json();
				console.error('Failed to create content:', error);
				alert(`Failed to create content: ${error.error || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Failed to create content:', error);
			alert('Failed to create content');
		}
	}
</script>

<svelte:head>
	<title>Content Management - EcoHubs Admin</title>
</svelte:head>

<div class="space-y-6">
	<section class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[500px]">
		{#if selectedFile}
			<div class="border-b border-gray-100 pb-4 mb-6">
				<div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<p class="text-xs uppercase tracking-wide text-gray-500">Editing file</p>
						<h2 class="text-lg font-semibold text-gray-900 break-all">{selectedFile}</h2>
					</div>
					<div class="flex gap-2">
						<button
							onclick={deleteFile}
							class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm disabled:opacity-50"
							disabled={isSaving}
						>
							Delete
						</button>
					</div>
				</div>
			</div>

			<div>
				<div class="border-b border-gray-200 mb-6">
					<nav class="-mb-px flex space-x-6">
						<button
							onclick={() => activeTab = 'edit'}
							class={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'edit' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
						>
							Edit
						</button>
						<button
							onclick={() => activeTab = 'preview'}
							class={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
						>
							Preview
						</button>
						<button
							onclick={() => activeTab = 'publish'}
							class={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'publish' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
						>
							Publish
						</button>
					</nav>
				</div>

				{#if isLoadingFile}
					<div class="flex justify-center py-8 text-gray-500">Loading file content…</div>
				{:else if fileContent}
					{#if activeTab === 'edit'}
						<SimpleEditor bind:content={fileContent} onSave={saveContent} />
					{:else if activeTab === 'preview'}
						<ContentPreview content={fileContent} />
					{:else}
						<PublishingWorkflow filePath={selectedFile} content={fileContent} onPublish={handlePublish} />
					{/if}
				{:else}
					<div class="text-center py-8 text-gray-500">Failed to load file content</div>
				{/if}
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center text-center text-gray-500 py-16">
				<p class="text-lg font-semibold mb-2">No file selected</p>
				<p class="text-sm">Select a file from the sidebar to start editing the blueprint content.</p>
			</div>
		{/if}
	</section>
</div>

{#if showNewContentDialog}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg p-6 w-96">
			<h3 class="text-lg font-medium text-gray-900 mb-4">
				{#if newContentType === 'domain'}
					Create New Domain
				{:else if newContentType === 'topic'}
					Create New Topic in {newContentParent}
				{:else if newContentType === 'module'}
					Create New Module in {newContentParent}
				{:else if newContentType === 'article'}
					Create New Article for {newContentParent}
				{:else}
					Create New Content
				{/if}
			</h3>
			
			<div class="mb-4">
				<label for="content-title" class="block text-sm font-medium text-gray-700 mb-2">
					{#if newContentType === 'article'}
						Title
					{:else}
						Name
					{/if}
				</label>
				<input
					id="content-title"
					type="text"
					bind:value={newContentTitle}
					placeholder={newContentType === 'article' ? 'Article title' : `${newContentType?.charAt(0).toUpperCase()}${newContentType?.slice(1)} name`}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				/>
				<p class="mt-1 text-xs text-gray-500">
					Filename will be auto-generated from this {newContentType === 'article' ? 'title' : 'name'}
				</p>
			</div>

			<div class="flex justify-end space-x-2">
				<button
					onclick={() => {
						showNewContentDialog = false;
						newContentType = null;
						newContentParent = null;
						newContentName = '';
						newContentTitle = '';
					}}
					class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
				>
					Cancel
				</button>
				<button
					onclick={createNewContent}
					disabled={!newContentTitle.trim()}
					class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Create {newContentType || 'Content'}
				</button>
			</div>
		</div>
	</div>
{/if}
