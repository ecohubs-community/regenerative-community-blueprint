---
id: 1403643f
title: Governance Protocol
parentId: b7e62f01
order: 1
---

- **Layer:** 2 — Governance & Decision Logic
- **Status:** Template — adapt for your community
- **RCOS reference:** [§4.5](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [§4.6](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [§4.7](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Defines the full lifecycle of a collective decision — from proposal submission to documentation and appeal.

---

## Proposal Submission

*RCOS clauses: [4.5.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Why formalize how proposals enter the system?</summary>

A decision process that accepts proposals informally — a message, a verbal suggestion, a founder's idea — has no reliable way to tell what is actually on the table. Requiring a standard submission format, filing location, and mandatory content fields means every proposal arrives with the same information, visible to everyone, traceable from day one.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State who may propose, where proposals are submitted, the mandatory content fields, and how decision type is determined and challenged.

</details>

- _<Operational decisions — handled by the relevant role holder per the Role Registry; no proposal required.>_
- _<Strategic and Constitutional decisions — who may submit, and on what platform.>_
- _<Mandatory proposal fields: summary, affected layers and artifacts, decision type, rationale, risks and mitigations, rollback plan, proposed effective date.>_
- _<Decision type is declared by proposer; defaults to higher-impact type if unclear.>_
- _<Withdrawal rules — when a proposal can be withdrawn and how.>_

## Review and Deliberation

*RCOS clauses: [4.5.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Why enforce a minimum deliberation window?</summary>

Rushed votes favor whoever is already paying attention and disadvantage everyone else. A mandatory deliberation period, tied to the weight of the decision, gives members time to read, respond, and surface concerns before the vote opens — so the vote reflects considered judgment, not speed of reaction.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Name the deliberation venues and the minimum periods for Strategic and Constitutional decisions before a vote may open.

</details>

- _<Where deliberation happens (forum, chat, meeting).>_
- _<Minimum deliberation period before a vote opens — Strategic.>_
- _<Minimum deliberation period before a vote opens — Constitutional.>_
- _<Expectation that members raise concerns during deliberation to avoid the need for re-votes.>_

## Decision Execution

*RCOS clauses: [4.5.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Why tie execution to the record?</summary>

A passed proposal that never reaches the affected artifact is a decision in name only — the rules on the ground still say what they said before. Binding execution to a concrete artifact update and version-history entry closes the gap between what was decided and what is actually in force.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State what happens when a proposal passes (artifact updates, version history) and when it is rejected (archive). Define a time bound for both.

</details>

- _<On passing: how proposal is filed; affected artifacts updated; version history entry made.>_
- _<On rejection: where proposal is archived.>_
- _<Time bound for execution after a vote concludes.>_

## Documentation and Publication

*RCOS clauses: [4.5.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Why document every outcome, including rejections?</summary>

Keeping a record of only the decisions that passed erases the reasoning history — members lose track of what was already considered and rejected, and the same debates get re-litigated indefinitely. Archiving both passed and rejected proposals, with a time bound and a verifiable decision record, preserves institutional memory and makes the governance system auditable.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State retention rules for passed and rejected proposals, what counts as the decision record, and the version-history update obligation.

</details>

- _<All passed and rejected proposals are filed within X days of the vote closing.>_
- _<The vote artifact (e.g. Snapshot link) serves as the decision record.>_
- _<Version history (Layer 6) updated with every passed proposal.>_

## Appeal and Review

*RCOS clauses: [4.5.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.6.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Why make re-votes possible but bounded?</summary>

A governance system with no appeal route hardens mistakes into permanent rules; one with unlimited informal appeal paths never settles anything. Allowing any Full Member to trigger a re-vote — but only with a written, reasoned objection raising something not already addressed — keeps the system self-correcting without turning every decision into a standing referendum.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Define the conditions for triggering a re-vote, the objection format, and the threshold/mechanism for the re-vote itself.

</details>

- _<Who may trigger a re-vote and how.>_
- _<Reasoned objection requirement — a consideration not addressed in original deliberation.>_
- _<Re-vote uses the same mechanism and threshold as the original.>_
- _<Treatment of repeated frivolous re-vote requests.>_

## Conflict Between Decisions

*RCOS clauses: [4.5.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Why predefine conflict resolution?</summary>

When two decisions point in different directions, someone has to choose which one counts — and if that choice is made ad hoc, it reduces to whoever has the authority or energy to enforce their reading. A fixed precedence rule (higher type wins; more recent wins at the same type) resolves conflicts mechanically, without a judgment call.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State the precedence rule (typically: higher decision type prevails; more recent wins at the same type, unless explicitly locked).

</details>

- _<Precedence: Constitutional > Strategic > Operational.>_
- _<Same-type conflicts: more recent prevails unless earlier explicitly locked future changes.>_
- _<Where conflicts are surfaced and how they are resolved.>_

## Safeguards and Failure Modes

*RCOS clauses: [4.6.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Why plan for governance failure up front?</summary>

Every governance system fails somewhere — captured by a subgroup, frozen by informal vetoes, drifted by a role holder who quietly expanded their remit. Naming the specific failure modes in advance, wiring in challenge routes that cannot be retaliated against, and requiring a formal review when failures accumulate, is what keeps governance from slowly hollowing out while no one is watching.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

For each named failure mode, state the safeguard. Include a trigger that forces a Constitutional review if failures accumulate.

</details>

- **Power concentration:** _<how the protocol prevents unilateral authority above operational scope.>_
- **Informal vetoes:** _<rule that only written, reasoned objections submitted via the defined process carry weight.>_
- **Decision capture:** _<rule about quorum and openness of voting.>_
- **Founder/role entrenchment:** _<rule that no role grants permanent authority; founders hold no special governance authority beyond membership state.>_
- **Challenge without retaliation:** _<reference Layer 4 anti-retaliation provisions.>_
- **Persistent failure trigger:** _<e.g. three or more governance failures within X months trigger a Constitutional review.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Constitutional
- **Version:** <version>
- **Decision record:** <link to decision record>
