<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';

  let query = $state('');
  let inputEl: HTMLInputElement;

  function handleSearch() {
    const q = query.trim();
    if (q) {
      goto(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
</script>

<div class="relative">
  <input
    bind:this={inputEl}
    bind:value={query}
    type="search"
    placeholder="Search knowledge base…"
    class="w-full px-4 py-2 rounded-full bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    onkeydown={handleKeydown}
  />
  <button
    onclick={handleSearch}
    aria-label="Search"
    class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-surface-elevated"
  >
    <Icon icon="tabler:search" class="w-5 h-5 text-text-secondary" />
  </button>
</div>
