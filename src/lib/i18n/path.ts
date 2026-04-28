/**
 * URL path helpers for locale-prefixed routing.
 *
 * Convention:
 *   - Default locale ({@link DEFAULT_LOCALE}) is served UNPREFIXED:  /articles/foo
 *   - Other locales are prefixed:                                    /de/articles/foo
 *
 * The route matcher (src/params/lang.ts) only accepts non-default locale codes,
 * so /en/articles/foo never matches — there is exactly one canonical URL per page.
 */

import { DEFAULT_LOCALE, LOCALE_CODES } from './languages';

/**
 * Strip a locale prefix from a pathname, returning the canonical (default-locale) path.
 *
 *   /de/articles/foo  →  /articles/foo
 *   /articles/foo     →  /articles/foo
 *   /de               →  /
 */
export function stripLocale(pathname: string): string {
	const match = pathname.match(/^\/([^/]+)(\/.*|$)/);
	if (match && LOCALE_CODES.includes(match[1]) && match[1] !== DEFAULT_LOCALE) {
		return match[2] || '/';
	}
	return pathname;
}

/**
 * Extract the locale from a pathname, or `null` if it has no recognized prefix.
 *
 *   /de/articles/foo  →  'de'
 *   /articles/foo     →  null   (unprefixed = default locale, but we return null
 *                                so callers can distinguish "explicit default" from
 *                                "no prefix"; resolve via DEFAULT_LOCALE downstream).
 */
export function extractLocale(pathname: string): string | null {
	const match = pathname.match(/^\/([^/]+)(?:\/|$)/);
	if (match && LOCALE_CODES.includes(match[1]) && match[1] !== DEFAULT_LOCALE) {
		return match[1];
	}
	return null;
}

/**
 * Rewrite a pathname for a target locale.
 *
 *   localizePath('/articles/foo',     'de') → '/de/articles/foo'
 *   localizePath('/de/articles/foo',  'en') → '/articles/foo'        (default = unprefixed)
 *   localizePath('/de/articles/foo',  'es') → '/es/articles/foo'
 */
export function localizePath(pathname: string, target: string): string {
	const canonical = stripLocale(pathname);
	if (target === DEFAULT_LOCALE) return canonical;
	// Avoid double-slash when canonical is "/"
	return canonical === '/' ? `/${target}` : `/${target}${canonical}`;
}

/**
 * Build a fully qualified URL for a given path × locale, given a site origin.
 *
 *   localeUrl('https://x.com', '/articles/foo', 'de') → 'https://x.com/de/articles/foo'
 */
export function localeUrl(origin: string, pathname: string, target: string): string {
	return origin.replace(/\/$/, '') + localizePath(pathname, target);
}

/**
 * Component helper: localize an internal href so it preserves the active locale prefix.
 * No-op for external URLs (`http://`, `mailto:`, etc.), hash-only links, and empty
 * strings. Used everywhere we emit `<a href="/articles/...">`.
 *
 *   localized('/articles/foo', 'de') → '/de/articles/foo'
 *   localized('/articles/foo', 'en') → '/articles/foo'
 *   localized('https://x.com', 'de') → 'https://x.com'
 *   localized('#section', 'de')      → '#section'
 */
export function localized(href: string, locale: string): string {
	if (!href || !href.startsWith('/')) return href;
	return localizePath(href, locale);
}
