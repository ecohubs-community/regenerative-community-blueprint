# EcoHubs Backend Architecture (BACKEND.md)

This document provides a full technical overview of the **EcoHubs Backend**, including architecture, authentication, data model, workflows, API endpoints, editor design, and system requirements.

---

# 1. Overview

The backend is a **SvelteKit 5** application designed specifically for:

- Decentralized editing of the EcoHubs Community Blueprint
- GitHub-backed version control (branches, commits, PRs)
- GitHub membership authentication
- Custom content model (Domains → Topics → Modules → Articles)
- Media uploads via git commits
- A clean UI for managing branches and editing content
- A block-based markdown editor (Milkdown) similar to Notion/Outline/Ghost
- Future-proof data structures for AI and governance integrations

The backend acts as a **Git-native CMS** with a modern UI, secure GitHub-based auth, and predictable workflows.

---

# 2. Tech Stack

### **Core Application**

- **SvelteKit 5 with Runes** – reactive logic, endpoints, rendering
- **Node adapter** or cloud-native adapter
- **TypeScript** – all code strongly typed

### **UI & Components**

- **TailwindCSS 4** – using project theme from `src/lib/styles/theme.css`
- **shadcn-svelte** – consistent UI components, dialogs, menus, panels
- **Milkdown Editor (Svelte integration)** – Notion-like editing experience

### **Git & Collaboration**

- **GitHub API** (REST + GraphQL)
- **Octokit** library
- Local caching of file trees for performance (optional)
- PR creation and branch management

### **Other Libraries**

- **Minisearch** – lightweight full-text search
- **gray-matter** – parse articles
- **js-yaml** – serialize/deserialize JSON/YAML where needed

---

# 3. Requirements

The backend must support:

### **1. Branch-per-User workflow**

Each user works in isolated branches. They can:

- Create personal branches
- Switch branches easily
- Load content tree from a specific branch

### **2. Diff isolation**

Only changes made by a user appear in their PR.

### **3. Git-backed Editing System**

All operations map to Git actions:

- Creating a domain/topic/module/article = commit
- Editing = commit
- Deleting = commit
- Uploading media = commit

### **4. Pull Requests**

Users can create PRs from:

- Their personal branches to `main`
- Their personal branches to other branches

### **5. Custom Content Model**

Nodes:

```
Domain → Topic → Module → Article
```

Articles may belong to multiple modules. Metadata includes climate/budget/size options.

### **6. Media Handling**

Media files uploaded via UI become part of the GitHub repo.

### **7. Full Git History**

All content is plain files under version control.

### **8. Decentralized Collaboration**

The system must:

- Allow multiple contributors
- Avoid merge conflicts where possible
- Support independent workstreams

### **9. Markdown Editor**

A rich editor similar to Notion/Outline/Ghost:

- Headings
- Tables
- Lists
- Images
- Embeds
- Slash commands
- Keyboard shortcuts

---

# 4. Core Data Model

All blueprint elements live inside `/content/`:

```
content/
  domains/*.json
  topics/*.json
  modules/*.json
  articles/*.md
  media/*
```

### **Domain (JSON)**

```
{
  "id": "uuid",
  "title": "Vision & Governance",
  "description": "..."
}
```

### **Topic (JSON)**

```
{
  "id": "uuid",
  "domain": "domain-id",
  "title": "Decision-Making Systems",
  "description": "..."
}
```

### **Module (JSON)**

```
{
  "id": "uuid",
  "topic": "topic-id",
  "title": "Consent Decision-Making",
  "description": "..."
}
```

### **Article (Markdown frontmatter)**

```
---
id: uuid
modules:
  - module-id
climate:
  - Tropical Wet
budget:
  - Low Budget
size:
  - "10–50 people"
title: "Consent Process for Tropical, Low Budget Communities"
summary: "..."
---

Markdown body...
```

### **Media**

```
content/media/<filename>
```

Stored in branches and committed like any other file.

---

# 5. Auth Flow (GitHub Membership Auth)

Authentication must ensure:

- The user is a real GitHub user
- The user is a member of the specified GitHub organization or repo

### **Flow**

