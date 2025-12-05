<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  
  let { data } = $props();
</script>

<div class="p-6">
  <h1 class="text-2xl font-bold mb-4">Markdown Renderer Test (MDsveX)</h1>
  <MarkdownRenderer content={data.compiledContent} />
</div>
