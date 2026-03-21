# Translation Plan for RCOS Blueprint

## Overview

This document describes how to add multi-language support to the RCOS Blueprint platform. There are two distinct translation targets:

1. **Articles** (~80 markdown files in `content/articles/`) — the core knowledge base
2. **Website UI** (buttons, labels, headings hardcoded in ~15 Svelte components) — navigation and chrome

Each is handled with a different strategy to balance maintainability, cost, and accuracy.

---

## 1. Article Translation

### Approach: Parallel file structure with language suffix

Each article gets a translated copy as a sibling file with a language suffix:

```
content/articles/
  rcos-core.md              ← English (default)
  rcos-core.de.md           ← German
  rcos-core.es.md           ← Spanish
  rcos-core/
    v0-1.md
    v0-1.de.md
    v0-1.es.md
    v0-1/
      00-introduction.md
      00-introduction.de.md
```

**Why this approach:**
- No changes to the existing folder hierarchy
- Each translation is a standalone file — easy to diff, review, and update
- Works with git history: you can see when a translation was last touched vs. when the source changed
- Compatible with the existing `readArticleMeta()` scanner (filter by suffix)
- AI tools (Claude, ChatGPT) can translate one file at a time via copy/paste or CLI

### Frontmatter additions

Translated files mirror the original frontmatter but add a `lang` field and reference the source:

```yaml
---
id: b1fde29f
title: "0. Einführung"
parentId: e6de7a5d
order: 0
lang: de
sourceFile: 00-introduction.md
sourceHash: a3f8c1e2   # first 8 chars of MD5 of source content (for staleness detection)
---
```

- `lang` — ISO 639-1 code (`en`, `de`, `es`, `fr`, `pt`, etc.)
- `sourceFile` — path to the English source (relative to same directory)
- `sourceHash` — hash of the English source content at time of translation (used to detect outdated translations)

Files without a `lang` field or with `lang: en` are treated as the default English source.

### How to translate an article (manual workflow with AI)

1. Copy the English `.md` file and rename with language suffix
2. Paste the content into an AI tool (Claude, ChatGPT) with a prompt like:
   > "Translate this markdown article to German. Keep all YAML frontmatter keys in English. Keep markdown formatting, links, and code blocks unchanged. Translate only the prose content."
3. Add `lang`, `sourceFile`, and `sourceHash` to the frontmatter
4. Save and commit

To compute `sourceHash`:
```bash
md5 -q content/articles/rcos-core/v0-1/00-introduction.md | cut -c1-8
```

### Loading translated articles

Modify `readArticleMeta()` in `src/lib/server/content.ts`:

- During the directory scan, detect the `.{lang}.md` suffix
- Store `lang` on each `ArticleMeta` entry (default: `en`)
- In `buildGraph()`, filter articles by the active locale
- The active locale comes from the URL prefix (`/de/articles/...`) or a cookie/preference

Route structure becomes:
```
/articles/rcos-core           → English (default)
/de/articles/rcos-core        → German
/es/articles/rcos-core        → Spanish
```

This is implemented via a SvelteKit route group: `src/routes/[[lang]]/(app)/articles/[...slug]/`

### Search in multiple languages

MiniSearch indexes are language-agnostic. Build a separate index per language in `+page.server.ts`, or build one combined index with a `lang` field and filter results client-side.

---

## 2. Website UI Translation

### Approach: JSON translation files + helper function

Create a `src/lib/i18n/` directory with one JSON file per language:

```
src/lib/i18n/
  en.json
  de.json
  es.json
  index.ts      ← t() helper function
```

**en.json:**
```json
{
  "nav.search_placeholder": "Search knowledge base…",
  "nav.toggle_theme": "Toggle theme",
  "nav.all_articles": "All Articles",
  "nav.expand_all": "Expand all",
  "nav.collapse_all": "Collapse all",
  "home.title": "RCOS - Regenerative Community Operating System",
  "home.subtitle": "RCOS is an open-source, shared system for organizing intentional communities...",
  "home.explore_articles": "Explore Articles",
  "home.learn_more": "Learn More",
  "home.topics": "Topics",
  "home.recent_articles": "Recent Articles",
  "articles.title": "All Articles",
  "articles.description": "Browse all knowledge articles organized hierarchically",
  "articles.not_found": "Article not found",
  "search.title": "Search",
  "search.results_for": "Results for:",
  "footer.description": "A modular operating system that defines how intentional communities organize..."
}
```

There are roughly 40–50 UI strings total. This is a small, manageable set.

### The `t()` helper

