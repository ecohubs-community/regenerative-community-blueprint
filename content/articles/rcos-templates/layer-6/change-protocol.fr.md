---
id: 0d3486d6
title: Protocole de changement
parentId: e676f693
order: 0
lang: fr
sourceHash: f3a121c2
---

- **Couche :** 6 — Évolution et adaptation
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§8.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [§8.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [§8.6](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

---

## Comment les changements sont proposés

*Clauses RCOS : [8.1.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.6.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.8.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#88-explicitness-rules)*

<details data-kind="rationale">
<summary>Pourquoi exiger une proposition structurée ?</summary>

Un changement qui arrive sous forme d'idée vague dans une discussion ne peut être ni évalué, ni contesté, ni annulé par la suite. Imposer à chaque proposition la même structure minimale — artefacts concernés, justification, risques, retour en arrière — transforme une opinion en artefact vérifiable et rend impossible de faire passer un changement de règle inaperçu au sein de la communauté.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique qui peut proposer, où les propositions sont soumises et quels champs de contenu sont obligatoires. Relie ceci au Protocole de gouvernance (Couche 2).

</details>

_<Tout Membre de plein droit peut proposer un changement à tout artefact RCOS. Indique le canal de soumission.>_ Chaque proposition doit inclure :

- _<Résumé du changement.>_
- _<Couches et artefacts concernés (avec liens).>_
- _<Type de décision (Opérationnel / Stratégique / Constitutionnel).>_
- _<Justification.>_
- _<Risques et mesures d'atténuation.>_
- _<Plan de retour en arrière.>_
- _<Date d'entrée en vigueur proposée.>_

## Comment les propositions sont classifiées

*Clauses RCOS : [8.1.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms)*

<details data-kind="rationale">
<summary>Pourquoi classifier selon l'impact ?</summary>

Tous les changements ne méritent pas le même niveau de friction. Les corrections de coquilles ne devraient pas nécessiter une supermajorité ; les changements constitutionnels ne devraient pas passer en silence. Associer les propositions aux types de décision — et classer par défaut les cas ambigus vers le type supérieur — rend le coût d'un changement proportionnel à sa portée et protège la Couche 0 contre l'érosion par petites touches.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis ce qui relève de chaque type de décision. Indique la règle de classification par défaut vers le type supérieur pour les cas ambigus.

</details>

- **Opérationnel :** _<corrections de formulation, mise en forme, mises à jour mineures de contenu ; aucun vote requis ; exécuté par le rôle responsable dans les limites de sa délégation.>_
- **Stratégique :** _<changements du contenu des Couches 1 à 5 qui affectent les droits des membres, les processus ou les structures.>_
- **Constitutionnel :** _<changements de la Couche 0 (raison d'être, périmètre, invariants) ou du système de gouvernance lui-même (Couche 2).>_

> En cas de doute sur la classification, le type à impact supérieur s'applique par défaut.

## Examen et délibération

*Clauses RCOS : [8.1.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.7.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi imposer des périodes minimales de délibération ?</summary>

Sans durée minimale de délibération, tout changement peut être adopté à la hâte un jour calme où peu de membres sont attentifs. Des minimums obligatoires — plus longs pour les changements à fort impact — garantissent que les membres en déplacement, malades ou simplement occupés disposent d'une vraie chance de lire, d'objecter ou de se manifester.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis les périodes minimales de délibération pour chaque type de décision, ainsi qu'une période de ratification pour les changements constitutionnels.

</details>

- **Opérationnel :** _<aucune délibération requise.>_
- **Stratégique :** _<délibération minimale de X jours ; lieu de délibération.>_
- **Constitutionnel :** _<délibération minimale de Y jours ; période de ratification de Z jours après l'adoption du vote.>_

## Adoption et publication

*Clauses RCOS : [8.2.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi des étapes de publication fixes ?</summary>

Un vote qui passe mais n'est jamais consigné par écrit équivaut à une absence de vote — et pire, il crée un vide où quiconque se souvient du résultat peut le définir à sa guise. Des étapes de publication rigoureuses et ordonnées comblent ce vide et font de « ce qui a été adopté » une question d'archive, non de mémoire.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique les étapes ordonnées qui doivent être exécutées après l'adoption d'une proposition. Inclus les délais et l'obligation de maintenir un historique des versions.

</details>

Lorsqu'une proposition est adoptée :

1. _<Fichier de proposition déplacé vers l'archive des propositions adoptées dans un délai de X jours.>_
2. _<Artefacts concernés mis à jour dans un délai de X jours.>_
3. _<Entrée ajoutée à l'historique des versions.>_
4. _<Champs de statut mis à jour sur les artefacts concernés.>_

## Rejet

*Clauses RCOS : [8.2.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority)*

<details data-kind="rationale">
<summary>Pourquoi archiver les propositions rejetées ?</summary>

Les idées rejetées portent autant de signal que celles acceptées — elles montrent ce que la communauté a examiné et refusé. Garder les rejets classés et accessibles empêche la même proposition de réapparaître sous un nouveau nom tous les six mois et offre aux futurs membres une vue des chemins non empruntés.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique l'emplacement de l'archive pour les propositions rejetées et les conditions de nouveau vote pour rouvrir la question.

</details>

Lorsqu'une proposition est rejetée :

1. _<Fichier de proposition déplacé vers l'archive des propositions rejetées dans un délai de X jours.>_
2. _<Aucune modification d'artefact effectuée.>_
3. _<Le mécanisme de nouveau vote s'applique si de nouvelles informations émergent (selon la Matrice de décision, Couche 2).>_

## Transition et migration

*Clauses RCOS : [8.5.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [8.5.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Pourquoi protéger les droits existants pendant les transitions ?</summary>

Si de nouvelles règles pouvaient réécrire silencieusement des accords existants, l'adhésion n'aurait aucun sens — ce à quoi tu as souscrit pourrait être modifié sans que tu t'en aperçoives. Des règles de transition explicites garantissent que les droits ne sont pas réduits rétroactivement et que les personnes opérant sous les anciennes règles disposent de temps et d'un préavis avant que le terrain ne change.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique les règles protégeant les titulaires de rôles existants, les membres et les registres lorsqu'un changement de règle prend effet.

</details>

Lorsqu'un changement de règle affecte des rôles, accords ou registres existants :

- _<Les titulaires de rôles existants sont notifiés avant l'entrée en vigueur du changement.>_
- _<Les droits des membres existants ne peuvent pas être réduits sans consentement ou vote constitutionnel.>_
- _<Les registres antérieurs au changement ne sont pas modifiés rétroactivement, sauf si cela fait explicitement partie de la proposition.>_
- _<Une période de transition peut être définie dans la proposition elle-même.>_

## Retour en arrière

*Clauses RCOS : [8.1.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.5.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Pourquoi rendre le retour en arrière symétrique à l'adoption ?</summary>

Un changement qui ne peut pas être annulé par le même chemin qui l'a créé est un piège. Exiger que le retour en arrière utilise le même type de décision que l'original maintient la porte ouverte à la correction sans permettre à un seul membre d'inverser discrètement une décision communautaire en l'appelant une « correction ».

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique que le retour en arrière utilise le même type de décision et le même processus que l'adoption originale.

</details>

_<Toute décision adoptée peut être annulée par le même processus que l'original. Tout Membre de plein droit peut déclencher un nouveau vote en soumettant une objection écrite et motivée qui n'a pas été prise en compte lors de la délibération originale. Le retour en arrière utilise le même type de décision que l'original.>_

## Changements d'urgence

*Clauses RCOS : [8.5.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Pourquoi autoriser les changements d'urgence ?</summary>

Certains dommages se produisent plus vite qu'un vote ne peut être convoqué. Un chemin d'urgence étroit et bien encadré permet à la communauté de répondre à de véritables problèmes de sécurité ou défaillances de plateforme sans accorder à quiconque un pouvoir de dérogation général. Le cycle obligatoire de signalement, examen et ratification-ou-retour-en-arrière est ce qui empêche les pouvoirs d'urgence de devenir des pouvoirs ordinaires.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis les conditions dans lesquelles un changement d'urgence peut être effectué, qui peut le faire, et le cycle obligatoire de signalement-examen-ratification-ou-retour-en-arrière.

</details>

Un changement opérationnel d'urgence peut être effectué par _<rôle>_ uniquement si toutes les conditions suivantes sont réunies :

1. _<Action immédiate requise pour prévenir un préjudice à la sécurité ou une défaillance de plateforme.>_
2. _<Un vote des Membres de plein droit ne peut pas être convoqué à temps.>_
3. _<Le changement ne contrevient pas à un invariant de la Couche 0.>_

Les changements d'urgence doivent être :

- _<Signalés à tous les Membres de plein droit dans un délai de X heures.>_
- _<Examinés lors de la prochaine réunion communautaire.>_
- _<Ratifiés via le type de décision approprié dans un délai de Y jours, ou automatiquement annulés.>_

## Expérimentations

*Clauses RCOS : [8.3.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi traiter les expérimentations comme un mécanisme distinct ?</summary>

La communauté a besoin d'un moyen d'essayer de nouvelles choses sans devoir les adopter définitivement pour les tester. Les expérimentations créent cet espace — mais seulement si elles sont limitées dans le temps, étiquetées et à expiration automatique. Sans ces garde-fous, une « expérimentation » devient le moyen le plus rapide d'installer une règle permanente sans véritable délibération.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis les règles que chaque expérimentation doit satisfaire. Réfère-toi au Modèle d'expérimentation pour la structure complète de soumission.

</details>

_<Tout Membre de plein droit peut proposer une expérimentation limitée dans le temps via une décision stratégique. Voir le Modèle d'expérimentation pour les champs obligatoires.>_

- _<Les expérimentations expirent automatiquement à la fin de leur durée définie, sauf renouvellement explicite via une nouvelle proposition.>_
- _<Tous les artefacts affectés par une expérimentation doivent être explicitement étiquetés comme expérimentaux pendant toute la durée.>_
- _<Suspension de sécurité : si une expérimentation introduit un risque crédible pour la sécurité, de la coercition ou un préjudice durable, une suspension d'urgence peut être invoquée conformément aux Changements d'urgence ci-dessus.>_
- _<Les résultats et enseignements sont consignés dans le Journal d'apprentissage.>_

---

## Registre de ratification

- **Adopté :** <AAAA-MM-JJ>
- **Type de décision :** Constitutionnel
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
