---
id: b6d4e7f9
title: Membership State Registry
parentId: 2c750c19
order: 3
---

- **Layer:** 1 — Membership System
- **Status:** Template — adapt for your community
- **RCOS reference:** [§3.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)

---

## Defined Membership States

*RCOS clauses: [3.1.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

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

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
