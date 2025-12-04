<script lang="ts">
  import { toggleFilter, clearFilters, filters } from '$lib/stores/search';
</script>

<div class="flex flex-wrap items-center gap-3">
  <button
    onclick={clearFilters}
    class="text-sm px-3 py-1 rounded-full bg-surface text-text-secondary hover:bg-surface-elevated"
  >
    Clear all
  </button>

  <div class="flex flex-wrap gap-2">
    <span class="text-sm text-tertiary">Climate:</span>
    {#each ['Tropical Wet', 'Tropical Dry', 'Temperate', 'Continental', 'Mountain/Highland', 'Arid/Semiarid', 'Subtropical'] as value}
      <button
        onclick={() => toggleFilter('climate', value)}
        class="text-xs px-2 py-1 rounded-full {$filters.climate.has(value)
          ? 'bg-blue-100 text-blue-800'
          : 'bg-surface text-text-secondary hover:bg-surface-elevated'}"
      >
        {value}
      </button>
    {/each}
  </div>

  <div class="flex flex-wrap gap-2">
    <span class="text-sm text-tertiary">Budget:</span>
    {#each ['Low Budget', 'Medium Budget', 'High Budget'] as value}
      <button
        onclick={() => toggleFilter('budget', value)}
        class="text-xs px-2 py-1 rounded-full {$filters.budget.has(value)
          ? 'bg-amber-100 text-amber-800'
          : 'bg-surface text-text-secondary hover:bg-surface-elevated'}"
      >
        {value}
      </button>
    {/each}
  </div>

  <div class="flex flex-wrap gap-2">
    <span class="text-sm text-tertiary">Size:</span>
    {#each ['<10 people', '10–50 people', '50–100 people', '100–200 people', '>200 people'] as value}
      <button
        onclick={() => toggleFilter('size', value)}
        class="text-xs px-2 py-1 rounded-full {$filters.size.has(value)
          ? 'bg-forest-100 text-forest-800'
          : 'bg-surface text-text-secondary hover:bg-surface-elevated'}"
      >
        {value}
      </button>
    {/each}
  </div>
</div>
