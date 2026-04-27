**RCOS — Regenerative Community Operating System**

# Onboarding Protocol

- **Generated:** 2026-04-27
- **Source (latest version):** [https://blueprint.ecohubs.community/articles/rcos-templates/layer-1/onboarding-protocol](https://blueprint.ecohubs.community/articles/rcos-templates/layer-1/onboarding-protocol)
- **All RCOS templates:** [https://blueprint.ecohubs.community/articles/rcos-templates](https://blueprint.ecohubs.community/articles/rcos-templates)

---
- **Layer:** 1 — Membership System
- **Status:** Template — adapt for your community
- **RCOS reference:** [§3.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [§3.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [§3.8](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Admission Criteria

*RCOS clauses: [3.2.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [3.2.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding)*

<details>
<summary>Why write down who gets in?</summary>

Admission is the moment a stranger becomes bound by — and protected by — the community's rules. If the criteria are informal, the decision collapses into whoever happens to like the applicant. Written criteria make admission a governance act, not a social favor, and make rejection defensible on grounds the community can point to.

</details>

<details>
<summary>How to fill this in</summary>

State the explicit conditions under which an applicant may be admitted. Each criterion should be testable from the application itself or from an external check.

</details>

1. _<Criterion 1, e.g. alignment with the primary purpose and Layer 0 identity constraints.>_
2. _<Criterion 2, e.g. willingness to actively contribute in at least one recognized category.>_
3. _<Criterion 3, e.g. no prior forced exit or rejection within the last X months.>_
4. _<Criterion 4, e.g. completion of the application form in good faith — no misrepresentation.>_

## Onboarding Steps

*RCOS clauses: [3.2.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [3.2.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding)*

<details>
<summary>Why make the process a fixed sequence?</summary>

Consent to governance only means something if the member has actually seen the governance. A fixed sequence — review, consent, technical setup — ensures every Full Member crossed the same threshold in the same order, so nobody slips into full rights without having encountered the constraints that come with them.

</details>

<details>
<summary>How to fill this in</summary>

List the ordered steps every new member must complete to move from applicant to Full Member. Include explicit consent steps and any tooling/access provisioning required.

</details>

1. _<Step 1, e.g. review all Layer 0–6 artifacts and this onboarding protocol.>_
2. _<Step 2, e.g. explicitly consent to the Membership Agreement and Layer 0 identity constraints.>_
3. _<Step 3, e.g. set up required tooling (wallet, accounts, identity).>_
4. _<Step 4, e.g. join member-only communication channels.>_
5. _<Step 5, e.g. be granted any required permissions for governance participation.>_
6. _<Step 6, e.g. onboarding completion recorded — membership state transitions to Full Member.>_

## Initial Membership State

*RCOS clauses: [3.1.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details>
<summary>Why assign a state at the end of onboarding?</summary>

Between "applicant approved" and "fully integrated" there is a real gap — permissions, access, and expectations all change. Declaring the exact state a new member holds at each step removes ambiguity about what they can do right now, and prevents unintentional grants of rights before onboarding is complete.

</details>

<details>
<summary>How to fill this in</summary>

State the membership states a member transitions through during onboarding, and what triggers each transition. Reference the Membership State Registry.

</details>

- On approval: _<e.g. Trial Member.>_
- On onboarding completion: _<e.g. Full Member (automatic upon completion).>_

## Trial and Evaluation

*RCOS clauses: [3.3.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation)*

<details>
<summary>Why bound the trial period?</summary>

An unbounded trial is a second-class membership that never ends — all obligations, fewer rights. Fixing the duration, the criteria, and the failure path forces a decision point: either the new member transitions into full standing or a defined exit runs. It prevents the trial state from becoming a permanent holding pen.

</details>

<details>
<summary>How to fill this in</summary>

Define the duration, evaluation criteria, transition decision, grace period, failure path, and any extension rules. Trial rights are defined in the Membership State Registry.

</details>

- **Duration:** _<e.g. 30 days from approval.>_
- **Evaluation criteria:** _<e.g. all onboarding steps completed and recorded.>_
- **Transition decision:** _<e.g. automatic on completion; or vote-based.>_
- **Grace period:** _<e.g. additional X days if onboarding not complete on time.>_
- **Failure to complete:** _<e.g. exit process triggered automatically after total period elapses.>_
- **Extension:** _<e.g. one-time X-day extension on request.>_
- **Rights during trial:** _<reference Membership State Registry.>_
- **Re-application block:** _<e.g. members exited due to incomplete onboarding may not reapply for X months.>_

## Completion Record

*RCOS clauses: [3.8.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details>
<summary>Why keep the record permanent?</summary>

The completion record is the evidence that a member consented to a specific version of the rules on a specific date. Losing or editing it would make it impossible to answer, months or years later, "what exactly did they agree to?" — which is the only question that matters when a dispute arrives.

</details>

<details>
<summary>How to fill this in</summary>

State where the completion record is kept, what it captures (timestamp, artifact versions consented to), and the retention rule.

</details>

_<Description of the onboarding completion record — where it lives, what it captures, and that it is retained permanently after exit.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
