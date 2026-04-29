---
id: 6e32b102
title: Couche 6 - Évolution & Adaptation
parentId: a7759be1
order: 0
lang: fr
sourceHash: 9e7d7a30
---

**Comment le système change sans s'effondrer.**

### **Mécanismes de changement**

* Propositions
* Expérimentations
* Cycles de revue

### **Versionnage**

* Versions du protocole
* Chemins de migration

### **Capture des apprentissages**

* Rétrospectives
* Documentation des échecs

### **Artefacts**

* Protocole de changement
* Historique des versions

### **Invariants de la Couche**

* **Invariant 6.1 : Le changement est possible mais encadré**
  Aucun composant du système n'est figé pour toujours, mais aucun changement n'est instantané.
* **Invariant 6.2 : Les changements sont versionnés**
  Les modifications de règles DOIVENT être documentées, datées et traçables.
* **Invariant 6.3 : Les expérimentations sont réversibles**
  Toutes les expérimentations DOIVENT définir leur périmètre, leur durée et leurs conditions de retour en arrière.
* **Invariant 6.4 : Les apprentissages sont capturés**
  Les échecs majeurs et les adaptations DOIVENT être enregistrés et accessibles.

### **Règles d'explicitation**

#### **DOIT être explicite**

* Comment les règles changent
* Processus de versionnage et de revue
* Périmètre des expérimentations
* Mécanismes de retour en arrière

**Pourquoi :** les systèmes qui ne peuvent pas changer finissent par se dégrader ou exploser.

#### **PEUT être explicite**

* Fréquence des revues
* Clauses d'extinction
* Méthodes de collecte de retours

#### **DOIT rester optionnel**

* Rythme d'innovation
* Appétit pour le risque (dans certaines limites)
