<script lang="ts">
  interface Props {
    href?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { href, class: className = '', children, ...rest }: Props = $props();

  let baseClasses = $derived(`glass-card block p-lg rounded-xl transition-all duration-300 ${className}`);
  const hoverClasses = 'hover:translate-y-[-4px] hover:shadow-lg hover:border-primary-light/30';
</script>

{#if href}
  <a {href} class="{baseClasses} {hoverClasses}" {...rest}>
    {@render children?.()}
  </a>
{:else}
  <div class="{baseClasses}" {...rest}>
    {@render children?.()}
  </div>
{/if}