1. User opens `/login`
2. Redirect to GitHub OAuth authorize URL
3. GitHub callback returns code
4. Backend exchanges code → GitHub access token
5. Backend checks:
   - `GET /user` → identity
   - `GET /repos/:owner/:repo/collaborators/:username` or org membership
6. If allowed → session created
7. Session stored via cookies or JWT

---

# 6. Workflows (Excluding Snapshot Voting)

## **1. Branch Creation Workflow**

- User clicks "Create Branch"
- Backend calls GitHub API:
  - `GET /repos/.../git/refs/heads/main`
  - `POST /repos/.../git/refs` → create new branch
- User is switched to that branch

## **2. Branch Switching Workflow**

UI offers dropdown of branches:

- Personal branches
- Team branches
- Main

Changing branch reloads file tree using:

- `GET /repos/.../git/trees/:branch?recursive=1`

## **3. Editing Content**

1. User edits JSON or Markdown using custom UI
2. On save:
   - File is serialized
   - Backend creates a commit via `PUT /repos/:owner/:repo/contents/:path`
3. Commit message autogenerated:
   - "Update Article: Consent Decision Making"

## **4. Media Upload**

1. User drops image into editor
2. Backend uploads as:
   - base64 encoded file
   - commit into branch
3. Editor inserts the file path

## **5. Create Pull Request**

User clicks "Propose Changes"

Backend calls:

```
POST /repos/:owner/:repo/pulls
```

Params:

- head = user-branch
- base = main
- title = auto-generated or custom
- body = summary of commits

## **6. Resolve Conflicts (Optional)**

If the PR has conflicts:

- UI shows alert
- User rebases through backend:
  - The backend performs a GitHub merge strategy or informs user

---

# 7. Clean UI Interface

Goals:

- Minimal, modern, distraction-free
- Tailwind + shadcn-svelte components
- Sidebar navigation for content tree
- Top bar includes:
  - Branch selector
  - Save
  - Create PR
  - User profile

### **Recommended UI Structure**

```
┌──────────────────────────────────────────────┐
│ Top Bar (branch selector, actions, profile) │
├──────────────┬───────────────────────────────┤
│ Sidebar      │ Editor View                   │
│ (tree)       │ (Milkdown / JSON forms)       │
└──────────────┴───────────────────────────────┘
```

---

# 8. Markdown Editor (Milkdown)

Milkdown provides:

- Notion-like interface
- Slash commands
- Markdown output
- Tables
- Checklists
- Embeds
- Images

The backend receives markdown, wraps with YAML frontmatter, commits.

Editor integration must:

- Load article frontmatter on open
- Load markdown body into Milkdown
- On save → merge frontmatter + markdown

---

# 9. Required API Endpoints

### **Auth**

```
POST /auth/login
GET /auth/callback
GET /auth/me
POST /auth/logout
```

### **Branches**

```
GET /branches
POST /branches/create
POST /branches/switch
```

### **Content**

```
GET /content/tree?branch=:branch
GET /content/:path?branch=:branch
POST /content/save
POST /content/delete
```

### **Media**

```
POST /media/upload
```

### **Pull Requests**

```
POST /pull-request/create
GET /pull-request/status/:id
```

### **Search**

```
GET /search?q=...
```

---

# 10. Additional Important Notes

### **1. Caching**

File trees should be cached to prevent rate limits.

### **2. Rate Limit Handling**

GitHub API throttles aggressively → use conditional requests.

### **3. Conflict Detection**

Must detect changes between main and branch.

### **4. Content Validation**

Ensure JSON + frontmatter is valid.

### **5. Autosave (optional)**

Milkdown supports autosave callbacks.

---

# 11. Summary

This backend design enables:

- True decentralized collaboration
- Git-native workflows (branches, commits, PRs)
- A custom editorial UX tailored to the EcoHubs blueprint
- Rich Markdown editing
- Full control over authorization and branch policies
- Future integration with Snapshot and DAO voting

It is a **lightweight alternative to a CMS**, designed specifically for:

- Contributors
- Community members
- DAO workflows

The system is robust, scalable, and perfectly aligned with the EcoHubs mission.

