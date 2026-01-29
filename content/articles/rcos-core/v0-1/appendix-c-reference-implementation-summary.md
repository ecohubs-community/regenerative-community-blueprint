---
id: c2d42a76
title: Appendix C — Reference Implementation Summary
parentId: e6de7a5d
order: 140
---

This appendix defines a **recommended documentation structure** for communities that wish to present themselves as RCOS Reference Implementations. The goal is to make adoption auditable, comparable, and learnable without implying endorsement.

## C.1 Community Context

- Name and location
- Size and scale (e.g., 12 members; 3 households; 25 hectares)
- Primary purpose (Layer 0)
- Date of founding and date of RCOS adoption (if different)
- Relevant legal form(s) (if any)
- Public contact point

## C.2 RCOS Adoption Overview

- RCOS-Core version in use
- Adoption decision record reference (authority, mechanism, date)
- Summary of adopted Optional Modules (if any), including:
  - Module name and scope
  - Date adopted
  - Link to module specification
  - Declared layer dependencies

## C.3 Layer-by-Layer Summary

For each layer (0–6):
- Implemented artifacts (with links)
- Deviations or adaptations (with links)
- Known challenges and failure modes encountered

Recommended format:

| Layer | Required artifacts implemented | Public link(s) | Version/date | Notes |
|---:|---|---|---|---|
| 0 | Purpose Charter; Scope Declaration; Invariants Register | [placeholder] | v0.3 / 2026-01-01 | Purpose stable; invariants reviewed quarterly |
| 1 | Membership Agreement; Onboarding Protocol; Exit & Separation Protocol; Membership State Registry | [placeholder] | v1.1 / 2026-02-15 | Trial period is 3 months |
| 2 | Decision Matrix; Governance Protocol; Authority Registry | [placeholder] | v0.8 / 2026-03-10 | Consent for ops, vote for strategic |
| 3 | Internal Economy Protocol; Treasury Ruleset | [placeholder] | v0.5 / 2026-03-20 | Monthly treasury reports published |
| 4 | Conflict Resolution Ladder; Accountability Protocol | [placeholder] | v0.6 / 2026-04-01 | Anti-retaliation policy included |
| 5 | Operations Manual; Role Registry; Meeting Templates | [placeholder] | v0.4 / 2026-04-15 | Meeting load capped at 4h/week |
| 6 | Change Protocol; Version History; Learning Log | [placeholder] | v0.2 / 2026-05-01 | Experiments expire unless renewed |

## C.4 Governance and Evolution

- Decision mechanisms in use (with Decision Matrix excerpt or link)
- Change and experiment history (with links to change records)
- Major learnings and failures (with links to Learning Log entries)
- Deviations register (recommended):

| Item | Layer(s) | Type | Status | Start | Review/End | Link |
|---|---|---|---|---|---|---|
| Rotating facilitation trial | 5 | Experiment | Active | 2026-06-01 | 2026-08-01 | [placeholder] |
| Treasury transparency exception (safety) | 3/4 | Permanent | Active | 2026-04-10 | Annual review | [placeholder] |


## C.5 Compliance Statement
- Current compliance status: Compliant / Non-compliant / Unknown
- Date of last self-audit or external audit
- Audit method (self-audit vs external)
- Known non-compliance periods (if any) and remediation summary
- Evidence links (recommended):

| Evidence | Date | Link |
|---|---:|---|
| Layer-by-layer checklist result | 2026-07-01 | [placeholder] |
| Audit notes / findings | 2026-07-01 | [placeholder] |
| Remediation log | 2026-07-15 | [placeholder] |
- Known non-compliance periods (if any)  

## C.6 Public Transparency
- Public artifact index (recommended):

| Artifact | Layer | Public link | Version/date | Notes |
|---|---:|---|---:|---|
| Purpose Charter | 0 | [placeholder] | 2026-01-01 | |
| Decision Matrix | 2 | [placeholder] | 2026-03-10 | |
| Treasury reports | 3 | [placeholder] | 2026-06-30 | monthly |
| Learning Log | 6 | [placeholder] | 2026-06-15 | redactions noted |

- Contact or inquiry channel
- Explicit statement of what is private vs public, and why
- Link to current RCOS-Core version used and change log
- Contact or inquiry channel  

---

## Informative Note

Reference Implementations are learning instruments, not endorsements.  
