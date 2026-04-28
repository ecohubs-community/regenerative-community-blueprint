---
id: 4c8e6d5b
title: Version History
parentId: e676f693
order: 1
---

- **Layer:** 6 — Evolution & Adaptation
- **Status:** Template — adapt for your community; updated with each adopted change
- **RCOS reference:** [§8.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [§8.6](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> The authoritative human-readable record of all adopted changes to your community's RCOS implementation. The currently active version is the most recent entry at the top of this file. Superseded rules remain accessible via version control.

---

## Entry Format

*RCOS clauses: [8.2.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Why record every adopted change?</summary>

Governance that cannot point to "what changed, when, and why" is indistinguishable from governance by whoever speaks loudest. A single append-only ledger of adopted changes — with the superseded versions preserved in version control — makes the current state of the rules unambiguous and gives members, auditors, and future stewards a way to reconstruct the path that got us here.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Use the entry template below for every adopted change. New entries are prepended above the most recent. Do not edit historical entries — corrections are recorded as new entries.

</details>

```markdown
## <version> — <Short title>

- **Effective date:** <YYYY-MM-DD>
- **Decision record:** <link to decision record>
- **Decision type:** <Operational / Strategic / Constitutional>
- **Mechanism:** <vote mechanism / delegated authority>
- **Summary:** <one to three sentences describing what changed.>
- **Layers affected:** <e.g. Layer 2, Layer 5>
- **Artifacts changed:** <list of artifacts>
- **Migration notes:** <any transition rules; "none" if not applicable>
```

---

## Current Version: v0.0 — Repository Initialized

- **Effective date:** <YYYY-MM-DD>
- **Decision record:** N/A — initial scaffold
- **Decision type:** N/A
- **Mechanism:** N/A
- **Summary:** Templates initialized. All artifacts are templates — no rules are yet adopted.
- **Layers affected:** All (scaffold only)
- **Artifacts changed:** All files created as templates
- **Migration notes:** None — initial state

---

_New entries are prepended above this line._
