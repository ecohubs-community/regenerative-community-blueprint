# Translation workflow

Operational checklist for translating articles into a registered locale. The
strategic context (architecture decisions, plumbing, scripts) lives in
[`translation-plan.md`](./translation-plan.md). This file is the day-to-day
runbook — designed to be followed by either a human contributor or an AI
agent.

Replace `<locale>` with the target locale code (`de`, `es`, …) and `<scope>`
with a path filter (e.g. `rcos-core/v0-1`).

---

## Pre-flight checklist — before running `pnpm run translate`

### 1. Sync and install

```bash
git pull                                  # fetch latest source content
pnpm install --frozen-lockfile            # only if package.json changed
```

### 2. Pick (and confirm) a backend

The translator auto-selects based on env vars:
`ANTHROPIC_API_KEY` → `anthropic-api`, else `GEMINI_API_KEY` → `gemini`,
else `claude-cli`. Override with `--provider <name>` if needed.

| Backend                      | Pre-flight check                      |
| ---------------------------- | ------------------------------------- |
| `claude-cli` (free, default) | `claude --version` returns a version  |
| `gemini` (free API)          | `echo $GEMINI_API_KEY` shows a key    |
| `anthropic-api` (paid)       | `echo $ANTHROPIC_API_KEY` shows a key |

### 3. Survey what needs translating

```bash
pnpm run check:translations -- --locale <locale>
```

Reports per-article `MISSING` / `OUTDATED` / `UP-TO-DATE` and a coverage
percentage. Use the path list to plan your batches.

### 4. Pick a batch scope

Translate a small, coherent subtree first — easier to spot-check before going
wider. Common scopes:

```
--only rcos-core/v0-1                   # ~14 articles, the spec
--only rcos-templates --include-empty   # 22 templates + 8 frontmatter shells
--only rcos-layers                      # 7 layer overview articles
--only rcos-modules                     # modules + their v0-1 sub-articles
--only rcos-stress-tests                # ~20 stress test scenarios
--only safeguards                       # 1–2 articles
--only reference-implementations        # 1 article
```

`--include-empty` is required for parent/index pages that have only
frontmatter (no body). They get a translated title but empty body.

### 5. Dry-run the chosen scope

```bash
pnpm run translate -- --locale <locale> --only <scope> --dry-run
```

Confirms the file list and the resolved provider before any API/CLI calls.
Abort here if anything looks off.

### 6. Run for real

```bash
pnpm run translate -- --locale <locale> --only <scope>
```

Optional flags:

- `--include-empty` — translate frontmatter-only shells (titles only)
- `--force` — re-translate even if `sourceHash` matches (use sparingly)
- `--provider <name>` — override auto-selected backend
- `--model <id>` — override the provider's default model

---

## Post-flight checklist — after each batch

```bash
# 1. Spot-check 1–2 outputs by hand
$EDITOR content/articles/<scope>/...<locale>.md

# 2. Normalize term/keyword consistency (safety net — both scripts are idempotent)
pnpm run normalize:rfc-keywords -- --locale <locale>
pnpm run normalize:terms        -- --locale <locale>

# 3. Verify drift detector reports clean
pnpm run check:translations -- --locale <locale>

# 4. Commit
git add 'content/articles/**/*.<locale>.md'
git commit -m "Translate <scope> to <Language>"
```

---

## When all batches for a locale are translated

```bash
pnpm run build:downloads       # regenerate per-locale ZIPs + manifest
pnpm build                     # re-prerender pages with the new content
pnpm run check:translations    # final coverage check (0 outdated, 0 missing)

git add static/downloads/
git commit -m "Regenerate <Locale> download bundles"
```

After deploy, verify in the browser:

- `/<locale>/` chrome is in the target language
- `/<locale>/articles/...` shows translated content (no English-fallback banner
  for translated articles)
- `/<locale>/articles/rcos-templates#downloads` serves locale-specific bundles

---

## TL;DR

```bash
pnpm run check:translations -- --locale <locale>                       # see what's needed
pnpm run translate -- --locale <locale> --only <scope> --dry-run       # preview
pnpm run translate -- --locale <locale> --only <scope>                 # execute
pnpm run normalize:rfc-keywords -- --locale <locale>                   # safety pass
pnpm run normalize:terms        -- --locale <locale>                   # safety pass
```

---

## Adding a brand-new locale

If the locale isn't registered yet (no `<code>` entry in
`src/lib/i18n/languages.ts`), follow the [Spanish setup commit
](https://github.com/ecohubs-community/regenerative-community-blueprint/commit/multi-lang)
as a template. The full step list:

1. Add the locale to `src/lib/i18n/languages.ts` `LOCALES`.
2. Create `src/lib/i18n/messages/<code>.json` (copy `en.json`, translate ~88
   keys).
3. Wire it into `src/lib/i18n/index.ts` `MESSAGES` registry.
4. Add an entry to `scripts/i18n.mjs` `DOWNLOADS_I18N` (preamble strings for
   the artifact-side bundles).
5. Add an RFC-2119-keyword table to `scripts/normalize-rfc-keywords.mjs`.
6. Add a term table (e.g. `Layer N` → locale equivalent) to
   `scripts/normalize-terms.mjs`.
7. Optionally extend the `translate.mjs` SYSTEM_PROMPT glossary with the
   locale's chosen "Layer" term so first-pass translations are consistent.

Then start the workflow above with the new `<locale>`.
