---
id: 45a25135
title: 'Test de portée : violation d''une norme culturelle'
parentId: 45625035
order: 0
lang: fr
sourceHash: 26b305ed
---

**Mode de défaillance**

Un membre enfreint une norme culturelle forte (par ex., manger de la viande dans une communauté végane).

**Couches concernées**

Couche 0 (Raison d'être et portée), Couche 1 (Adhésion), Couche 4 (Conflit)

**Invariants pertinents**

* 0.2 Portée gouvernée explicite  
* 1.1 Pas de règles d'adhésion implicites  
* 4.4 La sécurité prime sur la participation

**Condition de test**

* Une violation de norme se produit.  
* La réponse d'application est floue ou motivée par l'émotion.

**Comportement RCOS attendu**

* Déterminer si la règle est :  
  * un invariant fondamental,  
  * une condition d'adhésion,  
  * ou une préférence hors du périmètre gouverné.  
* Appliquer une procédure régulière uniquement si la règle est explicitement gouvernée.

**Critères de réussite**

* La réponse est strictement alignée sur la portée déclarée et les règles d'adhésion.

**Critères d'échec**

* Sanction ou exclusion sans base réglementaire explicite.
