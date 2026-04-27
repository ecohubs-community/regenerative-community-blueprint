**RCOS — Regenerative Community Operating System**

# Change Protocol

- **Generated:** 2026-04-27
- **Source (latest version):** [https://blueprint.ecohubs.community/articles/rcos-templates/layer-6/change-protocol](https://blueprint.ecohubs.community/articles/rcos-templates/layer-6/change-protocol)
- **All RCOS templates:** [https://blueprint.ecohubs.community/articles/rcos-templates](https://blueprint.ecohubs.community/articles/rcos-templates)

---
- **Layer:** 6 — Evolution & Adaptation
- **Status:** Template — adapt for your community
- **RCOS reference:** [§8.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [§8.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [§8.6](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

---

## How Changes Are Proposed

*RCOS clauses: [8.1.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.6.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.8.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#88-explicitness-rules)*

<details>
<summary>Why require a structured proposal?</summary>

A change that arrives as a vague idea in chat cannot be evaluated, challenged, or rolled back later. Forcing every proposal through the same minimum shape — affected artifacts, rationale, risks, rollback — turns an opinion into a reviewable artifact and makes it impossible to slip a rule change past the community by accident.

</details>

<details>
<summary>How to fill this in</summary>

State who may propose, where proposals are submitted, and the mandatory content fields. Tie this to the Governance Protocol (Layer 2).

</details>

_<Any Full Member may propose a change to any RCOS artifact. State the submission channel.>_ Every proposal must include:

- _<Summary of the change.>_
- _<Affected layers and artifacts (with links).>_
- _<Decision type (Operational / Strategic / Constitutional).>_
- _<Rationale.>_
- _<Risks and mitigations.>_
- _<Rollback plan.>_
- _<Proposed effective date.>_

## How Proposals Are Classified

*RCOS clauses: [8.1.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms)*

<details>
<summary>Why classify by impact?</summary>

Not every change deserves the same friction. Typo fixes should not need a supermajority; constitutional shifts should not pass quietly. Mapping proposals to decision types — and defaulting unclear cases upward — makes the cost of a change proportional to its blast radius and protects Layer 0 from being eroded through small moves.

</details>

<details>
<summary>How to fill this in</summary>

Define what falls under each decision type. State the default-higher rule for ambiguous cases.

</details>

- **Operational:** _<wording corrections, formatting, minor content updates; no vote required; executed by the responsible role within delegated limits.>_
- **Strategic:** _<changes to Layer 1–5 content that affect member rights, processes, or structures.>_
- **Constitutional:** _<changes to Layer 0 (purpose, scope, invariants) or to the governance system itself (Layer 2).>_

> If classification is unclear, it defaults to the higher-impact type.

## Review and Deliberation

*RCOS clauses: [8.1.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.7.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details>
<summary>Why enforce minimum deliberation windows?</summary>

Without a floor on deliberation time, any change can be rushed through on a slow day when few members are paying attention. Mandatory minimums — longer for higher-impact changes — guarantee that members who are travelling, ill, or simply busy still get a real chance to read, object, or show up.

</details>

<details>
<summary>How to fill this in</summary>

Set minimum deliberation periods for each decision type, and a ratification period for Constitutional changes.

</details>

- **Operational:** _<no deliberation required.>_
- **Strategic:** _<minimum X-day deliberation; deliberation venue.>_
- **Constitutional:** _<minimum Y-day deliberation; Z-day ratification period after the vote passes.>_

## Adoption and Publication

*RCOS clauses: [8.2.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details>
<summary>Why fixed publication steps?</summary>

A vote that passes but is never written down is the same as no vote at all — and worse, it creates a gap where whoever remembers the outcome gets to define it. Tight, ordered publication steps close that gap and make "what was adopted" a matter of record, not of memory.

</details>

<details>
<summary>How to fill this in</summary>

State the ordered steps that must run after a proposal passes. Include time bounds and the version-history obligation.

</details>

When a proposal passes:

1. _<Proposal file moved to the passed-proposals archive within X days.>_
2. _<Affected artifacts updated within X days.>_
3. _<Version history entry added.>_
4. _<Status fields updated on affected artifacts.>_

## Rejection

*RCOS clauses: [8.2.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority)*

<details>
<summary>Why archive rejected proposals?</summary>

Rejected ideas carry as much signal as accepted ones — they show what the community considered and declined. Keeping rejections filed and accessible prevents the same proposal from reappearing under a new name every six months and gives future members a view of the paths not taken.

</details>

<details>
<summary>How to fill this in</summary>

State the archive location for rejected proposals and the re-vote conditions for revisiting the question.

</details>

When a proposal is rejected:

1. _<Proposal file moved to the rejected-proposals archive within X days.>_
2. _<No artifact changes made.>_
3. _<Re-vote mechanism applies if new information emerges (per the Decision Matrix, Layer 2).>_

## Transition and Migration

*RCOS clauses: [8.5.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [8.5.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details>
<summary>Why protect existing rights during transitions?</summary>

If new rules could silently rewrite existing agreements, membership would be meaningless — what you signed up for could be changed out from under you. Explicit transition rules guarantee that rights are not reduced retroactively and that people operating under the old rules are given time and notice before the ground shifts.

</details>

<details>
<summary>How to fill this in</summary>

State the rules protecting existing role holders, members, and records when a rule change takes effect.

</details>

When a rule change affects existing roles, agreements, or records:

- _<Existing role holders notified before the change takes effect.>_
- _<Existing members' rights may not be reduced without consent or a Constitutional vote.>_
- _<Records that predate the change are not retroactively altered unless explicitly part of the proposal.>_
- _<A transition period may be defined in the proposal itself.>_

## Rollback

*RCOS clauses: [8.1.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.5.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details>
<summary>Why make rollback symmetrical with adoption?</summary>

A change that cannot be undone through the same path that created it is a trap. Requiring rollback to use the original decision type keeps the door open for correction without letting a single member quietly reverse a community-level decision by calling it a "fix."

</details>

<details>
<summary>How to fill this in</summary>

State that rollback uses the same decision type and process as the original adoption.

</details>

_<Any passed decision can be reversed through the same process as the original. Any Full Member may trigger a re-vote by submitting a written reasoned objection that was not considered during the original deliberation. Rollback uses the same decision type as the original.>_

## Emergency Changes

*RCOS clauses: [8.5.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details>
<summary>Why allow emergency changes at all?</summary>

Some harms unfold faster than a vote can be convened. A narrow, well-guarded emergency path lets the community respond to genuine safety or platform failures without handing anyone a general-purpose override. The mandatory report, review, and ratification-or-rollback cycle is what keeps emergency powers from becoming ordinary powers.

</details>

<details>
<summary>How to fill this in</summary>

Define the conditions under which an emergency change may be made, who can make it, and the mandatory report-review-ratify-or-rollback cycle.

</details>

An emergency operational change may be made by _<role>_ only if all of the following conditions are met:

1. _<Immediate action required to prevent safety harm or platform failure.>_
2. _<A Full Member vote cannot be convened in time.>_
3. _<The change does not override a Layer 0 invariant.>_

Emergency changes must be:

- _<Reported to all Full Members within X hours.>_
- _<Reviewed at the next community meeting.>_
- _<Ratified via the appropriate decision type within Y days, or automatically rolled back.>_

## Experiments

*RCOS clauses: [8.3.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details>
<summary>Why treat experiments as a distinct mechanism?</summary>

The community needs a way to try new things without having to permanently adopt them to test them. Experiments create that space — but only if they are time-bounded, labeled, and auto-expiring. Without those guardrails, an "experiment" becomes the fastest way to install a permanent rule with no real deliberation.

</details>

<details>
<summary>How to fill this in</summary>

Define the rules every experiment must satisfy. Reference the Experiment Template for the full submission shape.

</details>

_<Any Full Member may propose a time-bounded experiment via Strategic decision. See the Experiment Template for the required fields.>_

- _<Experiments expire automatically at the end of their defined duration unless explicitly renewed via a new proposal.>_
- _<All artifacts affected by an experiment must be explicitly labeled as experimental for the duration.>_
- _<Safety suspension: if an experiment introduces a credible safety risk, coercion, or sustained harm, an emergency suspension may be invoked per Emergency Changes above.>_
- _<Results and learnings are recorded in the Learning Log.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Constitutional
- **Version:** <version>
- **Decision record:** <link to decision record>
