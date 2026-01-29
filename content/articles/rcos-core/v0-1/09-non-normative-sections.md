---
id: f12d5320
title: 9. Non-Normative Sections
parentId: e6de7a5d
order: 90
---

The sections in this chapter are **informative**, not normative.  
They do not define compliance requirements but provide guidance, context, examples, and learning support for communities, implementers, auditors, and standard stewards.

Nothing in this section may override or weaken requirements defined in Layers 0–6.

## 9.1 Optional Modules

9.1.1 Optional Modules are domain-specific extensions that build on top of RCOS-Core without modifying its mandatory layers.

9.1.2 Optional Modules MUST:
- Declare which RCOS layers they extend or depend on  
- Explicitly state any additional roles, rules, or artifacts they introduce  
- NOT override or contradict Layer 0 invariants or RCOS-Core requirements  

9.1.3 Optional Modules MAY define:
- Domain-specific practices  
- Additional constraints or standards  
- Specialized governance or operational patterns  

9.1.4 Typical Optional Module domains MAY include, but are not limited to:
- Permaculture and regenerative land stewardship  
- Alternative or community-based education systems  
- Health, care, and well-being practices  
- Cultural or spiritual practices  
- Economic specializations (e.g. cooperatives, land trusts, mutual credit)  

9.1.5 Adoption of Optional Modules MUST follow the change mechanisms defined in Layer 6.

9.1.6 A community MAY be RCOS-Core compliant without adopting any Optional Modules.

## 9.2 Reference Implementations

9.2.1 A Reference Implementation is a real-world community that publicly documents how it applies RCOS-Core.

9.2.2 Reference Implementations are **descriptive**, not prescriptive.  
They illustrate how RCOS can be instantiated, not how it must be instantiated.

9.2.3 A community MAY claim to be an RCOS Reference Implementation only if it:
- Is RCOS-Core compliant  
- Publicly documents its Layer 0–6 artifacts  
- Clearly indicates deviations, experiments, or extensions  

9.2.4 Reference Implementation documentation SHOULD include:
- Context and scale (size, location, purpose)  
- Which Optional Modules are adopted  
- Known challenges and failures  
- Evolution history and major adaptations  

9.2.5 Reference Implementations MUST NOT be treated as authoritative interpretations of the standard.

## 9.3 Known Failure Modes

9.3.1 Known Failure Modes document recurring breakdown patterns observed in real communities.

9.3.2 Failure Modes are **informative signals**, not compliance criteria.

9.3.3 Failure Modes MAY include, but are not limited to:
- Informal power accumulation  
- Founder or land-owner dominance  
- Invisible or gendered labor dependency  
- Governance paralysis or meeting overload  
- Exit blockage or soft coercion  
- Economic capture through debt or asset control  
- Conflict avoidance leading to silent fragmentation  

9.3.4 The purpose of documenting Failure Modes is to:
- Support stress-testing of RCOS structures  
- Improve design decisions  
- Enable early detection in live communities  

9.3.5 Failure Mode documentation SHOULD reference which RCOS layers are intended to mitigate the pattern.
