---
id: 488558d6
title: 7. Couche 5 — Opérations & Coordination
parentId: e6de7a5d
order: 70
lang: fr
sourceHash: abb85f16
---

La Couche 5 définit comment le travail quotidien, la coordination et les flux d'information fonctionnent en pratique.  
Son objectif est de garantir que les opérations restent lisibles, durables et transférables, et ne s'effondrent pas en hiérarchie informelle, en dépendance ou en épuisement.

## 7.1 Rôles et responsabilités

7.1.1 Toutes les responsabilités continues DOIVENT être assignées à des rôles explicites et nommés plutôt qu'à des attentes implicites ou des accords informels.

7.1.2 La communauté DOIT maintenir un **Registre des rôles** qui inclut, au minimum :
- Nom et raison d'être du rôle  
- Périmètre de responsabilité et autorité décisionnelle  
- Limites explicites et interfaces avec les autres rôles, cercles ou domaines  
- Critères d'éligibilité (le cas échéant)  
- Durée du mandat, rotation ou conditions de révision (le cas échéant)  
- Processus de nomination, d'évaluation et de révocation  

7.1.3 Chaque rôle DOIT inclure un mécanisme de redevabilité explicite définissant :
- Comment la performance du rôle est évaluée  
- Comment la sous-performance, la surcharge ou la défaillance du rôle est traitée  
- Comment la passation et le transfert de connaissances s'effectuent  

7.1.4 Aucune responsabilité continue NE PEUT exister sans un rôle explicite, et aucune personne NE PEUT être tenue responsable de responsabilités qui ne sont pas formellement assignées à un rôle.

7.1.5 Les responsabilités temporaires ou ponctuelles DOIVENT être explicitement limitées dans le temps et NE DOIVENT PAS devenir continues sans une définition formelle de rôle.

## 7.2 Système de réunions

7.2.1 La communauté DOIT définir des types de réunions explicites suffisants pour couvrir :
- Les opérations  
- La gouvernance  
- La coordination et l'alignement  
- La réflexion et l'apprentissage  
- Le traitement des conflits (tel que requis par la Couche 4)

7.2.2 Chaque type de réunion DOIT définir, au minimum :
- L'objectif et le périmètre décisionnel  
- Les participants obligatoires et facultatifs  
- La cadence et les limites de durée  
- Le rôle de facilitation et le processus de sélection ou de rotation  
- La structure de l'ordre du jour  
- Les exigences de documentation et de publication  
- Les exigences de consignation des décisions lorsque des décisions sont prises  

7.2.3 Les réunions NE DOIVENT PAS dépasser leur périmètre décisionnel déclaré ni contourner les limites d'autorité définies dans la Couche 2.

7.2.4 La charge de réunions DOIT être limitée, suivie et révisable tel que défini dans la Section 7.4.

## 7.3 Documentation et flux d'information

7.3.1 La communauté DOIT définir des règles de documentation explicites pour les décisions, les rôles, les opérations et les obligations partagées.

7.3.2 Les règles de documentation DOIVENT spécifier, au minimum :
- Quelles informations DOIVENT être consignées  
- Où les enregistrements sont stockés  
- Qui a accès à quels enregistrements  
- Les délais de publication ou de notification (le cas échéant)  
- Les limites de confidentialité et les conditions d'accès restreint  

7.3.3 Toutes les décisions DOIVENT être traçables jusqu'à :
- Le type et le domaine de décision  
- Le rôle ou l'organe autorisé  
- Le mécanisme de décision et le seuil  
- Le résultat consigné et la date d'entrée en vigueur  

7.3.4 Les processus opérationnels critiques DOIVENT être documentés de telle sorte que la continuité ne dépende pas de connaissances tacites détenues par des individus spécifiques.

7.3.5 Les flux d'information DOIVENT être conçus pour prévenir le verrouillage d'accès, les goulets d'étranglement ou la dépendance à des intermédiaires informels.

## 7.4 Limites de charge de travail et de capacité

7.4.1 Le temps, l'attention, la capacité de coordination et le travail émotionnel DOIVENT être traités comme des ressources finies et limitées.

7.4.2 La communauté DOIT définir des limites de charge de travail explicites, incluant :
- Des limites sur la charge de réunions (fréquence, durée ou temps total)  
- Des limites sur la charge de rôles (nombre de rôles, périmètre ou heures attendues)  
- Des attentes concernant les délais de réponse et la disponibilité (le cas échéant)  
- Des mécanismes de renégociation, de relève, de substitution ou de redistribution  

7.4.3 Les limites de charge de travail DOIVENT être révisables et ajustables via un processus de gouvernance autorisé.

7.4.4 La surcharge persistante, le risque d'épuisement, la non-participation chronique ou la dépendance à des individus en sur-fonctionnement DOIVENT déclencher des processus de révision ou de réparation tels que définis dans la Couche 4.

## 7.5 Continuité opérationnelle

7.5.1 La communauté DOIT garantir qu'aucun individu ne constitue un point de défaillance unique critique pour les opérations essentielles.

7.5.2 Les rôles et processus opérationnels essentiels DOIVENT inclure :
- Des procédures documentées  
- Des mécanismes de passation clairs  
- Des dispositifs de secours ou de redondance lorsque cela est faisable  

7.5.3 La planification de la continuité opérationnelle DOIT être révisée périodiquement.

## 7.6 Artefacts

7.6.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 5 :
- Manuel opérationnel  
- Registre des rôles  
- Modèles de réunions  

7.6.2 Les artefacts de la Couche 5 DOIVENT être :
- Explicites et non ambigus  
- Versionnés  
- Accessibles à tous les membres, avec des protections de confidentialité clairement délimitées  
- Maintenus comme des documents vivants avec une propriété et des cycles de révision définis  

7.6.3 Le Manuel opérationnel DOIT définir, au minimum :
- Les processus opérationnels essentiels sur lesquels la communauté s'appuie  
- Les interfaces entre les rôles, les domaines et les types de réunions  
- Les emplacements de documentation et les procédures de mise à jour  

7.6.4 Les Modèles de réunions DOIVENT définir, au minimum :
- La structure de l'ordre du jour  
- Le format des notes et des comptes-rendus  
- Le format de consignation des décisions le cas échéant  

## 7.7 Invariants de couche

7.7.1 Les responsabilités continues NE DOIVENT PAS exister sans un rôle explicite.

7.7.2 Les processus opérationnels critiques NE DOIVENT PAS reposer uniquement sur la mémoire individuelle, la bonne volonté ou la transmission informelle.

7.7.3 La charge de réunions, le poids de la coordination et le travail non rémunéré ou invisible DOIVENT être limités et révisables.

7.7.4 Les règles d'accès à l'information DOIVENT être explicites et applicables.

## 7.8 Règles d'explicitation

7.8.1 Les éléments suivants DOIVENT être explicites :
- Les rôles et responsabilités  
- Les limites d'autorité opérationnelle et les interfaces  
- Les types et périmètres de réunions  
- Les règles de documentation des décisions  
- Les limites d'accès à l'information et de confidentialité  

7.8.2 Les éléments suivants PEUVENT être explicites :
- La cadence détaillée des réunions au-delà des contraintes minimales  
- Les choix d'outils pour la documentation et la coordination  
- Les calendriers de rotation ou de succession des rôles  

7.8.3 Les éléments suivants DOIVENT rester optionnels et hors périmètre :
- Les styles de travail personnels  
- Les préférences esthétiques ou culturelles  
- La coordination sociale informelle
