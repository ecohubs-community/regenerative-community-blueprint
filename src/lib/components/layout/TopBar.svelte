<script lang="ts">
  import { sidebarOpen, toggleTheme } from '$lib/stores/ui';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Icon from '@iconify/svelte';
  import { resolve } from '$app/paths';
  import logo from '$lib/assets/logo.webp';
  import LanguageSwitcher from '$lib/components/i18n/LanguageSwitcher.svelte';
  import { page } from '$app/state';
  import { m } from '$lib/i18n';
  import { localized } from '$lib/i18n/path';
  import { DEFAULT_LOCALE } from '$lib/i18n/languages';

  // Forward per-page coverage to the switcher so untranslated locales render dimmed.
  const availableLocales = $derived(page.data.availableLocales as string[] | undefined);
  const locale = $derived((page.data?.locale as string | undefined) ?? DEFAULT_LOCALE);
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
        aria-label={m('nav.toggle_navigation')}
      >
        <Icon icon="tabler:menu-2" class="w-6 h-6" />
      </Button>

      <a href={localized(resolve('/'), locale)} class="flex items-center gap-2 group">
        <img src={logo} alt={`${m('site.brand')} Logo`} class="w-10 h-10" />
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-5 font-serif">{m('site.brand')}</span>
          <span class="text-xs font-bold text-gray-500 transition-colors">{m('site.tagline')}</span>
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
        aria-label={m('nav.toggle_theme')}
      >
        <Icon icon="tabler:sun-moon" class="w-5 h-5" />
      </Button>

      <LanguageSwitcher {availableLocales} />

      <div class="hidden md:flex gap-2">
         <Button variant="ghost" href="https://ecohubs.community" target="_blank">{m('nav.about')} <Icon icon="tabler:arrow-up-right" class="w-4 h-4" /></Button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Search Bar (shown below header on small screens) -->
  <div class="md:hidden px-lg pb-md">
    <SearchBar />
  </div>
</header>
