<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { sidebarOpen, toggleSidebar, closeSidebar, contentSidebarMode, setContentSidebarMode } from '$lib/stores/ui';
	import ContentSidebar from '$lib/components/ContentSidebar.svelte';

	interface Workspace {
		name: string;
		fullName: string;
		commit: string;
		isDefault: boolean;
	}

	interface NavItem {
		label: string;
		href: string;
		icon: string;
		description: string;
		match: (path: string) => boolean;
	}

	const navItems: NavItem[] = [
		{
			label: 'Dashboard',
			href: '/admin',
			icon: '🏠',
			description: 'Overview & workspace status',
			match: (path) => path === '/admin'
		},
		{
			label: 'Content',
			href: '/admin/content',
			icon: '📁',
			description: 'Manage blueprint files',
			match: (path) => path.startsWith('/admin/content')
		},
		{
			label: 'Settings',
			href: '/admin/settings',
			icon: '⚙️',
			description: 'Account & workspace controls',
			match: (path) => path.startsWith('/admin/settings')
		}
	];

	interface WorkspacesResponse {
		workspaces: Workspace[];
		currentUser: string;
		defaultWorkspace: string;
	}

	let { children, data } = $props();

	// Track current route for layout state
	const currentPath = $derived(page.url.pathname);
	const isLoginPage = $derived(currentPath === '/admin/login');

	// Workspace management
	let workspaces = $state<Workspace[]>([]);
	let currentWorkspace = $state('workspace');
	let currentBranch = $state('main');
	let isLoadingWorkspaces = $state(true);
	let isSwitchingWorkspace = $state(false);
	let showCreateWorkspaceDialog = $state(false);
	let newWorkspaceName = $state('');
	let isSidebarOpen = $state(false);
	let currentContentSidebarMode = $state<'main' | 'content'>('main');
	let sidebarUnsubscribe: (() => void) | null = null;
	let contentSidebarModeUnsubscribe: (() => void) | null = null;
	
	// Content tree state
	interface ContentNode {
		path: string;
		type: 'file' | 'dir';
		name: string;
		children?: ContentNode[];
		content_type?: 'domain' | 'topic' | 'module' | 'article';
		metadata?: Record<string, any>;
	}
	
	let contentTree = $state<ContentNode[]>([]);
	let isLoadingContentTree = $state(false);
	let selectedContentFile = $state<string | null>(null);

	async function loadWorkspaces() {
		try {
			const response = await fetch('/api/branches');
			if (response.ok) {
				const data: WorkspacesResponse = await response.json();
				workspaces = data.workspaces;
				
				// Auto-select default workspace if none is selected
				if (!currentWorkspace || currentWorkspace === 'main') {
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

	async function createWorkspace() {
		if (!newWorkspaceName.trim()) return;

		try {
			const response = await fetch('/api/branches/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					workspaceName: newWorkspaceName.trim(),
					fromWorkspace: currentWorkspace 
				})
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Workspace created:', result);
				
				// Reload workspaces and switch to new one
				await loadWorkspaces();
				await switchWorkspace(result.workspace.name);
				
				// Reset form
				newWorkspaceName = '';
				showCreateWorkspaceDialog = false;
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

	async function logout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			goto('/admin/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	async function loadContentTree() {
		isLoadingContentTree = true;
		try {
			const response = await fetch('/api/content/tree');
			if (response.ok) {
				const data = await response.json();
				contentTree = data.tree || [];
			}
		} catch (error) {
			console.error('Failed to load content tree:', error);
		} finally {
			isLoadingContentTree = false;
		}
	}

	function handleContentSelect(event: CustomEvent<string>) {
		selectedContentFile = event.detail;
		// Dispatch event to content page
		window.dispatchEvent(new CustomEvent('contentSelect', { detail: event.detail }));
	}

	function handleAddContent(type: 'domain' | 'topic' | 'module' | 'article', parent: string | null) {
		// Dispatch event to content page
		window.dispatchEvent(new CustomEvent('addContent', { detail: { type, parent } }));
	}

	onMount(() => {
		loadWorkspaces();
		
		// Subscribe to sidebar states
		sidebarUnsubscribe = sidebarOpen.subscribe((value) => {
			isSidebarOpen = value;
		});
		
		contentSidebarModeUnsubscribe = contentSidebarMode.subscribe((value) => {
			currentContentSidebarMode = value;
		});
		
		// Load content tree when on content page
		if (currentPath.startsWith('/admin/content')) {
			loadContentTree();
			setContentSidebarMode('content');
		}
		
		// Listen for reload content tree event
		const handleReloadContentTree = () => {
			loadContentTree();
		};
		window.addEventListener('reloadContentTree', handleReloadContentTree);
		
		return () => {
			window.removeEventListener('reloadContentTree', handleReloadContentTree);
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
			if (contentTree.length === 0 && !isLoadingContentTree) {
				loadContentTree();
			}
		} else {
			setContentSidebarMode('main');
		}
	});

	function isNavActive(item: NavItem) {
		return item.match(currentPath);
	}

	async function handleNavClick(item: NavItem) {
		if (isNavActive(item)) {
			closeSidebar();
			return;
		}
		await goto(item.href);
		closeSidebar();
	}
</script>

{#if !isLoginPage}
	<div class="min-h-screen bg-gray-50 flex">
		<div class={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-200 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onclick={closeSidebar}></div>

		<aside class={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Workspace navigation">
			<div class="flex items-center justify-between px-4 h-16 border-b border-gray-100 lg:hidden">
				<span class="text-sm font-semibold text-gray-900">Workspace menu</span>
				<button
					onclick={closeSidebar}
					class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
					aria-label="Close sidebar"
				>
					✕
				</button>
			</div>
			<div class="h-[calc(100%-4rem)] lg:h-full overflow-y-auto px-4 py-6 space-y-8">
				{#if currentContentSidebarMode === 'content' && currentPath.startsWith('/admin/content')}
					<!-- Content Sidebar -->
					<ContentSidebar
						tree={contentTree}
						isLoading={isLoadingContentTree}
						selectedPath={selectedContentFile}
						showBackButton={true}
						on:select={handleContentSelect}
						on:addDomain={() => handleAddContent('domain', null)}
						on:addTopic={(event) => handleAddContent('topic', event.detail)}
						on:addModule={(event) => handleAddContent('module', event.detail)}
						on:addArticle={(event) => handleAddContent('article', event.detail)}
						on:backToMainMenu={() => setContentSidebarMode('main')}
					/>
				{:else}
					<!-- Main Navigation -->
					{#if currentPath.startsWith('/admin/content')}
						<!-- Show button to go back to content sidebar when on content page -->
						<button
							onclick={() => setContentSidebarMode('content')}
							class="w-full flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4 font-medium px-3 py-2 rounded-md hover:bg-blue-50"
						>
							<span>→</span> Go to Content Navigation
						</button>
					{/if}
					
					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Navigation</p>
						<nav class="space-y-1">
							{#each navItems as item}
								<button
									onclick={() => handleNavClick(item)}
									class={`w-full text-left flex gap-3 rounded-lg px-3 py-2 transition ${isNavActive(item) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
								>
									<span class="text-base leading-6">{item.icon}</span>
									<div class="flex-1">
										<p class="text-sm font-semibold">{item.label}</p>
										<p class="text-xs text-gray-500">{item.description}</p>
									</div>
								</button>
							{/each}
						</nav>
					</div>

					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Workspace</p>
						{#if isLoadingWorkspaces}
							<p class="text-sm text-gray-500">Loading workspaces…</p>
						{:else if workspaces.length > 0}
							<p class="text-base font-semibold text-gray-900">{currentWorkspace}</p>
							<p class="text-xs text-gray-500">Active workspace</p>
						{:else}
							<p class="text-sm text-gray-500">No workspace found</p>
						{/if}
						<button
							onclick={() => showCreateWorkspaceDialog = true}
							class="mt-4 w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
						>
							New Workspace
						</button>
					</div>
				{/if}
			</div>
		</aside>

		<div class="flex-1 flex flex-col min-h-screen">
			<header class="bg-white border-b border-gray-200">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<button
							onclick={toggleSidebar}
							class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
							aria-label="Toggle navigation"
						>
							☰
						</button>
						<div>
							<p class="text-xs uppercase tracking-wide text-gray-500">Current workspace</p>
							<p class="text-base font-semibold text-gray-900">{currentWorkspace || 'Loading…'}</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						{#if isLoadingWorkspaces}
							<div class="text-sm text-gray-500">Loading workspaces…</div>
						{:else if workspaces.length > 0}
							<select 
								value={currentWorkspace}
								onchange={(e) => switchWorkspace(e.currentTarget.value)}
								disabled={isSwitchingWorkspace}
								class="block w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							>
								{#each workspaces as workspace}
									<option value={workspace.name}>
										{workspace.name}
										{#if workspace.isDefault} (default){/if}
									</option>
								{/each}
							</select>
						{/if}

						<button
							onclick={() => showCreateWorkspaceDialog = true}
							class="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
						>
							New Workspace
						</button>

						<button
							onclick={logout}
							class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			<main class="flex-1 w-full">
				<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
					{@render children()}
				</div>
			</main>
		</div>
	</div>

	{#if showCreateWorkspaceDialog}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg p-6 w-96">
				<h3 class="text-lg font-medium text-gray-900 mb-4">Create New Workspace</h3>
				
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Workspace Name
					</label>
					<input
						type="text"
						bind:value={newWorkspaceName}
						placeholder="my-new-workspace"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<p class="mt-1 text-xs text-gray-500">
						Use letters, numbers, dots, hyphens, and underscores only
					</p>
				</div>

				<div class="flex justify-end space-x-2">
					<button
						onclick={() => {
							showCreateWorkspaceDialog = false;
							newWorkspaceName = '';
						}}
						class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
					>
						Cancel
					</button>
					<button
						onclick={createWorkspace}
						disabled={!newWorkspaceName.trim()}
						class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Create Workspace
					</button>
				</div>
			</div>
		</div>
	{/if}
{:else}
	{@render children()}
{/if}
