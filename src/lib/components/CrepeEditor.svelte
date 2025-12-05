<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Crepe } from '@milkdown/crepe';
	import '@milkdown/crepe/theme/common/style.css';
	import '@milkdown/crepe/theme/frame.css';
	
	interface Frontmatter {
		id?: string;
		title?: string;
		climate?: string[];
		budget?: string;
		size?: string;
		modules?: string[];
		description?: string;
		[key: string]: unknown;
	}

	// Generate a short unique ID (8 characters from UUID)
	function generateArticleId(): string {
		return crypto.randomUUID().split('-')[0];
	}

	interface EditorContent {
		frontmatter: Frontmatter;
		content: string;
	}

	let { 
		content = $bindable<EditorContent>({ frontmatter: {}, content: '' }),
		readonly = false,
		onSave = () => {},
		autoSave = true,
		autoSaveDelay = 2000
	} = $props();

	let editorContainer: HTMLDivElement;
	let crepeInstance: Crepe | null = null;
	let saveTimeout: ReturnType<typeof setTimeout> | null = null;
	let saveStatus = $state<'saved' | 'saving' | 'unsaved'>('saved');

	// Climate options
	const climateOptions = ['tropical', 'temperate', 'arid', 'continental', 'mediterranean', 'polar'];
	const budgetOptions = ['low', 'medium', 'high'];
	const sizeOptions = ['small', 'medium', 'large', 'regional', 'national'];

	async function handleSave() {
		if (onSave && !readonly) {
			saveStatus = 'saving';
			try {
				await onSave(content);
				saveStatus = 'saved';
			} catch (error) {
				saveStatus = 'unsaved';
				console.error('Save failed:', error);
			}
		}
	}

	function triggerAutoSave() {
		if (!autoSave || readonly) return;

		saveStatus = 'unsaved';

		// Clear existing timeout
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}

		// Set new timeout
		saveTimeout = setTimeout(() => {
			handleSave();
		}, autoSaveDelay);
	}

	function addArrayItem(key: keyof Frontmatter, value: string) {
		if (!content.frontmatter[key]) {
			content.frontmatter[key] = [];
		}
		if (Array.isArray(content.frontmatter[key])) {
			(content.frontmatter[key] as string[]).push(value);
		}
		triggerAutoSave();
	}

	function removeArrayItem(key: keyof Frontmatter, index: number) {
		if (Array.isArray(content.frontmatter[key])) {
			(content.frontmatter[key] as string[]).splice(index, 1);
		}
		triggerAutoSave();
	}

	async function uploadImage(file: File): Promise<string> {
		// Ensure article has an ID
		if (!content.frontmatter.id) {
			content.frontmatter.id = generateArticleId();
		}

		const formData = new FormData();
		formData.append('file', file);
		formData.append('articleId', content.frontmatter.id);

		const response = await fetch('/api/content/upload-image', {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error('Failed to upload image');
		}

		const data = await response.json();
		return data.url;
	}

	onMount(async () => {
		if (!editorContainer) return;

		// Ensure article has an ID when editor is mounted
		if (!content.frontmatter.id) {
			content.frontmatter.id = generateArticleId();
		}

		try {
			crepeInstance = new Crepe({
				root: editorContainer,
				defaultValue: content.content || '',
				featureConfigs: {
					[Crepe.Feature.ImageBlock]: {
						onUpload: async (file: File) => {
							try {
								const url = await uploadImage(file);
								return url;
							} catch (error) {
								console.error('Failed to upload image:', error);
								throw error;
							}
						}
					}
				}
			});

			// Set readonly state
			if (readonly) {
				crepeInstance.setReadonly(true);
			}

			// Set up change listener using Crepe's API
			crepeInstance.on((listener) => {
				listener.markdownUpdated((ctx, markdown) => {
					if (markdown !== content.content) {
						content.content = markdown;
						triggerAutoSave();
					}
				});
			});

			await crepeInstance.create();
		} catch (error) {
			console.error('Failed to initialize Crepe editor:', error);
		}
	});

	onDestroy(() => {
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}
		if (crepeInstance) {
			crepeInstance.destroy();
		}
	});

	// Watch for frontmatter changes and trigger auto-save
	$effect(() => {
		if (content.frontmatter) {
			triggerAutoSave();
		}
	});
</script>

