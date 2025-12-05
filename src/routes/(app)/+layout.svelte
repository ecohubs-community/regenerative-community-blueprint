<script lang="ts">
  import './layout.css';
  import { setContext, onMount } from 'svelte';
  import { graph } from '$lib/stores/graph';
  import { sidebarOpen, theme, setTheme } from '$lib/stores/ui';
  import AppShell from '$lib/components/layout/AppShell.svelte';

  let { children, data } = $props();

  // Initialize graph store from server data
  $effect(() => {
    if (data.graph) {
      graph.set(data.graph);
    }
  });

  // Persist theme preference
  onMount(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    theme.set(initial);
  });

  // Persist sidebar state on mobile
  $effect(() => {
    if (typeof window !== 'undefined') {
      if ($sidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  });
</script>

<AppShell>
  {@render children()}
</AppShell>
