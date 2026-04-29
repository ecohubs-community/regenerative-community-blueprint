**RCOS — Système d'Exploitation de Communauté Régénérative**

# Protocole de responsabilisation

- **Généré:** 2026-04-29
- **Source (version la plus récente):** [https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-4/accountability-protocol](https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-4/accountability-protocol)
- **Tous les modèles RCOS:** [https://blueprint.ecohubs.community/fr/articles/rcos-templates](https://blueprint.ecohubs.community/fr/articles/rcos-templates)

---
- **Couche :** 4 — Conflit, réparation et responsabilisation
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§6.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [§6.5](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)

---

## Déclencheurs

*Clauses RCOS : [6.4.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi énumérer ce qui déclenche un contrôle de responsabilisation ?</summary>

Si les contrôles de responsabilisation ne se produisent que lorsque quelqu'un se sent suffisamment motivé pour insister, ils deviennent politiques. Nommer les déclencheurs exacts — inactivité, manquement, violation d'un invariant, renvoi — signifie que le processus démarre à partir d'une condition que n'importe qui peut vérifier, et non à partir d'un jugement sur une personne.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Liste les déclencheurs spécifiques et vérifiables qui initient un contrôle de responsabilisation. Chaque déclencheur doit être observable à partir de registres ou d'un renvoi direct.

</details>

Un contrôle de responsabilisation est initié lorsque :

1. _<Un membre n'a pas effectué de contribution reconnue pendant X mois consécutifs.>_
2. _<Un membre a manqué à une obligation de l'Accord d'adhésion.>_
3. _<Un membre a violé une contrainte d'identité ou un invariant de la Couche 0.>_
4. _<Un renvoi est effectué depuis l'Échelle de résolution des conflits (étape 3 ou supérieure).>_

## Enquête et examen

*Clauses RCOS : [6.4.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.6](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi graduer la réponse selon la gravité ?</summary>

Traiter une contribution manquée de la même façon qu'une violation d'invariant soit écrase les cas mineurs sous un processus lourd, soit laisse les cas graves passer par une simple conversation privée. Des parcours gradués — vérification informelle, avis écrit de niveau intermédiaire, escalade directe pour les manquements graves — ajustent le poids de la réponse au poids du manquement et maintiennent la réparation comme option par défaut là où la réparation est encore possible.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis les parcours léger (inactivité), intermédiaire (manquement à une obligation) et grave (violation d'invariant, sécurité). Indique qui initie le processus, le délai de réponse et la voie d'escalade pour chacun.

</details>

> **Guide de gravité des manquements :** _<intermédiaire = non-respect d'une obligation de l'Accord d'adhésion qui ne menace pas la sécurité des membres ni l'intégrité de la communauté ; grave = violation d'un invariant de la Couche 0, préoccupation crédible de sécurité, conduite persistante de mauvaise foi.>_

- **Inactivité (manquement léger) :** _<qui contacte le membre ; délai de réponse ; issues possibles.>_
- **Manquement à une obligation (intermédiaire) :** _<avis écrit ; délai de réponse ; voies de résolution / escalade.>_
- **Manquement grave / violation d'invariant :** _<escalade directe vers l'étape appropriée de l'Échelle de résolution des conflits.>_

## Garanties de procédure régulière

*Clauses RCOS : [6.4.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi expliciter les droits de notification, de réponse et d'appel ?</summary>

La responsabilisation sans procédure régulière n'est que de la punition avec de la paperasse. Un membre faisant face à une sanction doit connaître le motif de préoccupation, disposer d'un délai réel pour répondre, et avoir une instance à laquelle faire appel — sinon la décision de l'organe compétent est définitive par défaut, ce qui concentre le pouvoir exactement là où il ne devrait pas se concentrer.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique le droit à une notification écrite, un délai de réponse minimum et une voie d'appel explicite auprès des Membres titulaires.

</details>

- **Droit à la notification :** _<le membre est notifié par écrit du motif de préoccupation avant tout examen ou sanction.>_
- **Droit de réponse :** _<délai de réponse minimum — par ex. 30 jours.>_
- **Droit d'appel :** _<toute décision peut faire l'objet d'un appel via le processus de gouvernance (vote stratégique).>_

## Protections contre les représailles

*Clauses RCOS : [6.3.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards)*

<details data-kind="rationale">
<summary>Pourquoi protéger explicitement les participants ?</summary>

Si le fait de soulever une préoccupation ou de fournir des informations peut coûter à un membre son statut, ses relations ou son accès, les gens garderont le silence et le système de responsabilisation s'effondrera dans la pratique. Qualifier les représailles elles-mêmes comme déclencheur rend le coût de la suppression plus élevé que le coût du signalement.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique que les représailles contre tout membre qui soulève, participe à, ou fournit des informations dans le cadre d'un processus de responsabilisation constituent elles-mêmes un déclencheur de responsabilisation.

</details>

_<Les représailles contre un membre pour sa participation à toute partie de ce processus constituent elles-mêmes un déclencheur de responsabilisation.>_

## Options de sanction et de réparation

*Clauses RCOS : [6.4.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.5](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.6](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi prédéfinir le catalogue de sanctions ?</summary>

Des sanctions improvisées en cours de processus reflètent la voix la plus forte dans la salle, pas ce que le manquement justifie. Un catalogue fixe — avec des conditions préalables, l'organe habilité et la voie d'appel pour chaque sanction — maintient la proportionnalité des réponses, empêche l'exclusion informelle de devenir la punition par défaut, et rend évident quand une sanction dépasse le périmètre de l'organe qui l'applique.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque type de sanction, définis les conditions préalables, l'organe habilité et la voie d'appel. Les réponses orientées vers la réparation doivent être la règle par défaut ; les réponses punitives sont réservées aux manquements critiques pour la sécurité ou non résolus.

</details>

> Les réponses orientées vers la réparation sont préférées aux réponses punitives, sauf dans les cas critiques pour la sécurité.
> Les sanctions DOIVENT être proportionnelles, limitées dans le temps lorsque applicable, documentées, et jamais appliquées par l'exclusion informelle ou la pression sociale.

| Type | Conditions préalables | Organe habilité | Possibilité d'appel ? |
|---|---|---|---|
| _<Vérification privée / rappel>_ | _<inactivité ou manquement mineur>_ | _<rôle>_ | _<oui>_ |
| _<Avertissement écrit>_ | _<manquement à une obligation non résolu après vérification>_ | _<rôle>_ | _<oui>_ |
| _<Restriction d'accès temporaire>_ | _<situation critique pour la sécurité ; fenêtre d'examen>_ | _<rôle>_ | _<oui>_ |
| _<Exclusion forcée>_ | _<manquement grave ou non résolu, ou décision des Membres titulaires>_ | _<Membres titulaires>_ | _<oui — nouveau vote>_ |

## Conditions de rétablissement des droits

*Clauses RCOS : [6.4.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation)*

<details data-kind="rationale">
<summary>Pourquoi rendre explicites les conditions de rétablissement ?</summary>

S'il n'existe pas de chemin de retour défini, chaque sanction devient effectivement permanente et chaque sortie devient une condamnation à vie. Des conditions de rétablissement explicites signalent que la responsabilisation vise la réparation là où la réparation est possible, et elles empêchent un filtrage a posteriori pour décider si quelqu'un est « vraiment » le bienvenu de retour.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque catégorie de sanction, indique le chemin vers le rétablissement des droits — nouvelle candidature après un départ volontaire, période de blocage de candidature après une exclusion forcée, rétablissement après une restriction temporaire.

</details>

- **Après un départ volontaire :** _<nouvelle candidature via le Protocole d'intégration ; pas de rétablissement automatique.>_
- **Après une exclusion forcée :** _<période minimale de blocage de candidature ; le processus d'admission standard s'applique.>_
- **Après une restriction d'accès temporaire :** _<droits rétablis après confirmation de la résolution dans la fenêtre d'examen.>_

## Coordination avec la Couche 1

*Clauses RCOS : [6.4.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation)*

<details data-kind="rationale">
<summary>Pourquoi relier cela au Protocole de sortie et de séparation ?</summary>

Les règles de sortie se trouvent dans la Couche 1 pour une bonne raison — elles régissent qui est et qui n'est pas membre. Si les actions de responsabilisation créaient leur propre chemin de sortie parallèle, il y aurait deux ensembles de règles, deux ensembles de registres, et une faille pour contourner la procédure régulière. Un seul protocole de sortie canonique comble cette lacune.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique que toutes les exclusions forcées et restrictions d'accès temporaires suivent le Protocole de sortie et de séparation (Couche 1), et précise qu'une restriction temporaire ne constitue pas une sortie.

</details>

_<Toutes les exclusions forcées et restrictions d'accès temporaires suivent le Protocole de sortie et de séparation (Couche 1). Une restriction d'accès temporaire ne constitue pas une sortie et ne déclenche pas la période de blocage de candidature, sauf si une exclusion forcée est ensuite votée par les Membres titulaires.>_

---

## Registre de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Stratégique
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
