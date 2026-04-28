# Translation Plan for RCOS Blueprint

## Overview

This document describes how to add multi-language support to the RCOS Blueprint platform. The system has **four** distinct translation surfaces, each with its own strategy:

1. **Articles** (~80 markdown files in `content/articles/`) — the core knowledge base, including the `rcos-core` spec and the `rcos-templates` library.
2. **Website UI** (~50 strings hardcoded across ~15 Svelte components) — navigation, buttons, headings, the search box.
3. **Downloads pipeline** (`scripts/build-templates.mjs`, `scripts/build-core.mjs`) — the generated `.md` / `.docx` / `.odt` files and their preambles ("Generated", "Source", "Rationale", "Instructions"…).
4. **SEO metadata** (`<title>`, descriptions, JSON-LD, sitemap, `hreflang`) — discoverability per locale.

Each surface is handled differently to balance maintainability, build-time cost, and translator effort.

> **Scope guardrail.** This plan is opinionated about _mechanism_, not _which languages to ship_. Start with one target locale (suggested: `de`) end-to-end before scaling out — a translation pipeline broken in two languages is twice as painful as in one.

---

## 0. Cross-cutting decisions (decide these first)

These choices ripple through every section below. Lock them before writing code.

### 0.1 URL strategy

**Recommended:** Locale prefix routing with the default locale **unprefixed**.

```
/articles/rcos-core            → en (default, canonical)
/de/articles/rcos-core         → de
/es/articles/rcos-core         → es
```

- Easier link sharing for the dominant audience; existing inbound links keep working.
- Add a `<link rel="alternate" hreflang="…">` per locale on every page (see §6).
- Implemented via SvelteKit optional param: `src/routes/[[lang=lang]]/(app)/...` with a `lang` matcher in `src/params/lang.ts` that whitelists known locales.

### 0.2 Slug policy

**Slugs stay in English.** Translating `governance` → `gobernanza` in URLs creates two problems: (a) every cross-link in every translated article must be rewritten, and (b) slug collisions when an article is renamed in source. Translating titles in the UI is enough.

The one exception worth considering later: a localized slug **alias** that 301-redirects to the canonical English slug. Out of scope for v1.

### 0.3 Translation key

Use the `id` field in frontmatter (already present on every article) as the join key between source and translations — **not** the file path. This survives renames, folder reorganization, and slug changes. The `sourceFile` field in translated frontmatter becomes a hint, not an authority.

### 0.4 Locale negotiation

1. Explicit URL prefix wins (`/de/...`).
2. Else: a `lang` cookie set by the language switcher.
3. Else: `Accept-Language` header (server-side, only for the root request).
4. Fall back to `en`.

Never auto-redirect on `Accept-Language` for already-resolved URLs — it breaks shared links.

---

## 1. Article translation

### 1.1 File layout: parallel files with language suffix

Each article gets a sibling translated file:

```
content/articles/
  rcos-core.md                    ← English (default)
  rcos-core.de.md                 ← German
  rcos-core/
    v0-1.md
    v0-1.de.md
    v0-1/
      00-introduction.md
      00-introduction.de.md
  rcos-templates/
    layer-0/
      purpose-charter.md
      purpose-charter.de.md
```

**Why this approach (vs. a `de/` mirror tree or per-language branches):**

- Folder hierarchy already encodes article structure; mirroring it doubles maintenance.
- Sibling files make `git diff` between source and translation trivial.
- A missing translation is _visibly missing_ — no orphan file in a parallel tree.
- The existing `readArticleMeta()` recursive scanner handles it with one extra parse step.
- Sveltia CMS (already a dependency) supports the `{filename}.{lang}.md` convention natively via its i18n config.

### 1.2 Frontmatter additions

Translated files mirror the source frontmatter and add three i18n fields:

```yaml
---
id: b1fde29f # MUST match the source article's id
title: '0. Einführung' # localized
summary: 'Eine kurze Einführung…' # localized
parentId: e6de7a5d # same as source
order: 0 # same as source
lang: de
sourceHash: a3f8c1e2 # md5(source content), first 8 chars
---
```

- `lang` — BCP-47 / ISO 639-1 (`en`, `de`, `es-MX`, `pt-BR`).
- `sourceHash` — fingerprint of the source body at translation time. When the source changes, the hash diverges, and the staleness checker (§5) flags it.
- `id`, `parentId`, `order` — copied verbatim. **Never localize these.**

A file without a `lang` field is treated as `lang: en`.

### 1.3 Templates have one extra concern: `<details>` blocks

RCOS templates wrap rationale and instructions in semantic markers:

```markdown
<details>
<summary>Why?</summary>
…
</details>

<details>
<summary>How to fill in</summary>
…
</details>
```

The downloads pipeline currently detects "Rationale" via a regex on the literal English word `why`. **This breaks for translated templates.** Fix it by promoting intent into a structured attribute _before_ translation:

