**RCOS – Regenerative Community Operating System**

# Treasury Ruleset

- **Generiert:** 2026-04-28
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-3/treasury-ruleset](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-3/treasury-ruleset)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

> _Dieser Inhalt ist noch nicht ins Deutsche übersetzt – die englische Quelle wird angezeigt._

---
- **Layer:** 3 — Economic & Resource System
- **Status:** Template — adapt for your community
- **RCOS reference:** [§5.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [§5.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)

---

## Treasury Scope

*RCOS clauses: [5.3.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.5.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)*

<details data-kind="rationale">
<summary>Why draw a hard line around treasury funds?</summary>

Without an explicit boundary, any money flowing near the community — a founder's personal card, a side account, an informal reimbursement pool — can drift into being treated as community money, with all the obligations that entails. Naming exactly which accounts are treasury and which are not protects both the community and the individuals paying out of pocket.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Name every account that is treasury (wallet, bank account, etc.) and state explicitly that personal funds operating informally are not treasury and create no community obligation.

</details>

_<Define which accounts are community treasury — explicit wallet addresses, bank accounts, etc. State that any new treasury account must be declared and approved via a Strategic decision before funds are received into it. State that personal funds covering operational costs are not treasury and carry no community repayment claim.>_

## Income Sources

*RCOS clauses: [5.3.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>Why route all income through one declared list?</summary>

Every income source carries strings — reporting requirements, expectations, dependency risks. If income channels can open informally, those strings get attached before the community has had a chance to weigh them. One declared list, changed only through Strategic decisions, keeps the community's obligations under its own control.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Name every income source the community currently has, and reference the Internal Economy Protocol for the rule that any new income channel requires a Strategic decision.

</details>

_<List current income sources, or state that there are none. Reference the External Income Interfaces section in the Internal Economy Protocol.>_

## Spending Authority

*RCOS clauses: [5.3.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.7.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#57-explicitness-rules)*

<details data-kind="rationale">
<summary>Why spell out thresholds in a table?</summary>

When spending authority is vague, two failure modes appear: either every small decision escalates and nothing gets done, or a single steward quietly accumulates discretion no one ever voted to grant them. A table of amounts, decision types, and authorized bodies removes the ambiguity and makes unauthorized spending immediately visible.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

Define spending tiers by amount and the decision type, authorized body, and mechanism for each. Multi-year contracts and debt should sit in their own (Constitutional) tier.

</details>

| Amount | Decision Type | Authorized Body | Mechanism |
|---:|---|---|---|
| _<Up to delegated limit (e.g. €X)>_ | _<Operational>_ | _<Finance Steward>_ | _<Delegated>_ |
| _<Any amount above delegated limit>_ | _<Strategic>_ | _<Full Members>_ | _<Vote>_ |
| _<Multi-year contracts, debt, or structural financial obligations>_ | _<Constitutional>_ | _<Full Members>_ | _<Supermajority + ratification>_ |

## Transparency and Reporting

*RCOS clauses: [5.3.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.3.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.6.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>Why make transparency the default, not a feature?</summary>

Opacity in a treasury compounds: one missing disclosure invites another, and before long members can no longer verify whether the community's money is being handled as they agreed. Making real-time visibility the baseline — and requiring any exception to be named, justified, and time-bounded — keeps audit within reach of every member, not just stewards.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State the visibility default for each treasury account. Where direct visibility is not possible (e.g. some bank accounts), define a periodic reporting cadence with a named owner.

</details>

- _<Primary treasury (e.g. Safe multi-sig): all Full Members hold at minimum read access; real-time visibility.>_
- _<Other declared accounts: direct multi-user read access if supported; otherwise periodic balance and transaction summary.>_
- _<All spending decisions reference the linked governance record (vote ID or delegated decision log).>_

## Reserve, Risk, and Debt Constraints

*RCOS clauses: [5.3.6](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>Why block debt and long-term obligations by default?</summary>

Debt and recurring commitments bind the community beyond the people currently in it — future members inherit the obligations. Forbidding them unless a Strategic vote explicitly authorizes keeps long-term constraints from being entered into casually, and preserves the option to stay lightweight.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State the rules on debt, recurring obligations, contingency reserves, and off-treasury financial instruments. Default to "not allowed without Strategic vote" for anything that binds the future.

</details>

- **Debt:** _<allowed only via Strategic vote.>_
- **Long-term obligations:** _<recurring costs / contracts allowed only via Strategic vote.>_
- **Contingency reserve:** _<reserve target, or state that one is not yet defined.>_
- **Off-treasury instruments:** _<loans, investments, guarantees only via Strategic vote.>_

## Conflict-of-Interest Rules

*RCOS clauses: [5.4.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints)*

<details data-kind="rationale">
<summary>Why ban self-approval outright?</summary>

Even well-intentioned people unconsciously tilt decisions toward their own interests; a rule that requires disclosure and abstention removes the judgment call and the social pressure to "trust someone." Self-approval of spending is the single most common way small governance systems quietly lose integrity, so the rule is stated bluntly.

</details>

<details data-kind="instructions">
<summary>How to fill this in</summary>

State the no-self-approval rule and the disclose-and-abstain rule for any member with a direct financial interest in a spending decision.

</details>

- _<Requesters may not approve their own spending requests.>_
- _<Members with a direct financial interest in a spending decision must declare it and abstain.>_
- _<Treasury role holders may not authorize unilateral spending beyond the delegated limit.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
