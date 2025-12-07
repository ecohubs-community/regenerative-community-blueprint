<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleEditor from '$lib/components/admin/ArticleEditor.svelte';
	import ArticleSidebar from '$lib/components/admin/ArticleSidebar.svelte';
	import Icon from '@iconify/svelte';
	import type { ArticleTreeNode, EditorContent } from '$lib/types/article';
	import { generateArticleId, generateSlug } from '$lib/types/article';

	// Article tree for finding children
	let articleTree = $state<ArticleTreeNode[]>([]);
	let selectedFile = $state<string | null>(null);
	let fileContent = $state<EditorContent | null>(null);
	let isLoadingFile = $state(false);
	let isSaving = $state(false);
	let showSidebar = $state(false);
	
	// Draft article state - for creating new articles inline
	let isDraftArticle = $state(false);
	let draftParentId = $state<string | null>(null);
	let draftParentPath = $state<string | null>(null);
	let originalDraftTitle = $state('');
	
	// Track original title to detect title changes (for tree reload)
	let originalTitle = $state<string>('');

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
				
				// Store original title for change detection
				originalTitle = fileContent.frontmatter.title || '';
				
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
			
			// Only reload article tree if title changed (not for content-only changes)
			const currentTitle = content.frontmatter.title || '';
			if (currentTitle !== originalTitle) {
				originalTitle = currentTitle;
				window.dispatchEvent(new CustomEvent('reloadArticleTree'));
			}
			
			// Always reload workspace changes after save (to update change markers)
			window.dispatchEvent(new CustomEvent('reloadWorkspaceChanges'));
			
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

	function handleAddArticle(parentId: string | null, parentPath: string | null = null) {
		// Create a draft article inline instead of showing dialog
		isDraftArticle = true;
		draftParentId = parentId;
		draftParentPath = parentPath;
		originalDraftTitle = '';
		selectedFile = null; // Clear any existing selection
		
		// Create draft content
		const id = generateArticleId();
		fileContent = {
			frontmatter: {
				id,
				title: '',
				parentId: parentId,
				order: 0
			},
			content: ''
		};
	}

	async function handleTitleChange(newTitle: string) {
		// Title is already updated in fileContent via binding
		
		// If this is a draft article and we now have a title, save it
		if (isDraftArticle && newTitle.trim()) {
			await saveDraftArticle();
		} else if (!isDraftArticle) {
			// For existing articles, trigger auto-save
			triggerAutoSave();
		}
	}

	async function saveDraftArticle() {
		if (!fileContent?.frontmatter?.title?.trim()) return;
		
		const title = fileContent.frontmatter.title.trim();
		const slug = generateSlug(title);
		
		// Determine the file path based on parent
		// If parent exists, create as child in parent's folder
		let path: string;
		if (draftParentPath) {
			// Extract folder from parent path (e.g., "articles/governance.md" -> "governance")
			const parentFolder = draftParentPath.replace(/^articles\//, '').replace(/\.md$/, '').replace(/_index$/, '');
			path = `articles/${parentFolder}/${slug}.md`;
		} else {
			path = `articles/${slug}.md`;
		}
		
		isSaving = true;
		try {
			const response = await fetch(`/api/content/${path}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: fileContent.content || '',
					frontmatter: fileContent.frontmatter,
					message: `Create new article: ${title}`
				})
			});
			
			if (response.ok) {
				// Successfully created - switch from draft to real article
				isDraftArticle = false;
				selectedFile = path;
				originalDraftTitle = title;
				
				// Reload tree
				await loadArticleTree();
				window.dispatchEvent(new CustomEvent('reloadArticleTree'));
			} else {
				const error = await response.json();
				console.error('Failed to create article:', error);
				alert(`Failed to create article: ${error.error || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Failed to create article:', error);
			alert('Failed to create article');
		} finally {
			isSaving = false;
		}
	}

	function handleSelectChild(path: string) {
		handleArticleSelect(path);
	}

	function handleAddChildFromEditor() {
		if (fileContent?.frontmatter?.id) {
			handleAddArticle(fileContent.frontmatter.id);
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
			handleAddArticle(customEvent.detail.parentId, customEvent.detail.parentPath);
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
	{#if selectedFile || isDraftArticle}
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
				<!-- Draft indicator -->
				{#if isDraftArticle}
					<div class="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-sm text-amber-800">
						<Icon icon="tabler:file-plus" class="w-4 h-4" />
						<span>New article — enter a title and start writing. The file will be created when you save.</span>
						{#if isSaving}
							<Icon icon="tabler:loader-2" class="w-4 h-4 animate-spin ml-auto" />
						{/if}
					</div>
				{/if}
				<ArticleEditor
					bind:content={fileContent}
					filePath={selectedFile || 'articles/new-article.md'}
					childArticles={isDraftArticle ? [] : childArticles()}
					onSave={isDraftArticle ? saveDraftArticle : saveContent}
					onOpenSidebar={isDraftArticle ? undefined : () => (showSidebar = true)}
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

		<!-- Article Sidebar (not shown for drafts) -->
		{#if fileContent && !isDraftArticle}
			<ArticleSidebar
				bind:isOpen={showSidebar}
				bind:content={fileContent}
				filePath={selectedFile || ''}
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

