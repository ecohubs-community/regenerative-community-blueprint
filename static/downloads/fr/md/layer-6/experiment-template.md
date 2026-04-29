**RCOS — Système d'Exploitation de Communauté Régénérative**

# Modèle d'expérimentation

- **Généré:** 2026-04-29
- **Source (version la plus récente):** [https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-6/experiment-template](https://blueprint.ecohubs.community/fr/articles/rcos-templates/layer-6/experiment-template)
- **Tous les modèles RCOS:** [https://blueprint.ecohubs.community/fr/articles/rcos-templates](https://blueprint.ecohubs.community/fr/articles/rcos-templates)

---
- **Couche :** 6 — Évolution et adaptation
- **Statut :** Modèle — à utiliser pour proposer une expérimentation limitée dans le temps
- **Référence RCOS :** [§8.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [§8.7](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)

> Les expérimentations permettent à la communauté d'essayer un changement sans l'adopter définitivement. Pour rester sûre, chaque expérimentation DOIT être limitée dans le temps, étiquetée et à expiration automatique — et DOIT consigner ses résultats dans le Journal d'apprentissage.

---

## Champs obligatoires

*Clauses RCOS : [8.3.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi exiger ces champs ?</summary>

Sans périmètre, durée, critères de succès et procédure de retour arrière, une « expérimentation » n'est qu'un changement permanent avec un habillage plus sympathique. Obliger chaque proposition à préciser ce qu'elle modifie, quand elle se termine, comment elle sera évaluée et comment elle sera annulée garantit que l'expérimentation reste réversible — et empêche l'étiquette « expérimentation » d'être utilisée pour contourner la délibération.

</details>

<details data-kind="instructions">
<summary>Comment remplir ce formulaire</summary>

Remplis chaque champ. La durée maximale est définie par ton Protocole de changement. L'autorité de décision doit provenir de la Matrice de décision.

</details>

- **Titre :** _<nom court de l'expérimentation.>_
- **Proposeur :** _<nom du membre.>_
- **Type de décision :** Stratégique
- **Périmètre :** _<ce qui est exactement testé ; quels artefacts et comportements sont concernés.>_
- **Durée :** _<date de début — date de fin ; durée maximale telle que définie par le Protocole de changement.>_
- **Points de contrôle :** _<au minimum un bilan à mi-parcours ; précise les dates et ce qui est évalué.>_
- **Critères de succès :** _<conditions observables qui justifieraient de rendre le changement permanent.>_
- **Critères d'échec :** _<conditions observables qui mettraient fin à l'expérimentation de manière anticipée.>_
- **Conditions et processus de retour arrière :** _<ce qui déclenche le retour arrière et comment il est exécuté.>_
- **Chemin de décision autorisé :** _<qui peut démarrer, prolonger, modifier ou terminer l'expérimentation, selon la Matrice de décision.>_
- **Étiquetage :** _<tous les artefacts concernés par l'expérimentation DOIVENT être explicitement étiquetés comme expérimentaux pendant toute la durée.>_
- **Suspension de sécurité :** _<reconnaître qu'une suspension d'urgence PEUT être invoquée en vertu du Protocole de changement si un risque crédible pour la sécurité apparaît.>_

## Expiration et renouvellement

<details data-kind="rationale">
<summary>Pourquoi les expérimentations doivent-elles expirer ?</summary>

La communauté a besoin de pouvoir revenir en arrière. L'expiration automatique impose une décision délibérée pour rendre le changement permanent — plutôt qu'une dérive lente où plus personne ne se souvient que c'était conditionnel.

</details>

<details data-kind="instructions">
<summary>Comment remplir ce formulaire</summary>

Indique la règle d'expiration automatique, le mécanisme de renouvellement et l'obligation de consigner les résultats dans le Journal d'apprentissage.

</details>

- _<Les expérimentations expirent automatiquement à la fin de leur durée définie, sauf renouvellement explicite via une nouvelle proposition. Le renouvellement nécessite un nouveau vote Stratégique.>_
- _<Les résultats et enseignements sont consignés dans le Journal d'apprentissage.>_

---

## Compte rendu de résultat (rempli à la fin de l'expérimentation)

- **Date de fin :**
- **Résultat :** _<Adopté définitivement / Retour arrière effectué / Modifié et relancé / Terminé de manière anticipée>_
- **Registre de décision :** _<lien vers le vote ou la décision>_
- **Entrée du Journal d'apprentissage :** _<lien>_
- **Résumé :** _<deux à quatre phrases sur ce qui a été testé, ce qui a été observé et ce qui a été décidé.>_
