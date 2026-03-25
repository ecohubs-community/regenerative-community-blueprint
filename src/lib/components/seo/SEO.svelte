<script lang="ts">
	import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '$lib/config/site';

	type Props = {
		title: string;
		description?: string;
		url?: string;
		type?: 'website' | 'article';
		image?: string;
		noindex?: boolean;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	};

	let {
		title,
		description = '',
		url = '',
		type = 'website',
		image = DEFAULT_OG_IMAGE,
		noindex = false,
		jsonLd
	}: Props = $props();

	const fullTitle = $derived(
		title === SITE_NAME ? title : `${title} - RCOS`
	);
	const canonicalUrl = $derived(url ? `${SITE_URL}${url}` : SITE_URL);
	const ogImage = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);
	const jsonLdScript = $derived(
		jsonLd
			? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)
			: undefined
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={SITE_NAME} />

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
