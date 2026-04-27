**RCOS — Regenerative Community Operating System**

# Decision Matrix

- **Generated:** 2026-04-27
- **Source (latest version):** [https://blueprint.ecohubs.community/articles/rcos-templates/layer-2/decision-matrix](https://blueprint.ecohubs.community/articles/rcos-templates/layer-2/decision-matrix)
- **All RCOS templates:** [https://blueprint.ecohubs.community/articles/rcos-templates](https://blueprint.ecohubs.community/articles/rcos-templates)

---
- **Layer:** 2 — Governance & Decision Logic
- **Status:** Template — adapt for your community
- **RCOS reference:** [§4.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [§4.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [§4.7](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Maps every decision type and domain to an authorized role or body, mechanism, threshold, and escalation path. Decisions made outside this matrix are considered invalid.

---

## Voting Principles

*RCOS clauses: [4.2.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms)*

<details>
<summary>Why pin down mechanism, threshold, and timing?</summary>

A vote without a predefined mechanism, threshold, and deliberation window is an invitation to manufacture outcomes after the fact — whoever counts the votes or sets the clock wins. Declaring these parameters in advance makes every collective decision reproducible and contestable on the same terms, regardless of who is in the room.

</details>

<details>
<summary>How to fill this in</summary>

State the voting platform, the threshold for each decision type, the deliberation period, the tie rule, the re-vote rule, and any delegated-authority spending or scope limit.

</details>

- **Voting platform:** _<e.g. Snapshot, Loomio, in-person consensus.>_
- **Operational threshold:** _<e.g. no vote required — delegated to the relevant operational role holder per the Role Registry.>_
- **Strategic threshold:** _<e.g. simple majority (>50%); minimum X-day deliberation.>_
- **Constitutional threshold:** _<e.g. supermajority (≥⅔); minimum Y-day deliberation; Z-day ratification period.>_
- **Tied vote:** _<e.g. proposal fails; status quo maintained.>_
- **Re-vote:** _<e.g. any Full Member may trigger a re-vote with a written reasoned objection citing a consideration not addressed during deliberation.>_
- **Reasoned objection:** _<define what qualifies as a reasoned objection — cite a specific consideration not raised during deliberation; general disagreement does not qualify.>_
- **Delegated authority spending limit:** _<e.g. €0; or define a threshold under which delegated spending is allowed.>_
- _<Other voting principles your community wants to declare.>_

---

## Matrix

*RCOS clauses: [4.4.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix)*

<details>
<summary>Why a single authoritative matrix?</summary>

If the rules for who decides what live in people's heads, authority becomes whatever the loudest or most senior person says it is. A public matrix that binds every decision to a domain, body, mechanism, and threshold makes out-of-scope action visible the moment it happens — and makes any decision made outside it invalid by construction.

</details>

<details>
<summary>How to fill this in</summary>

For each decision domain (membership, treasury, platform, partnerships, governance, etc.), set the decision type, the authorized body, who is eligible to participate, the mechanism, threshold, blocking conditions, and escalation path.

</details>

| Decision Domain | Decision Type | Authorized Body | Eligible Participants | Mechanism | Threshold | Blocking / Veto conditions | Escalation |
|---|---|---|---|---|---|---|---|
| _<e.g. Membership admission>_ | _<Operational / Strategic / Constitutional>_ | _<role or body>_ | _<who participates>_ | _<vote / delegated>_ | _<threshold>_ | _<blocking conditions>_ | _<escalation path>_ |
| _<e.g. Treasury spending — small>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<e.g. Treasury spending — large>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<e.g. Governance rule changes>_ | _<Constitutional>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<e.g. Primary purpose / invariant changes>_ | _<Constitutional>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> **Operational role holders:** Each operational decision is executed by the named role holder responsible for that domain, acting within their defined scope per the Role Registry (Layer 5). Where a decision spans multiple domains, each role holder acts within their own scope.

## Decision Type Definitions

*RCOS clauses: [4.1.1](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.2](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.3](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.4](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.5](https://blueprint.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types)*

<details>
<summary>Why classify every decision?</summary>

Without a type, every decision gets handled at whatever speed and scrutiny happens to suit the moment — routine changes stall in debate, and constitutional shifts slip through unnoticed. Fixed types tie the weight of a decision to the process it must pass through, and the default-higher rule closes the gap where ambiguity would otherwise be exploited.

</details>

<details>
<summary>How to fill this in</summary>

Define each decision type by what it covers, who executes it, what process it requires, and how disputes about classification are resolved.

</details>

- **Operational** — _<day-to-day functioning within existing rules; executed by the relevant role holder without a vote.>_
- **Strategic** — _<long-term direction, significant resource allocation, creation/removal of major structures; requires a Full Member vote with a defined deliberation period.>_
- **Constitutional** — _<changes to Layer 0 (purpose, scope, invariants) or to the governance system itself; requires a Full Member vote, supermajority, and a ratification period.>_

> If a decision cannot be clearly classified, it defaults to the higher-impact type.

---

## Ratification Record

- **Adopted:** <YYYY-MM-DD>
- **Decision type:** Constitutional
- **Version:** <version>
- **Decision record:** <link to decision record>