```markdown
<details data-kind="rationale">
<summary>Why?</summary>          ← translators localize freely
…
</details>

<details data-kind="instructions">
<summary>How to fill in</summary>
…
</details>
```

Then `flattenDetails()` in `scripts/build-templates.mjs` keys off `data-kind` (locale-independent) and looks up the rendered label ("Rationale" / "Begründung" / …) from a small per-locale strings table inside the script. Translators never have to memorize a magic word.

> **Migration note.** When you add `data-kind`, do it as a one-shot script over all existing English templates so the source is consistent before any translation work begins.

### 1.4 How to translate one article (manual / AI-assisted)

1. Copy the source `.md` to `<name>.<lang>.md`.
2. Compute and note the source hash:
   ```bash
   md5 -q content/articles/rcos-core/v0-1/00-introduction.md | cut -c1-8
   ```
3. Use Claude/GPT with a strict prompt:

   > Translate the markdown below to **{language}**. Rules:
   >
   > - Keep YAML frontmatter keys in English; translate only `title` and `summary` values.
   > - Preserve every link target verbatim (do not translate slugs).
   > - Preserve all code blocks, table structure, and HTML tags including `<details>` and `data-kind` attributes verbatim.
   > - Translate `<summary>` text and prose only.
   > - Keep clause references like "§2.4.1" unchanged.

4. Update frontmatter: set `lang: de`, set `sourceHash: <value from step 2>`.
5. Commit with a message like `de: translate 00-introduction (sourceHash a3f8c1e2)` so the hash is searchable in `git log`.

A bulk script (§5.3) automates steps 1–4 for a whole directory.

### 1.5 Loading translated articles

Changes in `src/lib/server/content.ts` and `graph.ts`:

1. **Detect lang in scanner.** When walking a directory, parse `<base>.<lang>.md` filenames. Store `lang` (default `'en'`) on each `ArticleMeta`. Group siblings by `id`.
2. **Build per-locale graphs.** `buildGraph(locale)` returns the article tree for that locale, falling back to the source `en` article wherever a translation is missing. The fallback ensures no 404s and shows the user something — coupled with a non-intrusive "Available in English only" banner.
3. **Cache key includes locale.** `loadManifest()`, `articleBySlug`, the search index — all keyed by `(slug, locale)`.
4. **Fallback metadata.** When falling back to English, mark the article as `fallbackLocale: 'en'` so the page can render the banner and emit a `<link rel="alternate">` for the canonical English version (search engines will deduplicate).

### 1.6 Search per locale

- Build one MiniSearch index per locale at request time (cached).
- Tokenization differs across languages (German compounds, accented characters); MiniSearch's default tokenizer is fine for v1 but flag this for revisit if German search quality is poor.
- Fall back to the English index when the user is viewing a locale with sparse coverage (configurable per locale once translations are >50% complete).

---

## 2. Website UI translation

### 2.1 Two viable approaches

| Approach                                                                              | Setup cost | DX                                | Recommended when                                            |
| ------------------------------------------------------------------------------------- | ---------- | --------------------------------- | ----------------------------------------------------------- |
| Plain JSON + `t()` helper                                                             | Low        | Adequate                          | ≤2 locales, ≤100 strings, you don't want a build dependency |
| **Paraglide.js** ([inlang](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)) | Medium     | Excellent (typesafe, tree-shaken) | ≥3 locales, or you want translator tooling (Fink editor)    |

Given that this project already has a multilingual content goal and Svelte 5 + adapter-vercel are first-class targets for Paraglide, **start with Paraglide.** The "low-tech" path below is documented as a fallback.

### 2.2 Paraglide setup (recommended)

```bash
pnpm dlx @inlang/paraglide-js init
```

This creates `project.inlang/`, a `messages/en.json` source, and generates typesafe `m.home_title()` accessors at build time. SvelteKit integration via `@inlang/paraglide-sveltekit` handles locale routing and the `lang` cookie.

Pros:

- Tree-shaking: each page ships only the strings it uses, only in the active locale.
- TypeScript catches missing keys at compile time.
- Inlang Fink: a free web editor translators can use without touching git.

### 2.3 Plain JSON fallback

```
src/lib/i18n/
  en.json
  de.json
  index.ts          ← t() helper, $derived from layout data
```

```json
{
  "nav.search_placeholder": "Search knowledge base…",
  "home.title": "RCOS — Regenerative Community Operating System",
  "downloads.all_templates": "Download all templates",
  "downloads.single_template": "Download this template",
  "downloads.spec": "Download full specification",
  "downloads.generated": "Generated {date}",
  …
}
```

```typescript
// src/lib/i18n/index.ts
import en from './en.json';
import de from './de.json';

const TABLES: Record<string, Record<string, string>> = { en, de };

export function t(locale: string, key: string, vars?: Record<string, string>): string {
  const raw = TABLES[locale]?.[key] ?? TABLES.en[key] ?? key;
  return vars ? raw.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '') : raw;
}
```

Use as `t($locale, 'downloads.generated', { date: downloads.generated })` in components.

