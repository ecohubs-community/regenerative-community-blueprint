<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { sidebarOpen, toggleSidebar, closeSidebar, contentSidebarMode, setContentSidebarMode } from '$lib/stores/ui';
	import ArticleTreeSidebar from '$lib/components/admin/ArticleTreeSidebar.svelte';
	import ResizableSidebar from '$lib/components/admin/ResizableSidebar.svelte';
	import ReviewChangesModal from '$lib/components/admin/ReviewChangesModal.svelte';
	import UserMenu from '$lib/components/admin/UserMenu.svelte';
	import WorkspaceModal from '$lib/components/admin/WorkspaceModal.svelte';
	import Icon from '@iconify/svelte';
	import type { ArticleTreeNode } from '$lib/types/article';

	interface Workspace {
		name: string;
		fullName: string;
		commit: string;
		isDefault: boolean;
	}

	interface WorkspacesResponse {
		workspaces: Workspace[];
		currentUser: string;
		defaultWorkspace: string;
		currentWorkspace?: string;
		currentBranch?: string;
	}

	let { children, data } = $props();

	// Track current route for layout state
	const currentPath = $derived(page.url.pathname);
	const isLoginPage = $derived(currentPath === '/admin/login');
	const isContentPage = $derived(currentPath.startsWith('/admin/content'));

	// Workspace management
	let workspaces = $state<Workspace[]>([]);
	let currentWorkspace = $state('workspace');
	let currentBranch = $state('main');
	let isLoadingWorkspaces = $state(true);
	let isSwitchingWorkspace = $state(false);
	let showWorkspaceModal = $state(false);
	let isSidebarOpen = $state(false);
	let currentContentSidebarMode = $state<'main' | 'content'>('main');
	let sidebarUnsubscribe: (() => void) | null = null;
	let contentSidebarModeUnsubscribe: (() => void) | null = null;
	
	// Article tree state (new unified structure)
	let articleTree = $state<ArticleTreeNode[]>([]);
	let isLoadingArticleTree = $state(false);
	let selectedArticlePath = $state<string | null>(null);
	
	// Workspace changes tracking
	let workspaceChanges = $state<{ files: any[], commitCount: number } | null>(null);
	let isLoadingChanges = $state(false);
	let showReviewModal = $state(false);

	// Count of uncommitted changes for badge
	const uncommittedCount = $derived(workspaceChanges?.files.length ?? 0);

	async function loadWorkspaces() {
		try {
			const response = await fetch('/api/branches');
			if (response.ok) {
				const responseData: WorkspacesResponse = await response.json();
				workspaces = responseData.workspaces;
				
				// Set current workspace from session
				if (responseData.currentWorkspace) {
					currentWorkspace = responseData.currentWorkspace;
					currentBranch = responseData.currentBranch || currentBranch;
				} else {
					// Auto-select default workspace if none is selected
					const defaultWorkspace = workspaces.find(w => w.isDefault) || workspaces[0];
					if (defaultWorkspace) {
						await switchWorkspace(defaultWorkspace.name);
					}
				}
			}
		} catch (error) {
			console.error('Failed to load workspaces:', error);
		} finally {
			isLoadingWorkspaces = false;
		}
	}

	async function switchWorkspace(workspaceName: string) {
		if (isSwitchingWorkspace) return;

		isSwitchingWorkspace = true;
		try {
			const response = await fetch('/api/branches/switch', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ workspaceName })
			});

			if (response.ok) {
				const result = await response.json();
				currentWorkspace = result.currentWorkspace;
				currentBranch = result.currentBranch;
				
				// Reload the page to refresh content
				window.location.reload();
			} else {
				console.error('Failed to switch workspace');
			}
		} catch (error) {
			console.error('Failed to switch workspace:', error);
		} finally {
			isSwitchingWorkspace = false;
		}
	}

	async function createWorkspace(name: string, baseBranch?: string) {
		try {
			const response = await fetch('/api/branches/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					workspaceName: name,
					fromWorkspace: baseBranch || currentWorkspace 
				})
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Workspace created:', result);
				
				// Reload workspaces and switch to new one
				await loadWorkspaces();
				await switchWorkspace(result.workspace.name);
			} else {
				const error = await response.json();
				console.error('Failed to create workspace:', error.error);
				alert(`Failed to create workspace: ${error.error}`);
			}
		} catch (error) {
			console.error('Failed to create workspace:', error);
			alert('Failed to create workspace');
		}
	}

	async function loadArticleTree() {
		isLoadingArticleTree = true;
		try {
			const response = await fetch('/api/content/tree?format=tree');
			if (response.ok) {
				const responseData = await response.json();
				articleTree = responseData.articles || [];
			}
		} catch (error) {
			console.error('Failed to load article tree:', error);
		} finally {
			isLoadingArticleTree = false;
		}
	}

	async function loadWorkspaceChanges() {
		isLoadingChanges = true;
		try {
			const response = await fetch('/api/content/workspace-changes');
			if (response.ok) {
				const responseData = await response.json();
				workspaceChanges = {
					files: responseData.files,
					commitCount: responseData.commitCount
				};
			}
		} catch (error) {
			console.error('Failed to load workspace changes:', error);
			workspaceChanges = null;
		} finally {
			isLoadingChanges = false;
		}
	}

	function handleArticleSelect(event: CustomEvent<string>) {
		selectedArticlePath = event.detail;
		// Dispatch event to content page
		window.dispatchEvent(new CustomEvent('articleSelect', { detail: event.detail }));
	}

	function handleAddArticle(event: CustomEvent<{ parentId: string | null; parentPath: string | null }>) {
		// Dispatch event to content page
		window.dispatchEvent(new CustomEvent('addArticle', { detail: event.detail }));
	}

	async function handleCreatePR(title: string, body: string, selectedFiles?: string[]) {
		const sessionCookie = document.cookie
			.split('; ')
			.find(row => row.startsWith('session='))
			?.split('=')[1];

		if (!sessionCookie) {
			throw new Error('No session found');
		}

		const session = JSON.parse(decodeURIComponent(sessionCookie));
		const branch = url.searchParams.get('branch') || session.currentBranch || 'main';

		// If selectedFiles is provided, we need to create a selective PR
		// For now, we create a PR with all changes and note the selection in the body
		// A more advanced implementation would create a temporary branch with only selected files
		let prBody = body;
		if (selectedFiles && selectedFiles.length > 0 && workspaceChanges) {
			const allFiles = workspaceChanges.files.map(f => f.filename);
			const excludedFiles = allFiles.filter(f => !selectedFiles.includes(f));
			if (excludedFiles.length > 0) {
				prBody += `\n\n> **Note:** This PR includes ${selectedFiles.length} of ${allFiles.length} changed files.`;
			}
		}

		const response = await fetch('/api/pull-request/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				body: prBody,
				head: workspaceBranch,
				base: 'main',
				draft: false
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Failed to create pull request');
		}

		const result = await response.json();
		
		// Show success message and open PR in new tab
		alert(`Pull request created successfully!\n\nPR #${result.pullRequest.number}: ${result.pullRequest.title}\n\nOpening in GitHub for review...`);
		window.open(result.pullRequest.html_url, '_blank');
		
		// Reload workspace changes after PR creation
		await loadWorkspaceChanges();
	}

	async function handleRevertFile(path: string) {
		const response = await fetch('/api/content/revert', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ path })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Failed to revert file');
		}

		// Reload article tree and workspace changes
		loadArticleTree();
		loadWorkspaceChanges();
	}

	onMount(() => {
		loadWorkspaces();
		loadWorkspaceChanges();
		
		// Subscribe to sidebar states
		sidebarUnsubscribe = sidebarOpen.subscribe((value) => {
			isSidebarOpen = value;
		});
		
		contentSidebarModeUnsubscribe = contentSidebarMode.subscribe((value) => {
			currentContentSidebarMode = value;
		});
		
		// Load article tree when on content page
		if (currentPath.startsWith('/admin/content')) {
			loadArticleTree();
			setContentSidebarMode('content');
		}
		
		// Listen for reload article tree event
		const handleReloadArticleTree = () => {
			loadArticleTree();
			loadWorkspaceChanges(); // Also reload changes when content changes
		};
		window.addEventListener('reloadArticleTree', handleReloadArticleTree);
		
		// Listen for open review modal event (from dashboard quick actions)
		const handleOpenReviewModal = () => {
			if (workspaceChanges && workspaceChanges.files.length > 0) {
				showReviewModal = true;
			}
		};
		window.addEventListener('openReviewModal', handleOpenReviewModal);
		
		return () => {
			window.removeEventListener('reloadArticleTree', handleReloadArticleTree);
			window.removeEventListener('openReviewModal', handleOpenReviewModal);
		};
	});

	onDestroy(() => {
		sidebarUnsubscribe?.();
		contentSidebarModeUnsubscribe?.();
	});

	$effect(() => {
		currentPath;
		closeSidebar();
		
		// Switch sidebar mode based on route
		if (currentPath.startsWith('/admin/content')) {
			setContentSidebarMode('content');
			if (articleTree.length === 0 && !isLoadingArticleTree) {
				loadArticleTree();
			}
		} else {
			setContentSidebarMode('main');
		}
	});
