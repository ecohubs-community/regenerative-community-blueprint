
# EcoHubs Knowledge Platform – Frontend Implementation Plan (SvelteKit 5 + Tailwind v4)

_This document is structured so an AI coding agent or developer can implement the frontend feature-by-feature, starting from the graph refactor and app layout, then layering navigation, search, scalability, and the optional AI workbench._

---

## 1. Context & Goals

- **Stack**
  - SvelteKit 5 (runes)
  - TailwindCSS v4 with custom theme (`src/lib/styles/theme.css`)
  - Sveltia CMS content in `/content/**`
  - Existing Knowledge Graph API: `GET /api/graph` → `{ domains, topics, modules, articles }`

- **Content graph**
  - `Domain` → `Topic` → `Module` → `Article` (Articles can belong to multiple modules)
  - Article frontmatter includes `climate[]`, `budget[]`, `size[]`, `summary`, and `attachments`.

- **Primary goals**
  - Clean, minimal, **graph-driven** navigation (no ad hoc hierarchies)
  - Full-text search with filters for climate, budget, and community size
  - Highly readable UI using your theme tokens and Tailwind utilities
  - Architecture prepared for future AI tools (code/blueprint editor & assistant)

- **Core decision**
  - **Use `/api/graph` (backed by `src/lib/server/graph.ts`) as the single source of truth** for:
    - Navigation and sidebars
    - Breadcrumbs
    - Related content
    - Search indexing inputs

---

## 2. Implementation Roadmap (High-Level)

This is the order in which an AI agent or developer should implement features:

1. **Graph Refactor (Server Layer)**
   - Extract graph-building logic into `src/lib/server/{content,graph}.ts`.
   - Enrich data with IDs, slugs, and relationships.
2. **App Layout & Theming**
   - Implement `AppShell` layout (top bar, sidebar, content area) using theme tokens.
   - Wire `(app)/+layout.svelte` to use this shell and hydrate a graph store.
3. **Navigation & Content Pages**
   - Implement domain/topic/module/article routes.
   - Add breadcrumbs, sidebar navigation, and related content panels.
4. **Search System**
   - Add server-side index builder using MiniSearch.
   - Implement search store and UI components (search bar, filters, results).
5. **Scalability & Performance**
   - Add caching, prerendering (when appropriate), and lazy article-body loading.
6. **Optional: AI Workbench**
   - Add `/workbench` route with an `EditorShell` and `AssistantPanel`.
   - Stub `/api/assistant` for future integration.

Each section below gives enough detail for step-by-step implementation.

---

## 3. Graph Refactor (Server Layer)

### 3.1 Files to create/refactor

- `src/lib/server/content.ts`
- `src/lib/server/graph.ts`
- `src/routes/api/graph/+server.ts` (refactor to use `graph.ts`)

### 3.2 Data model

Define types for implementation (in a shared `src/lib/server/types.ts` or inside `graph.ts`):

- `Domain`
  - `id: string`
  - `slug: string`
  - `title: string`
  - `description?: string`
  - `order?: number`
  - `topicIds: string[]`

- `Topic`
  - `id: string`
  - `slug: string`
  - `title: string`
  - `domainId: string`
  - `description?: string`
  - `order?: number`
  - `moduleIds: string[]`

- `Module`
  - `id: string`
  - `slug: string`
  - `title: string`
  - `topicId: string`
  - `description?: string`
  - `order?: number`
  - `articleIds: string[]`

- `Article`
  - `id: string`
  - `slug: string`
  - `title: string`
  - `summary?: string`
  - `moduleIds: string[]`
  - `climate: string[]`
  - `budget: string[]`
  - `size: string[]`
  - `attachments?: { file: string; caption?: string }[]`

- `Graph`
  - `domains: Domain[]`
  - `topics: Topic[]`
  - `modules: Module[]`
  - `articles: Article[]`

### 3.3 `content.ts` responsibilities

- Helpers to read content from `/content/**`:
  - `readJsonCollection(dir: string)` – domains, topics, modules, authors.
  - `readArticleMeta()` – iterate markdown files in `content/articles`, parse frontmatter with `gray-matter`, return metadata (no body).
  - `readArticleBody(slug: string)` – read a single markdown body when needed.

Implementation details:

- Use `fs/promises` and `path`.
- Normalize IDs using filename without extension (e.g. `vision-governance.json` → `vision-governance`).
- Store filename-derived slug for routing; keep `title` as display name.

### 3.4 `graph.ts` responsibilities