### 2.4 Languages registry (single source of truth)

With 5–10 locales planned, hard-code the list once and import it everywhere (switcher, matcher, sitemap, hreflang, downloads pipeline):

```typescript
// src/lib/i18n/languages.ts
export type Locale = {
  code: string;          // BCP-47, used in URL prefix and hreflang
  englishName: string;   // for tooltips, accessibility
  nativeName: string;    // shown in the switcher
  flag?: string;         // optional emoji or icon ref; flags are politically fraught — prefer text
  default?: boolean;     // exactly one entry has this true
};

export const LOCALES: Locale[] = [
  { code: 'en', englishName: 'English',    nativeName: 'English',     default: true },
  { code: 'de', englishName: 'German',     nativeName: 'Deutsch'     },
  { code: 'es', englishName: 'Spanish',    nativeName: 'Español'     },
  { code: 'pt', englishName: 'Portuguese', nativeName: 'Português'   },
  { code: 'fr', englishName: 'French',     nativeName: 'Français'    },
  // add as translations land
];

export const DEFAULT_LOCALE = LOCALES.find((l) => l.default)!.code;
export const LOCALE_CODES = LOCALES.map((l) => l.code);
export const isLocale = (s: string): s is Locale['code'] => LOCALE_CODES.includes(s);
```

> **On flags:** they map to nation-states, not languages (Spanish → which flag? Portuguese → Portugal or Brazil?). Use the native name as the primary identifier; flags optional/decorative.

The route matcher (`src/params/lang.ts`) imports this:

```typescript
import type { ParamMatcher } from '@sveltejs/kit';
import { LOCALE_CODES, DEFAULT_LOCALE } from '$lib/i18n/languages';
export const match: ParamMatcher = (param) =>
  LOCALE_CODES.includes(param) && param !== DEFAULT_LOCALE;
```

(Excluding the default locale prevents `/en/articles/...` from being valid; only the unprefixed form is canonical.)

### 2.5 Language switcher component

A dropdown menu suits 5–10 languages well — toggle buttons clutter the header past 2–3.

```svelte
<!-- src/lib/components/i18n/LanguageSwitcher.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import { LOCALES, DEFAULT_LOCALE, type Locale } from '$lib/i18n/languages';
  import { localizePath } from '$lib/i18n/path';

  /**
   * Optional: locales for which the *current article* has a real translation.
   * Locales not in this list still navigate (with fallback banner) but render dimmed.
   * Pass from layout/page data; omit on non-article pages to render all enabled.
   */
  let { availableLocales }: { availableLocales?: string[] } = $props();

  let open = $state(false);
  let buttonEl: HTMLButtonElement | undefined = $state();

  const currentLocale = $derived($page.data.locale ?? DEFAULT_LOCALE);
  const current = $derived(LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0]);

  function targetUrl(target: Locale): string {
    return localizePath($page.url.pathname, currentLocale, target.code)
      + $page.url.search
      + $page.url.hash;
  }

  function hasTranslation(code: string): boolean {
    if (!availableLocales) return true;
    return availableLocales.includes(code);
  }

  function onSelect(target: Locale) {
    document.cookie = `lang=${target.code}; path=/; max-age=31536000; samesite=lax`;
    open = false;
    // Let the <a> handle navigation; we only set the cookie here.
  }

  // Close on Escape or outside click.
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { open = false; buttonEl?.focus(); }
  }
  function onDocClick(e: MouseEvent) {
    if (!(e.target as HTMLElement).closest('[data-lang-switcher]')) open = false;
  }
</script>

<svelte:window on:keydown={onKeydown} on:click={onDocClick} />

<div class="relative" data-lang-switcher>
	<button
		bind:this={buttonEl}
		type="button"
		class="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-surface"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label="Change language. Current: {current.englishName}"
		onclick={() => (open = !open)}
	>
		<Icon icon="tabler:world" class="w-4 h-4" />
		<span class="font-medium">{current.code.toUpperCase()}</span>
		<Icon icon="tabler:chevron-down" class="w-3 h-3 opacity-60" />
	</button>

	{#if open}
		<ul
			role="listbox"
			class="absolute right-0 mt-1 min-w-[12rem] rounded-md border border-border bg-background shadow-lg py-1 z-50"
		>
			{#each LOCALES as locale}
				{@const isCurrent = locale.code === currentLocale}
				{@const translated = hasTranslation(locale.code)}
				<li role="option" aria-selected={isCurrent}>
					<a
						href={targetUrl(locale)}
						onclick={() => onSelect(locale)}
						class="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-surface
                   {isCurrent ? 'font-semibold text-primary' : ''}
                   {!translated ? 'opacity-60' : ''}"
						title={!translated ? `Not yet translated — will show English on this page` : undefined}
					>
						<span class="flex items-center gap-2">
							<span>{locale.nativeName}</span>
							<span class="text-xs text-text-tertiary">{locale.englishName}</span>
						</span>
						{#if isCurrent}
							<Icon icon="tabler:check" class="w-4 h-4 text-primary" />
						{:else if !translated}
							<span class="text-[10px] uppercase tracking-wide text-text-tertiary">en fallback</span
							>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
```

