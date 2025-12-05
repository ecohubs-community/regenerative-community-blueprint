<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Crepe } from '@milkdown/crepe';
	import '@milkdown/crepe/theme/common/style.css';
	import '@milkdown/crepe/theme/frame.css';
	import Icon from '@iconify/svelte';
	
	interface Frontmatter {
		id?: string;
		title?: string;
		climate?: string[];
		budget?: string;
		size?: string[];
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
		autoSaveDelay = 2000,
		showSidebarButton = false,
		onOpenSidebar = undefined as (() => void) | undefined
	} = $props();

	let editorContainer: HTMLDivElement;
	let crepeInstance: Crepe | null = null;
	let saveTimeout: ReturnType<typeof setTimeout> | null = null;
	let saveStatus = $state<'saved' | 'saving' | 'unsaved'>('saved');

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

<div class="crepe-editor bg-white">
	<!-- Save Status Bar -->
	<div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2">
		<div class="flex justify-between items-center max-w-4xl mx-auto">
			<div class="flex items-center gap-2">
				{#if saveStatus === 'saving'}
					<div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
					<span class="text-xs text-amber-600 font-medium">Saving...</span>
				{:else if saveStatus === 'unsaved'}
					<div class="w-2 h-2 bg-orange-500 rounded-full"></div>
					<span class="text-xs text-orange-600 font-medium">Unsaved changes</span>
				{:else}
					<div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
					<span class="text-xs text-emerald-600 font-medium">Saved</span>
				{/if}
			</div>
			
			{#if !readonly}
				<div class="flex items-center gap-2">
					
					<button
						onclick={handleSave}
						class="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
						disabled={saveStatus === 'saving'}
					>
						{saveStatus === 'saving' ? 'Saving...' : 'Save'}
					</button>
					{#if showSidebarButton}
						<button
							type="button"
							onclick={() => onOpenSidebar?.()}
							class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
							aria-label="Open article settings"
						>
							<Icon icon="tabler:layout-sidebar-right-filled" class="w-4 h-4" />
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	
	<!-- Editor Container -->
	<div 
		bind:this={editorContainer}
		class="crepe-container"
	></div>
</div>

<style>
	:global(.crepe-container .crepe) {
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
		max-width: 65ch;
		margin: 0 auto;
	}
	
	:global(.crepe-container .ProseMirror) {
		outline: none;
		min-height: calc(100vh - 250px);
	}
	
	:global(.crepe-container .ProseMirror p) {
		margin-bottom: 1em;
	}
	
	:global(.crepe-container .ProseMirror h1) {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;
		margin-top: 2rem;
	}
	
	:global(.crepe-container .ProseMirror h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		margin-top: 1.5rem;
	}
	
	:global(.crepe-container .ProseMirror h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		margin-top: 1.25rem;
	}
</style>
