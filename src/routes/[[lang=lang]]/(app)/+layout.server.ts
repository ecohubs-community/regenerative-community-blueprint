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

	const graph = await buildGraph(locale);
	// Layout-level availableLocales is the *union* across the whole graph; pages
	// override with per-article coverage where it's narrower.
	const availableLocales = collectLocales(graph.articles);
	return {
		graph,
		locale,
		availableLocales
	};
};

function collectLocales(articles: { availableLocales: string[] }[]): string[] {
	const set = new Set<string>([DEFAULT_LOCALE]);
	for (const a of articles) for (const l of a.availableLocales) set.add(l);
	return [...set].sort();
}
