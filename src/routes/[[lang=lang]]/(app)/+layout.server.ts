import { buildGraph } from '$lib/server/graph';
import { DEFAULT_LOCALE } from '$lib/i18n/languages';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ params }) => {
	// URL is authoritative — `params.lang` is set only when the URL has a non-default
	// locale prefix (e.g. /de/...), otherwise we serve the default locale.
	//
	// We deliberately do NOT consult `locals.locale` (which falls back to cookie /
	// Accept-Language in hooks.server.ts). If we did, an unprefixed URL like /foo
	// could resolve to `de` whenever the user's cookie says `lang=de` — even though
	// the URL itself says English. That mismatch was the source of "switch back to
	// English flips the page content but leaves the chrome in German": the page's
	// own server load uses `params.lang ?? DEFAULT_LOCALE` (URL only), so it would
	// see `en` while the layout still saw `de` from the cookie fallback.
	//
	// The cookie set by LanguageSwitcher.svelte still has a job — it remembers the
	// last switcher choice for any future "redirect on bare root URL" feature —
	// but it must never override the URL's implied locale on a per-page basis.
	const locale = params.lang ?? DEFAULT_LOCALE;

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
