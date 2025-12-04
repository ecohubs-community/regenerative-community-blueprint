<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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

	// Watch for content changes and trigger auto-save
	$effect(() => {
		if (content) {
			triggerAutoSave();
		}
	});

	// Cleanup on unmount
	onDestroy(() => {
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}
	});

	function addArrayItem(key: keyof Frontmatter, value: string) {
		if (!content.frontmatter[key]) {
			content.frontmatter[key] = [];
		}
		if (Array.isArray(content.frontmatter[key])) {
			content.frontmatter[key].push(value);
		}
	}

	function removeArrayItem(key: keyof Frontmatter, index: number) {
		if (Array.isArray(content.frontmatter[key])) {
			content.frontmatter[key].splice(index, 1);
		}
	}

	// Handle image uploads
	async function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (!files || files.length === 0) return;

		const file = files[0];
		if (!file.type.startsWith('image/')) {
			alert('Please select an image file');
			return;
		}

		try {
			const base64 = await new Promise<string>((resolve) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result as string);
				reader.readAsDataURL(file);
			});

			const response = await fetch('/api/media/upload', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					file: base64.split(',')[1], // Remove data:image/...;base64, prefix
					filename: file.name,
					contentType: file.type
				})
			});

			if (response.ok) {
				const result = await response.json();
				// Insert markdown image syntax at cursor position
				const imageMarkdown = `![${file.name}](${result.url})`;
				content.content += '\n' + imageMarkdown;
			} else {
				alert('Failed to upload image');
			}
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Failed to upload image');
		}

		// Clear the input
		target.value = '';
	}
</script>

<div class="simple-editor border border-gray-200 rounded-lg overflow-hidden">
	<!-- Frontmatter Editor -->
	<div class="bg-gray-50 border-b border-gray-200 p-4">
		<h3 class="text-sm font-medium text-gray-900 mb-3">Frontmatter</h3>
		
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
				<label for="climate" class="block text-xs font-medium text-gray-700 mb-1">Climate</label>
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
				<label for="budget" class="block text-xs font-medium text-gray-700 mb-1">Budget</label>
				<div class="space-y-1">
				{#each budgetOptions as budget}
					<label class="flex items-center text-xs">
						<input
							type="radio"
							name="budget"
							checked={content.frontmatter.budget === budget}
							onchange={() => content.frontmatter.budget = budget}
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
				<label for="size" class="block text-xs font-medium text-gray-700 mb-1">Size</label>
				<div class="space-y-1">
				{#each sizeOptions as size}
					<label class="flex items-center text-xs">
						<input
							type="radio"
							name="size"
							checked={content.frontmatter.size === size}
							onchange={() => content.frontmatter.size = size}
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
					}}
					placeholder="module1, module2, module3"
					disabled={readonly}
					class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>
		</div>
	</div>

	<!-- Markdown Editor -->
	<div class="bg-white">
		<div class="border-b border-gray-200 px-4 py-2">
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-3">
					<span class="text-xs font-medium text-gray-700">Content (Markdown)</span>
					
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
					<!-- Image Upload -->
					{#if !readonly}
						<label class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 cursor-pointer">
							Upload Image
							<input
								type="file"
								accept="image/*"
								onchange={handleImageUpload}
								class="hidden"
							/>
						</label>
					{/if}
					
					{#if !readonly}
						<button
							onclick={handleSave}
							class="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
							disabled={saveStatus === 'saving'}
						>
							{saveStatus === 'saving' ? 'Saving...' : 'Save'}
						</button>
					{/if}
				</div>
			</div>
		</div>
		<div class="p-4">
			<textarea
				bind:value={content.content}
				disabled={readonly}
				placeholder="Write your markdown content here..."
				class="w-full h-96 p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
			></textarea>
		</div>
		
		<!-- Markdown Preview -->
		<div class="border-t border-gray-200 p-4">
			<h4 class="text-sm font-medium text-gray-700 mb-2">Preview</h4>
			<div class="prose prose-sm max-w-none bg-gray-50 p-4 rounded border border-gray-200">
				{@html content.content.replace(/\n/g, '<br>')}
			</div>
		</div>
	</div>
</div>