The path-rewriting helper:

```typescript
// src/lib/i18n/path.ts
import { LOCALE_CODES, DEFAULT_LOCALE } from './languages';

/** Strip a locale prefix from a pathname, returning the canonical (default-locale) path. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/([^/]+)(\/.*|$)/);
  if (m && LOCALE_CODES.includes(m[1]) && m[1] !== DEFAULT_LOCALE) {
    return m[2] || '/';
  }
  return pathname;
}

/** Rewrite a pathname for a target locale (no prefix for default). */
export function localizePath(pathname: string, _from: string, to: string): string {
  const canonical = stripLocale(pathname);
  return to === DEFAULT_LOCALE ? canonical : `/${to}${canonical}`;
}
```

The layout passes `availableLocales` to the page so the switcher can dim non-translated targets:

```typescript
// src/routes/[[lang=lang]]/(app)/articles/[...slug]/+page.server.ts (excerpt)
export const load = async ({ params }) => {
  const article = await getArticle(params.slug, params.lang ?? 'en');
  return {
    locale: params.lang ?? 'en',
    availableLocales: article?.availableLocales ?? ['en'],
    // …
  };
};
```

**Accessibility checklist:**

- Trigger has `aria-haspopup`, `aria-expanded`, descriptive `aria-label`.
- Menu is a `<ul role="listbox">` with `role="option"` items.
- Escape closes the menu and returns focus to the trigger.
- Each item is a real `<a href>` so middle-click / "open in new tab" works and there's no JS-only navigation.
- Disabled-looking items are still clickable (they navigate to the fallback page) — `opacity-60` + tooltip rather than `aria-disabled`.

**Mobile:** below `sm`, swap the dropdown for a full-width `<dialog>` or a bottom sheet — 10 items in a hover menu is rough on touch. Out of scope for v1; flag for follow-up.

### 2.6 Strings to extract

Run a one-time audit. Initial inventory (target ~50 keys):

- TopBar / nav (~8): search placeholder, theme toggle, language switcher labels.
- Home page (~10): hero, CTAs, section headings.
- Articles index / article page (~10): "All Articles", "Sub-articles", "Article not found", breadcrumbs.
- **Downloads component** (~15): "Download all templates", "Download a single template", "Generated {date}", format hints ("Plain text · best for git, wikis, or your own editor"), per-format labels, "Download full specification".
- Footer (~5).
- Errors / 404 / empty states (~5).

The downloads component currently has the most untranslated UI text — it's a recent addition and was built English-first. Translating it is mostly a mechanical extraction.

---

## 3. Downloads pipeline translation

This is the section most missing from the previous plan. The pipeline needs to produce localized artifacts.

### 3.1 Per-locale output structure

```
static/downloads/
  manifest-templates.json          ← root manifest, lists locales
  manifest-core.json
  en/
    md/…  docx/…  odt/…
    rcos-templates-md.zip
    rcos-templates-docx.zip
    rcos-templates-odt.zip
    rcos-core-v0-1.md
  de/
    md/…  docx/…  odt/…
    rcos-templates-md.zip
    …
    rcos-core-v0-1.md
  rcos-logo.png                    ← shared, locale-agnostic
```

### 3.2 Manifest schema (revised)

```json
{
	"generated": "2026-04-27",
	"defaultLocale": "en",
	"locales": ["en", "de"],
	"bundles": {
		"en": { "md": "/downloads/en/rcos-templates-md.zip", "docx": "…", "odt": "…" },
		"de": { "md": "/downloads/de/rcos-templates-md.zip", "docx": "…", "odt": "…" }
	},
	"templates": [
		{
			"id": "t2e1fdh8",
			"relPath": "layer-0/identity-constraints-register.md",
			"titles": { "en": "Identity Constraints Register", "de": "Register …" },
			"files": {
				"en": { "md": "…", "docx": "…", "odt": "…" },
				"de": { "md": "…", "docx": "…", "odt": "…" }
			},
			"availableLocales": ["en", "de"]
		}
	]
}
```

The server-side `getTemplateDownloads(slug, locale)` returns only the files for the requested locale, falling back to `en` for missing translations. The component shows a small "Available in English only" tag next to fall-backs.

### 3.3 Translatable preamble strings

`build-templates.mjs` and `build-core.mjs` currently hardcode:

- `**RCOS — Regenerative Community Operating System**` (site name)
- `**Generated:** YYYY-MM-DD`
- `**Source (latest version):** …`
- `**All RCOS templates:** …`
- `**Rationale — …**`, `**Instructions — …**` (the labels injected by `flattenDetails`)
- `# Table of Contents`, `# About RCOS Core` (in `build-core.mjs`)

Move these into a small `scripts/i18n.mjs` table:

