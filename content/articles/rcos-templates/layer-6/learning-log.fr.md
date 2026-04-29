---
id: 9a3f7c1e
title: Journal d'apprentissage
parentId: e676f693
order: 2
lang: fr
sourceHash: 620575c4
---

- **Couche :** 6 — Évolution et adaptation
- **Statut :** Modèle — à adapter pour ta communauté ; mis à jour lorsque des événements apprenants surviennent
- **Référence RCOS :** [§8.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [§8.6](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Consigne les échecs majeurs, les adaptations, les retours en arrière et les apprentissages systémiques. Les schémas d'échec récurrents DOIVENT déclencher une revue structurelle, pas une mise en cause individuelle. Les entrées sont ajoutées en tête de liste (la plus récente en premier).

---

## Ce qui constitue un événement apprenant

*Clauses RCOS : [8.4.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi définir le déclencheur explicitement ?</summary>

Si « on devrait tirer des leçons de ceci » est laissé au jugement individuel, les leçons les plus difficiles — celles qui impliquent un conflit, un échec ou un embarras — sont celles qui ont le plus de chances de ne jamais être consignées. Nommer les événements spécifiques qui DOIVENT produire une entrée retire la question du moment présent et garantit que les apprentissages inconfortables sont capturés plutôt que discrètement oubliés.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Liste les événements spécifiques qui obligent à créer une entrée dans le Journal d'apprentissage. Indique qui est responsable du journal et la cadence de synthèse.

</details>

Une entrée DOIT être ajoutée lorsque l'un des événements suivants se produit :

- _<Une décision de gouvernance est annulée, révoquée, ou s'avère en contradiction avec une autre règle adoptée.>_
- _<Une expérimentation se conclut (succès, échec ou arrêt anticipé).>_
- _<Un conflit escalade jusqu'à l'étape de gouvernance de l'Échelle de résolution des conflits.>_
- _<Une défaillance structurelle ou systémique est identifiée, ayant causé un préjudice, de la confusion ou des dysfonctionnements récurrents.>_
- _<Une adaptation majeure des opérations communautaires est adoptée et modifie significativement le fonctionnement d'une couche.>_
- _<Un quasi-incident : une situation qui aurait pu causer un préjudice significatif mais a été détectée à temps.>_
- _<Tout événement que la communauté identifie collectivement comme méritant d'en tirer des enseignements.>_

_<Les ajustements opérationnels mineurs, les décisions de routine et les problèmes individuels entièrement résolus aux premières étapes de l'Échelle de résolution des conflits ne nécessitent pas d'entrée dans le Journal d'apprentissage.>_

**Responsable :** _<rôle chargé de s'assurer que les entrées sont créées et maintenues.>_

**Cadence de synthèse :** _<le Journal d'apprentissage est examiné lors de la réunion Réflexion et apprentissage ; le rôle désigné prépare une brève synthèse des entrées depuis la dernière revue, en relevant les schémas récurrents.>_

---

_Aucune entrée pour le moment. La première entrée sera ajoutée lorsque le premier événement apprenant surviendra._

---

## Format des entrées

*Clauses RCOS : [8.4.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi un modèle d'entrée fixe ?</summary>

La réflexion libre a de la valeur, mais elle ne s'agrège pas. Un schéma cohérent — déclencheur, signaux, ce qui a changé, résultat, responsable du suivi — permet de parcourir des années d'entrées à la recherche de schémas récurrents et de transformer des incidents isolés en preuves structurelles. Il oblige aussi chaque entrée à nommer un responsable, pour que l'apprentissage ne s'arrête pas à « on a remarqué ».

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Utilise le modèle ci-dessous pour chaque entrée. Chaque champ impose un angle différent sur l'événement ; ne saute pas le responsable du suivi.

</details>

```markdown
## <AAAA-MM-JJ> — <Titre court>

- **Déclencheur :** <Ce qui s'est passé et a motivé cette entrée>
- **Couches/artefacts impliqués :** <p. ex. Couche 2 — Protocole de gouvernance>
- **Ce qui s'est produit :** <Récit court>
- **Signaux ayant déclenché l'action :** <Ce qui a rendu le problème visible>
- **Ce qui a changé ou a été tenté :** <Décision, expérimentation ou modification de règle>
- **Résultat :** <Résultat après examen, si connu>
- **Responsable du suivi et échéance :** <Nom / rôle et date, ou « aucun »>
```
