**RCOS – Regenerative Community Operating System**

# Experiment Template

- **Generiert:** 2026-04-28
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-6/experiment-template](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-6/experiment-template)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

> _Dieser Inhalt ist noch nicht ins Deutsche übersetzt – die englische Quelle wird angezeigt._

---
- **Layer:** 6 — Evolution & Adaptation
- **Status:** Template — use to propose a time-bounded experiment
- **RCOS reference:** [§8.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [§8.7](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)

> Experiments let the community try a change without permanently adopting it. To stay safe, every experiment must be time-bounded, labeled, and auto-expiring — and must record its results in the Learning Log.

---

## Required Fields

*RCOS clauses: [8.3.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Why require these fields?</summary>

Without scope, duration, success criteria, and rollback, an "experiment" is just a permanent change with friendlier branding. Forcing every proposal to specify what it changes, when it ends, how it will be reviewed, and how it will be rolled back keeps experimentation reversible — and prevents the experiment label from being used to bypass deliberation.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Fill each field. Maximum duration is set by your Change Protocol. The decision authority must come from the Decision Matrix.

</details>

- **Title:** _<short experiment name.>_
- **Proposer:** _<member name.>_
- **Decision type:** Strategic
- **Scope:** _<exactly what is being tried; which artifacts and behaviors are affected.>_
- **Duration:** _<start date — end date; maximum duration as set by the Change Protocol.>_
- **Review checkpoints:** _<at minimum one midpoint check-in; specify dates and what is reviewed.>_
- **Success criteria:** _<observable conditions that would justify making the change permanent.>_
- **Failure criteria:** _<observable conditions that would terminate the experiment early.>_
- **Rollback conditions and process:** _<what triggers rollback and how it is executed.>_
- **Authorized decision path:** _<who may start, extend, modify, or terminate the experiment, per the Decision Matrix.>_
- **Labelling:** _<all artifacts affected by the experiment must be explicitly labelled as experimental for the duration.>_
- **Safety suspension:** _<acknowledge that an emergency suspension may be invoked under the Change Protocol if a credible safety risk emerges.>_

## Expiry and Renewal

<details data-kind="rationale">
<summary>Why must experiments expire?</summary>

The community needs the option to revert. Auto-expiry forces a deliberate decision to make the change permanent — not a slow drift in which nobody remembers it was ever conditional.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State the auto-expiry rule, the renewal mechanism, and the obligation to record results in the Learning Log.

</details>

- _<Experiments expire automatically at the end of their defined duration unless explicitly renewed via a new proposal. Renewal requires a new Strategic vote.>_
- _<Results and learnings are recorded in the Learning Log.>_

---

## Outcome Record (filled in at experiment end)

- **End date:**
- **Outcome:** _<Adopted permanently / Rolled back / Modified and re-run / Terminated early>_
- **Decision record:** _<link to vote or decision>_
- **Learning Log entry:** _<link>_
- **Summary:** _<two to four sentences on what was tried, what was observed, and what was decided.>_