```js
export const STRINGS = {
  en: {
    siteName: 'RCOS — Regenerative Community Operating System',
    generated: 'Generated',
    source: 'Source (latest version)',
    allTemplates: 'All RCOS templates',
    rationale: 'Rationale',
    instructions: 'Instructions',
    toc: 'Table of Contents',
    aboutCore: 'About RCOS Core'
  },
  de: { siteName: 'RCOS — …', generated: 'Generiert', /* … */ }
};
```

Both build scripts iterate over `Object.keys(STRINGS)`, generating one set of artifacts per locale. The site name is intentionally translatable: in many languages keeping it English reads as marketing-ese; let translators choose.

### 3.4 The `<details>` block transform, revisited

With `data-kind="rationale"` (§1.3) the `flattenDetails()` regex becomes locale-independent:

```js
function flattenDetails(body, locale) {
  const re = /<details(?:\s+data-kind="(rationale|instructions)")?>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
  return body.replace(re, (_, kind, summary, content) => {
    const label = STRINGS[locale][kind ?? 'instructions'];
    // …
  });
}
```

### 3.5 Vercel constraint reminder

Pandoc is unavailable on Vercel. The current setup commits generated artifacts to git so deploys serve them as static assets (see `.gitignore`). Multiplying outputs by N locales means:

- Repo size grows linearly in N (each locale ≈ a few MB of binary `.docx` / `.odt` + zips).
- Translators or content editors won't typically have pandoc; the build script must be runnable per-locale (`pnpm run build:downloads --locale de`) so a single contributor can regenerate just the locale they touched.

If the repo gets uncomfortably large, the eject hatch is a GitHub Actions workflow that runs pandoc (Linux apt has it), commits the artifacts, and pushes — keeping local contributor friction low.

### 3.6 Anchor link safety

The homepage links to `/articles/rcos-templates#downloads`. With locale routing, this becomes `/de/articles/rcos-templates#downloads`. The `id="downloads"` is rendered by the `index`-type downloads section, which is locale-agnostic. `handleMissingId: 'warn'` is already configured (in `svelte.config.js`) and stays — it covers the build window before a locale's manifest is generated.

---

## 4. SEO and discoverability

### 4.1 `hreflang` tags

On every page, emit one `<link rel="alternate" hreflang="…" href="…">` per locale where the article exists, plus an `x-default` pointing to the English version. The `SEO` component (`src/lib/components/seo/SEO.svelte`) needs a `locales` prop derived from the article's `availableLocales`.

### 4.2 Sitemap

The project already serves a prerendered `/sitemap.xml` from `src/routes/sitemap.xml/+server.ts`. It currently emits one `<url>` per article, all unprefixed. Two changes are needed for i18n:

1. **One `<url>` entry per (article, locale) pair** that has a real translation. Don't emit fallback URLs — that creates duplicate-content signals.
2. **Each entry lists every alternate** via `<xhtml:link rel="alternate" hreflang="…">`, including a self-reference and an `x-default` pointing at the canonical (English) version. This is [Google's documented format](https://developers.google.com/search/docs/specialized/international/localized-versions#sitemap).

Concrete diff sketch:

```typescript
// src/routes/sitemap.xml/+server.ts (revised)
import { buildGraph } from '$lib/server/graph';
import { SITE_URL } from '$lib/config/site';
import { LOCALES, DEFAULT_LOCALE } from '$lib/i18n/languages';
import type { RequestHandler } from './$types';

export const prerender = true;

function localeUrl(path: string, locale: string): string {
  return `${SITE_URL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${path}`;
}

export const GET: RequestHandler = async () => {
  // Build one graph per locale so we know per-article availability.
  const graphs = Object.fromEntries(
    await Promise.all(LOCALES.map(async (l) => [l.code, await buildGraph(l.code)] as const))
  );

  type Entry = { path: string; availableLocales: string[]; changefreq: string; priority: string };

  const staticEntries: Entry[] = [
    { path: '/',         availableLocales: LOCALES.map((l) => l.code), changefreq: 'monthly', priority: '1.0' },
    { path: '/articles', availableLocales: LOCALES.map((l) => l.code), changefreq: 'weekly',  priority: '0.8' }
  ];

  // Articles: a locale is "available" if the article has a real translation in it.
  // The graph builder marks articles with availableLocales (set during scan).
  const articleEntries: Entry[] = graphs[DEFAULT_LOCALE].articles.map((article) => ({
    path: `/articles/${article.slug}`,
    availableLocales: article.availableLocales ?? [DEFAULT_LOCALE],
    changefreq: 'weekly',
    priority: '0.6'
  }));

  const allEntries = [...staticEntries, ...articleEntries];

  // For each entry, emit one <url> per available locale; each <url> lists all alternates.
  const urls = allEntries.flatMap((e) =>
    e.availableLocales.map((loc) => {
      const alternates = e.availableLocales
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt}" href="${localeUrl(e.path, alt)}" />`
        )
        .join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(e.path, DEFAULT_LOCALE)}" />`;

      return `  <url>
    <loc>${localeUrl(e.path, loc)}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
${alternates}
${xDefault}
  </url>`;
    })
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
```

Resulting fragment (one article available in `en` + `de`):

```xml
<url>
  <loc>https://blueprint.ecohubs.community/articles/rcos-core</loc>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://blueprint.ecohubs.community/articles/rcos-core" />
  <xhtml:link rel="alternate" hreflang="de" href="https://blueprint.ecohubs.community/de/articles/rcos-core" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://blueprint.ecohubs.community/articles/rcos-core" />