- Export at least:
  - `loadRawGraph()` – similar to current `/api/graph` logic, but using `content.ts` helpers.
  - `buildGraph()` – takes raw data and enriches with:
    - Generated `id`/`slug` if missing.
    - Forward relations (domain → topics → modules → articles).
    - Reverse relations (article → modules → topic → domain).

- Normalization steps:
  - Use CMS config conventions from `admin/config.yml`:
    - Topics reference domain by title.
    - Modules reference topic by title.
    - Articles reference modules by title (multi-module articles).
  - Build lookup maps keyed by title to resolve relations to IDs.

### 3.5 `/api/graph` refactor

- `src/routes/api/graph/+server.ts` should:
  - Import `buildGraph` from `lib/server/graph`.
  - Call it and return JSON `{ domains, topics, modules, articles }`.
  - Not include article bodies in this response.

### 3.6 Usage by other server code

- From SvelteKit server load functions (`+layout.server.ts`, `+page.server.ts`):
  - Prefer **direct import** of `buildGraph` instead of HTTP fetch to `/api/graph` for performance.
  - Serialize only what’s needed into `data.graph` (e.g. exclude heavy fields if any).

---

## 4. App Layout & Theming

### 4.1 File structure

Create the following layout components and routes:

- `src/lib/components/layout/AppShell.svelte`
- `src/lib/components/layout/TopBar.svelte`
- `src/lib/components/layout/SidebarNav.svelte`
- `src/lib/components/layout/Breadcrumbs.svelte`

- `src/lib/stores/graph.ts`
- `src/lib/stores/ui.ts` (sidebar open/closed, theme preference, etc.)

- `src/routes/(app)/+layout.server.ts` – loads graph
- `src/routes/(app)/+layout.svelte` – uses `AppShell` and initializes stores

Keep the existing root `+layout.svelte` minimal and delegate to `(app)` group for the main application shell.

### 4.2 `(app)/+layout.server.ts`

Responsibilities:

- Import `buildGraph` from `src/lib/server/graph.ts`.
- Return `graph` in `data` (without article bodies).
- Add `export const prerender = true` if you opt to pre-render the main app (optional, depending on deployment strategy).

### 4.3 `graph` store

`src/lib/stores/graph.ts` should:

- Hold the `Graph` value from server data.
- Provide helpers for lookup by slug/id:
  - `getDomainBySlug(slug)`
  - `getTopicBySlug(domainSlug, topicSlug)`
  - `getModuleBySlug(domainSlug, topicSlug, moduleSlug)`
  - `getArticleBySlug(slug)`
- Expose derived data structures for navigation:
  - Domain tree for sidebar
  - Mappings from article to its modules/topic/domain

Use Svelte 5 rune APIs for state (`$state`, `$derived`) where appropriate.

### 4.4 `AppShell.svelte` layout

Structure:

- **TopBar** (full width):
  - Left: EcoHubs logo/name (uses theme font and colors)
  - Center: Global search input (search bar component)
  - Right: Theme toggle, user menu (future), navigation links.

- **Sidebar** (desktop):
  - Fixed left column for domain/topic/module tree.
  - Collapsible sections per domain.
  - Uses `glass-panel` from `theme.css` for subtle glassmorphism.

- **Content area**:
  - `max-w-[--max-width-5xl] mx-auto px-[--spacing-lg] py-[--spacing-xl]`
  - Hosts breadcrumbs + page content.

- **Mobile behavior**:
  - Sidebar hidden by default.
  - TopBar has hamburger button to toggle sidebar drawer.
  - Sidebar rendered as full-screen overlay with darkened backdrop.

Theme integration examples (class names only; actual code to be written in components):

- Root container:
  - `class="min-h-screen bg-[--color-background] text-[--color-text-primary]"`
- Top bar:
  - `class="glass-panel sticky top-0 z-30 flex items-center justify-between px-[--spacing-lg] py-[--spacing-md]"`
- Sidebar:
  - `class="glass-panel border-r border-[--color-border]"`
- Cards:
  - `class="glass-card rounded-[--radius-xl] p-[--spacing-lg]"`

### 4.5 `SidebarNav.svelte`

Responsibilities:

- Read graph store and derive domain/topic/module tree.
- Highlight the current path based on route params.
- Allow expand/collapse per domain and topic.
- On click, navigate using `<a href>` or SvelteKit `<a>` with proper `aria-current` handling.

Accessibility:

