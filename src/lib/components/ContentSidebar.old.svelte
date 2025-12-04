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

	let expanded = $state<Set<string>>(new Set());
	let showAddMenu = $state<Record<string, boolean>>({});

	// Organize content by domains, topics, modules, and articles
	const organizedContent = $derived(() => {
		// Extract domains, topics, modules, and articles from the tree
		const domains: ContentNode[] = [];
		const topics: ContentNode[] = [];
		const modules: ContentNode[] = [];
		const articles: ContentNode[] = [];

		// Traverse the tree and categorize nodes
		function categorizeNodes(nodes: ContentNode[]) {
			for (const node of nodes) {
				if (node.type === 'dir') {
					// Categorize directories
					if (node.path === 'domains') {
						domains.push(...(node.children || []));
					} else if (node.path === 'topics') {
						topics.push(...(node.children || []));
					} else if (node.path === 'modules') {
						modules.push(...(node.children || []));
					} else if (node.path === 'articles') {
						articles.push(...(node.children || []));
					}
					
					// Continue traversing children
					if (node.children) {
						categorizeNodes(node.children);
					}
				} else if (node.type === 'file') {
					// Categorize files based on path
					if (node.path.startsWith('domains/')) {
						domains.push(node);
					} else if (node.path.startsWith('topics/')) {
						topics.push(node);
					} else if (node.path.startsWith('modules/')) {
						modules.push(node);
					} else if (node.path.startsWith('articles/')) {
						articles.push(node);
					}
				}
			}
		}

		categorizeNodes(tree);
		return { domains, topics, modules, articles };
	});

	// Function to toggle folder expansion
	function toggleFolder(path: string) {
		const next = new Set(expanded);
		if (next.has(path)) {
			next.delete(path);
		} else {
			next.add(path);
		}
		expanded = next;
	}

	// Function to handle selecting a content item
	function handleSelect(path: string) {
		dispatch('select', path);
	}

	function getIndent(depth: number) {
		return depth === 0 ? '' : `padding-left: ${depth * 0.75}rem;`;
	}

	function toggleAddMenu(path: string) {
		showAddMenu = {
			...showAddMenu,
			[path]: !showAddMenu[path]
		};
	}

	function handleAddDomain() {
		dispatch('addDomain');
	}

	function handleAddTopic(domain: string) {
		dispatch('addTopic', domain);
		toggleAddMenu('domains');
	}

	function handleAddModule(topic: string) {
		dispatch('addModule', topic);
		toggleAddMenu('topics');
	}

	function handleAddArticle(module: string) {
		dispatch('addArticle', module);
		toggleAddMenu('modules');
	}

	function handleBackToMainMenu() {
		dispatch('backToMainMenu');
		backToMainMenu();
	}

	// Get content type icon
	function getContentTypeIcon(type: string) {
		switch (type) {
			case 'domain': return '🌐';
			case 'topic': return '📚';
			case 'module': return '📦';
			case 'article': return '📄';
			case 'dir': return '📁';
			default: return '📄';
		}
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

	<div class="flex items-center justify-between mb-4">
		<h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
			Content Structure
		</h2>
	</div>

	{#if isLoading}
		<div class="text-sm text-gray-500 py-4">Loading content structure…</div>
	{:else}
		<!-- Domains Section -->
		<div class="mb-6">
			<div class="flex items-center justify-between mb-2">
				<h3 class="text-xs font-semibold text-gray-500 uppercase">
					Domains
				</h3>
				<button 
					onclick={handleAddDomain}
					class="text-xs text-blue-600 hover:text-blue-800"
				>
					+ Add Domain
				</button>
			</div>
			
			<ul class="space-y-1">
				{#each organizedContent().domains as domain}
					<li>
						<div class="flex items-center justify-between group">
							<button 
								onclick={() => handleSelect(domain.path)}
								class={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left ${selectedPath === domain.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
							>
								<span>{getContentTypeIcon('domain')}</span>
								<span class="font-medium">{domain.name.replace('.json', '')}</span>
							</button>
							<button 
								onclick={() => toggleAddMenu(domain.path)}
								class="text-gray-400 hover:text-gray-700 px-1 opacity-0 group-hover:opacity-100"
							>
								+
							</button>
						</div>
						
						<!-- Add Topic dropdown -->
						{#if showAddMenu[domain.path]}
							<div class="ml-6 mt-1 p-2 bg-gray-50 rounded-md border border-gray-200 text-sm">
								<button 
									onclick={() => handleAddTopic(domain.name.replace('.json', ''))}
									class="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md text-blue-600"
								>
									+ Add Topic to this Domain
								</button>
							</div>
						{/if}
						
						<!-- Related Topics -->
						<ul class="ml-6 mt-1 space-y-1">
							{#each organizedContent().topics.filter((t) => {
								try {
									const domainName = domain.name.replace('.json', '');
									return t.metadata?.domain === domainName;
								} catch (e) {
									return false;
								}
							}) as topic}
								<li>
									<div class="flex items-center justify-between group">
										<button 
											onclick={() => handleSelect(topic.path)}
											class={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left ${selectedPath === topic.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
										>
											<span>{getContentTypeIcon('topic')}</span>
											<span>{topic.name.replace('.json', '')}</span>
										</button>
										<button 
											onclick={() => toggleAddMenu(topic.path)}
											class="text-gray-400 hover:text-gray-700 px-1 opacity-0 group-hover:opacity-100"
										>
											+
										</button>
									</div>
									
									<!-- Add Module dropdown -->
									{#if showAddMenu[topic.path]}
										<div class="ml-6 mt-1 p-2 bg-gray-50 rounded-md border border-gray-200 text-sm">
											<button 
												onclick={() => handleAddModule(topic.name.replace('.json', ''))}
												class="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md text-blue-600"
											>
												+ Add Module to this Topic
											</button>
										</div>
									{/if}
									
									<!-- Related Modules -->
									<ul class="ml-6 mt-1 space-y-1">
										{#each organizedContent().modules.filter((m) => {
											try {
												const topicName = topic.name.replace('.json', '');
												return m.metadata?.topic === topicName;
											} catch (e) {
												return false;
											}
										}) as module}
											<li>
												<div class="flex items-center justify-between group">
													<button 
														onclick={() => handleSelect(module.path)}
														class={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left ${selectedPath === module.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
													>
														<span>{getContentTypeIcon('module')}</span>
														<span>{module.name.replace('.json', '')}</span>
													</button>
													<button 
														onclick={() => toggleAddMenu(module.path)}
														class="text-gray-400 hover:text-gray-700 px-1 opacity-0 group-hover:opacity-100"
													>
														+
													</button>
												</div>
												
												<!-- Add Article dropdown -->
												{#if showAddMenu[module.path]}
													<div class="ml-6 mt-1 p-2 bg-gray-50 rounded-md border border-gray-200 text-sm">
														<button 
															onclick={() => handleAddArticle(module.name.replace('.json', ''))}
															class="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md text-blue-600"
														>
															+ Add Article to this Module
														</button>
													</div>
												{/if}
											</li>
										{/each}
									</ul>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
		
		<!-- Articles Section -->
		<div>
			<div class="flex items-center justify-between mb-2">
				<h3 class="text-xs font-semibold text-gray-500 uppercase">
					Articles
				</h3>
			</div>
			
			<ul class="space-y-1">
				{#each organizedContent().articles as article}
					<li>
						<button 
							onclick={() => handleSelect(article.path)}
							class={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left ${selectedPath === article.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
						>
							<span>{getContentTypeIcon('article')}</span>
							<span>{article.name.replace('.md', '')}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