</url>
<url>
  <loc>https://blueprint.ecohubs.community/de/articles/rcos-core</loc>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://blueprint.ecohubs.community/articles/rcos-core" />
  <xhtml:link rel="alternate" hreflang="de" href="https://blueprint.ecohubs.community/de/articles/rcos-core" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://blueprint.ecohubs.community/articles/rcos-core" />
</url>
```

**Notes:**

- The `<xhtml:link>` namespace declaration (`xmlns:xhtml="…"`) on `<urlset>` is required.
- Alternates are **bidirectional** — every locale's entry must list every other locale, otherwise Google flags the cluster as inconsistent.
- For articles available only in English, no fallback URLs are emitted; just the one entry with no alternates.
- Sitemap size: at ~80 articles × up to 10 locales = ~800 entries. Well under the 50k / 50 MB sitemap limits; a single file is fine.
- If the file ever exceeds 10 MB compressed, split into a sitemap index with one child per locale.

### 4.3 JSON-LD

`buildArticleSchema()` in `src/lib/utils/jsonld.ts` adds `inLanguage: article.lang`. Breadcrumb schemas localize their `name` fields.

### 4.4 `<html lang="…">`

Set in `src/app.html` via the layout `data` (currently hardcoded `en`). Without this, screen readers and search engines mis-detect the page language.

---

## 5. Tooling: detecting drift and bulk-translating

### 5.1 `scripts/check-translations.mjs`

Scans the content tree, joins source files to translations by `id`, and reports:

```
Translation status — locale: de
================================
✓ rcos-core                                       up to date
✓ rcos-core/v0-1/00-introduction                  up to date
⚠ rcos-core/v0-1/01-identity                      OUTDATED (sourceHash: a3f8c1e2 → 7d2bb91f)
✗ rcos-templates/layer-0/purpose-charter          MISSING

