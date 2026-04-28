import type { ParamMatcher } from '@sveltejs/kit';
import { LOCALE_CODES, DEFAULT_LOCALE } from '$lib/i18n/languages';

/**
 * Optional-param matcher for the `[[lang=lang]]` route segment.
 *
 * Matches non-default locale codes only. The default locale is canonical-unprefixed,
 * so /en/articles/foo MUST NOT match — otherwise we'd have two canonical URLs.
 */
export const match: ParamMatcher = (param) =>
	LOCALE_CODES.includes(param) && param !== DEFAULT_LOCALE;