<div class="crepe-editor border border-gray-200 rounded-lg overflow-hidden bg-white">
	<!-- Frontmatter Editor -->
	<div class="bg-gray-50 border-b border-gray-200 p-4">
		<h3 class="text-sm font-medium text-gray-900 mb-3">Article Metadata</h3>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- Title -->
			<div>
				<label for="title" class="block text-xs font-medium text-gray-700 mb-1">Title</label>
				<input
					id="title"
					type="text"
					bind:value={content.frontmatter.title}
					placeholder="Article title"
					disabled={readonly}
					class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>

			<!-- Description -->
			<div>
				<label for="description" class="block text-xs font-medium text-gray-700 mb-1">Description</label>
				<input
					id="description"
					type="text"
					bind:value={content.frontmatter.description}
					placeholder="Brief description"
					disabled={readonly}
					class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>

			<!-- Climate -->
			<div>
				<label class="block text-xs font-medium text-gray-700 mb-1">Climate</label>
				<div class="space-y-1">
				{#each climateOptions as climate}
					<label class="flex items-center text-xs">
						<input
							type="checkbox"
							checked={Array.isArray(content.frontmatter.climate) && content.frontmatter.climate.includes(climate)}
							onchange={(e) => {
								const target = e.target as HTMLInputElement;
								if (target.checked) {
									addArrayItem('climate', climate);
								} else {
									const index = content.frontmatter.climate?.indexOf(climate);
									if (index !== undefined && index > -1) {
										removeArrayItem('climate', index);
									}
								}
							}}
							disabled={readonly}
							class="mr-1"
						/>
						{climate}
					</label>
				{/each}
				</div>
			</div>

			<!-- Budget -->
			<div>
				<label class="block text-xs font-medium text-gray-700 mb-1">Budget</label>
				<div class="space-y-1">
				{#each budgetOptions as budget}
					<label class="flex items-center text-xs">
						<input
							type="radio"
							name="budget"
							checked={content.frontmatter.budget === budget}
							onchange={() => {
								content.frontmatter.budget = budget;
								triggerAutoSave();
							}}
							disabled={readonly}
							class="mr-1"
						/>
						{budget}
					</label>
				{/each}
				</div>
			</div>

			<!-- Size -->
			<div>
				<label class="block text-xs font-medium text-gray-700 mb-1">Size</label>
				<div class="space-y-1">
				{#each sizeOptions as size}
					<label class="flex items-center text-xs">
						<input
							type="radio"
							name="size"
							checked={content.frontmatter.size === size}
							onchange={() => {
								content.frontmatter.size = size;
								triggerAutoSave();
							}}
							disabled={readonly}
							class="mr-1"
						/>
						{size}
					</label>
				{/each}
				</div>
			</div>

			<!-- Modules -->
			<div>
				<label for="modules" class="block text-xs font-medium text-gray-700 mb-1">Modules</label>
				<input
					id="modules"
					type="text"
					value={Array.isArray(content.frontmatter.modules) ? content.frontmatter.modules.join(', ') : ''}
					onchange={(e) => {
						const target = e.target as HTMLInputElement;
						const modules = target.value.split(',').map((m: string) => m.trim()).filter((m: string) => m);
						content.frontmatter.modules = modules;
						triggerAutoSave();
					}}
					placeholder="module1, module2, module3"
					disabled={readonly}
					class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>
		</div>
	</div>

	<!-- Crepe Editor -->
	<div class="bg-white">
		<div class="border-b border-gray-200 px-4 py-2">
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-3">
					<span class="text-xs font-medium text-gray-700">Content</span>
					
					<!-- Save Status Indicator -->
					<div class="flex items-center space-x-1">
						{#if saveStatus === 'saving'}
							<div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
							<span class="text-xs text-yellow-600">Saving...</span>
						{:else if saveStatus === 'unsaved'}
							<div class="w-2 h-2 bg-orange-500 rounded-full"></div>
							<span class="text-xs text-orange-600">Unsaved</span>
						{:else}
							<div class="w-2 h-2 bg-green-500 rounded-full"></div>
							<span class="text-xs text-green-600">Saved</span>
						{/if}
					</div>
				</div>
				
				<div class="flex space-x-2">
					{#if !readonly}
						<button
							onclick={handleSave}
							class="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
							disabled={saveStatus === 'saving'}
						>
							{saveStatus === 'saving' ? 'Saving...' : 'Save Now'}
						</button>
					{/if}
				</div>
			</div>
		</div>
		
		<!-- Editor Container -->
		<div 
			bind:this={editorContainer}
			class="crepe-container min-h-[500px]"
		></div>
	</div>
</div>

<style>
	:global(.crepe-container .crepe) {
		min-height: 500px;
		padding: 1rem;
	}
	
	:global(.crepe-container .ProseMirror) {
		outline: none;
		min-height: 450px;
	}
</style>
