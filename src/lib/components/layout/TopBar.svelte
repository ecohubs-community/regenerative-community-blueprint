<script lang="ts">
  import { sidebarOpen, toggleTheme } from '$lib/stores/ui';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import Button from '$lib/components/common/Button.svelte';
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
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
      
      <a href="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:shadow-lg transition-all">
          E
        </div>
        <span class="text-xl font-bold text-primary tracking-tight group-hover:text-primary transition-colors">EcoHubs</span>
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
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </Button>
      
      <div class="hidden md:flex gap-2">
         <Button variant="ghost" href="/about">About</Button>
         <Button variant="primary" href="/blueprint">The Blueprint</Button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Search Bar (shown below header on small screens) -->
  <div class="md:hidden px-lg pb-md">
    <SearchBar />
  </div>
</header>
