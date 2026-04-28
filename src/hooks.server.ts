import type { Handle } from '@sveltejs/kit';
import {
	DEFAULT_LOCALE,
	LOCALE_CODES,
	isLocale
} from '$lib/i18n/languages';
import { extractLocale } from '$lib/i18n/path';

/**
 * Locale negotiation order (per docs/translation-plan.md §0.4):
 *   1. URL prefix (e.g. /de/articles/...)        — explicit, wins outright
 *   2. `lang` cookie set by the language switcher
 *   3. `Accept-Language` header (only on root requests, to avoid surprising
 *      users who deep-link to a specific URL)
 *   4. DEFAULT_LOCALE
 *
 * The resolved locale is stored on `event.locals.locale` for downstream loaders,
 * and substituted into the `<html lang="%lang%">` placeholder in app.html.
 *
 * We deliberately DO NOT auto-redirect on Accept-Language for resolved URLs —
 * it would break shared links and change the URL out from under users.
 */

function negotiateAcceptLanguage(header: string | null): string | null {
	if (!header) return null;
	// Parse "Accept-Language: de-DE,de;q=0.9,en;q=0.8" → take first matching primary tag.
	const tags = header
		.split(',')
		.map((entry) => {
			const [tag, qPart] = entry.trim().split(';');
			const q = qPart?.match(/q=([\d.]+)/)?.[1];
			return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of tags) {
		// Try exact match first, then primary tag (de-DE → de).
		if (LOCALE_CODES.includes(tag)) return tag;
		const primary = tag.split('-')[0];
		if (LOCALE_CODES.includes(primary)) return primary;
	}
	return null;
}

function resolveLocale(event: Parameters<Handle>[0]['event']): string {
	// 1. URL prefix
	const fromUrl = extractLocale(event.url.pathname);
	if (fromUrl && isLocale(fromUrl)) return fromUrl;

	// 2. Cookie
	const fromCookie = event.cookies.get('lang');
	if (fromCookie && isLocale(fromCookie)) return fromCookie;

	// 3. Accept-Language (root requests only — see comment above).
	if (event.url.pathname === '/' || event.url.pathname === '') {
		const fromHeader = negotiateAcceptLanguage(event.request.headers.get('accept-language'));
		if (fromHeader) return fromHeader;
	}

	// 4. Default
	return DEFAULT_LOCALE;
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.locale = resolveLocale(event);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.locals.locale)
	});
};
