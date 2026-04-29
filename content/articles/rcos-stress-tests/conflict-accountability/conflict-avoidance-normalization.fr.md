---
id: d5c6f351
title: Normalisation de l'évitement des conflits
parentId: 5c693112
order: 0
lang: fr
sourceHash: '83e86009'
---

**Mode de défaillance**

Les conflits sont étouffés pour préserver l'« harmonie ».

**Couches concernées**

Couche 4 (Conflit)

**Invariants pertinents**

* 4.1 Les conflits DOIVENT être traités

**Condition de test**

* Des conflits connus restent non traités indéfiniment.

**Comportement RCOS attendu**

* Le parcours obligatoire de résolution des conflits est déclenché.

**Critères de réussite**

* Le conflit entre dans un processus de résolution défini.

**Critères d'échec**

* L'évitement est normalisé.