</script>

{#if !isLoginPage}
	<div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
		<!-- Header -->
		<header class="bg-white border-b border-gray-200 sticky top-0 z-30">
			<div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<!-- Left: Logo + Mobile menu + Workspace -->
				<div class="flex items-center gap-4">
					{#if isContentPage}
						<button
							onclick={toggleSidebar}
							class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
							aria-label="Toggle navigation"
						>
							<Icon icon="tabler:menu-2" class="w-5 h-5" />
						</button>
					{/if}
					
					<!-- Logo -->
					<a href="/admin" class="flex items-center gap-2 group">
						<div class="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
							E
						</div>
						<span class="text-lg font-bold text-gray-900 hidden sm:block">EcoHubs</span>
					</a>

					<!-- Workspace indicator with edit button -->
					<div class="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
						<div class="text-sm">
							<p class="text-xs text-gray-500">Workspace</p>
							<div class="flex items-center gap-1.5">
								<span class="font-medium text-gray-900">{currentWorkspace || 'Loading…'}</span>
								<button
									onclick={() => showWorkspaceModal = true}
									class="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
									aria-label="Change workspace"
								>
									<Icon icon="tabler:edit" class="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Right: Actions + User menu -->
				<div class="flex items-center gap-3">

					<!-- Review & Publish button -->
					{#if !isLoadingChanges}
						{#if uncommittedCount > 0}
							<button
								onclick={() => showReviewModal = true}
								class="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
							>
								<Icon icon="tabler:git-pull-request" class="w-4 h-4" />
								<span class="hidden sm:inline">Review & Publish</span>
								<span class="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
									{uncommittedCount}
								</span>
							</button>
						{:else}
							<div class="text-sm text-gray-400 hidden sm:flex items-center gap-1.5">
								<Icon icon="tabler:check" class="w-4 h-4" />
								No pending changes
							</div>
						{/if}
					{/if}

					<!-- User Menu -->
					<UserMenu user={data?.user} />
				</div>
			</div>
		</header>

		<!-- Main layout -->
		<div class="flex flex-1 overflow-hidden">
			<!-- Mobile sidebar overlay -->
			{#if isContentPage}
				<div 
					class={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-200 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
					onclick={closeSidebar}
					onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
					role="button"
					tabindex="-1"
					aria-label="Close sidebar"
				></div>

				<!-- Sidebar - only on content page -->
				<aside 
					class={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none lg:mt-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} 
					aria-label="Content navigation"
				>
					<!-- Mobile header -->
					<div class="flex items-center justify-between px-4 h-16 border-b border-gray-100 lg:hidden">
						<span class="text-sm font-semibold text-gray-900">Articles</span>
						<button
							onclick={closeSidebar}
							class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
							aria-label="Close sidebar"
						>
							<Icon icon="tabler:x" class="w-5 h-5" />
						</button>
					</div>
					
					<!-- Desktop: Resizable sidebar -->
					<div class="hidden lg:block h-full">
						<ResizableSidebar minWidth={220} maxWidth={450} defaultWidth={280} storageKey="article-sidebar-width">
							<ArticleTreeSidebar
								articles={articleTree}
								isLoading={isLoadingArticleTree}
								selectedPath={selectedArticlePath}
								workspaceChanges={workspaceChanges?.files}
								on:select={handleArticleSelect}
								on:addArticle={handleAddArticle}
							/>
						</ResizableSidebar>
					</div>
					
					<!-- Mobile: Fixed width sidebar -->
					<div class="lg:hidden h-[calc(100%-4rem)] w-72 overflow-y-auto">
						<ArticleTreeSidebar
							articles={articleTree}
							isLoading={isLoadingArticleTree}
							selectedPath={selectedArticlePath}
							workspaceChanges={workspaceChanges?.files}
							on:select={handleArticleSelect}
							on:addArticle={handleAddArticle}
						/>
					</div>
				</aside>
			{/if}

			<!-- Main content area -->
			<main class="flex-1 w-full overflow-hidden">
				<div class={`h-full ${isContentPage ? '' : 'py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto'}`}>
					{@render children()}
				</div>
			</main>
		</div>
	</div>

	<!-- Workspace Modal -->
	<WorkspaceModal
		bind:isOpen={showWorkspaceModal}
		workspaces={workspaces}
		currentWorkspace={currentWorkspace}
		isLoading={isLoadingWorkspaces}
		onClose={() => showWorkspaceModal = false}
		onSwitch={switchWorkspace}
		onCreate={createWorkspace}
	/>

	<!-- Review Changes Modal -->
	<ReviewChangesModal
		bind:isOpen={showReviewModal}
		bind:workspaceChanges={workspaceChanges}
		currentWorkspace={currentWorkspace}
		onClose={() => showReviewModal = false}
		onCreatePR={handleCreatePR}
		onRevert={handleRevertFile}
		onRefresh={loadWorkspaceChanges}
	/>
{:else}
	{@render children()}
{/if}
