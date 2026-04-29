**RCOS — Regenerative Community Operating System**

# Operations Manual

- **Generated:** 2026-04-29
- **Source (latest version):** [https://blueprint.ecohubs.community/articles/rcos-templates/layer-5/operations-manual](https://blueprint.ecohubs.community/articles/rcos-templates/layer-5/operations-manual)
- **All RCOS templates:** [https://blueprint.ecohubs.community/articles/rcos-templates](https://blueprint.ecohubs.community/articles/rcos-templates)

---
- **Layer:** 5 — Operations & Coordination
- **Status:** Template — adapt for your community
- **RCOS reference:** [§7.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [§7.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [§7.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [§7.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [§7.6](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)

---

## Core Operational Processes

*RCOS clauses: [7.3.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.6.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)*

<details data-kind="rationale">
<summary>Why document critical processes?</summary>

If a process only lives in one person's head, the community depends on that person showing up — forever. Writing the critical processes down, with named owners, is what converts private knowledge into a community asset that survives handovers, absences, and exits.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

For every recurring critical process (onboarding, exit, proposal publication, contribution recording, meeting cadence, treasury management, platform access review), name an owner and a brief description.

</details>

| Process | Who | Detail |
|---|---|---|
| _<Member onboarding>_ | _<role>_ | _<see Onboarding Protocol (Layer 1)>_ |
| _<Member exit>_ | _<role>_ | _<see Exit & Separation Protocol (Layer 1)>_ |
| _<Proposal publication>_ | _<role>_ | _<see Governance Protocol (Layer 2)>_ |
| _<Contribution recording>_ | _<role>_ | _<see Internal Economy Protocol (Layer 3)>_ |
| _<Recurring meeting>_ | _<facilitator>_ | _<agenda publication; notes; action tracking>_ |
| _<Treasury management>_ | _<finance steward>_ | _<see Treasury Ruleset (Layer 3)>_ |
| _<Platform access review>_ | _<infrastructure steward>_ | _<review cadence; access revocation for exited members>_ |

## Temporary and Ad-Hoc Responsibilities

*RCOS clauses: [7.1.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.1.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.7.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Why cap temporary responsibilities?</summary>

Ad-hoc tasks quietly calcify into permanent unpaid jobs — usually on whoever said yes once. A hard time-box and a forced review make the difference between "I covered for a week" and "apparently this is my role now."

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State that any temporary responsibility must be time-bounded at assignment, documented, reviewed before expiry, and either formalised or terminated.

</details>

When a task or responsibility is assigned temporarily, it must be:

- _<Explicitly time-bounded from the outset (specific end date or completion condition).>_
- _<Documented as temporary at the time of assignment.>_
- _<Reviewed before the end date; converted to a formal role or terminated.>_

_<Maximum duration of any temporary responsibility before it must be formally assigned or terminated — e.g. 90 days.>_ If a temporary responsibility has no owner after its end date, it lapses; it does not transfer implicitly.

---

## Role and Domain Interfaces

*RCOS clauses: [7.6.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts), [7.3.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Why map handoffs explicitly?</summary>

Most operational failures happen not inside a role but between roles — at the boundaries where work moves from one owner to the next. Naming the handoffs turns invisible dependencies into reviewable ones, and prevents "I thought you had it" failures.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

For each pair of roles that pass work to each other, name the handoff and the type of work transferred.

</details>

| From | To | Handoff |
|---|---|---|
| _<role>_ | _<role>_ | _<what is handed off>_ |
| _<role>_ | _<role>_ | _<...>_ |

## Workload Boundaries

*RCOS clauses: [7.4.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.7.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Why make workload limits explicit?</summary>

Unbounded coordination load is the default failure mode of volunteer communities — it quietly burns out the most committed members until they leave. Explicit, reviewable limits make capacity a shared concern rather than a private burden.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Set bounds on meeting load, role load, response-time expectations, and the path for renegotiating responsibilities.

</details>

- **Meeting load:** _<recurring meeting cadence and maximum duration; rules for extraordinary meetings.>_
- **Role load:** _<cap if any; rule for flagging overload; resolution window.>_
- **Response time expectations:** _<non-urgent async; urgent operational; safety-critical.>_
- **Renegotiation and relief:** _<process for redistributing responsibilities; resolution window.>_

## Operational Continuity

*RCOS clauses: [7.5.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity)*

<details data-kind="rationale">
<summary>Why plan for continuity now?</summary>

A community that depends on one irreplaceable person is one illness, one conflict, or one exit away from collapse. Naming the single points of failure — honestly — and building handover into every role is what keeps the community surviving its founders.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Name current single points of failure honestly. State the handover requirement for each role and the cadence of continuity review.

</details>

- **Current state:** _<honest list of single points of failure; recruitment plan to reduce concentration.>_
- **Handover mechanisms:** _<reference handover requirements per role in the Role Registry; handover must be completed before a role is vacated.>_
- **Continuity review cadence:** _<quarterly; ad hoc on role change.>_

## Information Flow and Anti-Gatekeeping

*RCOS clauses: [7.3.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.3.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Why treat information access as a governance issue?</summary>

Whoever controls access to information controls the community, whether they mean to or not. Making access rules explicit — and disallowing sole points of access — is what prevents informal gatekeepers from accumulating the kind of power the governance system is supposed to check.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State which records are open to all Full Members, the response window for information requests, and the rule against sole points of access for governance-relevant information.

</details>

- _<Governance decisions accessible to all Full Members.>_
- _<Meeting notes published within X hours.>_
- _<Membership state and role assignments accessible.>_
- _<Contribution records accessible.>_
- _<Information request response window.>_
- _<Withholding access to information members are entitled to is an accountability trigger under Layer 4.>_
- _<No role or individual may be the sole point of access for information required by other role holders.>_

---

## Documentation Locations and Update Procedures

*RCOS clauses: [7.3.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Why name where every document lives?</summary>

If no one can say where the canonical version of something lives, there is no canonical version. Naming the location, owner, and review cadence for each document type is what makes the community's memory auditable rather than folkloric.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

For each document type, name the canonical location, the owner, and the review cadence.

</details>

| Document type | Location | Owner | Review cadence |
|---|---|---|---|
| _<RCOS artifacts>_ | _<location>_ | _<owner>_ | _<cadence>_ |
| _<Member registry>_ | _<location>_ | _<owner>_ | _<cadence>_ |
| _<Meeting notes>_ | _<location>_ | _<owner>_ | _<cadence>_ |
| _<Governance proposals>_ | _<location>_ | _<owner>_ | _<cadence>_ |
| _<Contribution records>_ | _<location>_ | _<owner>_ | _<cadence>_ |

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
