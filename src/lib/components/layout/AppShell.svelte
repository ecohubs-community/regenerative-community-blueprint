<script lang="ts">
  import TopBar from './TopBar.svelte';
  import SidebarNav from './SidebarNav.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import Footer from './Footer.svelte';
  import { sidebarOpen } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import ResizableSidebar from '$lib/components/admin/ResizableSidebar.svelte';

  let { children } = $props();

  const isArticlesPage = $derived(page.url.pathname.startsWith('/articles'));
</script>

<div class="h-screen flex flex-col bg-background text-text-primary transition-colors duration-300 overflow-hidden">
  <!-- Top Bar -->
  <TopBar />

  <!-- Main shell: sidebar + content, full height under TopBar -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Desktop Sidebar (resizable) -->
    <aside class="hidden md:block h-full border-r border-border bg-surface/50 backdrop-blur-sm">
      <ResizableSidebar minWidth={220} maxWidth={420} defaultWidth={280} storageKey="frontend-articles-sidebar-width">
        <div class="p-4 h-full overflow-y-auto">
          <SidebarNav />
        </div>
      </ResizableSidebar>
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
    <main class="flex-1 w-full flex flex-col overflow-y-auto">
      <div class="max-w-7xl mx-auto w-full px-lg py-xl">
        <div class="mb-6">
          {#if !isArticlesPage}
            <Breadcrumbs />
          {/if}
        </div>
        {@render children()}
      </div>
      <Footer />
    </main>
  </div>
</div>
