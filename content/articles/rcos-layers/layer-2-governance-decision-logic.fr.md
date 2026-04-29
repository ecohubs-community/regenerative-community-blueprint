---
id: a145ff34
title: Couche 2 – Gouvernance & Logique de décision
parentId: a7759be1
order: 0
lang: fr
sourceHash: d525d69f
---

**Comment les décisions sont prises, modifiées et appliquées.**

### **Types de décisions**

* **Opérationnelle**
  Décisions du quotidien ; réversibles ; faible risque.
* **Stratégique**
  Direction à moyen terme ; allocation des ressources ; partiellement réversible.
* **Constitutionnelle**
  Modifications des règles fondamentales, de la raison d'être ou des invariants ; seuil élevé.

### **Mécanismes**

Comment une décision est prise.
**Objectif :** faire correspondre le risque de la décision à la méthode de décision.

* Consentement (pas d'objection argumentée)
* Vote (majorité / supermajorité)
* Délégation (autorité liée au rôle)
* Proposition + examen + adoption

### **Limites d'autorité**

Qui peut décider.
**Objectif :** éviter la paralysie décisionnelle et la fuite de pouvoir.

* **Individu** – autonomie dans le cadre du rôle
* **Rôle** – responsabilités définies
* **Cercle / Domaine** – autorité délimitée
* **Communauté entière** – questions constitutionnelles

### **Artefacts**

* Matrice de décision
  * Prévient les débats sur *comment* décider
  * Rend l'autorité explicite
  * Réduit l'escalade émotionnelle
* Protocole de gouvernance (document juridique court)
  * Types de décisions & seuils
  * Rôles et domaines
  * Cycle de vie des propositions
  * Voies d'escalade et d'appel
  * Pouvoirs d'urgence (le cas échéant)

### **Invariants de la Couche**

* **Invariant 2.1 : Le type de décision précède le contenu de la décision**
  La manière dont une décision est prise DOIT être convenue *avant* ce qui est décidé.
* **Invariant 2.2 : L'autorité DOIT être explicite**
  Nul ne PEUT exercer un pouvoir de décision sans un rôle défini, un mandat ou un consentement.
* **Invariant 2.3 : Les règles constitutionnelles prévalent sur toutes les autres**
  Les décisions opérationnelles ou stratégiques ne peuvent pas supplanter les accords constitutionnels.
* **Invariant 2.4 : Les décisions sont réexaminables**
  Toutes les décisions DOIVENT être traçables jusqu'à leur autorité, leur méthode et leur enregistrement.

### **Règles d'explicitation**

#### **DOIT être explicite**

* Types de décisions (opérationnelle / stratégique / constitutionnelle)
* Qui décide quoi (limites d'autorité)
* Mécanismes de décision et seuils
* Voies d'escalade

**Pourquoi :** l'ambiguïté en matière de gouvernance équivaut à une hiérarchie informelle.

#### **PEUT être explicite**

* Style de facilitation des réunions
* Modèles de propositions
* Procédures d'urgence

#### **DOIT rester OPTIONNEL**

* Philosophie de gouvernance (consensus vs sociocratie, etc.)
* Tonalité émotionnelle des réunions
