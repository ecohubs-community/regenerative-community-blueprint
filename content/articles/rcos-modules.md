---
id: 2c71be9d
title: RCOS Modules
parentId: null
order: 0
---

## Modules

Modules are optional, domain-specific extensions to the RCOS Core. They allow communities to add structure where needed without overloading the core system or forcing uniformity across different contexts.

RCOS is intentionally minimal at its core. Modules exist to support diversity of purpose, scale, ecology, culture, and practice while preserving a shared structural foundation.

### What Modules Are

Modules are:
- Optional extensions to RCOS Core
- Explicitly adopted and documented
- Scoped to specific domains or practices
- Compatible with RCOS compliance
- Designed to be composable and removable

A module may introduce:
- Additional rules or constraints
- New artifacts or registries
- Specialized roles or decision domains
- Additional safeguards or invariants within its scope

### What Modules Are Not

Modules are not:
- Required for RCOS-Core compliance
- Implicit expectations or norms
- Hidden governance layers
- Universal best practices
- Substitutes for RCOS Core layers

If a module is not explicitly adopted, it MUST NOT be assumed to apply.

### Relationship to RCOS Core

Modules:
- MUST NOT contradict Layer 0 purpose, scope, or invariants
- MUST respect governance constraints defined in Layer 2
- MUST integrate with existing artifacts and decision mechanisms
- MAY extend or specialize rules in Layers 3–6 within their declared scope

Modules cannot override core invariants. Where a module introduces stricter rules, those rules apply only within the module’s declared domain.

### Who Modules Are For

Modules are intended for:
- Communities with specific operational or ecological needs
- Projects that require additional structure in one domain
- Communities at different maturity stages
- Groups experimenting within safe, bounded conditions

Modules allow:
- Small communities to stay simple
- Complex communities to add structure incrementally
- Diverse communities to remain interoperable

### When to Apply Modules

A module SHOULD be considered when:
- A domain becomes critical to community survival or identity
- Informal practices begin creating ambiguity or power imbalance
- Repeated conflicts emerge in a specific area
- External systems (legal, ecological, financial) introduce risk
- The community gains capacity and stability to support more structure

A module SHOULD NOT be applied:
- To compensate for unresolved core governance failures
- To enforce values without explicit consent
- As a substitute for conflict resolution
- When the community lacks capacity to maintain it

### How Modules Are Applied

To apply a module, a community MUST:
- Explicitly adopt the module through an authorized decision
- Declare the module’s scope and interfaces
- Create or adopt required artifacts
- Assign ownership and maintenance responsibility
- Document how the module interacts with existing rules

Modules MAY be:
- Time-bounded
- Experimental
- Gradually adopted
- Partially implemented, if explicitly defined

### Module Lifecycle

Modules follow the same evolution rules as the core:
- Adoption through formal governance
- Versioning and documentation
- Periodic review
- Modification or removal through defined change processes

A module MAY be removed if:
- Its domain is no longer relevant
- It introduces disproportionate overhead
- It conflicts with updated core rules
- The community explicitly chooses to simplify

### Design Principle

Modules exist to answer one question:

> “Where do we need more structure than the core provides — and why?”

They allow communities to grow **in capability without growing in chaos**, while keeping RCOS Core stable, minimal, and interoperable.