<script lang="ts">
  import { goto } from '$app/navigation';

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
    <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </button>
</div>
