<script lang="ts">
	import Icon from "@iconify/svelte";

  const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-surface mt-auto">
  <div class="max-w-7xl mx-auto px-lg py-2xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 ">
      <!-- Brand -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-gradient">EcoHubs</h3>
        <p class="text-sm text-text-secondary max-w-full">
          Empowering communities with regenerative blueprints for a sustainable future.
        </p>
      </div>

      <!-- Links -->
      <div class="space-y-4">
        <h4 class="font-semibold text-primary">Resources</h4>
        <ul class="space-y-2 text-sm text-text-secondary">
          <li><a href="https://ecohubs.community" class="hover:text-text-primary transition-colors flex items-center gap-1">About Us <Icon icon="tabler:arrow-up-right" class="w-4 h-4" /></a></li>
          <li><a href="https://ecohubs.community/join" class="hover:text-text-primary transition-colors flex items-center gap-1">Join us <Icon icon="tabler:arrow-up-right" class="w-4 h-4" /></a></li>
        </ul>
      </div>

      <!-- Contact/Social -->
      <div class="space-y-4">
        <h4 class="font-semibold text-primary">Connect</h4>
        <ul class="space-y-2 text-sm text-text-secondary">
          <li><a href="https://github.com/ecohubs-community/regenerative-community-blueprint" target="_blank" rel="noreferrer" class="hover:text-text-primary transition-colors flex items-center gap-1">GitHub <Icon icon="tabler:arrow-up-right" class="w-4 h-4" /></a></li>
          <!-- <li><a href="https://discord.com" target="_blank" rel="noreferrer" class="hover:text-text-primary transition-colors flex items-center gap-1">Discord <Icon icon="tabler:arrow-up-right" class="w-4 h-4" /></a></li> -->
        </ul>
      </div>
    </div>

    <div class="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-xs text-text-tertiary">
        &copy; {year} EcoHubs Platform. All rights reserved.
      </p>
      <div class="flex gap-4 text-xs text-text-tertiary">
        <a href="/privacy" class="hover:text-text-primary transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-text-primary transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
