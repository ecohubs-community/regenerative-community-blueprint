import { buildGraph } from '$lib/server/graph';
import { DEFAULT_LOCALE } from '$lib/i18n/languages';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ params, locals }) => {
	// `params.lang` is set when the URL has a non-default locale prefix (e.g. /de/...).
	// Otherwise the canonical (unprefixed) URL serves the default locale.
	// For URL/routing decisions we trust the URL; `locals.locale` from the negotiator
	// covers the unprefixed root case (cookie / Accept-Language).
	const locale = params.lang ?? locals.locale ?? DEFAULT_LOCALE;

	const graph = await buildGraph();
	return {
		graph,
		locale,
		// Phase 1: no real translations yet, so every article is "available" only in
		// the default locale. Phase 3 will replace this with per-article coverage.
		availableLocales: [DEFAULT_LOCALE]
	};
};
