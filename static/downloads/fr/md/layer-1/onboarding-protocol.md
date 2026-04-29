**RCOS — Système d'Exploitation de Communauté Régénérative**

# Protocole d'intégration

- **Généré:** 2026-04-29
- **Source (version la plus récente):** [https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-1/onboarding-protocol](https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-1/onboarding-protocol)
- **Tous les modèles RCOS:** [https://blueprint.ecohubs.community/fr/articles/rcos-templates](https://blueprint.ecohubs.community/fr/articles/rcos-templates)

---
- **Couche :** 1 — Système d'adhésion
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§3.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [§3.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [§3.8](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Critères d'admission

*Clauses RCOS : [3.2.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [3.2.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding)*

<details data-kind="rationale">
<summary>Pourquoi écrire qui est admis ?</summary>

L'admission est le moment où un inconnu devient lié par — et protégé par — les règles de la communauté. Si les critères sont informels, la décision se réduit à savoir si les présents apprécient le candidat. Des critères écrits font de l'admission un acte de gouvernance, pas une faveur sociale, et rendent un refus défendable sur des bases que la communauté peut invoquer.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Énonce les conditions explicites sous lesquelles un candidat peut être admis. Chaque critère doit être vérifiable à partir de la candidature elle-même ou d'une vérification externe.

</details>

1. _<Critère 1, p. ex. alignement avec l'objectif principal et les contraintes d'identité de la Couche 0.>_
2. _<Critère 2, p. ex. volonté de contribuer activement dans au moins une catégorie reconnue.>_
3. _<Critère 3, p. ex. aucune sortie forcée ou rejet au cours des X derniers mois.>_
4. _<Critère 4, p. ex. formulaire de candidature rempli de bonne foi — pas de déclaration trompeuse.>_

## Étapes d'intégration

*Clauses RCOS : [3.2.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [3.2.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding)*

<details data-kind="rationale">
<summary>Pourquoi imposer une séquence fixe ?</summary>

Le consentement à la gouvernance n'a de sens que si le membre a réellement vu la gouvernance. Une séquence fixe — examen, consentement, configuration technique — garantit que chaque Membre à part entière a franchi le même seuil dans le même ordre, de sorte que personne n'accède aux pleins droits sans avoir pris connaissance des contraintes qui les accompagnent.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Liste les étapes ordonnées que chaque nouveau membre doit accomplir pour passer de candidat à Membre à part entière. Inclus les étapes de consentement explicite et tout provisionnement d'outils ou d'accès nécessaire.

</details>

1. _<Étape 1, p. ex. examiner tous les artefacts des Couches 0 à 6 et ce protocole d'intégration.>_
2. _<Étape 2, p. ex. consentir explicitement à l'Accord d'adhésion et aux contraintes d'identité de la Couche 0.>_
3. _<Étape 3, p. ex. configurer les outils requis (portefeuille, comptes, identité).>_
4. _<Étape 4, p. ex. rejoindre les canaux de communication réservés aux membres.>_
5. _<Étape 5, p. ex. se voir accorder les permissions nécessaires à la participation à la gouvernance.>_
6. _<Étape 6, p. ex. achèvement de l'intégration enregistré — l'état d'adhésion passe à Membre à part entière.>_

## État d'adhésion initial

*Clauses RCOS : [3.1.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>Pourquoi attribuer un état à la fin de l'intégration ?</summary>

Entre « candidat approuvé » et « pleinement intégré », il y a un vrai décalage — les permissions, les accès et les attentes changent tous. Déclarer l'état exact que détient un nouveau membre à chaque étape supprime toute ambiguïté sur ce qu'il peut faire à l'instant présent, et empêche l'octroi involontaire de droits avant la fin de l'intégration.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique les états d'adhésion par lesquels un membre transite pendant l'intégration, et ce qui déclenche chaque transition. Réfère-toi au Registre des états d'adhésion.

</details>

- À l'approbation : _<p. ex. Membre en période d'essai.>_
- À la fin de l'intégration : _<p. ex. Membre à part entière (automatique à l'achèvement).>_

## Période d'essai et évaluation

*Clauses RCOS : [3.3.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation)*

<details data-kind="rationale">
<summary>Pourquoi limiter la période d'essai ?</summary>

Une période d'essai sans limite est une adhésion de seconde classe qui ne prend jamais fin — toutes les obligations, moins de droits. Fixer la durée, les critères et le parcours en cas d'échec impose un point de décision : soit le nouveau membre accède au statut plein, soit un processus de sortie défini s'exécute. Cela empêche la période d'essai de devenir un sas d'attente permanent.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis la durée, les critères d'évaluation, la décision de transition, le délai de grâce, le parcours en cas d'échec et les règles de prolongation éventuelles. Les droits pendant la période d'essai sont définis dans le Registre des états d'adhésion.

</details>

- **Durée :** _<p. ex. 30 jours à compter de l'approbation.>_
- **Critères d'évaluation :** _<p. ex. toutes les étapes d'intégration accomplies et enregistrées.>_
- **Décision de transition :** _<p. ex. automatique à l'achèvement ; ou par vote.>_
- **Délai de grâce :** _<p. ex. X jours supplémentaires si l'intégration n'est pas terminée dans les temps.>_
- **Non-achèvement :** _<p. ex. processus de sortie déclenché automatiquement à l'expiration de la période totale.>_
- **Prolongation :** _<p. ex. une prolongation unique de X jours sur demande.>_
- **Droits pendant la période d'essai :** _<référence au Registre des états d'adhésion.>_
- **Blocage de recandidature :** _<p. ex. les membres sortis pour intégration incomplète ne peuvent pas recandidater pendant X mois.>_

## Dossier d'achèvement

*Clauses RCOS : [3.8.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi conserver le dossier de manière permanente ?</summary>

Le dossier d'achèvement est la preuve qu'un membre a consenti à une version spécifique des règles à une date spécifique. Le perdre ou le modifier rendrait impossible de répondre, des mois ou des années plus tard, à la question « à quoi exactement a-t-il consenti ? » — qui est la seule question qui compte lorsqu'un litige survient.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique où le dossier d'achèvement est conservé, ce qu'il capture (horodatage, versions des artefacts auxquelles le membre a consenti), et la règle de conservation.

</details>

_<Description du dossier d'achèvement de l'intégration — où il est stocké, ce qu'il capture, et qu'il est conservé de manière permanente après la sortie.>_

---

## Procès-verbal de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Stratégique
- **Version :** <version>
- **Procès-verbal de décision :** <lien vers le procès-verbal de décision>
