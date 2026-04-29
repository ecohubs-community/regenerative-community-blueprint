**RCOS — Système d'Exploitation de Communauté Régénérative**

# Protocole de gouvernance

- **Généré:** 2026-04-29
- **Source (version la plus récente):** [https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-2/governance-protocol](https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-2/governance-protocol)
- **Tous les modèles RCOS:** [https://blueprint.ecohubs.community/fr/articles/rcos-templates](https://blueprint.ecohubs.community/fr/articles/rcos-templates)

---
- **Couche :** 2 — Gouvernance et logique décisionnelle
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§4.5](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [§4.6](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [§4.7](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Définit le cycle de vie complet d'une décision collective — de la soumission de proposition à la documentation et à l'appel.

---

## Soumission de proposition

*Clauses RCOS : [4.5.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Pourquoi formaliser la manière dont les propositions entrent dans le système ?</summary>

Un processus décisionnel qui accepte les propositions de manière informelle — un message, une suggestion verbale, une idée du fondateur — n'a aucun moyen fiable de déterminer ce qui est réellement sur la table. Exiger un format de soumission standard, un emplacement de dépôt et des champs de contenu obligatoires garantit que chaque proposition arrive avec les mêmes informations, visible par tous, traçable dès le premier jour.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique qui peut proposer, où les propositions sont soumises, les champs de contenu obligatoires, et comment le type de décision est déterminé et contesté.

</details>

- _<Décisions opérationnelles — traitées par le titulaire du rôle concerné selon le Registre des rôles ; aucune proposition requise.>_
- _<Décisions stratégiques et constitutionnelles — qui peut soumettre, et sur quelle plateforme.>_
- _<Champs obligatoires de la proposition : résumé, couches et artefacts concernés, type de décision, justification, risques et mesures d'atténuation, plan de retour en arrière, date d'entrée en vigueur proposée.>_
- _<Le type de décision est déclaré par le proposant ; par défaut, le type à impact le plus élevé s'applique en cas d'ambiguïté.>_
- _<Règles de retrait — quand une proposition peut être retirée et comment.>_

## Examen et délibération

*Clauses RCOS : [4.5.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Pourquoi imposer une période minimale de délibération ?</summary>

Les votes précipités favorisent ceux qui sont déjà attentifs et désavantagent tous les autres. Une période de délibération obligatoire, proportionnelle au poids de la décision, donne aux membres le temps de lire, répondre et soulever des préoccupations avant l'ouverture du vote — afin que le vote reflète un jugement réfléchi, et non une réaction rapide.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Nomme les lieux de délibération et les périodes minimales pour les décisions stratégiques et constitutionnelles avant qu'un vote puisse être ouvert.

</details>

- _<Où se déroule la délibération (forum, chat, réunion).>_
- _<Période minimale de délibération avant l'ouverture d'un vote — Stratégique.>_
- _<Période minimale de délibération avant l'ouverture d'un vote — Constitutionnelle.>_
- _<Attente que les membres soulèvent leurs préoccupations pendant la délibération pour éviter la nécessité de re-votes.>_

## Exécution de la décision

*Clauses RCOS : [4.5.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Pourquoi lier l'exécution au registre ?</summary>

Une proposition adoptée qui ne parvient jamais à l'artefact concerné n'est une décision que de nom — les règles en vigueur sur le terrain disent toujours ce qu'elles disaient avant. Lier l'exécution à une mise à jour concrète de l'artefact et à une entrée dans l'historique des versions comble l'écart entre ce qui a été décidé et ce qui est réellement en vigueur.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique ce qui se passe quand une proposition est adoptée (mise à jour des artefacts, historique des versions) et quand elle est rejetée (archivage). Définis un délai pour les deux cas.

</details>

- _<En cas d'adoption : comment la proposition est classée ; les artefacts concernés sont mis à jour ; une entrée dans l'historique des versions est créée.>_
- _<En cas de rejet : où la proposition est archivée.>_
- _<Délai d'exécution après la clôture du vote.>_

## Documentation et publication

*Clauses RCOS : [4.5.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Pourquoi documenter chaque résultat, y compris les rejets ?</summary>

Ne conserver un registre que des décisions adoptées efface l'historique des raisonnements — les membres perdent la trace de ce qui a déjà été examiné et rejeté, et les mêmes débats sont indéfiniment relancés. Archiver les propositions adoptées et rejetées, avec un délai et un registre de décision vérifiable, préserve la mémoire institutionnelle et rend le système de gouvernance auditable.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique les règles de conservation pour les propositions adoptées et rejetées, ce qui constitue le registre de décision, et l'obligation de mise à jour de l'historique des versions.

</details>

- _<Toutes les propositions adoptées et rejetées sont classées dans les X jours suivant la clôture du vote.>_
- _<L'artefact de vote (p. ex. lien Snapshot) sert de registre de décision.>_
- _<L'historique des versions (Couche 6) est mis à jour avec chaque proposition adoptée.>_

## Appel et révision

*Clauses RCOS : [4.5.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.6.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Pourquoi rendre les re-votes possibles mais encadrés ?</summary>

Un système de gouvernance sans voie d'appel fige les erreurs en règles permanentes ; un système avec des voies d'appel informelles illimitées ne règle jamais rien. Permettre à tout membre actif de déclencher un re-vote — mais uniquement avec une objection écrite et motivée soulevant un point non encore traité — maintient le système auto-correctif sans transformer chaque décision en référendum permanent.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis les conditions pour déclencher un re-vote, le format de l'objection, et le seuil/mécanisme du re-vote lui-même.

</details>

- _<Qui peut déclencher un re-vote et comment.>_
- _<Exigence d'objection motivée — un point non traité lors de la délibération initiale.>_
- _<Le re-vote utilise le même mécanisme et le même seuil que le vote initial.>_
- _<Traitement des demandes de re-vote répétées et abusives.>_

## Conflit entre décisions

*Clauses RCOS : [4.5.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Pourquoi prédéfinir la résolution des conflits ?</summary>

Quand deux décisions pointent dans des directions différentes, quelqu'un doit choisir laquelle prime — et si ce choix est fait de manière ad hoc, cela se réduit à celui qui a l'autorité ou l'énergie pour imposer sa lecture. Une règle de préséance fixe (le type supérieur l'emporte ; la plus récente l'emporte à type égal) résout les conflits mécaniquement, sans appel au jugement.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique la règle de préséance (typiquement : le type de décision supérieur prévaut ; la plus récente l'emporte à type égal, sauf verrouillage explicite).

</details>

- _<Préséance : Constitutionnelle > Stratégique > Opérationnelle.>_
- _<Conflits de même type : la plus récente prévaut, sauf si la précédente a explicitement verrouillé les modifications futures.>_
- _<Où les conflits sont signalés et comment ils sont résolus.>_

## Garde-fous et modes de défaillance

*Clauses RCOS : [4.6.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Pourquoi planifier les défaillances de gouvernance à l'avance ?</summary>

Tout système de gouvernance échoue quelque part — capturé par un sous-groupe, figé par des vetos informels, dévié par un titulaire de rôle qui a discrètement élargi son périmètre. Nommer les modes de défaillance spécifiques à l'avance, intégrer des voies de contestation à l'abri de représailles, et exiger une révision formelle lorsque les défaillances s'accumulent, voilà ce qui empêche la gouvernance de se vider lentement de sa substance sans que personne ne s'en aperçoive.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Pour chaque mode de défaillance nommé, indique le garde-fou correspondant. Inclus un déclencheur qui impose une révision constitutionnelle si les défaillances s'accumulent.

</details>

- **Concentration du pouvoir :** _<comment le protocole empêche l'autorité unilatérale au-delà du périmètre opérationnel.>_
- **Vetos informels :** _<règle selon laquelle seules les objections écrites et motivées soumises via le processus défini ont du poids.>_
- **Capture décisionnelle :** _<règle concernant le quorum et l'ouverture du vote.>_
- **Enracinement des fondateurs/rôles :** _<règle selon laquelle aucun rôle ne confère d'autorité permanente ; les fondateurs ne détiennent aucune autorité de gouvernance spéciale au-delà de leur statut de membre.>_
- **Contestation sans représailles :** _<référence aux dispositions anti-représailles de la Couche 4.>_
- **Déclencheur de défaillance persistante :** _<p. ex. trois défaillances de gouvernance ou plus en X mois déclenchent une révision constitutionnelle.>_

---

## Registre de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Constitutionnelle
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
