---
id: 2c71be9d
title: Modules RCOS
parentId: null
order: 3
lang: fr
sourceHash: a43538c6
---

## Modules

Les modules sont des extensions optionnelles et spécifiques à un domaine du RCOS Core. Ils permettent aux communautés d'ajouter de la structure là où c'est nécessaire, sans surcharger le système central ni imposer une uniformité entre différents contextes.

Le RCOS est intentionnellement minimal en son cœur. Les modules existent pour soutenir la diversité des objectifs, d'échelle, d'écologie, de culture et de pratique, tout en préservant un socle structurel commun.

### Ce que sont les modules

Les modules sont :
- Des extensions optionnelles du RCOS Core
- Explicitement adoptés et documentés
- Limités à des domaines ou pratiques spécifiques
- Compatibles avec la conformité RCOS
- Conçus pour être composables et supprimables

Un module peut introduire :
- Des règles ou contraintes supplémentaires
- De nouveaux artefacts ou registres
- Des rôles spécialisés ou des domaines de décision
- Des garanties ou invariants supplémentaires dans son périmètre

### Ce que les modules ne sont pas

Les modules ne sont pas :
- Requis pour la conformité au RCOS Core
- Des attentes ou normes implicites
- Des couches de gouvernance cachées
- Des bonnes pratiques universelles
- Des substituts aux couches du RCOS Core

Si un module n'est pas explicitement adopté, il NE DOIT PAS être considéré comme applicable.

### Relation avec le RCOS Core

Les modules :
- NE DOIVENT PAS contredire l'objectif, le périmètre ou les invariants de la Couche 0
- DOIVENT respecter les contraintes de gouvernance définies dans la Couche 2
- DOIVENT s'intégrer aux artefacts et mécanismes de décision existants
- PEUVENT étendre ou spécialiser les règles des Couches 3 à 6 dans leur périmètre déclaré

Les modules ne peuvent pas outrepasser les invariants fondamentaux. Lorsqu'un module introduit des règles plus strictes, ces règles ne s'appliquent que dans le domaine déclaré du module.

### À qui s'adressent les modules

Les modules sont destinés aux :
- Communautés ayant des besoins opérationnels ou écologiques spécifiques
- Projets nécessitant une structure supplémentaire dans un domaine
- Communautés à différents stades de maturité
- Groupes expérimentant dans des conditions sûres et délimitées

Les modules permettent :
- Aux petites communautés de rester simples
- Aux communautés complexes d'ajouter de la structure progressivement
- Aux communautés diverses de rester interopérables

### Quand appliquer des modules

Un module DEVRAIT être envisagé quand :
- Un domaine devient critique pour la survie ou l'identité de la communauté
- Des pratiques informelles commencent à créer de l'ambiguïté ou un déséquilibre de pouvoir
- Des conflits récurrents émergent dans un domaine spécifique
- Des systèmes externes (juridiques, écologiques, financiers) introduisent des risques
- La communauté acquiert la capacité et la stabilité nécessaires pour supporter davantage de structure

Un module NE DEVRAIT PAS être appliqué :
- Pour compenser des défaillances de gouvernance fondamentale non résolues
- Pour imposer des valeurs sans consentement explicite
- Comme substitut à la résolution de conflits
- Quand la communauté n'a pas la capacité de le maintenir

### Comment les modules sont appliqués

Pour appliquer un module, une communauté DOIT :
- Adopter explicitement le module par une décision autorisée
- Déclarer le périmètre et les interfaces du module
- Créer ou adopter les artefacts requis
- Attribuer la responsabilité de propriété et de maintenance
- Documenter comment le module interagit avec les règles existantes

Les modules PEUVENT être :
- Limités dans le temps
- Expérimentaux
- Adoptés progressivement
- Partiellement mis en œuvre, si cela est explicitement défini

### Cycle de vie des modules

Les modules suivent les mêmes règles d'évolution que le cœur du système :
- Adoption par la gouvernance formelle
- Versionnage et documentation
- Revue périodique
- Modification ou suppression par des processus de changement définis

Un module PEUT être supprimé si :
- Son domaine n'est plus pertinent
- Il introduit une charge disproportionnée
- Il entre en conflit avec des règles fondamentales mises à jour
- La communauté choisit explicitement de simplifier

### Principe de conception

Les modules existent pour répondre à une seule question :

> « Où avons-nous besoin de plus de structure que ce que le cœur fournit — et pourquoi ? »

Ils permettent aux communautés de croître **en capacité sans croître dans le chaos**, tout en maintenant le RCOS Core stable, minimal et interopérable.
