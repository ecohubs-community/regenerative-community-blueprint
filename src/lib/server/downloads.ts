import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LOCALE } from '$lib/i18n/languages';

/**
 * Manifest schema (per docs/translation-plan.md §3.2). Per-locale bundles and
 * per-(template, locale, format) file URLs. The build scripts emit one entry
 * per template with `availableLocales` listing the locales for which a real
 * translation exists; the runtime falls back to the default locale when the
 * requested one is not in `availableLocales`.
 */

export type ManifestTemplate = {
  id: string;
  relPath: string;
  layer: string;
  /** Localized titles, keyed by locale. */
  titles: Record<string, string>;
  /** Localized download URLs: files[locale][format] = "/downloads/<locale>/<fmt>/...". */
  files: Record<string, Record<string, string>>;
  /** Locales for which a real translation exists. */
  availableLocales: string[];
};

export type Manifest = {
  generated: string;
  defaultLocale: string;
  locales: string[];
  formats: string[];
  /** bundles[locale][format] → ZIP URL */
  bundles: Record<string, Record<string, string>>;
  templates: ManifestTemplate[];
};

export type CoreManifestEntry = {
  slug: string;
  titles: Record<string, string>;
  generated: string;
  formats: string[];
  /** files[locale] = { [format]: url } */
  files: Record<string, Record<string, string>>;
  availableLocales: string[];
};

export type CoreManifest = {
  generated: string;
  defaultLocale: string;
  locales: string[];
  entries: CoreManifestEntry[];
};

/* ---------- runtime download types ---------- */

export type SingleTemplateDownloads = {
  type: 'single';
  generated: string;
  formats: string[];
  /** Files for the served locale (may be the default-locale fallback). */
  files: Record<string, string>;
  /** Bundle URLs for the served locale. */
  bundles: Record<string, string>;
  /** Locale actually being served (may differ from requested when fallback kicks in). */
  servedLocale: string;
  /** True if the requested locale doesn't have a translation, so we fell back. */
  isFallback: boolean;
};

export type SpecDownload = {
  type: 'spec';
  generated: string;
  title: string;
  formats: string[];
  files: Record<string, string>;
  servedLocale: string;
  isFallback: boolean;
};

export type IndexTemplateDownloads = {
  type: 'index';
  generated: string;
  formats: string[];
  /** Bundle URLs for the served locale. */
  bundles: Record<string, string>;
  servedLocale: string;
  /** True if the requested locale has zero translated templates. */
  isFallback: boolean;
  templates: Array<{
    id: string;
    layer: string;
    title: string;
    slug: string;
    files: Record<string, string>;
    availableLocales: string[];
    /** Whether this template has a real translation in the requested locale. */
    isTranslated: boolean;
  }>;
};

export type TemplateDownloads = SingleTemplateDownloads | IndexTemplateDownloads;
export type ArticleDownloads = TemplateDownloads | SpecDownload;

/* ---------- manifest loading ---------- */

let cachedTemplates: Manifest | null | undefined;
let cachedCore: CoreManifest | null | undefined;

function resolveAssetPath(relPath: string): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '../../..', relPath),
    path.resolve(here, '../../../..', relPath),
    path.resolve(here, '../../../../..', relPath),
    path.resolve(process.cwd(), relPath)
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

function loadJson<T>(relPath: string): T | null {
  try {
    const abs = resolveAssetPath(relPath);
    if (!abs) return null;
    return JSON.parse(readFileSync(abs, 'utf8')) as T;
  } catch {
    return null;
  }
}

export function loadManifest(): Manifest | null {
  if (cachedTemplates !== undefined) return cachedTemplates;
  cachedTemplates = loadJson<Manifest>('static/downloads/manifest-templates.json');
  return cachedTemplates;
}

export function loadCoreManifest(): CoreManifest | null {
  if (cachedCore !== undefined) return cachedCore;
  cachedCore = loadJson<CoreManifest>('static/downloads/manifest-core.json');
  return cachedCore;
}

/* ---------- locale-aware lookup helpers ---------- */

