/**
 * Single source of truth for supported locales.
 *
 * Add a locale here and it becomes available to:
 *   - the URL matcher (src/params/lang.ts)
 *   - the language switcher (src/lib/components/i18n/LanguageSwitcher.svelte)
 *   - the locale negotiator in hooks.server.ts
 *   - the sitemap and hreflang emitters
 *   - the downloads pipeline (Phase 4)
 *
 * `default: true` MUST be set on exactly one locale. The default locale is served
 * UNPREFIXED (canonical URL: /articles/...). All other locales get a prefix
 * (/de/articles/..., /es/articles/...).
 */

export type Locale = {
	code: string; // BCP-47 / ISO 639-1, used as URL prefix and hreflang value
	englishName: string; // for tooltips, screen readers, fallback labels
	nativeName: string; // shown in the language switcher
	default?: boolean;
};

export const LOCALES: readonly Locale[] = [
	{ code: 'en', englishName: 'English', nativeName: 'English', default: true },
	{ code: 'de', englishName: 'German', nativeName: 'Deutsch' },
	{ code: 'es', englishName: 'Spanish', nativeName: 'Español' },
	{ code: 'fr', englishName: 'French', nativeName: 'Français' }
	// Add more as translations land:
	// { code: 'pt', englishName: 'Portuguese', nativeName: 'Português' },
	// { code: 'fr', englishName: 'French',     nativeName: 'Français' },
] as const;

export const DEFAULT_LOCALE: string = LOCALES.find((l) => l.default)?.code ?? 'en';
export const LOCALE_CODES: readonly string[] = LOCALES.map((l) => l.code);

/** Type guard for runtime locale validation. */
export function isLocale(value: unknown): value is string {
	return typeof value === 'string' && LOCALE_CODES.includes(value);
}

/** Look up a locale's metadata; falls back to the default locale. */
export function getLocale(code: string | undefined | null): Locale {
	return LOCALES.find((l) => l.code === code) ?? LOCALES.find((l) => l.default)!;
}
