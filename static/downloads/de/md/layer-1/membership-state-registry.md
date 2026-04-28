**RCOS – Regenerative Community Operating System**

# Membership State Registry

- **Generiert:** 2026-04-28
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-1/membership-state-registry](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-1/membership-state-registry)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

> _Dieser Inhalt ist noch nicht ins Deutsche übersetzt – die englische Quelle wird angezeigt._

---
- **Layer:** 1 — Membership System
- **Status:** Template — adapt for your community
- **RCOS reference:** [§3.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [§3.8](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Defined Membership States

*RCOS clauses: [3.1.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>Why a single table of states?</summary>

Rights and obligations scattered across documents drift apart. Collecting every state, its rights, its obligations, and its transitions into one table makes the membership system auditable at a glance — you can see every door into and out of the community, and what each one grants. If two documents ever disagree, this registry is the tiebreaker.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Define every membership state your community recognizes (e.g. Applicant, Trial Member, Full Member, Exited Member). For each, list rights, obligations, entry condition, and exit condition. Keep states mutually exclusive — no individual may hold two states simultaneously.

</details>

| State | Rights | Obligations | Entry condition | Exit condition |
|---|---|---|---|---|
| _<State 1, e.g. Applicant>_ | _<rights>_ | _<obligations>_ | _<entry>_ | _<exit>_ |
| _<State 2, e.g. Trial Member>_ | _<rights>_ | _<obligations>_ | _<entry>_ | _<exit>_ |
| _<State 3, e.g. Full Member>_ | _<rights>_ | _<obligations>_ | _<entry>_ | _<exit>_ |
| _<State 4, e.g. Exited Member>_ | _<rights>_ | _<obligations>_ | _<entry>_ | _<exit>_ |

> No individual may hold multiple membership states simultaneously.
> No rights or obligations may be assumed outside of the individual's current membership state.

## Technical Notes

<details data-kind="rationale">
<summary>Why preserve data after exit?</summary>

The community's history belongs to the community, not to any individual account. Retaining contribution records after exit protects the integrity of audit trails, governance history, and recognition accounting — while revoking access and removing the person from active listings respects the finality of their departure.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Describe which records persist after exit, where state assignments are tracked operationally, and how access revocation interacts with platform capabilities.

</details>

- _<Contribution and governance history retained after exit; describe the retention policy.>_
- _<Exited members are removed from active member listings; describe access revocation per platform.>_
- _<Operational location of state assignments — see "Current Member List" below.>_

## Current Member List

*RCOS clauses: [3.8.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>Why separate the definition from the list?</summary>

This document defines what the states mean; the live registry tracks who is in which state today. Keeping them separate means the definitions are stable and governable while the assignments stay current — and nobody has to change a ratified artifact every time a member joins or leaves.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Link to the operational system or document where current member-to-state assignments are tracked. This artifact should not need to be changed every time a member joins or leaves.

</details>

> The live member list is maintained in _<system / location>_. This document defines the states; the registry tool holds the current assignments.

_<Link or location of the live member directory.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
