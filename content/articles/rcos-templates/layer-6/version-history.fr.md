---
id: 4c8e6d5b
title: Historique des versions
parentId: e676f693
order: 1
lang: fr
sourceHash: abe5a1e4
---

- **Couche :** 6 — Évolution et adaptation
- **Statut :** Modèle — à adapter pour ta communauté ; mis à jour à chaque changement adopté
- **Référence RCOS :** [§8.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [§8.6](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Le registre officiel lisible par les humains de tous les changements adoptés dans l'implémentation RCOS de ta communauté. La version actuellement active est l'entrée la plus récente en haut de ce fichier. Les règles remplacées restent accessibles via le contrôle de version.

---

## Format des entrées

*Clauses RCOS : [8.2.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi enregistrer chaque changement adopté ?</summary>

Une gouvernance qui ne peut pas indiquer « ce qui a changé, quand et pourquoi » est indiscernable d'une gouvernance par celui qui parle le plus fort. Un registre unique en ajout seul des changements adoptés — avec les versions remplacées conservées dans le contrôle de version — rend l'état actuel des règles sans ambiguïté et donne aux membres, aux auditeurs et aux futurs responsables un moyen de reconstituer le chemin qui nous a menés ici.

</details>

<details data-kind="instructions">
<summary>Comment remplir ce document</summary>

Utilise le modèle d'entrée ci-dessous pour chaque changement adopté. Les nouvelles entrées sont ajoutées au-dessus de la plus récente. Ne modifie pas les entrées historiques — les corrections sont enregistrées comme de nouvelles entrées.

</details>

```markdown
## <version> — <Titre court>

- **Date d'entrée en vigueur :** <AAAA-MM-JJ>
- **Registre de décision :** <lien vers le registre de décision>
- **Type de décision :** <Opérationnelle / Stratégique / Constitutionnelle>
- **Mécanisme :** <mécanisme de vote / autorité déléguée>
- **Résumé :** <une à trois phrases décrivant ce qui a changé.>
- **Couches concernées :** <p. ex. Couche 2, Couche 5>
- **Artefacts modifiés :** <liste des artefacts>
- **Notes de migration :** <éventuelles règles de transition ; « aucune » si non applicable>
```

---

## Version actuelle : v0.0 — Dépôt initialisé

- **Date d'entrée en vigueur :** <AAAA-MM-JJ>
- **Registre de décision :** N/A — structure initiale
- **Type de décision :** N/A
- **Mécanisme :** N/A
- **Résumé :** Modèles initialisés. Tous les artefacts sont des modèles — aucune règle n'est encore adoptée.
- **Couches concernées :** Toutes (structure uniquement)
- **Artefacts modifiés :** Tous les fichiers créés en tant que modèles
- **Notes de migration :** Aucune — état initial

---

_Les nouvelles entrées sont ajoutées au-dessus de cette ligne._
