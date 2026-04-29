---
id: 4885248e
title: Matrice de décision
parentId: b7e62f01
order: 0
lang: fr
sourceHash: c8735d68
---

- **Couche :** 2 — Gouvernance et logique de décision
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [§4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [§4.7](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Associe chaque type et domaine de décision à un rôle ou organe autorisé, un mécanisme, un seuil et un chemin d'escalade. Toute décision prise en dehors de cette matrice est considérée comme invalide.

---

## Principes de vote

*Clauses RCOS : [4.2.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms)*

<details data-kind="rationale">
<summary>Pourquoi fixer le mécanisme, le seuil et le calendrier ?</summary>

Un vote sans mécanisme, seuil et délai de délibération prédéfinis est une invitation à fabriquer des résultats après coup — celui qui compte les votes ou fixe l'horloge gagne. Déclarer ces paramètres à l'avance rend chaque décision collective reproductible et contestable selon les mêmes conditions, indépendamment de qui est présent.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique la plateforme de vote, le seuil pour chaque type de décision, la période de délibération, la règle en cas d'égalité, la règle de revote et toute limite de dépense ou de périmètre en cas d'autorité déléguée.

</details>

- **Plateforme de vote :** _<p. ex. Snapshot, Loomio, consensus en présentiel.>_
- **Seuil opérationnel :** _<p. ex. aucun vote requis — délégué au titulaire du rôle opérationnel concerné selon le Registre des rôles.>_
- **Seuil stratégique :** _<p. ex. majorité simple (>50 %) ; délibération minimale de X jours.>_
- **Seuil constitutionnel :** _<p. ex. supermajorité (≥⅔) ; délibération minimale de Y jours ; période de ratification de Z jours.>_
- **Égalité des votes :** _<p. ex. la proposition échoue ; le statu quo est maintenu.>_
- **Revote :** _<p. ex. tout Membre titulaire PEUT déclencher un revote par une objection motivée écrite citant un point non abordé pendant la délibération.>_
- **Objection motivée :** _<définis ce qui constitue une objection motivée — citer un point précis non soulevé pendant la délibération ; un désaccord général ne suffit pas.>_
- **Limite de dépense en autorité déléguée :** _<p. ex. 0 € ; ou définis un seuil en dessous duquel la dépense déléguée est autorisée.>_
- _<Autres principes de vote que ta communauté souhaite déclarer.>_

---

## Matrice

*Clauses RCOS : [4.4.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix)*

<details data-kind="rationale">
<summary>Pourquoi une matrice unique faisant autorité ?</summary>

Si les règles qui déterminent qui décide de quoi ne vivent que dans la tête des gens, l'autorité devient ce que la personne la plus bruyante ou la plus ancienne dit qu'elle est. Une matrice publique qui lie chaque décision à un domaine, un organe, un mécanisme et un seuil rend toute action hors périmètre visible dès qu'elle se produit — et rend invalide par construction toute décision prise en dehors d'elle.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque domaine de décision (adhésion, trésorerie, plateforme, partenariats, gouvernance, etc.), définis le type de décision, l'organe autorisé, les personnes éligibles à participer, le mécanisme, le seuil, les conditions de blocage et le chemin d'escalade.

</details>

| Domaine de décision | Type de décision | Organe autorisé | Participants éligibles | Mécanisme | Seuil | Conditions de blocage / veto | Escalade |
|---|---|---|---|---|---|---|---|
| _<p. ex. Admission de membres>_ | _<Opérationnel / Stratégique / Constitutionnel>_ | _<rôle ou organe>_ | _<qui participe>_ | _<vote / délégué>_ | _<seuil>_ | _<conditions de blocage>_ | _<chemin d'escalade>_ |
| _<p. ex. Dépenses de trésorerie — petites>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ex. Dépenses de trésorerie — grandes>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ex. Modifications des règles de gouvernance>_ | _<Constitutionnel>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ex. Modifications de la mission principale / des invariants>_ | _<Constitutionnel>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> **Titulaires de rôles opérationnels :** Chaque décision opérationnelle est exécutée par le titulaire de rôle responsable du domaine concerné, agissant dans le périmètre défini selon le Registre des rôles (Couche 5). Lorsqu'une décision couvre plusieurs domaines, chaque titulaire de rôle agit dans son propre périmètre.

## Définitions des types de décision

*Clauses RCOS : [4.1.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.5](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types)*

<details data-kind="rationale">
<summary>Pourquoi classifier chaque décision ?</summary>

Sans type, chaque décision est traitée à la vitesse et avec le niveau de scrutin qui convient sur le moment — les changements de routine s'enlisent dans des débats, et les modifications constitutionnelles passent inaperçues. Des types fixes lient le poids d'une décision au processus qu'elle DOIT traverser, et la règle du défaut vers le haut comble la faille que l'ambiguïté permettrait autrement d'exploiter.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis chaque type de décision en précisant ce qu'il couvre, qui l'exécute, quel processus il requiert et comment les litiges de classification sont résolus.

</details>

- **Opérationnel** — _<fonctionnement quotidien dans le cadre des règles existantes ; exécuté par le titulaire du rôle concerné sans vote.>_
- **Stratégique** — _<orientation à long terme, allocation significative de ressources, création/suppression de structures majeures ; requiert un vote des Membres titulaires avec une période de délibération définie.>_
- **Constitutionnel** — _<modifications de la Couche 0 (mission, périmètre, invariants) ou du système de gouvernance lui-même ; requiert un vote des Membres titulaires, une supermajorité et une période de ratification.>_

> Si une décision ne PEUT pas être clairement classifiée, elle est traitée par défaut selon le type à impact le plus élevé.

---

## Registre de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Constitutionnel
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
