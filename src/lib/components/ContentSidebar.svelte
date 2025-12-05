<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { backToMainMenu } from '$lib/stores/ui';
	import Icon from '@iconify/svelte';

	interface ContentNode {
		path: string;
		type: 'file' | 'dir';
		name: string;
		children?: ContentNode[];
		content_type?: 'domain' | 'topic' | 'module' | 'article';
		metadata?: Record<string, any>;
	}

	interface FileChange {
		filename: string;
		status: 'added' | 'modified' | 'removed' | 'renamed';
	}

	interface Props {
		tree?: ContentNode[];
		isLoading?: boolean;
		selectedPath?: string | null;
		showBackButton?: boolean;
		workspaceChanges?: FileChange[];
	}

	const props: Props = $props();

	const tree = $derived(props.tree ?? []);
	const isLoading = $derived(props.isLoading ?? false);
	const selectedPath = $derived(props.selectedPath ?? null);
	const showBackButton = $derived(props.showBackButton ?? false);
	const workspaceChanges = $derived(props.workspaceChanges ?? []);

	// Build a map of changed files for quick lookup
	const changedFilesMap = $derived(() => {
		const map = new Map<string, FileChange>();
		for (const change of workspaceChanges) {
			// Normalize the path (remove 'content/' prefix if present)
			const normalizedPath = change.filename.replace(/^content\//, '');
			map.set(normalizedPath, change);
		}
		return map;
	});

	// Helper to get change status for a file
	function getFileChangeStatus(path: string): FileChange | undefined {
		return changedFilesMap().get(path);
	}

	// Helper to check if any children have changes
	function hasChildChanges(items: ContentNode[]): boolean {
		for (const item of items) {
			if (getFileChangeStatus(item.path)) return true;
		}
		return false;
	}

	const dispatch = createEventDispatcher<{ 
		select: string; 
		addDomain: void; 
		addTopic: string; 
		addModule: string;
		addArticle: string;
		backToMainMenu: void;
		rename: { path: string; currentName: string; type: string };
		delete: { path: string; name: string; type: string };
	}>();

	// Context menu state
	let showContextMenu = $state<string | null>(null);
	let showRenameModal = $state<{ path: string; currentName: string; type: string } | null>(null);
	let showDeleteConfirm = $state<{ path: string; name: string; type: string } | null>(null);
	let newName = $state('');
	let isRenaming = $state(false);
	let isDeleting = $state(false);

	function toggleContextMenu(path: string, event: MouseEvent) {
		event.stopPropagation();
		showContextMenu = showContextMenu === path ? null : path;
	}

	function openRenameModal(item: ContentNode) {
		const name = item.metadata?.title || item.name.replace(/\.(json|md)$/, '');
		showRenameModal = { 
			path: item.path, 
			currentName: name, 
			type: currentLevel.slice(0, -1) // Remove 's' from level name
		};
		newName = name;
		showContextMenu = null;
	}

	function openDeleteConfirm(item: ContentNode) {
		const name = item.metadata?.title || item.name.replace(/\.(json|md)$/, '');
		showDeleteConfirm = { 
			path: item.path, 
			name, 
			type: currentLevel.slice(0, -1)
		};
		showContextMenu = null;
	}

	async function handleRename() {
		if (!showRenameModal || !newName.trim()) return;
		
		isRenaming = true;
		try {
			dispatch('rename', { 
				path: showRenameModal.path, 
				currentName: newName.trim(),
				type: showRenameModal.type
			});
			showRenameModal = null;
			newName = '';
		} finally {
			isRenaming = false;
		}
	}

	async function handleDelete() {
		if (!showDeleteConfirm) return;
		
		isDeleting = true;
		try {
			dispatch('delete', { 
				path: showDeleteConfirm.path, 
				name: showDeleteConfirm.name,
				type: showDeleteConfirm.type
			});
			showDeleteConfirm = null;
		} finally {
			isDeleting = false;
		}
	}

	// Close context menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (showContextMenu) {
			showContextMenu = null;
		}
	}

	// Navigation state
	type NavigationLevel = 'domains' | 'topics' | 'modules' | 'articles';
	
	interface BreadcrumbItem {
		level: NavigationLevel;
		name: string;
		displayName: string;
	}
	
	let currentLevel = $state<NavigationLevel>('domains');
	let breadcrumbs = $state<BreadcrumbItem[]>([]);
	let selectedDomain = $state<string | null>(null);
	let selectedTopic = $state<string | null>(null);
	let selectedModule = $state<string | null>(null);

	// Organize content by domains, topics, modules, and articles
	const organizedContent = $derived(() => {
		const domains: ContentNode[] = [];
		const topics: ContentNode[] = [];
		const modules: ContentNode[] = [];
		const articles: ContentNode[] = [];

		function categorizeNodes(nodes: ContentNode[]) {
			for (const node of nodes) {
				if (node.type === 'dir') {
					// Only add children from the top-level directories
					if (node.path === 'domains') {
						domains.push(...(node.children || []));
					} else if (node.path === 'topics') {
						topics.push(...(node.children || []));
					} else if (node.path === 'modules') {
						modules.push(...(node.children || []));
					} else if (node.path === 'articles') {
						articles.push(...(node.children || []));
					} else {
						// Continue traversing for other directories
						if (node.children) {
							categorizeNodes(node.children);
						}
					}
				}
			}
		}

		categorizeNodes(tree);
		return { domains, topics, modules, articles };
	});

	// Get filtered content based on current navigation
	const currentContent = $derived(() => {
		const content = organizedContent();
		
		switch (currentLevel) {
			case 'domains':
				return content.domains;
			case 'topics':
				if (!selectedDomain) return [];
				return content.topics.filter((t) => {
					try {
						return t.metadata?.domain === selectedDomain;
					} catch (e) {
						return false;
					}
				});
			case 'modules':
				if (!selectedTopic) return [];
				return content.modules.filter((m) => {
					try {
						return m.metadata?.topic === selectedTopic;
					} catch (e) {
						return false;
					}
				});
			case 'articles':
				if (!selectedModule) return [];
				return content.articles.filter((a) => {
					try {
						const modules = a.metadata?.modules || [];
						return Array.isArray(modules) && modules.includes(selectedModule);
					} catch (e) {
						return false;
					}
				});
			default:
				return [];
		}
	});

	function handleDomainClick(domain: ContentNode) {
		const domainName = domain.name.replace('.json', '');
		const domainTitle = domain.metadata?.title || domainName;
		selectedDomain = domainTitle; // Use title for filtering to match metadata
		currentLevel = 'topics';
		breadcrumbs = [
			{ level: 'domains', name: domainName, displayName: domainTitle }
		];
	}

	function handleTopicClick(topic: ContentNode) {
		const topicName = topic.name.replace('.json', '');
		const topicTitle = topic.metadata?.title || topicName;
		selectedTopic = topicTitle; // Use title for filtering to match metadata
		currentLevel = 'modules';
		breadcrumbs = [
			...breadcrumbs,
			{ level: 'topics', name: topicName, displayName: topicTitle }
		];
	}

	function handleModuleClick(module: ContentNode) {
		const moduleName = module.name.replace('.json', '');
		const moduleTitle = module.metadata?.title || moduleName;
		selectedModule = moduleTitle; // Use title for filtering to match metadata
		currentLevel = 'articles';
		breadcrumbs = [
			...breadcrumbs,
			{ level: 'modules', name: moduleName, displayName: moduleTitle }
		];
	}

	function handleArticleClick(article: ContentNode) {
		dispatch('select', article.path);
	}

	function navigateToBreadcrumb(index: number) {
		const item = breadcrumbs[index];
		breadcrumbs = breadcrumbs.slice(0, index + 1);
		
		switch (item.level) {
			case 'domains':
				currentLevel = 'topics';
				selectedDomain = item.displayName; // Use displayName (title) for filtering
				selectedTopic = null;
				selectedModule = null;
				break;
			case 'topics':
				currentLevel = 'modules';
				selectedTopic = item.displayName; // Use displayName (title) for filtering
				selectedModule = null;
				break;
			case 'modules':
				currentLevel = 'articles';
				selectedModule = item.displayName; // Use displayName (title) for filtering
				break;
		}
	}

	function goBack() {
		if (breadcrumbs.length === 0) {
			return;
		}
		
		breadcrumbs = breadcrumbs.slice(0, -1);
		
		if (breadcrumbs.length === 0) {
			currentLevel = 'domains';
			selectedDomain = null;
			selectedTopic = null;
			selectedModule = null;
		} else {
			const lastItem = breadcrumbs[breadcrumbs.length - 1];
			navigateToBreadcrumb(breadcrumbs.length - 1);
		}
	}

	function handleBackToMainMenu() {
		dispatch('backToMainMenu');
		backToMainMenu();
	}

	function handleAddDomain() {
		dispatch('addDomain');
	}

	function handleAddTopic() {
		if (!selectedDomain) return;
		dispatch('addTopic', selectedDomain);
	}

	function handleAddModule() {
		if (!selectedTopic) return;
		dispatch('addModule', selectedTopic);
	}

	function handleAddArticle() {
		if (!selectedModule) return;
		dispatch('addArticle', selectedModule);
	}

	function getContentTypeIcon(level: NavigationLevel) {
		switch (level) {
			case 'domains': return '🌐';
			case 'topics': return '📚';
			case 'modules': return '📦';
			case 'articles': return '📄';
			default: return '📄';
		}
	}

	function getLevelTitle(level: NavigationLevel) {
		switch (level) {
			case 'domains': return 'Domains';
			case 'topics': return 'Topics';
			case 'modules': return 'Modules';
			case 'articles': return 'Articles';
			default: return '';
		}
	}

	function getAddButtonText(level: NavigationLevel) {
		switch (level) {
			case 'domains': return '+ Add Domain';
			case 'topics': return '+ Add Topic';
			case 'modules': return '+ Add Module';
			case 'articles': return '+ Add Article';
			default: return '+ Add';
		}
	}

	function handleAddClick() {
		switch (currentLevel) {
			case 'domains':
				handleAddDomain();
				break;
			case 'topics':
				handleAddTopic();
				break;
			case 'modules':
				handleAddModule();
				break;
			case 'articles':
				handleAddArticle();
				break;
		}
	}

	function handleItemClick(item: ContentNode) {
		switch (currentLevel) {
			case 'domains':
				handleDomainClick(item);
				break;
			case 'topics':
				handleTopicClick(item);
				break;
			case 'modules':
				handleModuleClick(item);
				break;
			case 'articles':
				handleArticleClick(item);
				break;
		}
	}

	function getItemDisplayName(item: ContentNode) {
		if (item.metadata?.title) {
			return item.metadata.title;
		}
		return item.name.replace('.json', '').replace('.md', '');
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

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="flex flex-col h-full" onclick={handleClickOutside}>
	<!-- Back button for content sidebar mode -->
	{#if showBackButton}
		<button
			onclick={handleBackToMainMenu}
			class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4 font-medium"
		>
			<span>←</span> Back to Main Menu
		</button>
	{/if}

	<!-- Breadcrumb Navigation -->
	{#if breadcrumbs.length > 0}
		<div class="mb-4">
			<button
				onclick={goBack}
				class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-2"
			>
				<span>←</span> Back
			</button>
			<div class="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
				<button
					onclick={() => {
						currentLevel = 'domains';
						breadcrumbs = [];
						selectedDomain = null;
						selectedTopic = null;
						selectedModule = null;
					}}
					class="hover:text-gray-700"
				>
					Domains
				</button>
				{#each breadcrumbs as crumb, index}
					<span>/</span>
					<button
						onclick={() => navigateToBreadcrumb(index)}
						class="hover:text-gray-700"
					>
						{crumb.displayName}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Header -->
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
			{getLevelTitle(currentLevel)}
		</h2>
		<button 
			onclick={handleAddClick}
			class="text-xs text-blue-600 hover:text-blue-800"
		>
			{getAddButtonText(currentLevel)}
		</button>
	</div>

	{#if isLoading}
		<div class="text-sm text-gray-500 py-4">Loading content…</div>
	{:else}
		<!-- Content List -->
		<ul class="space-y-1">
			{#each currentContent() as item}
				{@const changeStatus = getFileChangeStatus(item.path)}
				{@const badge = changeStatus ? getStatusBadge(changeStatus.status) : null}
				<li class="relative group">
					<div class="flex items-center">
						<button 
							onclick={() => handleItemClick(item)}
							class={`flex items-center gap-2 px-2 py-2 rounded-md text-sm flex-1 text-left transition ${
								currentLevel === 'articles' && selectedPath === item.path 
									? 'bg-blue-100 text-blue-700' 
									: 'hover:bg-gray-100'
							} ${changeStatus?.status === 'removed' ? 'opacity-60 line-through' : ''}`}
						>
							<span>{getContentTypeIcon(currentLevel)}</span>
							<span class="flex-1 truncate">{getItemDisplayName(item)}</span>
							{#if badge}
								<span class={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${badge.color}`} title={badge.label}>
									<Icon icon={badge.icon} class="w-3 h-3" />
									<span class="hidden sm:inline">{badge.label}</span>
								</span>
							{/if}
							{#if currentLevel !== 'articles'}
								<span class="text-gray-400">→</span>
							{/if}
						</button>
						
						<!-- Context menu button (only for non-articles) -->
						{#if currentLevel !== 'articles'}
							<button
								onclick={(e) => toggleContextMenu(item.path, e)}
								class="p-1.5 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
								title="More actions"
							>
								<Icon icon="tabler:dots-vertical" class="w-4 h-4 text-gray-500" />
							</button>
						{/if}
					</div>

					<!-- Context menu dropdown -->
					{#if showContextMenu === item.path}
						<div class="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px]">
							<button
								onclick={() => openRenameModal(item)}
								class="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								<Icon icon="tabler:pencil" class="w-4 h-4" />
								Rename
							</button>
							<button
								onclick={() => openDeleteConfirm(item)}
								class="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
							>
								<Icon icon="tabler:trash" class="w-4 h-4" />
								Delete
							</button>
						</div>
					{/if}
				</li>
			{/each}
		</ul>

		{#if currentContent().length === 0}
			<div class="text-sm text-gray-500 py-4 text-center">
				{#if currentLevel === 'topics'}
					No topics in this domain yet
				{:else if currentLevel === 'modules'}
					No modules in this topic yet
				{:else if currentLevel === 'articles'}
					No articles in this module yet
				{:else}
					No {getLevelTitle(currentLevel).toLowerCase()} yet
				{/if}
			</div>
		{/if}
	{/if}
</div>

<!-- Rename Modal -->
{#if showRenameModal}
	<div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
			<div class="px-5 py-4 border-b border-gray-100">
				<h3 class="font-semibold text-gray-900">Rename {showRenameModal.type}</h3>
			</div>
			<div class="px-5 py-4">
				<label for="rename-input" class="block text-sm font-medium text-gray-700 mb-2">
					New name
				</label>
				<input
					id="rename-input"
					type="text"
					bind:value={newName}
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Enter new name..."
				/>
				<p class="text-xs text-gray-500 mt-2">
					This will update the title in the content file.
				</p>
			</div>
			<div class="flex items-center justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100">
				<button
					onclick={() => { showRenameModal = null; newName = ''; }}
					class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
				>
					Cancel
				</button>
				<button
					onclick={handleRename}
					disabled={isRenaming || !newName.trim()}
					class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
				>
					{#if isRenaming}
						<Icon icon="tabler:loader-2" class="w-4 h-4 animate-spin" />
						Renaming...
					{:else}
						Rename
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
	<div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
			<div class="px-5 py-4 border-b border-gray-100">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
						<Icon icon="tabler:trash" class="w-5 h-5 text-red-600" />
					</div>
					<div>
						<h3 class="font-semibold text-gray-900">Delete {showDeleteConfirm.type}</h3>
						<p class="text-sm text-gray-500">This action cannot be undone</p>
					</div>
				</div>
			</div>
			<div class="px-5 py-4">
				<p class="text-gray-700">
					Are you sure you want to delete <strong>"{showDeleteConfirm.name}"</strong>?
				</p>
				{#if showDeleteConfirm.type !== 'article'}
					<p class="text-sm text-amber-600 mt-2">
						<Icon icon="tabler:alert-triangle" class="w-4 h-4 inline-block mr-1" />
						This will also delete all associated content (topics, modules, or articles).
					</p>
				{/if}
			</div>
			<div class="flex items-center justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100">
				<button
					onclick={() => showDeleteConfirm = null}
					class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
				>
					Cancel
				</button>
				<button
					onclick={handleDelete}
					disabled={isDeleting}
					class="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
				>
					{#if isDeleting}
						<Icon icon="tabler:loader-2" class="w-4 h-4 animate-spin" />
						Deleting...
					{:else}
						Delete
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
