import { buildGraph } from '$lib/server/graph';
import { SITE_URL } from '$lib/config/site';
import { LOCALES, DEFAULT_LOCALE } from '$lib/i18n/languages';
import { localeUrl } from '$lib/i18n/path';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Sitemap with hreflang alternates per Google's documented format:
 * https://developers.google.com/search/docs/specialized/international/localized-versions#sitemap
 *
 * For each (page, locale) where the page has a real translation in that locale, emit
 * one <url> with <loc> for that locale, plus <xhtml:link rel="alternate"> entries for
 * EVERY available locale (bidirectional reciprocity is required), plus an x-default
 * pointing at the canonical (default-locale) URL.
 *
 * Phase 1: only the default locale has real content, so the output collapses to one
 * entry per page with no alternates — but the structure is in place for Phase 3.
 */

type Entry = {
	path: string; // unprefixed canonical path, e.g. "/articles/foo"
	availableLocales: string[]; // locales where a real translation exists
	changefreq: string;
	priority: string;
};

export const GET: RequestHandler = async () => {
	const graph = await buildGraph();

	const staticEntries: Entry[] = [
		{
			path: '/',
			// All UI is auto-translated (or trivially translatable); treat home as available everywhere.
			availableLocales: LOCALES.map((l) => l.code),
			changefreq: 'monthly',
			priority: '1.0'
		},
		{
			path: '/articles',
			availableLocales: LOCALES.map((l) => l.code),
			changefreq: 'weekly',
			priority: '0.8'
		}
	];

	// Phase 1: articles only have real content in the default locale. When per-article
	// availability lands (Phase 3), populate `availableLocales` from `article.availableLocales`.
	const articleEntries: Entry[] = graph.articles.map((article) => ({
		path: `/articles/${article.slug}`,
		availableLocales: [DEFAULT_LOCALE],
		changefreq: 'weekly',
		priority: '0.6'
	}));

	const allEntries = [...staticEntries, ...articleEntries];

	const renderUrl = (entry: Entry, loc: string) => {
		const alternates =
			entry.availableLocales.length > 1
				? entry.availableLocales
						.map(
							(alt) =>
								`    <xhtml:link rel="alternate" hreflang="${alt}" href="${localeUrl(SITE_URL, entry.path, alt)}" />`
						)
						.join('\n') +
					`\n    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(SITE_URL, entry.path, DEFAULT_LOCALE)}" />`
				: '';

		return `  <url>
    <loc>${localeUrl(SITE_URL, entry.path, loc)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternates ? '\n' + alternates : ''}
  </url>`;
	};

	const urls = allEntries.flatMap((entry) =>
		entry.availableLocales.map((loc) => renderUrl(entry, loc))
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
