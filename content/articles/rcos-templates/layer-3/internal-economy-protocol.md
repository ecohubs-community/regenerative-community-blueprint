---
id: 1496e7ff
title: Internal Economy Protocol
parentId: 7fcb6634
order: 0
---

- **Layer:** 3 — Economic & Resource System
- **Status:** Template — adapt for your community
- **RCOS reference:** [§5.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [§5.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [§5.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [§5.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)

---

## Commons vs. Private Classification

*RCOS clauses: [5.1.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.6.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details>
<summary>Why classify every resource?</summary>

Unclassified resources are where quiet privatization happens — someone starts treating a shared asset as personal, or a private asset gets quietly absorbed into community obligations, and by the time anyone notices the norm has shifted. Explicit classification, with stewards and transfer rules named up front, makes any change to that status a visible governance act rather than a creeping fact.

</details>

<details>
<summary>How to fill this in</summary>

For each resource the community holds, declare classification (Commons / Private), name a steward, define access rules, and state transfer constraints. Unclassified resources must not be allocated, encumbered, monetized, or transferred until classified.

</details>

| Resource | Classification | Steward | Access rules | Transfer constraints |
|---|---|---|---|---|
| _<e.g. RCOS specification and artifacts>_ | _<Commons / Private>_ | _<steward role>_ | _<who reads / writes>_ | _<transfer constraints>_ |
| _<e.g. Shared treasury>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<e.g. Community website / domains>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<e.g. Brand and social accounts>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<e.g. Land or physical infrastructure>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> Any unclassified resource must not be allocated, encumbered, monetized, or transferred until classification is completed.

## Recognized Contribution Categories

*RCOS clauses: [5.2.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.2.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.6.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details>
<summary>Why name the kinds of work that count?</summary>

If the community never says out loud which kinds of work it depends on, the invisible work — care, facilitation, moderation, stewardship — stays invisible, and the people doing it burn out or leave. Enumerating categories converts "someone just does this" into recognized labour the system has to account for.

</details>

<details>
<summary>How to fill this in</summary>

List the categories of contribution your community recognizes. Care, facilitation, stewardship, and informal participation are commonly under-recognized — name them explicitly if they apply.

</details>

| Category | Examples |
|---|---|
| _<e.g. Knowledge & Research>_ | _<examples>_ |
| _<e.g. Technical Development>_ | _<examples>_ |
| _<e.g. Governance & Coordination>_ | _<examples>_ |
| _<e.g. Community Building>_ | _<examples>_ |
| _<e.g. Care & Support>_ | _<examples>_ |
| _<e.g. Stewardship>_ | _<examples>_ |
| _<e.g. Informal Participation>_ | _<examples>_ |

## Contribution Recognition Mechanism

*RCOS clauses: [5.2.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.2.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition)*

<details>
<summary>Why pin down how recognition actually works?</summary>

Without a defined mechanism, "who gets credit" becomes a matter of who is loudest or closest to whoever decides. Specifying what qualifies, how it's recorded, who validates, and how to dispute it turns recognition into something a member can actually rely on — and blocks recognition from silently mutating into governance influence.

</details>

<details>
<summary>How to fill this in</summary>

State what qualifies, how recognitions are recorded, who validates, what they unlock (or do not unlock), and how members dispute a record.

</details>

- **What qualifies:** _<which activities count, and at whose declaration.>_
- **How contributions are recorded:** _<structured channel; informal/self-reported channel.>_
- **Who validates:** _<automatic / role holder / nomination process.>_
- **Effect on access/privileges:** _<recognition affects internal-unit balance only; does not grant additional governance rights beyond the membership state.>_
- **Dispute:** _<window and process for contesting a record.>_

## Internal Units

*RCOS clauses: [5.2.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.2.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition)*

<details>
<summary>Why define internal units this precisely?</summary>

Internal units tend to grow powers no one voted for — decay, caps, transferability, governance weight — unless each property is nailed down in writing. Listing issuance, transfer rules, privacy, and explicit non-governance status makes the units tools of recognition rather than quiet shadow currencies.

</details>

<details>
<summary>How to fill this in</summary>

If your community uses internal units (XP, ECO, credits, etc.), define each unit's purpose, issuance, transferability, decay, cap, fraud prevention, and privacy. Explicitly state that units do not grant governance rights beyond the membership state.

</details>

| Property | _<Unit A>_ | _<Unit B>_ |
|---|---|---|
| **Purpose** | _<...>_ | _<...>_ |
| **Issuance** | _<...>_ | _<...>_ |
| **Transferability** | _<...>_ | _<...>_ |
| **Expiration / decay** | _<...>_ | _<...>_ |
| **Hard cap** | _<...>_ | _<...>_ |
| **Fraud prevention** | _<...>_ | _<...>_ |
| **Privacy** | _<...>_ | _<...>_ |

> Internal units do not grant governance rights beyond what the membership state defines.

## Accumulation Constraints

*RCOS clauses: [5.4.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.4.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.4.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.4.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.6.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details>
<summary>Why constrain accumulation at all?</summary>

Any internal unit that can pile up without limit eventually becomes leverage — a few members with large balances gain informal sway the governance system never granted them. Stating accumulation rules explicitly, even when the current rule is "none yet," keeps the question open and forces a visible decision before concentration becomes a structural problem.

</details>

<details>
<summary>How to fill this in</summary>

State the current accumulation rule (cap, decay, none) and the rule that no internal unit may be converted into governance authority.

</details>

- _<Hard cap on internal units, if any.>_
- _<Decay rule, if any.>_
- _<Internal units cannot be converted into governance authority or used to bypass the Decision Matrix.>_

## External Income Interfaces

*RCOS clauses: [5.3.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details>
<summary>Why require approval before money arrives?</summary>

Once funds are in hand, the conversation shifts from "should we accept this?" to "what do we do with it?" — and the conditions attached to the income (grant terms, partnership obligations, service commitments) are often already locked in. Requiring a Strategic decision before any new income channel opens keeps the community in control of what it takes on.

</details>

<details>
<summary>How to fill this in</summary>

List current declared income channels, name potential future channels, and require Strategic approval before any new channel is opened.

</details>

- _<Current income channels.>_
- _<Potential future income channels.>_
- _<Rule: any new external income interface must be declared and approved via a Strategic decision before funds are received or commitments made.>_

## Dispute Resolution for Economic Records

<details>
<summary>Why time-box economic disputes?</summary>

Contribution and balance records accumulate fast; if disputes could be raised indefinitely, the ledger would never settle and every historical credit would stay contestable. A defined window with a named resolver and an appeal path gives members a real chance to correct errors without leaving the whole economic history perpetually unstable.

</details>

<details>
<summary>How to fill this in</summary>

State the dispute window, named resolver, and appeal path. Reference the Contribution Recognition Mechanism for the full process.

</details>

_<Window for contesting a contribution record or balance; named resolver; appeal path to Full Members via the governance process.>_

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Strategic
- **Version:** <version>
- **Decision record:** <link to decision record>
