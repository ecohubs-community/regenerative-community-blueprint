---
id: aac2e91b
title: Garde-fous
parentId: null
order: 6
lang: fr
sourceHash: '80540912'
---

## Garde-fous

Les garde-fous sont des modules optionnels et non normatifs conçus pour protéger les communautés contre les **modes de défaillance connus à haut risque** qui provoquent de manière récurrente l'effondrement, la captation ou des dommages irréversibles.

Contrairement aux couches fondamentales du RCOS, les garde-fous ne sont **pas requis pour la conformité**. Ils sont adoptés intentionnellement lorsqu'une communauté reconnaît qu'un domaine de risque spécifique s'applique à son contexte.

Les garde-fous existent parce que certaines défaillances :
- surviennent rarement mais de manière catastrophique,
- traversent plusieurs couches du système,
- ne peuvent pas être réparées une fois déclenchées,
- sont souvent sous-estimées jusqu'à ce qu'il soit trop tard.

### Ce que sont les garde-fous

Les garde-fous sont :
- Des extensions optionnelles du RCOS Core
- Explicites et documentés
- Défensifs par conception
- Axés sur la contrainte, non sur l'optimisation
- Activés par une adoption formelle

Les garde-fous, typiquement :
- Introduisent des contraintes supplémentaires
- Exigent des artefacts nouveaux ou modifiés
- Renforcent les règles de sortie, de transfert ou d'autorité
- Réduisent la flexibilité en échange de la résilience

### Ce que les garde-fous ne sont pas

Les garde-fous ne sont pas :
- Des positions morales obligatoires
- Des prescriptions culturelles ou idéologiques
- Des substituts aux processus de gouvernance ou de conflit
- Des normes informelles ou des « règles tacites »

Si un garde-fou n'est pas explicitement adopté, il NE DOIT PAS être considéré comme applicable.

### Quand les garde-fous sont appropriés

Un garde-fou est approprié lorsque :
- Une défaillance serait irréversible (par ex. perte de terrain, captation juridique)
- L'impact s'étend sur plusieurs couches (gouvernance, économie, adhésion)
- La sortie deviendrait impossible ou punitive
- Le pouvoir ou les actifs pourraient se concentrer silencieusement
- Des systèmes juridiques ou financiers externes interagissent avec la communauté

### Exemples de domaines de garde-fous

Les domaines courants de garde-fous incluent :
- Terrain et communs — anti-privatisation
- Contraintes de pouvoir des fondateurs ou investisseurs
- Limitations du capital externe et de l'endettement
- Sécurité et protection des enfants
- Encadrement des pouvoirs d'urgence
- Protection en cas de succession et de dissolution

### Relation avec les artefacts

Les garde-fous ne sont **pas eux-mêmes des artefacts**.

Cependant, une fois adopté, un garde-fou PEUT :
- Exiger de nouveaux artefacts
- Modifier des artefacts existants
- Ajouter des contraintes aux invariants de la Couche 0
- Introduire des cas de test supplémentaires pour la conformité

Ces artefacts dérivés ne sont requis que **tant que le garde-fou est actif**.

### Principe de conception

Les garde-fous existent pour répondre clairement à une seule question :

> « Qu'est-ce qui est si dangereux ici que nous devons nous imposer des limites à l'avance ? »

Ils échangent l'optionnalité contre la capacité de survie.

Les communautés sont encouragées à adopter les garde-fous de manière précoce plutôt que rétroactive, car la plupart des garde-fous perdent leur efficacité une fois qu'un mode de défaillance a déjà commencé.
