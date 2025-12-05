<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { history } from '@milkdown/plugin-history';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { cursor } from '@milkdown/plugin-cursor';
	import { trailing } from '@milkdown/plugin-trailing';
	import { block } from '@milkdown/plugin-block';
	import { tooltipFactory } from '@milkdown/plugin-tooltip';
	import { slashFactory } from '@milkdown/plugin-slash';
	import { nord } from '@milkdown/theme-nord';
	import '$lib/styles/milkdown.css';
	
	interface Frontmatter {
		title?: string;
		climate?: string[];
		budget?: string;
		size?: string;
		modules?: string[];
		description?: string;
		[key: string]: unknown;
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
	let editor: Editor | null = null;
	let saveTimeout: ReturnType<typeof setTimeout> | null = null;
	let saveStatus = $state<'saved' | 'saving' | 'unsaved'>('saved');
	let isEditorReady = $state(false);

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

	onMount(async () => {
		if (!editorContainer) return;

		try {
			// Create tooltip plugin for text selection
			const tooltip = tooltipFactory('TEXT_TOOLTIP');
			
			// Create slash menu plugin
			const slash = slashFactory('SLASH');

			editor = await Editor.make()
				.config((ctx) => {
					ctx.set(rootCtx, editorContainer);
					ctx.set(defaultValueCtx, content.content || '');
					
					// Set up listener for content changes
					ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
						content.content = markdown;
						triggerAutoSave();
					});
				})
				.config(nord)
				.use(commonmark)
				.use(gfm)
				.use(listener)
				.use(history)
				.use(clipboard)
				.use(cursor)
				.use(trailing)
				.use(block)
				.create();

			isEditorReady = true;
		} catch (error) {
			console.error('Failed to initialize Milkdown editor:', error);
		}
	});

	onDestroy(() => {
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}
		if (editor) {
			editor.destroy();
		}
	});

	// Watch for frontmatter changes and trigger auto-save
	$effect(() => {
		if (content.frontmatter) {
			triggerAutoSave();
		}
	});
</script>

<div class="milkdown-editor border border-gray-200 rounded-lg overflow-hidden">
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

	<!-- Milkdown Editor -->
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
		<div class="p-4">
			{#if !isEditorReady}
				<div class="text-sm text-gray-500 py-8 text-center">Loading editor...</div>
			{/if}
			<div 
				bind:this={editorContainer}
				class="milkdown-container prose prose-sm max-w-none min-h-[400px]"
			></div>
		</div>
	</div>
</div>

<style>
	:global(.milkdown-container) {
		outline: none;
	}
	
	:global(.milkdown-container .editor) {
		outline: none;
		min-height: 400px;
		padding: 1rem;
	}
	
	:global(.milkdown-container .ProseMirror) {
		outline: none;
		min-height: 400px;
	}
	
	:global(.milkdown-container .ProseMirror:focus) {
		outline: none;
	}
	
	/* Nord theme customizations */
	:global(.milkdown) {
		background: white;
	}
	
	:global(.milkdown .editor) {
		background: white;
		color: #2e3440;
	}
	
	/* Placeholder */
	:global(.milkdown .ProseMirror p.is-empty:first-child::before) {
		content: 'Start writing your article...';
		color: #9ca3af;
		pointer-events: none;
		height: 0;
		float: left;
	}
</style>
