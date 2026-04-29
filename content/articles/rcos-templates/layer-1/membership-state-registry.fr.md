---
id: b6d4e7f9
title: Registre des états de membre
parentId: 2c750c19
order: 3
lang: fr
sourceHash: b23f1b91
---

- **Couche :** 1 — Système de membres
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§3.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [§3.8](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## États de membre définis

*Clauses RCOS : [3.1.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>Pourquoi un tableau unique des états ?</summary>

Les droits et obligations dispersés dans plusieurs documents finissent par diverger. Rassembler chaque état, ses droits, ses obligations et ses transitions dans un seul tableau rend le système de membres vérifiable d'un coup d'œil — tu peux voir chaque porte d'entrée et de sortie de la communauté, et ce que chacune accorde. Si deux documents se contredisent, ce registre fait foi.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis chaque état de membre que ta communauté reconnaît (par ex. Candidat·e, Membre en période d'essai, Membre à part entière, Membre sorti·e). Pour chacun, liste les droits, les obligations, la condition d'entrée et la condition de sortie. Les états doivent être mutuellement exclusifs — aucune personne ne peut détenir deux états simultanément.

</details>

| État | Droits | Obligations | Condition d'entrée | Condition de sortie |
|---|---|---|---|---|
| _<État 1, par ex. Candidat·e>_ | _<droits>_ | _<obligations>_ | _<entrée>_ | _<sortie>_ |
| _<État 2, par ex. Membre en période d'essai>_ | _<droits>_ | _<obligations>_ | _<entrée>_ | _<sortie>_ |
| _<État 3, par ex. Membre à part entière>_ | _<droits>_ | _<obligations>_ | _<entrée>_ | _<sortie>_ |
| _<État 4, par ex. Membre sorti·e>_ | _<droits>_ | _<obligations>_ | _<entrée>_ | _<sortie>_ |

> Aucune personne ne peut détenir plusieurs états de membre simultanément.
> Aucun droit ni obligation ne peut être assumé en dehors de l'état de membre actuel de la personne.

## Notes techniques

<details data-kind="rationale">
<summary>Pourquoi conserver les données après la sortie ?</summary>

L'historique de la communauté appartient à la communauté, pas à un compte individuel. Conserver les traces de contribution après la sortie protège l'intégrité des pistes d'audit, de l'historique de gouvernance et de la comptabilité de reconnaissance — tout en respectant le caractère définitif du départ par la révocation des accès et le retrait de la personne des listes actives.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Décris quels enregistrements sont conservés après la sortie, où les affectations d'état sont suivies opérationnellement, et comment la révocation d'accès interagit avec les capacités de la plateforme.

</details>

- _<Historique des contributions et de la gouvernance conservé après la sortie ; décris la politique de conservation.>_
- _<Les membres sorti·e·s sont retirés des listes de membres actifs ; décris la révocation d'accès par plateforme.>_
- _<Emplacement opérationnel des affectations d'état — voir « Liste actuelle des membres » ci-dessous.>_

## Liste actuelle des membres

*Clauses RCOS : [3.8.2](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi séparer la définition de la liste ?</summary>

Ce document définit ce que les états signifient ; le registre opérationnel suit qui se trouve dans quel état aujourd'hui. Les séparer permet de garder les définitions stables et gouvernables tandis que les affectations restent à jour — et personne n'a besoin de modifier un artefact ratifié à chaque fois qu'un·e membre rejoint ou quitte la communauté.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique un lien vers le système ou le document opérationnel où les affectations membre-état actuelles sont suivies. Cet artefact ne devrait pas avoir besoin d'être modifié à chaque fois qu'un·e membre rejoint ou quitte la communauté.

</details>

> La liste des membres est maintenue dans _<système / emplacement>_. Ce document définit les états ; l'outil de registre contient les affectations actuelles.

_<Lien ou emplacement du répertoire des membres.>_

---

## Procès-verbal de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Stratégique
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