- `role="navigation"` and `aria-label="Knowledge structure"`.
- Keyboard accessible expand/collapse controls; `aria-expanded` on toggles.

### 4.6 `Breadcrumbs.svelte`

Input:

- Route parameters: `domainSlug?`, `topicSlug?`, `moduleSlug?`, `articleSlug?`.

Behavior:

- Use graph helpers to resolve each level.
- Render `<nav aria-label="Breadcrumb">` with `<ol>`/`<li>`.
- Typical path example:
  - `Home` → `Vision & Governance` → `Decision-Making Systems` → `Consent Process` → `Consent for Tropical Low Budget`.

---

## 5. Navigation & Content Pages

### 5.1 Route structure

Create nested routes under `(app)` for content browsing:

- `/` – Landing/overview (can live under `(app)` or at root)
- `/domains` – Domain list
- `/domains/[domainSlug]` – Domain detail + topics
- `/domains/[domainSlug]/[topicSlug]` – Topic detail + modules
- `/domains/[domainSlug]/[topicSlug]/[moduleSlug]` – Module detail + articles
- `/domains/[domainSlug]/[topicSlug]/[moduleSlug]/[articleSlug]` – Article detail

Additionally:

- `/search` – Optional dedicated search page (search results + filters)

### 5.2 Page responsibilities

- **Domain list page** (`/domains`):
  - Uses graph store; no extra server fetching.
  - Render domains in cards with titles, descriptions, and counts of topics/modules.

- **Domain detail**:
  - Show domain info + list of topics.
  - Link to each topic.

- **Topic detail**:
  - Show topic info + modules in that topic.

- **Module detail**:
  - Show module description.
  - List all articles linked to this module (`articleIds`).
  - Provide filter chips for climate/budget/size (filter within the module’s articles).

- **Article detail**:
  - Fetch full markdown body (see below).
  - Show associated modules and their parent topic/domain.
  - Render related content:
    - Other articles sharing modules.
    - Articles with overlapping climate/budget/size.

### 5.3 Loading article bodies

Avoid sending article bodies via `graph`.

Options (choose one at implementation time):

1. **`import.meta.glob` approach**
   - Use Vite’s glob import in a server module to map slugs to content.
   - Server `+page.server.ts` for article page reads the appropriate file.

2. **Dedicated API**
   - Add `src/routes/api/articles/[slug]/+server.ts` that uses `readArticleBody`.
   - Article page server load fetches from this endpoint (or imports helper directly).

Use Markdown renderer on the client (`mdsvex` or a lightweight renderer) or render to HTML on the server and send sanitized HTML.

---

## 6. Search System

### 6.1 Requirements

- Full-text search across:
  - Domains, Topics, Modules, Articles.
- Filter by article facets:
  - `climate[]`
  - `budget[]`
  - `size[]`
- Highlight matched text in snippets.

### 6.2 Library choice

