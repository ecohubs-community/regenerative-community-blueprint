**RCOS — Regenerative Community Operating System**

# Exit & Separation Protocol

- **Generated:** 2026-04-29
- **Source (latest version):** [https://blueprint.ecohubs.community/articles/rcos-templates/layer-1/exit-protocol](https://blueprint.ecohubs.community/articles/rcos-templates/layer-1/exit-protocol)
- **All RCOS templates:** [https://blueprint.ecohubs.community/articles/rcos-templates](https://blueprint.ecohubs.community/articles/rcos-templates)

---
- **Layer:** 1 — Membership System
- **Status:** Template — adapt for your community
- **RCOS reference:** [§3.6](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [§3.7](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [§3.8](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Voluntary Exit

*RCOS clauses: [3.6.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>Why make leaving frictionless?</summary>

A community that is hard to leave is not a community — it is a trap. Voluntary exit must be available at all times, without interrogation, notice periods, or punishment, because the right to withdraw consent is what makes every other act of consent real. Retaining contribution history separately ensures that leaving does not erase the work the person did.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Describe the channel for submitting exit, time-to-revocation of access, what records are retained, and the resulting state transition.

</details>

- _<How a member submits a voluntary exit; reasons optional.>_
- _<Notice period or handover expectation, if any.>_
- _<Time-to-revocation of access (e.g. within 24 hours of confirmation).>_
- _<What is retained — contribution history, recognition records — and what is removed.>_
- _<Resulting state transition (e.g. to Exited Member).>_
- _<Where and how the exit is recorded with timestamp.>_

## Forced Exit

*RCOS clauses: [3.6.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>Why gate removal behind Layer 4?</summary>

Removal is the sharpest power the community holds over a person. If it can be exercised by anyone with enough social pull, membership is worthless. Requiring a concluded Layer 4 accountability decision — with written reasons, a notification, and a minimum re-application window — turns removal from an act of power into an act of governance that can be reviewed and contested.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State that forced exit can only follow a concluded Layer 4 accountability process. Define notification, access revocation, retained records, re-application block, and decision-record privacy.

</details>

- _<Forced exit may only result from a concluded Layer 4 accountability process with a documented decision.>_
- _<Affected member must be notified in writing with reason and decision-record reference before access is revoked.>_
- _<Time-to-revocation of access (e.g. within 24 hours of decision).>_
- _<What is retained, what is removed.>_
- _<Re-application block (minimum duration, set by accountability decision; reference Layer 4).>_
- _<Privacy of the decision record (reference Conflict Resolution Ladder privacy rules).>_

## Suspension

*RCOS clauses: [3.7.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [3.7.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [3.7.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status)*

<details data-kind="rationale">
<summary>Why design suspension carefully or not at all?</summary>

A poorly-designed suspension state is worse than none — it becomes a soft exit with no due process, or an indefinite limbo used to punish without the accountability of a full removal. If the community cannot commit to explicit conditions, time bounds, and review mechanisms, it is safer to have no formal suspension than a loose one.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Either define suspension explicitly (entry conditions, time limits, rights during suspension, review mechanism, exit) or state that no formal suspension exists. Do not leave this section ambiguous.

</details>

_<Either: define suspension state with entry conditions, maximum duration, rights during suspension, mandatory review mechanism, and exit; or: state that formal suspension is not currently defined.>_

## Asset, Role, and Responsibility Separation

*RCOS clauses: [3.6.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>Why enumerate separation steps?</summary>

When someone leaves, every unclosed thread — a role nobody vacated, a wallet key still active, a task still assigned — becomes a live attack surface or an operational gap. A checklist forces these threads to be closed deliberately, not discovered months later when something breaks or someone abuses access they no longer should have.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Provide a checklist applied to both voluntary and forced exits. Include role vacation, task release, financial-instrument access removal, platform admin revocation, and resolution of outstanding obligations.

</details>

The following separation steps apply to both voluntary and forced exits:

- _<Roles held must be vacated and documented in the Role Registry.>_
- _<Ongoing tasks must be released or handed over.>_
- _<Treasury / wallet / signing access must be removed.>_
- _<All administrative access to platforms must be revoked.>_
- _<Outstanding obligations resolved or transferred before exit is finalised where possible.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
