<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { backToMainMenu } from '$lib/stores/ui';

	interface ContentNode {
		path: string;
		type: 'file' | 'dir';
		name: string;
		children?: ContentNode[];
		content_type?: 'domain' | 'topic' | 'module' | 'article';
		metadata?: Record<string, any>;
	}

	const props = $props<{ 
		tree?: ContentNode[]; 
		isLoading?: boolean; 
		selectedPath?: string | null;
		showBackButton?: boolean;
	}>();

	const tree = $derived(props.tree ?? []);
	const isLoading = $derived(props.isLoading ?? false);
	const selectedPath = $derived(props.selectedPath ?? null);
	const showBackButton = $derived(props.showBackButton ?? false);

	const dispatch = createEventDispatcher<{ 
		select: string; 
		addDomain: void; 
		addTopic: string; 
		addModule: string;
		addArticle: string;
		backToMainMenu: void;
	}>();

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
</script>

<div class="flex flex-col h-full">
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
				<li>
					<button 
						onclick={() => handleItemClick(item)}
						class={`flex items-center gap-2 px-2 py-2 rounded-md text-sm w-full text-left transition ${
							currentLevel === 'articles' && selectedPath === item.path 
								? 'bg-blue-100 text-blue-700' 
								: 'hover:bg-gray-100'
						}`}
					>
						<span>{getContentTypeIcon(currentLevel)}</span>
						<span class="flex-1">{getItemDisplayName(item)}</span>
						{#if currentLevel !== 'articles'}
							<span class="text-gray-400">→</span>
						{/if}
					</button>
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