- **Recommendation**: [`minisearch`](https://lucaong.github.io/minisearch/)
  - Small bundle size.
  - Supports field boosting and highlighting.

### 6.3 Search index data

- For each entity, index:
  - `id`, `type` (`domain|topic|module|article`)
  - `slug`, `title`
  - `summary` (where available)
  - `body` (text):
    - Domain/Topic/Module: their description.
    - Article: frontmatter summary + first N characters of body (stripped markdown).
  - Relations:
    - `domainId`, `topicId`, `moduleIds[]`, `articleIds[]` (as applicable).
  - Facets (for articles only):
    - `climate[]`, `budget[]`, `size[]`.

### 6.4 Indexing architecture

Recommended: **Server-built index exposed via API**.

- File: `src/routes/api/search-index/+server.ts`
- Responsibilities:
  - Import `buildGraph` and `readArticleBody` helpers.
  - Build an in-memory MiniSearch index with all documents.
  - Export serialized index via `index.toJSON()`.
  - Respond with JSON and caching headers:
    - `Cache-Control: public, max-age=600, stale-while-revalidate=86400`.

Client usage:

- In search-related server loads (`/search` page or global layout):
  - Fetch `/api/search-index`.
  - Restore client-side index with `MiniSearch.loadJSON(serialized, options)`.

Alternative (for very small content sets): build the index in the client from `graph` and article snippets. This can be added later if needed.

### 6.5 Search store

File: `src/lib/stores/search.ts`.

- State:
  - `query: string`
  - `filters: { climate: Set<string>; budget: Set<string>; size: Set<string> }`
  - `results: SearchResult[]`
  - `status: 'idle' | 'loading' | 'ready'`

- Methods:
  - `setQuery(query: string)` (debounced in UI)
  - `toggleFilter(type: 'climate' | 'budget' | 'size', value: string)`
  - `clearFilters()`
  - `runSearch()` – executes MiniSearch search against current index and filters.

- Derived values:
  - `hasActiveFilters`
  - `filteredResults` (applies facet filters to raw search matches).

### 6.6 Search UI components

- `SearchBar.svelte`
  - TopBar-integrated input.
  - `input` bound to `search.query` (with debounce).
  - On submit, either:
    - Show inline dropdown of results, or
    - Navigate to `/search?q=...`.

- `SearchFilters.svelte`
  - Renders sets of chips for climate, budget, size.
  - Options sourced from union of all article facets or from config constants.
  - Uses `TagPill`/`Chip` components with active/inactive styles.

- `SearchResults.svelte`
  - Displays grouped results by `type`.
  - Each result as a `SearchResultCard`:
    - Title
    - Snippet with highlights
    - Type label (Domain/Topic/Module/Article)
    - Meta tags (for articles: climate/budget/size chips).

### 6.7 Highlighting matches

- Use MiniSearch highlighting or custom match logic to wrap matches in `<mark>` tags.
- In UI, style `<mark>` using theme:
  - `class="bg-[--color-highlight-light] text-[--color-text-primary] rounded-[--radius-sm] px-1"`
- Ensure you escape any user content and only trust `<mark>` tags you inject.

---

## 7. Component Model & Theme Usage

### 7.1 Component list (core)

- **Layout**
  - `AppShell.svelte`
  - `TopBar.svelte`
  - `SidebarNav.svelte`
  - `Breadcrumbs.svelte`

- **Navigation**
  - `DomainTree.svelte` – full tree (domain → topic → module)
  - `TopicList.svelte` – topics for a given domain
  - `ModuleList.svelte` – modules for a given topic

- **Search**
  - `SearchBar.svelte`
  - `SearchFilters.svelte`
  - `SearchResults.svelte`
  - `SearchResultCard.svelte`

- **Content**
  - `DomainOverview.svelte`
  - `TopicOverview.svelte`
  - `ModuleOverview.svelte`
  - `ArticleLayout.svelte`
  - `RelatedModules.svelte`
  - `RelatedArticles.svelte`

- **Common**
  - `Card.svelte` (uses `.glass-card`)
  - `Chip.svelte`, `TagPill.svelte`
  - `Skeleton.svelte`
  - `IconButton.svelte`

- **AI (optional)**
  - `AssistantPanel.svelte`
  - `EditorShell.svelte`

### 7.2 Communication patterns

- Use SvelteKit load functions for data that must be present on initial render (graph, article content).
- Use stores (graph, search, UI) for cross-cutting state:
  - Initialize graph and search stores in `(app)/+layout.svelte` from server `data`.
  - Child components read from stores rather than receiving long prop chains.

### 7.3 Tailwind + theme integration patterns

Use semantic CSS variables from `theme.css` instead of hard-coded hex values.

Examples:

- Layout background and text:
  - `bg-[--color-background] text-[--color-text-primary]`

- Card surfaces:
  - `glass-card rounded-[--radius-xl] p-[--spacing-lg]`

- Accent buttons:
  - `rounded-[--radius-full] bg-[--color-primary] px-4 py-2 text-white hover:bg-[--color-primary-dark]`

- Filter pills:
  - `inline-flex items-center rounded-[--radius-full] bg-[--color-surface] px-3 py-1 text-xs text-[--color-text-secondary] hover:bg-[--color-primary-light] hover:text-[--color-text-primary]`

### 7.4 Accessibility

- Respect existing `:focus-visible` styles from `theme.css`.
- Ensure all interactive elements are reachable via keyboard and have ARIA labels where needed.
- Sidebar:
  - `aria-expanded` on toggles, `role="navigation"`.
- Breadcrumbs:
  - `<nav aria-label="Breadcrumb">`.
- Search:
  - `label` associated with input; announce result counts via `aria-live` if using live results.

---

## 8. Integration with `/content/**` & Sveltia CMS

### 8.1 Collections recap (from `admin/config.yml`)

- **Domains** (`content/domains/*.json`)
- **Topics** (`content/topics/*.json`) – reference domain by title.
- **Modules** (`content/modules/*.json`) – reference topic by title.
- **Articles** (`content/articles/*.md`) – reference multiple modules by title; include climate/budget/size, summary, body, attachments.

### 8.2 Multi-module articles

- When building graph:
  - Map article `modules[]` (titles from frontmatter) to `moduleIds[]`.
  - For each module, populate `articleIds[]`.

- UI usage:
  - `ArticleLayout` shows which modules the article belongs to.
  - `ModuleOverview` lists all related articles.

### 8.3 Media & attachments

- Articles may include `attachments[]` with `file` and `caption`.
- Render in `ArticleLayout`:
  - Use `<figure>` with `<img>` or file icon + `<figcaption>`.
  - Ensure responsive behavior: `max-w-full h-auto`.
- Files are typically under `static/` or a similar uploads directory configured in CMS.

### 8.4 AI-ready content fields (future)

- Reserve optional fields in article frontmatter or module JSON for AI workflows:
  - `ai_prompt`, `ai_tags`, `ai_status` (`draft`, `needs_review`, `final`).
- The AI workbench can later read/write these fields via a secure backend.

---

## 9. Scalability & Performance

### 9.1 Avoiding slow loads

- **Graph**:
  - Build graph on each server request using `buildGraph`.
  - For larger sites, add an in-memory cache with short TTL (e.g. 5–10 minutes).

- **Article bodies**:
  - Do not include article bodies in `graph` or `/api/graph`.
  - Load article body only on article page (and maybe for search index building).

### 9.2 Caching

- For `/api/search-index`:
  - Add aggressive but safe caching headers (as above).

- For graph in server loads:
  - Optionally cache `buildGraph` result in memory if environment allows (long-running server).

### 9.3 Pre-rendering

- If content is mostly static and updated via Git commits:
  - Use `export const prerender = true` for main browsing routes.
  - Use SvelteKit `prerender.entries` or equivalent to generate paths from graph at build time.
  - Trigger rebuilds via CI when content changes.

- If you need near-real-time updates, keep routes dynamic with caching rather than full prerender.

### 9.4 Future graph-based features

- Because `Graph` is explicit and normalized, future features can include:
  - Visual sitemap route (e.g. `/map`) that renders graph as a tree or force-directed layout.
  - Personalized learning paths based on climate/budget/size filters.
  - AI agents that traverse graph to suggest module sequences.

---

## 10. Optional AI Workbench Integration

### 10.1 Route & layout

- Add a dedicated route under `(app)`:
  - `/workbench` or `/blueprints`.

- Layout (`EditorShell.svelte`):
  - Left: context panel (selected domain/topic/module/article, relevant filters).
  - Center: editor or blueprint canvas.
  - Right: `AssistantPanel` chat.

- Provide entry points from module/article pages:
  - Button "Open in Blueprint Workbench" linking to `/workbench?article=slug`.

### 10.2 Assistant interactions

- Frontend component: `AssistantPanel.svelte`.
  - Chat history, input box, send button.
  - Shows context: climate/budget/size, selected modules/articles.

- Backend endpoint: `/api/assistant` (to be implemented later).
  - Accepts payloads like `{ prompt, context }`.
  - Calls external LLM with context from graph and article content.
  - Returns suggestions, draft content, or diffs.

### 10.3 Security & git-based workflow

- Do not let AI write directly to production content.
- Recommended patterns:
  - AI writes proposals to `content/proposals` or similar folder.
  - Or server pushes changes as Git branches/PRs via provider API.

- Protect `/workbench` and `/api/assistant` with authentication.
- Log all AI-generated content for review.

---

## 11. Summary for AI Agent Execution

When an AI coding agent starts implementing this frontend, it should:

1. **Implement server graph layer** (`content.ts`, `graph.ts`, refactor `/api/graph`).
2. **Wire graph into `(app)/+layout.server.ts` and `(app)/+layout.svelte`, create `graph` store.**
3. **Build `AppShell`, `TopBar`, `SidebarNav`, and `Breadcrumbs`** using theme tokens.
4. **Create domain/topic/module/article routes and overview components**, wired to the graph store.
5. **Add article body loading logic** (glob or API) for article pages.
6. **Implement server-side search index** (`/api/search-index`) using MiniSearch.
7. **Create `search` store and search UI components** (bar, filters, results, highlighting).
8. **Tune performance** with caching and optional prerendering.
9. **Optionally scaffold `/workbench` and AI assistant endpoints/components** for future enhancements.

Following this order ensures a stable, graph-backed core before layering navigation UX, search, and AI tooling.

