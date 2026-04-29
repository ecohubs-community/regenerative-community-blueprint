**RCOS — Regenerative Community Operating System**

# Learning Log

- **Generated:** 2026-04-29
- **Source (latest version):** [https://blueprint.ecohubs.community/articles/rcos-templates/layer-6/learning-log](https://blueprint.ecohubs.community/articles/rcos-templates/layer-6/learning-log)
- **All RCOS templates:** [https://blueprint.ecohubs.community/articles/rcos-templates](https://blueprint.ecohubs.community/articles/rcos-templates)

---
- **Layer:** 6 — Evolution & Adaptation
- **Status:** Template — adapt for your community; updated when learnable events occur
- **RCOS reference:** [§8.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [§8.6](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Records major failures, adaptations, reversals, and systemic learnings. Repeated failure patterns must trigger structural review, not individual blame. Entries are prepended (most recent first).

---

## What Constitutes a Learnable Event

*RCOS clauses: [8.4.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Why define the trigger explicitly?</summary>

If "we should learn from this" is left to individual judgement, the hardest lessons — the ones involving conflict, failure, or embarrassment — are the ones most likely to go unrecorded. Naming the specific events that MUST produce an entry takes the question out of the moment, and makes sure uncomfortable learnings are captured rather than quietly dropped.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

List the specific events that obligate a Learning Log entry. State who owns the log and the synthesis cadence.

</details>

An entry MUST be added when any of the following occur:

- _<A governance decision is reversed, rolled back, or found to contradict another adopted rule.>_
- _<An experiment concludes (success, failure, or early termination).>_
- _<A conflict escalates to the governance step of the Conflict Resolution Ladder.>_
- _<A structural or systemic failure is identified that caused harm, confusion, or repeated process breakdown.>_
- _<A major adaptation to community operations is adopted that significantly changes how a layer functions.>_
- _<A near-miss: a situation that could have caused significant harm but was caught before it did.>_
- _<Any event the community collectively identifies as worth learning from.>_

_<Minor operational adjustments, routine decisions, and individual issues fully resolved at the early steps of the Conflict Resolution Ladder do not require a Learning Log entry.>_

**Ownership:** _<role responsible for ensuring entries are created and maintained.>_

**Synthesis cadence:** _<the Learning Log is reviewed at the Reflection & Learning meeting; named role prepares a brief synthesis of entries since the last review, noting recurring patterns.>_

---

_No entries yet. First entry will be added when the first learnable event occurs._

---

## Entry Format

*RCOS clauses: [8.4.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Why a fixed entry template?</summary>

Free-form reflection is valuable, but it does not aggregate. A consistent schema — trigger, signals, what changed, outcome, follow-up owner — makes it possible to scan years of entries for recurring patterns and to turn isolated incidents into structural evidence. It also forces each entry to name an owner, so learning does not stop at "we noticed."

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Use the template below for every entry. Each field forces a different lens on the event; do not skip the follow-up owner.

</details>

```markdown
## <YYYY-MM-DD> — <Short title>

- **Trigger:** <What happened that prompted this entry>
- **Layers/artifacts implicated:** <e.g. Layer 2 — Governance Protocol>
- **What occurred:** <Short narrative>
- **Signals that triggered action:** <What made this visible as a problem>
- **What changed or was tried:** <Decision, experiment, or rule change>
- **Outcome:** <Result after review, if known>
- **Follow-up owner and due date:** <Name / role and date, or "none">
```
