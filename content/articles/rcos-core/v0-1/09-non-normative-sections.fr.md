---
id: f12d5320
title: 9. Sections non normatives
parentId: e6de7a5d
order: 90
lang: fr
sourceHash: f8f55d53
---

Les sections de ce chapitre sont **informatives**, et non normatives.
Elles ne définissent pas d'exigences de conformité, mais fournissent des orientations, du contexte, des exemples et un support d'apprentissage pour les communautés, les personnes chargées de la mise en œuvre, les auditeurs et les gardiens du standard.

Rien dans cette section ne peut supplanter ou affaiblir les exigences définies dans les Couches 0 à 6.

## 9.1 Modules optionnels

9.1.1 Les modules optionnels sont des extensions spécifiques à un domaine qui s'appuient sur le RCOS-Core sans modifier ses couches obligatoires.

9.1.2 Les modules optionnels DOIVENT :
- Déclarer quelles couches RCOS ils étendent ou dont ils dépendent
- Indiquer explicitement tout rôle, règle ou artefact supplémentaire qu'ils introduisent
- NE PAS supplanter ou contredire les invariants de la Couche 0 ou les exigences du RCOS-Core

9.1.3 Les modules optionnels PEUVENT définir :
- Des pratiques spécifiques à un domaine
- Des contraintes ou standards supplémentaires
- Des modèles de gouvernance ou opérationnels spécialisés

9.1.4 Les domaines typiques des modules optionnels PEUVENT inclure, sans s'y limiter :
- La permaculture et la gestion régénérative des terres
- Les systèmes éducatifs alternatifs ou communautaires
- Les pratiques de santé, de soin et de bien-être
- Les pratiques culturelles ou spirituelles
- Les spécialisations économiques (par ex. coopératives, fiducies foncières, crédit mutuel)

9.1.5 L'adoption de modules optionnels DOIT suivre les mécanismes de changement définis dans la Couche 6.

9.1.6 Une communauté PEUT être conforme au RCOS-Core sans adopter aucun module optionnel.

## 9.2 Implémentations de référence

9.2.1 Une implémentation de référence est une communauté réelle qui documente publiquement la manière dont elle applique le RCOS-Core.

9.2.2 Les implémentations de référence sont **descriptives**, et non prescriptives.
Elles illustrent comment le RCOS peut être instancié, et non comment il doit l'être.

9.2.3 Une communauté PEUT se revendiquer comme implémentation de référence RCOS uniquement si elle :
- Est conforme au RCOS-Core
- Documente publiquement ses artefacts des Couches 0 à 6
- Indique clairement les écarts, expérimentations ou extensions

9.2.4 La documentation d'une implémentation de référence DEVRAIT inclure :
- Le contexte et l'échelle (taille, localisation, finalité)
- Les modules optionnels adoptés
- Les défis et échecs connus
- L'historique d'évolution et les adaptations majeures

9.2.5 Les implémentations de référence NE DOIVENT PAS être considérées comme des interprétations faisant autorité du standard.

## 9.3 Modes de défaillance connus

9.3.1 Les modes de défaillance connus documentent les schémas de rupture récurrents observés dans des communautés réelles.

9.3.2 Les modes de défaillance sont des **signaux informatifs**, et non des critères de conformité.

9.3.3 Les modes de défaillance PEUVENT inclure, sans s'y limiter :
- L'accumulation informelle de pouvoir
- La domination du fondateur ou du propriétaire foncier
- La dépendance au travail invisible ou genré
- La paralysie de gouvernance ou la surcharge de réunions
- Le blocage de sortie ou la coercition douce
- La captation économique par l'endettement ou le contrôle des actifs
- L'évitement des conflits menant à une fragmentation silencieuse

9.3.4 L'objectif de la documentation des modes de défaillance est de :
- Soutenir les tests de résistance des structures RCOS
- Améliorer les décisions de conception
- Permettre une détection précoce dans les communautés en activité

9.3.5 La documentation des modes de défaillance DEVRAIT indiquer quelles couches RCOS sont destinées à atténuer le schéma concerné.
