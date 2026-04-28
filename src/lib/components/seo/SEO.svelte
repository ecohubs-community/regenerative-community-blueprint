<script lang="ts">
	import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '$lib/config/site';
	import { DEFAULT_LOCALE, LOCALES } from '$lib/i18n/languages';
	import { localeUrl } from '$lib/i18n/path';

	type Props = {
		title: string;
		description?: string;
		/** Path *without* locale prefix (e.g. `/articles/foo`). The component prefixes it
		 * for the active locale and emits hreflang alternates for every available one. */
		url?: string;
		type?: 'website' | 'article';
		image?: string;
		noindex?: boolean;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		/** Active locale for this page. Defaults to the site default. */
		locale?: string;
		/** Locales for which this page actually has a translation. If omitted,
		 * we assume the page exists in every registered locale (true for static pages
		 * like /, /search). For articles, pass the per-article coverage. */
		availableLocales?: string[];
	};

	let {
		title,
		description = '',
		url = '',
		type = 'website',
		image = DEFAULT_OG_IMAGE,
		noindex = false,
		jsonLd,
		locale = DEFAULT_LOCALE,
		availableLocales
	}: Props = $props();

	const fullTitle = $derived(title === SITE_NAME ? title : `${title} - RCOS`);

	// Canonical = the URL for THIS page in its CURRENT locale (with prefix if non-default).
	const canonicalUrl = $derived(url ? localeUrl(SITE_URL, url, locale) : SITE_URL);

	const ogImage = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);

	const jsonLdScript = $derived(
		jsonLd ? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd) : undefined
	);

	// Locales we will emit <link rel="alternate" hreflang="..."> for.
	// If availableLocales isn't provided, treat every registered locale as available.
	const alternates = $derived(
		url
			? LOCALES.filter((l) =>
					availableLocales ? availableLocales.includes(l.code) : true
				)
			: []
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<link rel="canonical" href={canonicalUrl} />

	<!-- hreflang alternates per locale, plus x-default pointing at the canonical (default-locale) URL.
	     Bidirectional reciprocity: every locale page lists every other locale's URL. -->
	{#each alternates as alt (alt.code)}
		<link rel="alternate" hreflang={alt.code} href={localeUrl(SITE_URL, url, alt.code)} />
	{/each}
	{#if url && alternates.length > 0}
		<link rel="alternate" hreflang="x-default" href={localeUrl(SITE_URL, url, DEFAULT_LOCALE)} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content={locale} />
	{#each alternates.filter((l) => l.code !== locale) as alt (alt.code)}
		<meta property="og:locale:alternate" content={alt.code} />
	{/each}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<meta name="twitter:image" content={ogImage} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	{#if jsonLdScript}
		{@html `<script type="application/ld+json">${jsonLdScript}</script>`}
	{/if}
</svelte:head>