```typescript
// src/lib/i18n/index.ts
import en from './en.json';
import de from './de.json';

const translations: Record<string, Record<string, string>> = { en, de };
let currentLocale = 'en';

export function setLocale(lang: string) {
  currentLocale = lang;
}

export function t(key: string): string {
  return translations[currentLocale]?.[key] ?? translations['en'][key] ?? key;
}
```

Components then use `t('home.title')` instead of hardcoded strings. This is a simple approach that avoids heavy i18n library dependencies.

### Alternative: Use Paraglide.js (optional)

[Paraglide.js](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) is a lightweight, typesafe i18n library built for SvelteKit. It provides:
- Compile-time tree-shaking (only ships strings for the active locale)
- Typesafe `m.home_title()` calls instead of string keys
- Built-in locale detection and routing
- VS Code extension for managing translations

This is heavier to set up but provides better DX for long-term maintenance. Recommended if the project grows beyond 3–4 languages.

---

## 3. Detecting Outdated or Missing Translations (optional)

### CLI script: `scripts/check-translations.ts`

A script that scans the content directory and reports:

1. **Missing translations** — English articles without a corresponding `.{lang}.md` file
2. **Outdated translations** — where `sourceHash` in the translated file no longer matches the current English source hash

**Example output:**
```
Translation Status Report
=========================

Language: de (German)
  ✓ rcos-core.md — up to date
  ✓ rcos-core/v0-1.md — up to date
  ⚠ rcos-core/v0-1/00-introduction.md — OUTDATED (source changed)
  ✗ rcos-core/v0-1/01-identity.md — MISSING
  ...

Summary: 45/80 translated, 3 outdated, 32 missing
```

**Implementation sketch:**
```typescript
import { createHash } from 'crypto';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';

// 1. Scan all .md files without lang suffix → these are English sources
// 2. For each target language, check if .{lang}.md exists
// 3. If it exists, compare sourceHash with current MD5 of the source
// 4. Report missing and outdated
```

This script can be run manually or as a CI check. It could also be extended to output a markdown report or GitHub issue.

### For UI strings

A simpler check: compare keys in `en.json` against each `{lang}.json` and report missing keys.

---

## 4. Recommended Implementation Order

### Phase 1: Article translation infrastructure
1. Add `lang` field support to `ArticleMeta` type and `readArticleMeta()`
2. Update `buildGraph()` to filter by locale
3. Add `[[lang]]` route parameter to SvelteKit routes
4. Create first test translation (e.g., translate `00-introduction.md` to German)
5. Verify routing works: `/de/articles/rcos-core/v0-1/introduction`

### Phase 2: UI translation
1. Create `src/lib/i18n/en.json` with all extracted UI strings
2. Create `t()` helper or set up Paraglide
3. Replace hardcoded strings in components (~15 files, ~50 strings)
4. Add language switcher to TopBar
5. Create first UI translation file (e.g., `de.json`)

### Phase 3: Staleness detection (optional)
1. Add `sourceHash` to the translation workflow documentation
2. Create `scripts/check-translations.ts`
3. Add to CI pipeline as an informational check (non-blocking)

### Phase 4: AI-assisted bulk translation (optional)
1. Create a script that takes an English article and language code
2. Calls Claude API to translate, preserving frontmatter and markdown formatting
3. Automatically computes and inserts `sourceHash`
4. Outputs the translated file to the correct path
5. Human reviews and commits

---

## 5. Files to Modify (Phase 1 & 2)

| File | Change |
|------|--------|
| `src/lib/server/content.ts` | Parse `lang` from filename suffix, add to `ArticleMeta` |
| `src/lib/server/graph.ts` | Accept `locale` param, filter articles by language |
| `src/lib/types/article.ts` | Add `lang?: string` to `ArticleFrontmatter` |
| `src/routes/(app)/+layout.server.ts` | Read locale from URL, pass to `buildGraph()` |
| `src/routes/` | Add `[[lang]]` optional param route group |
| `src/lib/i18n/en.json` | New file — all UI strings |
| `src/lib/i18n/index.ts` | New file — `t()` helper |
| ~15 Svelte components | Replace hardcoded strings with `t()` calls |

---

## 6. Supported Languages (initial)

Start with a small set and expand based on community demand:

| Code | Language |
|------|----------|
| `en` | English (default, source) |
| `de` | German |
| `es` | Spanish |
| `pt` | Portuguese |

Adding a new language requires:
1. Translate (or AI-translate) each article → save as `.{lang}.md`
2. Create `src/lib/i18n/{lang}.json` with UI strings
3. Add the language code to the supported languages list and language switcher
