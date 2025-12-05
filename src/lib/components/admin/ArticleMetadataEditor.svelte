<script lang="ts">
	import { onMount } from 'svelte';

	interface Frontmatter {
		id?: string;
		title?: string;
		summary?: string;
		climate?: string[];
		budget?: string;
		size?: string[];
		modules?: string[];
		description?: string;
		[key: string]: unknown;
	}

	interface Module {
		title: string;
		slug: string;
	}

	let {
		frontmatter = $bindable<Frontmatter>({}),
		readonly = false,
		onchange = () => {}
	}: {
		frontmatter: Frontmatter;
		readonly?: boolean;
		onchange?: () => void;
	} = $props();

	// Available options
	const climateOptions = [
		{ value: 'tropical', label: 'Tropical' },
		{ value: 'temperate', label: 'Temperate' },
		{ value: 'arid', label: 'Arid' },
		{ value: 'continental', label: 'Continental' },
		{ value: 'mediterranean', label: 'Mediterranean' },
		{ value: 'polar', label: 'Polar' }
	];

	const budgetOptions = [
		{ value: 'low', label: 'Low Budget' },
		{ value: 'medium', label: 'Medium Budget' },
		{ value: 'high', label: 'High Budget' }
	];

	const sizeOptions = [
		{ value: '<5', label: '<5 people' },
		{ value: '5-10', label: '5-10 people' },
		{ value: '10-50', label: '10-50 people' },
		{ value: '50-100', label: '50-100 people' },
		{ value: '100-200', label: '100-200 people' },
		{ value: '+200', label: '+200 people' }
	];

	// Module autocomplete state
	let availableModules = $state<Module[]>([]);
	let moduleSearchQuery = $state('');
	let showModuleSuggestions = $state(false);
	let moduleInputRef: HTMLInputElement;

	// Dropdown states
	let showClimateDropdown = $state(false);
	let showSizeDropdown = $state(false);

	// Load available modules
	async function loadModules() {
		try {
			const response = await fetch('/api/content/tree');
			if (response.ok) {
				const data = await response.json();
				// Extract modules from tree
				const modules: Module[] = [];
				function extractModules(nodes: any[]) {
					for (const node of nodes) {
						if (node.content_type === 'module') {
							modules.push({
								title: node.metadata?.title || node.name.replace('.json', ''),
								slug: node.name.replace('.json', '')
							});
						}
						if (node.children) {
							extractModules(node.children);
						}
					}
				}
				extractModules(data.tree || []);
				availableModules = modules;
			}
		} catch (error) {
			console.error('Failed to load modules:', error);
		}
	}

	onMount(() => {
		loadModules();
	});

	// Filtered module suggestions
	const filteredModules = $derived(() => {
		if (!moduleSearchQuery.trim()) return availableModules;
		const query = moduleSearchQuery.toLowerCase();
		return availableModules.filter(
			(m) =>
				m.title.toLowerCase().includes(query) &&
				!(frontmatter.modules || []).includes(m.title)
		);
	});

	function toggleClimate(value: string) {
		if (readonly) return;
		const current = Array.isArray(frontmatter.climate) ? [...frontmatter.climate] : [];
		const index = current.indexOf(value);
		if (index > -1) {
			current.splice(index, 1);
		} else {
			current.push(value);
		}
		frontmatter.climate = current;
		onchange();
	}

	function toggleSize(value: string) {
		if (readonly) return;
		const current = Array.isArray(frontmatter.size) ? [...frontmatter.size] : [];
		const index = current.indexOf(value);
		if (index > -1) {
			current.splice(index, 1);
		} else {
			current.push(value);
		}
		frontmatter.size = current;
		onchange();
	}

	function addModule(moduleTitle: string) {
		if (readonly) return;
		const current = Array.isArray(frontmatter.modules) ? [...frontmatter.modules] : [];
		if (!current.includes(moduleTitle)) {
			current.push(moduleTitle);
			frontmatter.modules = current;
			onchange();
		}
		moduleSearchQuery = '';
		showModuleSuggestions = false;
	}

	function removeModule(moduleTitle: string) {
		if (readonly) return;
		const current = Array.isArray(frontmatter.modules) ? [...frontmatter.modules] : [];
		const index = current.indexOf(moduleTitle);
		if (index > -1) {
			current.splice(index, 1);
			frontmatter.modules = current;
			onchange();
		}
	}

	function handleInputChange() {
		onchange();
	}

	// Close dropdowns when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.climate-dropdown')) {
			showClimateDropdown = false;
		}
		if (!target.closest('.size-dropdown')) {
			showSizeDropdown = false;
		}
		if (!target.closest('.module-autocomplete')) {
			showModuleSuggestions = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="space-y-5">
	<!-- Title -->
	<div>
		<label for="meta-title" class="block text-sm font-medium text-gray-700 mb-1.5">
			Title
		</label>
		<input
			id="meta-title"
			type="text"
			bind:value={frontmatter.title}
			oninput={handleInputChange}
			placeholder="Article title"
			disabled={readonly}
			class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500 transition-shadow"
		/>
	</div>

	<!-- Summary -->
	<div>
		<label for="meta-summary" class="block text-sm font-medium text-gray-700 mb-1.5">
			Summary
		</label>
		<textarea
			id="meta-summary"
			bind:value={frontmatter.summary}
			oninput={handleInputChange}
			placeholder="Brief summary of the article"
			disabled={readonly}
			rows="3"
			class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500 resize-none transition-shadow"
		></textarea>
	</div>

	<!-- Climate Multi-select -->
	<div class="climate-dropdown relative">
		<span id="climate-label" class="block text-sm font-medium text-gray-700 mb-1.5">Climate Zones</span>
		<button
			type="button"
			onclick={() => (showClimateDropdown = !showClimateDropdown)}
			disabled={readonly}
			aria-labelledby="climate-label"
			class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
		>
			<span class="truncate">
				{#if (frontmatter.climate || []).length > 0}
					{(frontmatter.climate || []).length} selected
				{:else}
					<span class="text-gray-400">Select climate zones...</span>
				{/if}
			</span>
			<svg
				class="w-4 h-4 text-gray-400 transition-transform {showClimateDropdown ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if showClimateDropdown}
			<div
				class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
			>
				{#each climateOptions as option}
					<label
						class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
					>
						<input
							type="checkbox"
							checked={(frontmatter.climate || []).includes(option.value)}
							onchange={() => toggleClimate(option.value)}
							class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<span class="ml-2 text-sm text-gray-700">{option.label}</span>
					</label>
				{/each}
			</div>
		{/if}

		<!-- Selected tags -->
		{#if (frontmatter.climate || []).length > 0}
			<div class="flex flex-wrap gap-1.5 mt-2">
				{#each frontmatter.climate || [] as climate}
					<span
						class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md"
					>
						{climateOptions.find((o) => o.value === climate)?.label || climate}
						{#if !readonly}
							<button
								type="button"
								onclick={() => toggleClimate(climate)}
								aria-label="Remove {climate}"
								class="hover:text-blue-900"
							>
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						{/if}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Budget -->
	<div>
		<span class="block text-sm font-medium text-gray-700 mb-1.5">Budget Level</span>
		<div class="flex gap-2">
			{#each budgetOptions as option}
				<button
					type="button"
					onclick={() => {
						frontmatter.budget = option.value;
						onchange();
					}}
					disabled={readonly}
					class="flex-1 px-3 py-2 text-sm border rounded-lg transition-all {frontmatter.budget ===
					option.value
						? 'bg-blue-600 text-white border-blue-600'
						: 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'} disabled:opacity-50"
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Size Multi-select -->
	<div class="size-dropdown relative">
		<span id="size-label" class="block text-sm font-medium text-gray-700 mb-1.5">Community Size</span>
		<button
			type="button"
			onclick={() => (showSizeDropdown = !showSizeDropdown)}
			disabled={readonly}
			aria-labelledby="size-label"
			class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
		>
			<span class="truncate">
				{#if (frontmatter.size || []).length > 0}
					{(frontmatter.size || []).length} selected
				{:else}
					<span class="text-gray-400">Select community sizes...</span>
				{/if}
			</span>
			<svg
				class="w-4 h-4 text-gray-400 transition-transform {showSizeDropdown ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if showSizeDropdown}
			<div
				class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
			>
				{#each sizeOptions as option}
					<label
						class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
					>
						<input
							type="checkbox"
							checked={Array.isArray(frontmatter.size) && frontmatter.size.includes(option.value)}
							onchange={() => toggleSize(option.value)}
							class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<span class="ml-2 text-sm text-gray-700">{option.label}</span>
					</label>
				{/each}
			</div>
		{/if}

		<!-- Selected tags -->
		{#if Array.isArray(frontmatter.size) && frontmatter.size.length > 0}
			<div class="flex flex-wrap gap-1.5 mt-2">
				{#each frontmatter.size as size}
					<span
						class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-md"
					>
						{sizeOptions.find((o) => o.value === size)?.label || size}
						{#if !readonly}
							<button type="button" onclick={() => toggleSize(size)} aria-label="Remove {size}" class="hover:text-emerald-900">
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						{/if}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Modules Autocomplete -->
	<div class="module-autocomplete relative">
		<span id="modules-label" class="block text-sm font-medium text-gray-700 mb-1.5">Modules</span>

		<!-- Selected modules as tags -->
		{#if (frontmatter.modules || []).length > 0}
			<div class="flex flex-wrap gap-1.5 mb-2">
				{#each frontmatter.modules || [] as moduleTitle}
					<span
						class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-md"
					>
						{moduleTitle}
						{#if !readonly}
							<button
								type="button"
								onclick={() => removeModule(moduleTitle)}
								aria-label="Remove {moduleTitle}"
								class="hover:text-purple-900"
							>
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						{/if}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Search input -->
		<div class="relative">
			<input
				bind:this={moduleInputRef}
				type="text"
				bind:value={moduleSearchQuery}
				onfocus={() => (showModuleSuggestions = true)}
				placeholder="Search and add modules..."
				disabled={readonly}
				class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500 transition-shadow"
			/>
			<svg
				class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>

		<!-- Suggestions dropdown -->
		{#if showModuleSuggestions && filteredModules().length > 0}
			<div
				class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto"
			>
				{#each filteredModules() as module}
					<button
						type="button"
						onclick={() => addModule(module.title)}
						class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
					>
						<span class="font-medium text-gray-900">{module.title}</span>
						<span class="text-gray-400 text-xs ml-2">({module.slug})</span>
					</button>
				{/each}
			</div>
		{:else if showModuleSuggestions && moduleSearchQuery && filteredModules().length === 0}
			<div
				class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3"
			>
				<p class="text-sm text-gray-500">No modules found matching "{moduleSearchQuery}"</p>
			</div>
		{/if}
	</div>
</div>
