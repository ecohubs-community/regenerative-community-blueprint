<script lang="ts">
  import { onMount } from 'svelte';

  let { content, class: className = '' } = $props();
  let renderedContent = $state<string>('');

  onMount(() => {
    if (content) {
      renderedContent = content;
    }
  });

  $effect(() => {
    if (content) {
      renderedContent = content;
    }
  });
</script>

<div class="prose prose-primary max-w-none dark:prose-invert prose-h2:text-primary prose-h2:font-bold prose-h2:text-2xl {className}">
  {@html renderedContent}
</div>
