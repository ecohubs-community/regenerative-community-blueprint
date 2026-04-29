---
id: 69b4c289
title: 10. Conformité & Audit
parentId: e6de7a5d
order: 100
lang: fr
sourceHash: 49f7b7e9
---

Ce chapitre définit comment la conformité à RCOS-Core est évaluée et maintenue.

## 10.1 Liste de contrôle de conformité

10.1.1 La conformité à RCOS-Core est binaire : une communauté est soit conforme, soit non conforme.

10.1.2 La conformité DOIT être évaluée par couche (Couches 0–6).

10.1.3 Pour chaque couche, la Liste de contrôle de conformité DOIT vérifier :
- La présence des artefacts obligatoires  
- Le caractère explicite et l'accessibilité des règles requises  
- L'adoption via des processus de gouvernance autorisés  

10.1.4 Une conformité partielle ou une « intention de se conformer » NE DOIT PAS être considérée comme conforme.

10.1.5 Les Modules optionnels NE DOIVENT PAS être inclus dans l'évaluation de conformité à RCOS-Core.

## 10.2 Cas de test

10.2.1 Les Cas de test sont des scénarios structurés utilisés pour valider si les mécanismes RCOS fonctionnent comme prévu.

10.2.2 Les Cas de test PEUVENT être :
- Des scénarios hypothétiques  
- Des défaillances historiques de communautés  
- Des tests de résistance simulés  

10.2.3 Les Cas de test DEVRAIENT couvrir, au minimum :
- Les tentatives de concentration du pouvoir  
- Les scénarios de sortie et de séparation  
- Les blocages de gouvernance  
- Les tentatives de captation économique  
- Les conflits critiques pour la sécurité  

10.2.4 Les Cas de test sont informatifs mais DEVRAIENT être utilisés lors des audits, de l'intégration et des revues périodiques.

## 10.3 Non-conformité

10.3.1 Une communauté DOIT être considérée comme non conforme si :
- Un artefact obligatoire est manquant  
- Les invariants de la Couche 0 sont violés  
- Des décisions sont prises de manière répétée en dehors des structures de gouvernance autorisées  
- La sortie est bloquée ou informellement restreinte  

10.3.2 La non-conformité DOIT être explicitement reconnue dès qu'elle est détectée.

10.3.3 Une communauté PEUT retrouver la conformité uniquement par :
- Une action corrective  
- L'adoption formelle des artefacts manquants ou corrigés  
- La documentation de la remédiation  

10.3.4 Les revendications de conformité à RCOS DOIVENT être retirées pendant les périodes de non-conformité avérée.
