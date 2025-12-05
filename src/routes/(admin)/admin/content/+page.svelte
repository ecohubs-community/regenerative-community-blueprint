<script lang="ts">
	import { onMount } from 'svelte';
	import { contentSidebarMode, setContentSidebarMode } from '$lib/stores/ui';
	import CrepeEditor from '$lib/components/CrepeEditor.svelte';
	import ArticleSidebar from '$lib/components/admin/ArticleSidebar.svelte';

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
		size?: string[];
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
	let showSidebar = $state(false);
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
				showSidebar = false;
				await loadContentTree();
			} else {
				console.error('Failed to delete file');
			}
		} catch (error) {
			console.error('Failed to delete file:', error);
		}
	}

	function triggerAutoSave() {
		// Trigger auto-save in the editor when metadata changes
		if (fileContent) {
			saveContent(fileContent);
		}
	}

	async function handlePublish(action: string) {
		if (!selectedFile) return;

		try {

			if (action === 'delete') {
				await deleteFile();
				return;
			}

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

<div class="min-h-screen bg-white">
	{#if selectedFile}
		<!-- Editor Area -->
		<div class="max-w-4xl mx-auto px-4 py-8">
			{#if isLoadingFile}
				<div class="flex justify-center py-16">
					<div class="flex items-center gap-3 text-gray-500">
						<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<span>Loading article...</span>
					</div>
				</div>
			{:else if fileContent}
				<CrepeEditor
					bind:content={fileContent}
					onSave={saveContent}
					showSidebarButton={true}
					onOpenSidebar={() => (showSidebar = true)}
				/>
			{:else}
				<div class="text-center py-16 text-gray-500">
					<p>Failed to load article content</p>
				</div>
			{/if}
		</div>

		<!-- Article Sidebar -->
		{#if fileContent}
			<ArticleSidebar
				bind:isOpen={showSidebar}
				bind:content={fileContent}
				filePath={selectedFile}
				onchange={triggerAutoSave}
				onPublish={handlePublish}
			/>
		{/if}
	{:else}
		<!-- Empty State -->
		<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
			<div class="w-16 h-16 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
				<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
			</div>
			<h2 class="text-xl font-semibold text-gray-900 mb-2">No article selected</h2>
			<p class="text-gray-500 max-w-sm">
				Select an article from the sidebar to start editing, or create a new one.
			</p>
		</div>
	{/if}
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
