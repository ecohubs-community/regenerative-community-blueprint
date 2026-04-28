/**
 * Plain-JSON message translation with explicit-locale and reactive-locale APIs.
 *
 * Two flavours of API:
 *
 *   1. `t(locale, key, vars?)` — pure function, takes locale explicitly. Use this in
 *      `+server.ts`, build scripts, and anywhere `$app/state` isn't available.
 *
 *   2. `m(key, vars?)` — auto-resolves locale from `$app/state.page.data.locale`.
 *      Use this inside `.svelte` components for terse markup. Reactive: re-runs
 *      when the locale changes.
 *
 * Interpolation: `{name}` placeholders are replaced from the `vars` object.
 *   t('en', 'downloads.generated', { date: '2026-04-27' })  // "Generated 2026-04-27"
 *
 * Fallback chain: requested locale → DEFAULT_LOCALE → key (visible-but-debuggable).
 *
 * Why plain JSON instead of Paraglide:
 *   - We already own URL-prefix routing; Paraglide's adapter would compete with it.
 *   - String count is small (~70). Tree-shaking saves bytes that don't matter yet.
 *   - Plain JSON is easier to onboard contributors and translators (no build dance).
 *   - Migration to Paraglide later remains straightforward — the message keys are
 *     already namespaced and interpolated, which is what Paraglide expects.
 */

import { page } from '$app/state';
import enMessages from './messages/en.json' with { type: 'json' };
import deMessages from './messages/de.json' with { type: 'json' };
import esMessages from './messages/es.json' with { type: 'json' };
import { DEFAULT_LOCALE } from './languages';

export type Messages = Record<string, string>;

/** Registry of loaded message bundles. Add a new locale by importing its JSON above. */
export const MESSAGES: Record<string, Messages> = {
	en: enMessages as Messages,
	de: deMessages as Messages,
	es: esMessages as Messages
};

/** Replace {name} placeholders with values from `vars`. */
function interpolate(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, name) => {
		const v = vars[name];
		return v === undefined ? `{${name}}` : String(v);
	});
}

/**
 * Translate a key for an explicit locale. Falls back to the default locale, then to
 * the key itself (so missing keys stay visible in dev rather than rendering empty).
 */
export function t(
	locale: string,
	key: string,
	vars?: Record<string, string | number>
): string {
	const raw = MESSAGES[locale]?.[key] ?? MESSAGES[DEFAULT_LOCALE]?.[key] ?? key;
	return vars ? interpolate(raw, vars) : raw;
}

/**
 * Translate a key using the locale from the current page data. Use inside Svelte
 * components — re-runs reactively because `page.data` is a reactive proxy.
 *
 * Outside components (loaders, hooks, scripts), use `t(locale, key)` directly.
 */
export function m(key: string, vars?: Record<string, string | number>): string {
	const locale = (page.data?.locale as string | undefined) ?? DEFAULT_LOCALE;
	return t(locale, key, vars);
}
