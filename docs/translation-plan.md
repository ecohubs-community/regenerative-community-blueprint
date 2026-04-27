# Translation Plan for RCOS Blueprint

## Overview

This document describes how to add multi-language support to the RCOS Blueprint platform. The system has **four** distinct translation surfaces, each with its own strategy:

1. **Articles** (~80 markdown files in `content/articles/`) — the core knowledge base, including the `rcos-core` spec and the `rcos-templates` library.
2. **Website UI** (~50 strings hardcoded across ~15 Svelte components) — navigation, buttons, headings, the search box.
3. **Downloads pipeline** (`scripts/build-templates.mjs`, `scripts/build-core.mjs`) — the generated `.md` / `.docx` / `.odt` files and their preambles ("Generated", "Source", "Rationale", "Instructions"…).
4. **SEO metadata** (`<title>`, descriptions, JSON-LD, sitemap, `hreflang`) — discoverability per locale.

Each surface is handled differently to balance maintainability, build-time cost, and translator effort.

> **Scope guardrail.** This plan is opinionated about *mechanism*, not *which languages to ship*. Start with one target locale (suggested: `de`) end-to-end before scaling out — a translation pipeline broken in two languages is twice as painful as in one.

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
- A missing translation is *visibly missing* — no orphan file in a parallel tree.
- The existing `readArticleMeta()` recursive scanner handles it with one extra parse step.
- Sveltia CMS (already a dependency) supports the `{filename}.{lang}.md` convention natively via its i18n config.

### 1.2 Frontmatter additions

Translated files mirror the source frontmatter and add three i18n fields:

```yaml
---
id: b1fde29f                        # MUST match the source article's id
title: "0. Einführung"              # localized
summary: "Eine kurze Einführung…"   # localized
parentId: e6de7a5d                  # same as source
order: 0                            # same as source
lang: de
sourceHash: a3f8c1e2                # md5(source content), first 8 chars
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

The downloads pipeline currently detects "Rationale" via a regex on the literal English word `why`. **This breaks for translated templates.** Fix it by promoting intent into a structured attribute *before* translation:

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

| Approach | Setup cost | DX | Recommended when |
|---|---|---|---|
| Plain JSON + `t()` helper | Low | Adequate | ≤2 locales, ≤100 strings, you don't want a build dependency |
| **Paraglide.js** ([inlang](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)) | Medium | Excellent (typesafe, tree-shaken) | ≥3 locales, or you want translator tooling (Fink editor) |

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

### 2.4 Strings to extract

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

`/sitemap.xml` (whether you have one yet or not — add it) lists every URL × every locale it exists in, with `<xhtml:link rel="alternate">` entries.

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

### Phase 1 — Plumbing (1–2 days)
1. Lock the cross-cutting decisions in §0.
2. Add `[[lang=lang]]` route group + locale matcher.
3. Add `lang` cookie + language switcher (no translations yet — switcher just toggles the URL prefix).
4. Set `<html lang>` from the resolved locale.
5. Wire `hreflang` and `inLanguage` into `SEO` and JSON-LD (still all `en` for now).

**Exit criteria:** `/de/articles/rcos-core` renders the English content under `/de/...` URLs with correct `<html lang="de">` and a "this is a fallback" indicator.

### Phase 2 — UI strings (2–3 days)
1. Set up Paraglide (or commit to plain JSON if rejecting Paraglide).
2. Extract all hardcoded strings to messages (~50 keys).
3. Translate to `de` as the proof-of-concept locale.
4. Replace component strings with message calls, including the **downloads component** end-to-end.
5. Run `check-i18n-keys.mjs` in CI.

**Exit criteria:** every visible UI string switches when you toggle the language. No untranslated English leaks on `/de/...` chrome.

### Phase 3 — Articles infrastructure (2–3 days)
1. Add `lang` field to `ArticleMeta` and parse `.{lang}.md` suffix.
2. Per-locale graph build with English fallback.
3. Per-locale search index.
4. "Available in English only" banner component.
5. Translate one article end-to-end as smoke test (`rcos-core/v0-1/00-introduction`).
6. Migrate templates to `<details data-kind="…">`.

**Exit criteria:** the smoke-test article serves at `/de/articles/...` with German content; everything else falls back to English without UI errors.

### Phase 4 — Downloads pipeline (1–2 days)
1. Refactor `build-templates.mjs` and `build-core.mjs` to accept `--locale` and emit to `static/downloads/<locale>/`.
2. Move preamble strings to `scripts/i18n.mjs`.
3. Locale-aware `flattenDetails()`.
4. New manifest schema (§3.2).
5. Update `getTemplateDownloads(slug, locale)` and the `TemplateDownloads` component for locale fallback.
6. Generate `de` artifacts, commit them, verify on Vercel.

**Exit criteria:** `/de/articles/rcos-templates` shows German zip bundles; a German template's article page offers German `.md` / `.docx` / `.odt`.

### Phase 5 — Bulk translation + drift detection (ongoing)
1. Run `translate.mjs --locale de` over the whole content tree.
2. Human review pass (highest-traffic articles first).
3. Add `check-translations.mjs` as a CI comment.
4. Decide on a coverage threshold (e.g. ≥80%) before announcing the locale publicly.

---

## 7. Files to touch (concrete checklist)

| File | Change |
|---|---|
| `src/params/lang.ts` | New — locale matcher whitelist |
| `src/routes/[[lang=lang]]/...` | Move existing `(app)` group under optional lang |
| `src/lib/server/content.ts` | Parse `lang` suffix; carry `lang` on `ArticleMeta` |
| `src/lib/server/graph.ts` | `buildGraph(locale)`; fallback resolution |
| `src/lib/server/downloads.ts` | `getTemplateDownloads(slug, locale)`; new manifest shape |
| `src/lib/types/article.ts` | Add `lang`, `sourceHash`, `availableLocales` |
| `src/routes/(app)/+layout.server.ts` | Resolve locale; pass to graph |
| `src/lib/components/seo/SEO.svelte` | `hreflang`, `inLanguage` |
| `src/lib/components/templates/TemplateDownloads.svelte` | Replace hardcoded strings; locale fallback chips |
| `src/app.html` | `<html lang="%lang%">` placeholder |
| `scripts/build-templates.mjs` | `--locale` arg; per-locale output dir |
| `scripts/build-core.mjs` | Same |
| `scripts/i18n.mjs` | New — preamble strings table |
| `scripts/check-translations.mjs` | New |
| `scripts/translate.mjs` | New |
| `messages/{en,de}.json` (or Paraglide equiv) | New — UI strings |
| Sveltia CMS config | Enable i18n with `multiple_files` per the file-suffix convention |
| `.gitignore` | Already un-ignores `static/downloads/`; nothing to change |

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

| Item | Estimate |
|---|---|
| Phase 1–4 implementation (one-time) | 6–10 dev-days |
| AI bulk translation of articles (Claude Sonnet, ~80 articles, ~2k tokens avg) | <$10, ~2 hours wall time |
| Human review of AI translations (skim + fix) | 0.5–1 day per 10 articles, depends on quality bar |
| UI strings translation (~50 keys) | <1 hour with AI + review |
| Maintenance per locale (per source change) | Auto-flagged by `check-translations.mjs`; minutes to re-translate one article |

The dominant cost is human review. Plan for it.
