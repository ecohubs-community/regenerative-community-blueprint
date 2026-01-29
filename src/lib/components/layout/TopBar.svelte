<script lang="ts">
  import { sidebarOpen, toggleTheme } from '$lib/stores/ui';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Icon from '@iconify/svelte';
</script>

<header class="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
  <div class="flex items-center justify-between px-lg py-md max-w-full mx-auto">
    <!-- Left: Logo + Hamburger (mobile) -->
    <div class="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        class="md:hidden"
        onclick={() => sidebarOpen.update((v) => !v)}
        aria-label="Toggle navigation"
      >
        <Icon icon="tabler:menu-2" class="w-6 h-6" />
      </Button>
      
      <a href="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:shadow-lg transition-all">
          E
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold text-primary tracking-tight group-hover:text-primary transition-colors leading-5">EcoHubs</span>
          <span class="text-xs font-bold text-gray-500 transition-colors">Blueprint / RCOS</span>
        </div>
      </a>
    </div>

    <!-- Center: Global Search -->
    <div class="hidden md:block flex-1 max-w-lg mx-8">
      <SearchBar />
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onclick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Icon icon="tabler:sun-moon" class="w-5 h-5" />
      </Button>
      
      <div class="hidden md:flex gap-2">
         <Button variant="ghost" href="https://ecohubs.community" target="_blank">About <Icon icon="tabler:arrow-up-right" class="w-4 h-4" /></Button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Search Bar (shown below header on small screens) -->
  <div class="md:hidden px-lg pb-md">
    <SearchBar />
  </div>
</header>
