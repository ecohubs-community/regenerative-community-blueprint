---
id: 7d1b3f2a
title: Manuel opérationnel
parentId: 2bd4d877
order: 0
lang: fr
sourceHash: cc62727f
---

- **Couche :** 5 — Opérations et coordination
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§7.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [§7.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [§7.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [§7.5](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [§7.6](/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)

---

## Processus opérationnels essentiels

*Clauses RCOS : [7.3.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.6.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi documenter les processus critiques ?</summary>

Si un processus n'existe que dans la tête d'une seule personne, la communauté dépend de la présence de cette personne — indéfiniment. Mettre par écrit les processus critiques, avec des responsables nommés, c'est ce qui transforme un savoir privé en un bien commun capable de survivre aux passations, aux absences et aux départs.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque processus critique récurrent (intégration, départ, publication de propositions, enregistrement des contributions, cadence des réunions, gestion de la trésorerie, revue des accès aux plateformes), nomme un·e responsable et fournis une brève description.

</details>

| Processus | Qui | Détail |
|---|---|---|
| _<Intégration des membres>_ | _<rôle>_ | _<voir Protocole d'intégration (Couche 1)>_ |
| _<Départ des membres>_ | _<rôle>_ | _<voir Protocole de départ et séparation (Couche 1)>_ |
| _<Publication des propositions>_ | _<rôle>_ | _<voir Protocole de gouvernance (Couche 2)>_ |
| _<Enregistrement des contributions>_ | _<rôle>_ | _<voir Protocole d'économie interne (Couche 3)>_ |
| _<Réunion récurrente>_ | _<facilitateur·rice>_ | _<publication de l'ordre du jour ; notes ; suivi des actions>_ |
| _<Gestion de la trésorerie>_ | _<intendant·e finances>_ | _<voir Règles de trésorerie (Couche 3)>_ |
| _<Revue des accès aux plateformes>_ | _<intendant·e infrastructure>_ | _<cadence de revue ; révocation des accès pour les membres sortis>_ |

## Responsabilités temporaires et ponctuelles

*Clauses RCOS : [7.1.5](/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.1.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.7.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi limiter les responsabilités temporaires dans le temps ?</summary>

Les tâches ponctuelles se transforment silencieusement en postes permanents non rémunérés — généralement portés par la personne qui a dit oui une fois. Une durée maximale stricte et une revue obligatoire font la différence entre « j'ai assuré le relais pendant une semaine » et « apparemment c'est mon rôle maintenant. »

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique que toute responsabilité temporaire DOIT être limitée dans le temps dès son attribution, documentée, revue avant expiration, puis soit formalisée soit clôturée.

</details>

Lorsqu'une tâche ou une responsabilité est attribuée temporairement, elle DOIT être :

- _<Explicitement limitée dans le temps dès le départ (date de fin spécifique ou condition d'achèvement).>_
- _<Documentée comme temporaire au moment de l'attribution.>_
- _<Revue avant la date de fin ; convertie en rôle formel ou clôturée.>_

_<Durée maximale de toute responsabilité temporaire avant qu'elle ne DOIVE être formellement attribuée ou clôturée — p. ex. 90 jours.>_ Si une responsabilité temporaire n'a plus de titulaire après sa date de fin, elle expire ; elle ne se transfère pas implicitement.

---

## Interfaces entre rôles et domaines

*Clauses RCOS : [7.6.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts), [7.3.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Pourquoi cartographier explicitement les passations ?</summary>

La plupart des défaillances opérationnelles ne surviennent pas à l'intérieur d'un rôle mais entre les rôles — aux frontières où le travail passe d'un·e responsable à l'autre. Nommer les passations transforme des dépendances invisibles en dépendances vérifiables, et prévient les échecs du type « je pensais que c'était toi qui t'en occupais ».

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque paire de rôles qui se transmettent du travail, nomme la passation et le type de travail transféré.

</details>

| De | Vers | Passation |
|---|---|---|
| _<rôle>_ | _<rôle>_ | _<ce qui est transmis>_ |
| _<rôle>_ | _<rôle>_ | _<...>_ |

## Limites de charge de travail

*Clauses RCOS : [7.4.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.7.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi rendre les limites de charge explicites ?</summary>

Une charge de coordination illimitée est le mode de défaillance par défaut des communautés bénévoles — elle épuise silencieusement les membres les plus engagés jusqu'à ce qu'ils partent. Des limites explicites et vérifiables font de la capacité une préoccupation collective plutôt qu'un fardeau individuel.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis des limites pour la charge de réunions, la charge par rôle, les attentes en termes de temps de réponse, et le processus de renégociation des responsabilités.

</details>

- **Charge de réunions :** _<cadence des réunions récurrentes et durée maximale ; règles pour les réunions extraordinaires.>_
- **Charge par rôle :** _<plafond le cas échéant ; règle pour signaler une surcharge ; délai de résolution.>_
- **Attentes en termes de temps de réponse :** _<asynchrone non urgent ; opérationnel urgent ; critique pour la sécurité.>_
- **Renégociation et allègement :** _<processus de redistribution des responsabilités ; délai de résolution.>_

## Continuité opérationnelle

*Clauses RCOS : [7.5.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity)*

<details data-kind="rationale">
<summary>Pourquoi planifier la continuité dès maintenant ?</summary>

Une communauté qui dépend d'une personne irremplaçable n'est qu'à une maladie, un conflit ou un départ de l'effondrement. Nommer honnêtement les points de défaillance uniques — et intégrer la passation dans chaque rôle — c'est ce qui permet à la communauté de survivre à ses fondateur·rices.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Nomme honnêtement les points de défaillance uniques actuels. Indique les exigences de passation pour chaque rôle et la cadence de revue de continuité.

</details>

- **État actuel :** _<liste honnête des points de défaillance uniques ; plan de recrutement pour réduire la concentration.>_
- **Mécanismes de passation :** _<référence aux exigences de passation par rôle dans le Registre des rôles ; la passation DOIT être achevée avant qu'un rôle ne soit libéré.>_
- **Cadence de revue de continuité :** _<trimestrielle ; ponctuelle lors d'un changement de rôle.>_

## Flux d'information et anti-verrouillage

*Clauses RCOS : [7.3.5](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.3.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Pourquoi traiter l'accès à l'information comme un enjeu de gouvernance ?</summary>

Quiconque contrôle l'accès à l'information contrôle la communauté, intentionnellement ou non. Rendre les règles d'accès explicites — et interdire les points d'accès uniques — c'est ce qui empêche les gardien·nes informel·les d'accumuler le type de pouvoir que le système de gouvernance est censé contrôler.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique quels registres sont accessibles à tou·tes les Membres actifs, le délai de réponse aux demandes d'information, et la règle interdisant les points d'accès uniques pour l'information pertinente à la gouvernance.

</details>

- _<Décisions de gouvernance accessibles à tou·tes les Membres actifs.>_
- _<Notes de réunion publiées dans un délai de X heures.>_
- _<État des adhésions et affectations de rôles accessibles.>_
- _<Registres de contributions accessibles.>_
- _<Délai de réponse aux demandes d'information.>_
- _<Retenir l'accès à des informations auxquelles les membres ont droit déclenche le processus de responsabilité prévu par la Couche 4.>_
- _<Aucun rôle ni individu NE PEUT être le seul point d'accès à une information requise par d'autres titulaires de rôle.>_

---

## Emplacements de la documentation et procédures de mise à jour

*Clauses RCOS : [7.3.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Pourquoi nommer l'emplacement de chaque document ?</summary>

Si personne ne peut dire où se trouve la version canonique d'un document, il n'y a pas de version canonique. Nommer l'emplacement, le ou la responsable et la cadence de revue pour chaque type de document, c'est ce qui rend la mémoire de la communauté auditable plutôt que folklorique.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque type de document, nomme l'emplacement canonique, le ou la responsable et la cadence de revue.

</details>

| Type de document | Emplacement | Responsable | Cadence de revue |
|---|---|---|---|
| _<Artefacts RCOS>_ | _<emplacement>_ | _<responsable>_ | _<cadence>_ |
| _<Registre des membres>_ | _<emplacement>_ | _<responsable>_ | _<cadence>_ |
| _<Notes de réunion>_ | _<emplacement>_ | _<responsable>_ | _<cadence>_ |
| _<Propositions de gouvernance>_ | _<emplacement>_ | _<responsable>_ | _<cadence>_ |
| _<Registres de contributions>_ | _<emplacement>_ | _<responsable>_ | _<cadence>_ |

---

## Registre de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Stratégique
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
