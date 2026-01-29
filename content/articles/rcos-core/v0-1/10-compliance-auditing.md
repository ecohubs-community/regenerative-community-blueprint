---
id: 69b4c289
title: 10. Compliance & Auditing
parentId: e6de7a5d
order: 100
---

This chapter defines how RCOS-Core compliance is assessed and maintained.

## 10.1 Compliance Checklist

10.1.1 RCOS-Core compliance is binary: a community is either compliant or non-compliant.

10.1.2 Compliance MUST be evaluated per layer (Layers 0–6).

10.1.3 For each layer, the Compliance Checklist MUST verify:
- Presence of mandatory artifacts  
- Explicitness and accessibility of required rules  
- Adoption through authorized governance processes  

10.1.4 Partial compliance or “intent to comply” MUST NOT be considered compliant.

10.1.5 Optional Modules MUST NOT be included in RCOS-Core compliance evaluation.

## 10.2 Test Cases

10.2.1 Test Cases are structured scenarios used to validate whether RCOS mechanisms behave as intended.

10.2.2 Test Cases MAY be:
- Hypothetical scenarios  
- Historical community failures  
- Simulated stress tests  

10.2.3 Test Cases SHOULD cover, at minimum:
- Power concentration attempts  
- Exit and separation scenarios  
- Governance deadlock  
- Economic capture attempts  
- Safety-critical conflicts  

10.2.4 Test Cases are informative but SHOULD be used during audits, onboarding, and periodic reviews.

## 10.3 Non-Compliance

10.3.1 A community MUST be considered non-compliant if:
- Any mandatory artifact is missing  
- Layer 0 invariants are violated  
- Decisions are repeatedly made outside authorized governance structures  
- Exit is blocked or informally constrained  

10.3.2 Non-compliance MUST be explicitly acknowledged once detected.

10.3.3 A community MAY regain compliance only through:
- Corrective action  
- Formal adoption of missing or corrected artifacts  
- Documentation of remediation  

10.3.4 Claims of RCOS compliance MUST be withdrawn during periods of known non-compliance.
