<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

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

	let { content }: { content: EditorContent } = $props();

	let renderedContent = $state('');
	let isRendering = $state(true);

	// Configure marked for GitHub-flavored markdown
	marked.setOptions({
		gfm: true,
		breaks: true
	});

	// Render markdown content
	$effect(() => {
		renderContent();
	});

	async function renderContent() {
		if (!content?.content) {
			renderedContent = '';
			isRendering = false;
			return;
		}

		isRendering = true;
		try {
			const html = await marked.parse(content.content);
			renderedContent = DOMPurify.sanitize(html);
		} catch (error) {
			console.error('Error rendering markdown:', error);
			renderedContent = '<p class="text-red-500">Error rendering content</p>';
		} finally {
			isRendering = false;
		}
	}
</script>

<div class="content-preview bg-white rounded-lg shadow-sm border border-gray-200">
	<!-- Frontmatter Display -->
	{#if content?.frontmatter}
		<div class="bg-gray-50 border-b border-gray-200 p-4">
			<h2 class="text-lg font-semibold text-gray-900 mb-3">Content Metadata</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
				{#if content.frontmatter.title}
					<div>
						<span class="font-medium text-gray-700">Title:</span>
						<span class="ml-2 text-gray-900">{content.frontmatter.title}</span>
					</div>
				{/if}
				
				{#if content.frontmatter.description}
					<div>
						<span class="font-medium text-gray-700">Description:</span>
						<span class="ml-2 text-gray-900">{content.frontmatter.description}</span>
					</div>
				{/if}
				
				{#if content.frontmatter.climate && content.frontmatter.climate.length > 0}
					<div>
						<span class="font-medium text-gray-700">Climate:</span>
						<span class="ml-2 text-gray-900">{content.frontmatter.climate.join(', ')}</span>
					</div>
				{/if}
				
				{#if content.frontmatter.budget}
					<div>
						<span class="font-medium text-gray-700">Budget:</span>
						<span class="ml-2 text-gray-900">{content.frontmatter.budget}</span>
					</div>
				{/if}
				
				{#if content.frontmatter.size}
					<div>
						<span class="font-medium text-gray-700">Size:</span>
						<span class="ml-2 text-gray-900">{content.frontmatter.size}</span>
					</div>
				{/if}
				
				{#if content.frontmatter.modules && content.frontmatter.modules.length > 0}
					<div class="md:col-span-2">
						<span class="font-medium text-gray-700">Modules:</span>
						<span class="ml-2 text-gray-900">{content.frontmatter.modules.join(', ')}</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Markdown Content -->
	<div class="p-6">
		{#if isRendering}
			<div class="flex justify-center py-8">
				<div class="text-gray-500">Rendering preview...</div>
			</div>
		{:else if renderedContent}
			<div class="prose prose-lg max-w-none">
				{@html renderedContent}
			</div>
		{:else}
			<div class="text-center py-8 text-gray-500">
				No content to preview
			</div>
		{/if}
	</div>
</div>

<style>
	@reference '../styles/backend-theme.css';

	/* Custom styles for markdown content */
	:global(.prose h1) {
		@apply text-2xl font-bold text-gray-900 mb-4 mt-6;
	}
	
	:global(.prose h2) {
		@apply text-xl font-bold text-gray-900 mb-3 mt-5;
	}
	
	:global(.prose h3) {
		@apply text-lg font-semibold text-gray-900 mb-2 mt-4;
	}
	
	:global(.prose p) {
		@apply text-gray-700 mb-4 leading-relaxed;
	}
	
	:global(.prose ul) {
		@apply list-disc list-inside mb-4 text-gray-700;
	}
	
	:global(.prose ol) {
		@apply list-decimal list-inside mb-4 text-gray-700;
	}
	
	:global(.prose li) {
		@apply mb-2;
	}
	
	:global(.prose blockquote) {
		@apply border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 italic text-gray-700;
	}
	
	:global(.prose code) {
		@apply bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800;
	}
	
	:global(.prose pre) {
		@apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4;
	}
	
	:global(.prose pre code) {
		@apply bg-transparent p-0;
	}
	
	:global(.prose a) {
		@apply text-blue-600 hover:text-blue-800 underline;
	}
	
	:global(.prose img) {
		@apply max-w-full h-auto rounded-lg shadow-sm my-4;
	}
	
	:global(.prose table) {
		@apply w-full border-collapse border border-gray-300 mb-4;
	}
	
	:global(.prose th) {
		@apply border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left;
	}
	
	:global(.prose td) {
		@apply border border-gray-300 px-4 py-2;
	}
</style>
