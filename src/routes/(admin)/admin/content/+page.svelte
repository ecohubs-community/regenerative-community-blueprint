<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleEditor from '$lib/components/admin/ArticleEditor.svelte';
	import ArticleSidebar from '$lib/components/admin/ArticleSidebar.svelte';
	import Icon from '@iconify/svelte';
	import type { ArticleTreeNode } from '$lib/types/article';
	import { generateArticleId, generateSlug } from '$lib/types/article';

	interface ArticleFrontmatter {
		id?: string;
		title?: string;
		icon?: string;
		parentId?: string | null;
		order?: number;
		climate?: string[];
		budget?: string[];
		size?: string[];
		summary?: string;
		[key: string]: unknown;
	}

	interface EditorContent {
		frontmatter: ArticleFrontmatter;
		content: string;
	}

	// Article tree for finding children
	let articleTree = $state<ArticleTreeNode[]>([]);
	let selectedFile = $state<string | null>(null);
	let fileContent = $state<EditorContent | null>(null);
	let isLoadingFile = $state(false);
	let isSaving = $state(false);
	let showSidebar = $state(false);
	let showNewArticleDialog = $state(false);
	let newArticleParentId = $state<string | null>(null);
	let newArticleTitle = $state('');

	// Find child articles for the current article
	const childArticles = $derived(() => {
		if (!fileContent?.frontmatter?.id) return [];
		const currentId = fileContent.frontmatter.id;
		
		// Recursively find direct children in the tree
		function findDirectChildren(nodes: ArticleTreeNode[]): ArticleTreeNode[] {
			const children: ArticleTreeNode[] = [];
			for (const node of nodes) {
				if (node.parentId === currentId) {
					children.push(node);
				}
				if (node.children.length > 0) {
					children.push(...findDirectChildren(node.children));
				}
			}
			return children;
		}
		
		return findDirectChildren(articleTree);
	});

	async function loadArticleTree() {
		try {
			const response = await fetch('/api/content/tree?format=tree');
			if (response.ok) {
				const data = await response.json();
				articleTree = data.articles || [];
			}
		} catch (error) {
			console.error('Failed to load article tree:', error);
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
				
				// Ensure article has an ID
				if (!fileContent.frontmatter.id) {
					fileContent.frontmatter.id = generateArticleId();
				}
			} else if (response.status === 404) {
				console.warn('File not found, clearing selection:', path);
				selectedFile = null;
				fileContent = null;
				showSidebar = false;
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
				if (response.status === 409) {
					const data = await response.json().catch(() => ({}));
					alert(data.error || 'Content conflict: this file has changed since you opened it. Please reload and try again.');
				} else {
					throw new Error('Failed to save content');
				}
			}
			
			// Notify layout to reload article tree (title may have changed)
			window.dispatchEvent(new CustomEvent('reloadArticleTree'));
			
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

		if (!confirm(`Are you sure you want to delete this article?`)) {
			return;
		}

		try {
			const response = await fetch('/api/content/delete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ path: selectedFile })
			});

			if (response.ok || response.status === 404) {
				selectedFile = null;
				fileContent = null;
				showSidebar = false;
				window.dispatchEvent(new CustomEvent('reloadArticleTree'));
			} else {
				console.error('Failed to delete file');
			}
		} catch (error) {
			console.error('Failed to delete file:', error);
		}
	}

	function triggerAutoSave() {
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
			alert(`Successfully executed ${action} action for ${selectedFile}`);
		} catch (error) {
			console.error('Publish action failed:', error);
			throw error;
		}
	}

	function handleArticleSelect(path: string) {
		if (path.endsWith('.md')) {
			loadFileContent(path);
		}
	}

	function handleAddArticle(parentId: string | null) {
		newArticleParentId = parentId;
		newArticleTitle = '';
		showNewArticleDialog = true;
	}

	function handleTitleChange(newTitle: string) {
		// Title is already updated in fileContent via binding
		// Just trigger a save
		triggerAutoSave();
	}

	function handleSelectChild(path: string) {
		handleArticleSelect(path);
	}

	function handleAddChildFromEditor() {
		if (fileContent?.frontmatter?.id) {
			handleAddArticle(fileContent.frontmatter.id);
		}
	}

	async function createNewArticle() {
		if (!newArticleTitle.trim()) return;
		
		const id = generateArticleId();
		const slug = generateSlug(newArticleTitle);
		const path = `articles/${slug}.md`;
		
		const frontmatter: ArticleFrontmatter = {
			id,
			title: newArticleTitle,
			parentId: newArticleParentId,
			order: 0
		};
		
		try {
			const response = await fetch(`/api/content/${path}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: '',
					frontmatter,
					message: `Create new article: ${newArticleTitle}`
				})
			});
			
			if (response.ok) {
				showNewArticleDialog = false;
				newArticleParentId = null;
				newArticleTitle = '';
				
				// Reload tree and select the new article
				await loadArticleTree();
				window.dispatchEvent(new CustomEvent('reloadArticleTree'));
				await loadFileContent(path);
			} else {
				const error = await response.json();
				console.error('Failed to create article:', error);
				alert(`Failed to create article: ${error.error || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Failed to create article:', error);
			alert('Failed to create article');
		}
	}

	onMount(() => {
		loadArticleTree();
		
		// Listen for article selection from layout sidebar
		const handleArticleSelectEvent = (event: Event) => {
			const customEvent = event as CustomEvent<string>;
			handleArticleSelect(customEvent.detail);
		};
		
		// Listen for add article events from layout sidebar
		const handleAddArticleEvent = (event: Event) => {
			const customEvent = event as CustomEvent<{ parentId: string | null; parentPath: string | null }>;
			handleAddArticle(customEvent.detail.parentId);
		};
		
		window.addEventListener('articleSelect', handleArticleSelectEvent);
		window.addEventListener('addArticle', handleAddArticleEvent);
		
		return () => {
			window.removeEventListener('articleSelect', handleArticleSelectEvent);
			window.removeEventListener('addArticle', handleAddArticleEvent);
		};
	});
</script>

<svelte:head>
	<title>Content Management - EcoHubs Admin</title>
</svelte:head>

<div class="h-full bg-white">
	{#if selectedFile}
		<!-- Editor Area -->
		<div class="h-full">
			{#if isLoadingFile}
				<div class="flex justify-center py-16">
					<div class="flex items-center gap-3 text-gray-500">
						<Icon icon="tabler:loader-2" class="w-5 h-5 animate-spin" />
						<span>Loading article...</span>
					</div>
				</div>
			{:else if fileContent}
				<ArticleEditor
					bind:content={fileContent}
					filePath={selectedFile}
					childArticles={childArticles()}
					onSave={saveContent}
					onOpenSidebar={() => (showSidebar = true)}
					on:titleChange={(e) => handleTitleChange(e.detail)}
					on:selectChild={(e) => handleSelectChild(e.detail)}
					on:addChild={handleAddChildFromEditor}
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
				<Icon icon="tabler:file-text" class="w-8 h-8 text-gray-400" />
			</div>
			<h2 class="text-xl font-semibold text-gray-900 mb-2">No article selected</h2>
			<p class="text-gray-500 max-w-sm mb-4">
				Select an article from the sidebar to start editing, or create a new one.
			</p>
			<button
				type="button"
				onclick={() => handleAddArticle(null)}
				class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
			>
				Create New Article
			</button>
		</div>
	{/if}
</div>

<!-- New Article Dialog -->
{#if showNewArticleDialog}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
		<div class="bg-white rounded-xl shadow-xl p-6 w-96 max-w-[90vw]">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">
				{#if newArticleParentId}
					Create Child Article
				{:else}
					Create New Article
				{/if}
			</h3>
			
			<div class="mb-4">
				<label for="article-title" class="block text-sm font-medium text-gray-700 mb-2">
					Title
				</label>
				<input
					id="article-title"
					type="text"
					bind:value={newArticleTitle}
					placeholder="Enter article title..."
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					onkeydown={(e) => e.key === 'Enter' && createNewArticle()}
				/>
				<p class="mt-1 text-xs text-gray-500">
					The filename will be auto-generated from the title
				</p>
			</div>

			<div class="flex justify-end gap-2">
				<button
					type="button"
					onclick={() => {
						showNewArticleDialog = false;
						newArticleParentId = null;
						newArticleTitle = '';
					}}
					class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={createNewArticle}
					disabled={!newArticleTitle.trim()}
					class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Create Article
				</button>
			</div>
		</div>
	</div>
{/if}
