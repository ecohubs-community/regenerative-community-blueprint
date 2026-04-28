---
id: 2e9c4a18
title: Authority Registry
parentId: b7e62f01
order: 2
---

- **Layer:** 2 — Governance & Decision Logic
- **Status:** Template — adapt for your community
- **RCOS reference:** [§4.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#43-authority-boundaries), [§4.7](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Lists all roles, circles, or bodies that hold decision-making authority, along with their explicit scope, limits, and term.

---

## Registered Authorities

*RCOS clauses: [4.3.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#43-authority-boundaries), [4.3.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#43-authority-boundaries), [4.3.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#43-authority-boundaries), [4.3.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#43-authority-boundaries), [4.3.5](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#43-authority-boundaries)*

<details data-kind="rationale">
<summary>Why write every authority down?</summary>

Authority that is not explicitly registered gets filled in by default — by whoever has been around longest, speaks loudest, or controls the keys. A single registry that names every role, bounds its scope, caps its limits, and ties its basis to a delegation act makes unauthorized action detectable and prevents authority from being derived from charisma, seniority, or ownership.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

For each role, body, or circle that holds authority, list the scope of authority, hard limits, term/duration, and the basis (membership state, delegation act, etc.). The collective body of Full Members is itself an authority and belongs in this table.

</details>

| Role / Body | Scope of authority | Limits | Term / Duration | Basis |
|---|---|---|---|---|
| _<e.g. Full Members (collective)>_ | _<scope>_ | _<limits — cannot override invariants; cannot act outside Decision Matrix>_ | _<duration>_ | _<basis — membership state>_ |
| _<e.g. Membership Admin>_ | _<scope>_ | _<limits>_ | _<duration>_ | _<basis — delegated by Full Members>_ |
| _<e.g. Finance Steward>_ | _<scope>_ | _<limits — spending cap>_ | _<duration>_ | _<basis>_ |
| _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> **Conflict-of-interest recusal:** A role holder may not exercise their delegated authority in any decision where they have a direct personal interest. In such cases, the decision is escalated through the governance process.

> Authority must not be derived from charisma, seniority, ownership, or informal influence.
> Temporary or emergency authority must be explicitly defined, time-bounded, and subject to review.

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Constitutional
- **Version:** <version>
- **Decision record:** <link to decision record>