Coverage: 45/82 translated (55%) · 3 outdated · 34 missing
```

Wire it as a non-blocking CI check that posts a comment on PRs that touch `content/`.

### 5.2 `scripts/check-i18n-keys.mjs`

Compare keys in `messages/en.json` against each `messages/<lang>.json` (or Paraglide's `messages/`) and report missing keys.

### 5.3 `scripts/translate.mjs` (AI-assisted bulk)

```
Usage: node scripts/translate.mjs --locale de [--only path/to/article.md] [--review]
```

- Reads each English source.
- Calls the Claude API with the strict prompt from §1.4.
- Writes `<name>.<lang>.md` with computed `sourceHash`.
- With `--review`, opens each translated file in `$EDITOR` for human pass before saving.
- Skips files whose `sourceHash` already matches (idempotent).
- Logs cost per article and a running total.

This is the realistic path to translating ~80 articles. Manual translation is for polish, not bulk.

---

## 6. Implementation order

The previous plan proposed articles → UI → tooling. **Inverted recommendation: UI first.** UI is a small, fast, reviewable change that proves the routing and locale plumbing end-to-end. Articles are the bulk-content phase, and they depend on the routing already working.

### Status legend

`✓` shipped · `→` in progress · _(blank)_ not started

### Phase 1 — Plumbing (1–2 days)  ✓

1. Lock the cross-cutting decisions in §0.
2. Create `src/lib/i18n/languages.ts` registry (§2.4) and `src/lib/i18n/path.ts` helpers.
3. Add `[[lang=lang]]` route group + locale matcher.
4. Add `lang` cookie + `LanguageSwitcher` component (§2.5) — switcher just toggles the URL prefix initially.
5. Set `<html lang>` from the resolved locale.
6. Wire `hreflang` and `inLanguage` into `SEO` and JSON-LD (still all `en` for now).
7. Update `sitemap.xml` to emit alternates per the §4.2 schema (currently only `en` so the output is unchanged, but the structure is in place).

**Exit criteria:** `/de/articles/rcos-core` renders the English content under `/de/...` URLs with correct `<html lang="de">` and a "this is a fallback" indicator.

### Phase 2 — UI strings (2–3 days)  ✓

1. ✓ Plain JSON + `m()` helper (Paraglide deferred — see decision below).
2. ✓ Extracted ~80 keys to `src/lib/i18n/messages/{en,de}.json`.
3. ✓ German translation as the proof-of-concept locale.
4. ✓ Replaced strings across TopBar, SidebarNav, Footer, Breadcrumbs, SearchBar, SearchResults, SearchResultCard, LanguageSwitcher, SEO, TemplateDownloads, and all four route pages (`/`, `/articles`, `/articles/[...slug]`, `/search`).
5. ✓ `scripts/check-i18n-keys.mjs` available via `pnpm run check:i18n`.
6. ✓ `localized()` helper added; all internal `<a href>`s now preserve the locale prefix on navigation.

**Decision recorded:** chose plain JSON over Paraglide for v1. Reasons: (a) we already own URL-prefix routing and Paraglide's adapter would compete with it; (b) string count is small (~80); (c) plain JSON is friendlier for the future Sveltia CMS workflow. Migration path stays open — message keys are namespaced and use `{name}` interpolation, both Paraglide-compatible.

**Exit criteria:** ✓ every visible UI string switches between English and German based on URL prefix; verified in prerendered output (`<html lang>`, hreflang, og:locale, button labels, footer, search, downloads UI).

### Phase 3 — Articles infrastructure (2–3 days)  ✓

1. ✓ `lang` and `sourceHash` added to `ArticleMeta`; `readArticleMeta` parses `<base>.<lang>.md` filenames.
2. ✓ `buildGraph(locale)` groups entries by `id`, picks the requested locale, falls back to default; structural fields (slug, parentId, order) come from the source so the tree shape is locale-stable.
3. ✓ Per-article `availableLocales` populated from the set of files actually present.
4. ✓ Per-locale search index in `search/+page.server.ts`.
5. ✓ `LocaleFallbackBanner` component on article pages — only renders when `bodyIsFallback` is true.
6. ✓ Smoke-test article translated: `content/articles/rcos-core/v0-1/00-introduction.de.md`.
7. ✓ `scripts/migrate-template-details.mjs` stamped `data-kind="rationale|instructions"` on all 191 `<details>` blocks across 22 templates; `flattenDetails()` in `build-templates.mjs` now keys on `data-kind` (locale-independent).
8. ✓ **Bonus**: SSR-safe article rendering — page server load now returns `article`, `breadcrumbs`, and `parent` directly; no longer depends on the client-side `articleBySlug` store. Fixes a pre-existing issue where prerendered HTML showed "Article not found" for every article body.

**Exit criteria:** ✓ the smoke-test article serves at `/de/articles/rcos-core/v0-1/introduction` with full German content; untranslated articles serve under the `/de/` URL with the canonical English body and a German-language fallback banner; sitemap emits bidirectional hreflang only for translated articles. Verified in prerendered output for both prefixes.

### Phase 4 — Downloads pipeline (1–2 days)  ✓

1. ✓ `build-templates.mjs` and `build-core.mjs` now iterate over every registered locale and emit to `static/downloads/<locale>/...`.
2. ✓ Preamble strings (`Generated`/`Generiert`, `Source`/`Quelle`, `Rationale`/`Begründung`, etc.) live in `scripts/i18n.mjs`, shared with `flattenDetails()` so blockquote markers also localize.
3. ✓ Locale-aware `flattenDetails()` keys on `data-kind` and looks up labels from the per-locale strings table.
4. ✓ New manifest schema with `defaultLocale`, `locales`, per-locale `bundles`, and per-template `titles`/`files`/`availableLocales` exactly as in §3.2.
5. ✓ `getTemplateDownloads(slug, locale)` and `getArticleDownloads(slug, locale)` resolve the served locale (requested → default → first available) and report `servedLocale` + `isFallback`. `TemplateDownloads.svelte` shows a banner when the bundle is a fallback and an "EN-Fallback" badge per template that isn't translated to the active locale.
6. ✓ `pnpm run build:downloads` regenerates everything per locale; artifacts committed under `static/downloads/<locale>/...`.

**Exit criteria:** ✓ `/de/articles/rcos-templates` shows the bundle download UI in German with a fallback banner ("Für diese Sprache sind noch keine Übersetzungen verfügbar"), all 22 templates display the EN-Fallback badge with German tooltips, and bundle URLs gracefully resolve to `/downloads/en/*` until German template translations land. The smoke-test core spec at `/de/articles/rcos-core/v0-1` correctly serves `/downloads/de/rcos-core-v0-1.md` (with German preamble + German "0. Einführung" section + English fallback for the rest, with inline notices on each fallback section).

### Phase 5 — Bulk translation + drift detection (ongoing)  ✓ scripts in place

The two scripts the rest of the phase depends on are shipped. The remaining items are operational decisions and human review work, not engineering.

1. ✓ `scripts/check-translations.mjs` — drift detector. Walks `content/articles`, joins each source `<base>.md` to its translations by frontmatter `id`, compares the stored `sourceHash` against a fresh MD5 of the source. Reports per-locale `MISSING` / `OUTDATED` / `UP-TO-DATE`, plus a coverage percentage. Plain-text output by default; `--json` for machine consumption (e.g. a sticky GitHub comment). Exit codes: `0` clean, `2` outdated only, `1` missing translations exist. Run via `pnpm run check:translations`.
2. ✓ `scripts/translate.mjs` — AI bulk translator. Walks the tree, finds missing/outdated translations for `--locale <code>`, calls Claude Opus 4.7 with adaptive thinking and prompt-caching on the system block (so subsequent articles in a run cost ~10% of the first). Idempotent — skips up-to-date files unless `--force`. Frontmatter post-processing is owned by the script: `lang` and `sourceHash` are stamped onto the output regardless of what the model returns. Supports `--dry-run`, `--only <substring>`, `--model <id>`. Run via `pnpm run translate -- --locale de`. Requires `ANTHROPIC_API_KEY`.
3. **Operational, not code**: run the translator over the tree once a target locale's UI is in place. Cost rough order of magnitude is well under $10 for ~80 articles at Opus 4.7 pricing with caching; verify the first few outputs before letting it run unattended.
4. **Human review pass**: prioritize highest-traffic articles (`rcos-core/v0-1/*`, the templates index, top-level entries). Skim AI translations for tone, technical-term consistency, and frontmatter integrity. Touch up where the model picked an awkward phrasing.
5. **CI integration**: wire `pnpm run check:translations --json` into a GitHub Action that posts a sticky comment on PRs touching `content/`. Non-blocking — coverage drift is informational, not a merge gate.
6. **Coverage threshold for public launch**: ≥80% UP-TO-DATE before announcing a locale; ≥95% before removing the "experimental" badge from the language switcher (when one exists).

---

## 7. Files to touch (concrete checklist)

| File                                                    | Change                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| `src/lib/i18n/languages.ts`                             | New — single-source-of-truth locales registry                    |
| `src/lib/i18n/path.ts`                                  | New — `stripLocale` / `localizePath` helpers                     |
| `src/lib/components/i18n/LanguageSwitcher.svelte`       | New — dropdown switcher (§2.5)                                   |
| `src/routes/sitemap.xml/+server.ts`                     | Emit per-locale entries with `<xhtml:link rel="alternate">`      |
| `src/params/lang.ts`                                    | New — locale matcher whitelist                                   |
| `src/routes/[[lang=lang]]/...`                          | Move existing `(app)` group under optional lang                  |
| `src/lib/server/content.ts`                             | Parse `lang` suffix; carry `lang` on `ArticleMeta`               |
| `src/lib/server/graph.ts`                               | `buildGraph(locale)`; fallback resolution                        |
| `src/lib/server/downloads.ts`                           | `getTemplateDownloads(slug, locale)`; new manifest shape         |
| `src/lib/types/article.ts`                              | Add `lang`, `sourceHash`, `availableLocales`                     |
| `src/routes/(app)/+layout.server.ts`                    | Resolve locale; pass to graph                                    |
| `src/lib/components/seo/SEO.svelte`                     | `hreflang`, `inLanguage`                                         |
| `src/lib/components/templates/TemplateDownloads.svelte` | Replace hardcoded strings; locale fallback chips                 |
| `src/app.html`                                          | `<html lang="%lang%">` placeholder                               |
| `scripts/build-templates.mjs`                           | `--locale` arg; per-locale output dir                            |
| `scripts/build-core.mjs`                                | Same                                                             |
| `scripts/i18n.mjs`                                      | New — preamble strings table                                     |
| `scripts/check-translations.mjs`                        | New                                                              |
| `scripts/translate.mjs`                                 | New                                                              |
| `messages/{en,de}.json` (or Paraglide equiv)            | New — UI strings                                                 |
| Sveltia CMS config                                      | Enable i18n with `multiple_files` per the file-suffix convention |
| `.gitignore`                                            | Already un-ignores `static/downloads/`; nothing to change        |

---

## 8. Things explicitly out of scope (for now)

- **RTL languages (Arabic, Hebrew).** Doable but requires a Tailwind logical-properties audit. Defer until requested.
- **In-page machine translation widgets.** Hurts SEO and quality; do real translations.
- **Translating commit messages and code comments.** No.
- **Per-locale domains** (`rcos.de`, `rcos.es`). Operationally heavier; revisit at >5 locales.
- **Translation memory / CAT tooling** (Trados, MemoQ). The Claude API + `translate.mjs` is the chosen TM substitute for v1.

---

## 9. Cost & time estimate

Rough order-of-magnitude for one new locale, given the current ~80 articles:

| Item                                                                          | Estimate                                                                      |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Phase 1–4 implementation (one-time)                                           | 6–10 dev-days                                                                 |
| AI bulk translation of articles (Claude Sonnet, ~80 articles, ~2k tokens avg) | <$10, ~2 hours wall time                                                      |
| Human review of AI translations (skim + fix)                                  | 0.5–1 day per 10 articles, depends on quality bar                             |
| UI strings translation (~50 keys)                                             | <1 hour with AI + review                                                      |
| Maintenance per locale (per source change)                                    | Auto-flagged by `check-translations.mjs`; minutes to re-translate one article |

The dominant cost is human review. Plan for it.
