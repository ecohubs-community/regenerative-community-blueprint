<script lang="ts">
  import TopBar from './TopBar.svelte';
  import SidebarNav from './SidebarNav.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import Footer from './Footer.svelte';
  import { sidebarOpen } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';

  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-background text-text-primary transition-colors duration-300">
  <!-- Top Bar -->
  <TopBar />

  <div class="flex flex-1 relative">
    <!-- Desktop Sidebar -->
    <aside class="hidden md:block w-72 border-r border-border bg-surface/50 backdrop-blur-sm fixed h-[calc(100vh-4rem)] overflow-y-auto top-18 left-0 z-20">
      <div class="p-4">
        <SidebarNav />
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    {#if $sidebarOpen}
      <div class="fixed inset-0 z-40 md:hidden">
        <div 
          class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
          onclick={() => sidebarOpen.set(false)} 
          onkeydown={(e) => e.key === 'Escape' && sidebarOpen.set(false)} 
          role="button" 
          tabindex="0" 
          aria-label="Close sidebar"
        ></div>
        <aside class="fixed left-0 top-0 h-full w-72 bg-surface border-r border-border z-50 shadow-2xl p-4 overflow-y-auto">
          <div class="flex justify-end mb-4">
             <button onclick={() => sidebarOpen.set(false)} aria-label="Close sidebar" class="p-2 rounded-md hover:bg-border">
                <Icon icon="tabler:x" class="w-5 h-5" />
             </button>
          </div>
          <SidebarNav />
        </aside>
      </div>
    {/if}

    <!-- Main Content Area -->
    <main class="flex-1 w-full md:pl-72 flex flex-col min-h-[calc(100vh-4rem)]">
      <div class="flex-1 max-w-7xl mx-auto w-full px-lg py-xl">
        <div class="mb-6">
          <Breadcrumbs />
        </div>
        {@render children()}
      </div>
      <Footer />
    </main>
  </div>
</div>