/**
 * Pick the locale that should actually be served for a given request:
 * - the requested locale, if it's in `available`
 * - else the default locale, if it's in `available`
 * - else the first available locale (last-ditch — should not normally happen)
 *
 * Returns `{ servedLocale, isFallback }`.
 */
function resolveServedLocale(
  requested: string,
  available: string[],
  defaultLocale: string = DEFAULT_LOCALE
): { servedLocale: string; isFallback: boolean } {
  if (available.includes(requested)) return { servedLocale: requested, isFallback: false };
  if (available.includes(defaultLocale)) return { servedLocale: defaultLocale, isFallback: true };
  return { servedLocale: available[0] ?? defaultLocale, isFallback: true };
}

/**
 * Get download metadata for an article slug at the requested locale. Handles
 * three article types: index page (`rcos-templates`), individual templates
 * (`rcos-templates/...`), and the core spec (`rcos-core/v0-1`).
 */
export function getArticleDownloads(
  slug: string,
  locale: string = DEFAULT_LOCALE
): ArticleDownloads | null {
  const tpl = getTemplateDownloads(slug, locale);
  if (tpl) return tpl;

  const core = loadCoreManifest();
  if (core) {
    const entry = core.entries.find((e) => e.slug === slug);
    if (entry) {
      const { servedLocale, isFallback } = resolveServedLocale(
        locale,
        entry.availableLocales,
        core.defaultLocale ?? DEFAULT_LOCALE
      );
      return {
        type: 'spec',
        generated: entry.generated,
        title: entry.titles[servedLocale] ?? entry.titles[DEFAULT_LOCALE] ?? slug,
        formats: entry.formats,
        files: entry.files[servedLocale] ?? entry.files[DEFAULT_LOCALE] ?? {},
        servedLocale,
        isFallback
      };
    }
  }
  return null;
}

export function getTemplateDownloads(
  slug: string,
  locale: string = DEFAULT_LOCALE
): TemplateDownloads | null {
  const manifest = loadManifest();
  if (!manifest) return null;

  const defaultLocale = manifest.defaultLocale ?? DEFAULT_LOCALE;

  if (slug === 'rcos-templates') {
    // Index page: list every template with its (possibly fallback) locale-specific files.
    // The "bundle" URLs use the requested locale if any template is translated there;
    // otherwise we fall back to the default-locale bundle.
    const anyTranslatedInLocale = manifest.templates.some((t) =>
      t.availableLocales.includes(locale)
    );
    const localeForBundles = anyTranslatedInLocale ? locale : defaultLocale;
    const bundles = manifest.bundles[localeForBundles] ?? manifest.bundles[defaultLocale] ?? {};

    return {
      type: 'index',
      generated: manifest.generated,
      formats: manifest.formats,
      bundles,
      servedLocale: localeForBundles,
      isFallback: localeForBundles !== locale,
      templates: manifest.templates.map((t) => {
        const isTranslated = t.availableLocales.includes(locale);
        const loc = isTranslated ? locale : defaultLocale;
        const slugPath = t.relPath.replace(/\.md$/, '');
        return {
          id: t.id,
          layer: t.layer || t.relPath.split('/')[0],
          title: t.titles[loc] ?? t.titles[defaultLocale] ?? slugPath,
          slug: `rcos-templates/${slugPath}`,
          files: t.files[loc] ?? t.files[defaultLocale] ?? {},
          availableLocales: t.availableLocales,
          isTranslated
        };
      })
    };
  }

  const prefix = 'rcos-templates/';
  if (!slug.startsWith(prefix)) return null;
  const relPath = slug.slice(prefix.length) + '.md';
  const entry = manifest.templates.find((t) => t.relPath === relPath);
  if (!entry) return null;

  const { servedLocale, isFallback } = resolveServedLocale(
    locale,
    entry.availableLocales,
    defaultLocale
  );
  const bundles = manifest.bundles[servedLocale] ?? manifest.bundles[defaultLocale] ?? {};

  return {
    type: 'single',
    generated: manifest.generated,
    formats: manifest.formats,
    files: entry.files[servedLocale] ?? entry.files[defaultLocale] ?? {},
    bundles,
    servedLocale,
    isFallback
  };
}
