<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import {
		LOCALES,
		DEFAULT_LOCALE,
		getLocale,
		type Locale
	} from '$lib/i18n/languages';
	import { localizePath } from '$lib/i18n/path';

	/**
	 * Locales for which the current page has a real translation. Items not in this
	 * list still navigate (with English fallback) but render dimmed with an
	 * "en fallback" badge — an honest signal of in-progress coverage.
	 *
	 * Omit on pages that don't have per-page coverage data; the switcher then
	 * treats every locale as fully translated.
	 */
	let { availableLocales }: { availableLocales?: string[] } = $props();

	let open = $state(false);
	let buttonEl: HTMLButtonElement | undefined = $state();

	const currentLocale = $derived(page.data.locale ?? DEFAULT_LOCALE);
	const current = $derived(getLocale(currentLocale));

	function targetUrl(target: Locale): string {
		const path = localizePath(page.url.pathname, target.code);
		// search/hash are only meaningful at runtime — during prerender they're
		// inaccessible (and don't matter, since the prerender crawler only follows paths).
		if (!browser) return path;
		return path + page.url.search + page.url.hash;
	}

	function hasTranslation(code: string): boolean {
		if (!availableLocales) return true;
		return availableLocales.includes(code);
	}

	function onSelect(target: Locale) {
		// Year-long cookie so an unprefixed visit (the canonical default URL)
		// remembers the user's last choice. The actual navigation is handled by
		// the underlying <a href>, so middle-click / "open in new tab" still work.
		document.cookie = `lang=${target.code}; path=/; max-age=31536000; samesite=lax`;
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			buttonEl?.focus();
		}
	}

	function onDocClick(e: MouseEvent) {
		if (!(e.target as HTMLElement).closest('[data-lang-switcher]')) open = false;
	}

	// Hide the switcher entirely when there's only one locale registered —
	// no UI clutter while we're still in pre-translation phases.
	const hasMultiple = $derived(LOCALES.length > 1);
</script>

<svelte:window on:keydown={onKeydown} on:click={onDocClick} />

{#if hasMultiple}
	<div class="relative" data-lang-switcher>
		<button
			bind:this={buttonEl}
			type="button"
			class="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-surface text-text-primary"
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-label="Change language. Current: {current.englishName}"
			onclick={() => (open = !open)}
		>
			<Icon icon="tabler:world" class="w-4 h-4" />
			<span class="font-medium uppercase tracking-wide text-xs">{current.code}</span>
			<Icon icon="tabler:chevron-down" class="w-3 h-3 opacity-60" />
		</button>

		<!--
		  Always render the list (hidden via class when closed) so the SvelteKit
		  prerender crawler discovers locale-prefixed URLs and prerenders them.
		  A `{#if open}` block would make the <a href>s invisible to SSR.
		-->
		<ul
			role="listbox"
			class="absolute right-0 mt-1 min-w-[14rem] rounded-md border border-border bg-background shadow-lg py-1 z-50 {open
				? ''
				: 'hidden'}"
		>
			{#each LOCALES as locale (locale.code)}
					{@const isCurrent = locale.code === currentLocale}
					{@const translated = hasTranslation(locale.code)}
					<li role="option" aria-selected={isCurrent}>
						<a
							href={targetUrl(locale)}
							onclick={() => onSelect(locale)}
							class="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-surface
							{isCurrent ? 'font-semibold text-primary' : 'text-text-primary'}
							{!translated && !isCurrent ? 'opacity-60' : ''}"
							title={!translated && !isCurrent
								? `Not yet translated — will show English on this page`
								: undefined}
						>
							<span class="flex flex-col items-start">
								<span>{locale.nativeName}</span>
								{#if locale.nativeName !== locale.englishName}
									<span class="text-xs text-text-tertiary">{locale.englishName}</span>
								{/if}
							</span>
							{#if isCurrent}
								<Icon icon="tabler:check" class="w-4 h-4 text-primary shrink-0" />
							{:else if !translated}
								<span
									class="text-[10px] uppercase tracking-wide text-text-tertiary shrink-0"
								>
									en fallback
								</span>
							{/if}
						</a>
					</li>
			{/each}
		</ul>
	</div>
{/if}
