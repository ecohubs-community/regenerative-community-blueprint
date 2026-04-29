**RCOS — Système d'Exploitation de Communauté Régénérative**

# Protocole de sortie et de séparation

- **Généré:** 2026-04-29
- **Source (version la plus récente):** [https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-1/exit-protocol](https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-1/exit-protocol)
- **Tous les modèles RCOS:** [https://blueprint.ecohubs.community/fr/articles/rcos-templates](https://blueprint.ecohubs.community/fr/articles/rcos-templates)

---
- **Couche :** 1 — Système d'adhésion
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§3.6](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [§3.7](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [§3.8](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Sortie volontaire

*Clauses RCOS : [3.6.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>Pourquoi rendre le départ sans friction ?</summary>

Une communauté qu'il est difficile de quitter n'est pas une communauté — c'est un piège. La sortie volontaire DOIT être disponible à tout moment, sans interrogatoire, délai de préavis ou sanction, car le droit de retirer son consentement est ce qui rend tout autre acte de consentement réel. Conserver l'historique des contributions séparément garantit que partir n'efface pas le travail accompli par la personne.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Décris le canal de soumission de la sortie, le délai de révocation des accès, les données conservées et la transition d'état résultante.

</details>

- _<Comment un membre soumet une sortie volontaire ; les raisons sont facultatives.>_
- _<Délai de préavis ou attente de passation, le cas échéant.>_
- _<Délai de révocation des accès (par ex. dans les 24 heures suivant la confirmation).>_
- _<Ce qui est conservé — historique des contributions, registres de reconnaissance — et ce qui est supprimé.>_
- _<Transition d'état résultante (par ex. vers Membre sorti·e).>_
- _<Où et comment la sortie est enregistrée avec horodatage.>_

## Sortie forcée

*Clauses RCOS : [3.6.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>Pourquoi conditionner l'exclusion à la Couche 4 ?</summary>

L'exclusion est le pouvoir le plus tranchant que la communauté détient sur une personne. Si elle peut être exercée par quiconque dispose de suffisamment d'influence sociale, l'adhésion ne vaut rien. Exiger une décision de responsabilité conclue en Couche 4 — avec des motifs écrits, une notification et une durée minimale avant nouvelle candidature — transforme l'exclusion d'un acte de pouvoir en un acte de gouvernance qui peut être examiné et contesté.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique que la sortie forcée ne peut résulter que d'un processus de responsabilité conclu en Couche 4. Définis la notification, la révocation des accès, les données conservées, le blocage de nouvelle candidature et la confidentialité du dossier de décision.

</details>

- _<La sortie forcée ne PEUT résulter que d'un processus de responsabilité conclu en Couche 4 avec une décision documentée.>_
- _<Le membre concerné DOIT être notifié par écrit avec le motif et la référence du dossier de décision avant que les accès ne soient révoqués.>_
- _<Délai de révocation des accès (par ex. dans les 24 heures suivant la décision).>_
- _<Ce qui est conservé, ce qui est supprimé.>_
- _<Blocage de nouvelle candidature (durée minimale, fixée par la décision de responsabilité ; référence Couche 4).>_
- _<Confidentialité du dossier de décision (référence aux règles de confidentialité de l'Échelle de résolution des conflits).>_

## Suspension

*Clauses RCOS : [3.7.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [3.7.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [3.7.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status)*

<details data-kind="rationale">
<summary>Pourquoi concevoir la suspension avec soin — ou pas du tout ?</summary>

Un état de suspension mal conçu est pire que pas de suspension du tout — il devient une sortie douce sans procédure régulière, ou un limbe indéfini utilisé pour punir sans la responsabilité d'une exclusion complète. Si la communauté ne peut pas s'engager sur des conditions explicites, des limites de durée et des mécanismes de révision, il est plus sûr de n'avoir aucune suspension formelle qu'une suspension floue.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Soit tu définis explicitement la suspension (conditions d'entrée, limites de durée, droits pendant la suspension, mécanisme de révision, sortie), soit tu indiques qu'aucune suspension formelle n'existe. Ne laisse pas cette section ambiguë.

</details>

_<Soit : définis l'état de suspension avec les conditions d'entrée, la durée maximale, les droits pendant la suspension, le mécanisme de révision obligatoire et la sortie ; soit : indique que la suspension formelle n'est pas définie actuellement.>_

## Séparation des actifs, rôles et responsabilités

*Clauses RCOS : [3.6.5](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>Pourquoi énumérer les étapes de séparation ?</summary>

Quand quelqu'un part, chaque fil non clos — un rôle que personne n'a libéré, une clé de portefeuille encore active, une tâche encore assignée — devient une surface d'attaque active ou une faille opérationnelle. Une liste de vérification force la clôture délibérée de ces fils, au lieu de les découvrir des mois plus tard quand quelque chose casse ou que quelqu'un utilise un accès qu'il ne DEVRAIT plus avoir.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Fournis une liste de vérification applicable aux sorties volontaires et forcées. Inclus la libération des rôles, le transfert des tâches, la suppression des accès aux instruments financiers, la révocation des droits d'administration des plateformes et la résolution des obligations en cours.

</details>

Les étapes de séparation suivantes s'appliquent aux sorties volontaires et forcées :

- _<Les rôles détenus DOIVENT être libérés et documentés dans le Registre des rôles.>_
- _<Les tâches en cours DOIVENT être libérées ou transférées.>_
- _<Les accès à la trésorerie / au portefeuille / à la signature DOIVENT être supprimés.>_
- _<Tous les accès administratifs aux plateformes DOIVENT être révoqués.>_
- _<Les obligations en cours sont résolues ou transférées avant la finalisation de la sortie dans la mesure du possible.>_

---

## Registre de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Stratégique
- **Version :** <version>
- **Dossier de décision :** <lien vers le dossier de décision>
