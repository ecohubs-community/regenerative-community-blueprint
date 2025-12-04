<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

  interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    class?: string;
    href?: string;
    disabled?: boolean;
    type?: HTMLButtonAttributes['type'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let {
    variant = 'primary',
    size = 'md',
    class: className = '',
    href,
    disabled = false,
    type = 'button',
    children,
    ...rest
  }: Props = $props();

  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-sm hover:shadow-md hover:-translate-y-0.5',
    outline: 'border border-border bg-transparent hover:bg-surface text-text-primary',
    ghost: 'hover:bg-surface text-text-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10 p-2'
  };

  const classes = $derived(`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

{#if href}
  <a {href} class={classes} {...rest}>
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} class={classes} {...rest}>
    {@render children?.()}
  </button>
{/if}
