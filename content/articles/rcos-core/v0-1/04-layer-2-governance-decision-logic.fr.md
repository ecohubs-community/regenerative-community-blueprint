---
id: 4563b1af
title: 4. Couche 2 — Gouvernance & logique de décision
parentId: e6de7a5d
order: 40
lang: fr
sourceHash: 3bd40d24
---

La Couche 2 définit comment les décisions collectives sont prises, qui est autorisé à les prendre et comment l'autorité est encadrée. La gouvernance sous RCOS est conçue pour rendre le pouvoir explicite, limité, révisable et réversible.

## 4.1 Types de décisions

4.1.1 Toutes les décisions collectives DOIVENT être classifiées dans exactement un des types de décision suivants :
- Décisions opérationnelles
- Décisions stratégiques
- Décisions constitutionnelles

4.1.2 Les décisions opérationnelles concernent le fonctionnement quotidien et l'exécution dans le cadre des règles existantes.

4.1.3 Les décisions stratégiques concernent l'orientation à long terme, l'allocation de ressources significatives ou la création/suppression de structures majeures.

4.1.4 Les décisions constitutionnelles concernent les modifications des invariants de la Couche 0, de la finalité, du périmètre ou du système de gouvernance lui-même.

4.1.5 Si une décision ne peut pas être clairement classifiée, elle DOIT être traitée par défaut selon le type de décision à plus fort impact.

## 4.2 Mécanismes de décision

4.2.1 Chaque type de décision DOIT disposer d'un mécanisme de prise de décision explicitement défini.

4.2.2 Les mécanismes de décision PEUVENT inclure, sans s'y limiter :
- Prise de décision par consentement
- Vote à la majorité
- Vote à la supermajorité
- Autorité déléguée
- Attribution aléatoire ou par rotation

4.2.3 Les mécanismes de décision DOIVENT spécifier :
- Les participants éligibles
- Les seuils de décision
- Les conditions de blocage ou de veto, le cas échéant
- Les contraintes de temps

4.2.4 Aucun mécanisme de décision informel ou ad hoc NE PEUT être utilisé pour les décisions collectives.

## 4.3 Limites de l'autorité

4.3.1 Toute autorité DOIT être attribuée à des rôles, cercles ou organes explicitement définis.

4.3.2 Les attributions d'autorité DOIVENT inclure :
- Le périmètre de l'autorité
- Les limites de l'autorité
- La durée ou le mandat, le cas échéant

4.3.3 Aucun individu ou organe NE PEUT exercer une autorité en dehors du périmètre qui lui a été explicitement attribué.

4.3.4 L'autorité NE DOIT PAS découler du charisme, de l'ancienneté, de la propriété ou d'une influence informelle.

4.3.5 L'autorité temporaire ou d'urgence DOIT être explicitement définie, limitée dans le temps et soumise à révision.

## 4.4 Matrice de décision

4.4.1 La communauté DOIT maintenir une matrice de décision en tant qu'artefact de gouvernance central.

4.4.2 La matrice de décision DOIT cartographier, au minimum :
- Le type de décision
- Le domaine de décision
- Le rôle ou organe autorisé
- Le mécanisme de décision
- Le seuil d'approbation
- Le chemin d'escalade

4.4.3 La matrice de décision DOIT être publiquement accessible à tous les membres.

4.4.4 Les décisions prises en dehors de la matrice de décision DOIVENT être considérées comme invalides.

## 4.5 Protocole de gouvernance

4.5.1 La communauté DOIT définir un protocole de gouvernance décrivant le cycle de vie complet d'une décision.

4.5.2 Le protocole de gouvernance DOIT inclure :
- Les exigences de soumission de proposition
- Le processus d'examen et de délibération
- L'exécution de la décision
- La documentation et la publication
- Les mécanismes d'appel et de révision

4.5.3 Le protocole de gouvernance DOIT définir comment les conflits entre décisions sont résolus.

4.5.4 Toutes les actions de gouvernance DOIVENT être documentées conformément aux règles de documentation de la Couche 5.

## 4.6 Garde-fous et modes de défaillance

4.6.1 Le système de gouvernance DOIT inclure des garde-fous contre :
- La concentration du pouvoir décisionnel
- Les vetos informels
- La capture de décisions par des sous-groupes
- L'enracinement de fondateurs ou de rôles

4.6.2 Les mécanismes de gouvernance DOIVENT permettre la contestation et la révision sans représailles.

4.6.3 Les défaillances persistantes de gouvernance DOIVENT déclencher un processus formel de révision ou un processus constitutionnel.

## 4.7 Artefacts

4.7.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 2 :
- Matrice de décision
- Protocole de gouvernance
- Registre des autorités

4.7.2 Les artefacts de la Couche 2 DOIVENT être :
- Explicites et non ambigus
- Versionnés
- Accessibles à tous les membres

4.7.3 L'absence, l'ambiguïté ou la violation systématique des artefacts de la Couche 2 DOIT entraîner la perte de la conformité RCOS-Core.
