---
id: 4ffa600f
title: 8. Couche 6 — Évolution et adaptation
parentId: e6de7a5d
order: 80
lang: fr
sourceHash: 1329c3d9
---

La Couche 6 définit comment le système évolue sans s'effondrer.
Son objectif est de garantir que le changement est délibéré, encadré, réversible lorsque c'est approprié, et qu'il produit des apprentissages plutôt que des dommages cachés. L'évolution sous RCOS est traitée comme un processus gouverné, et non comme de l'improvisation.

## 8.1 Mécanismes de changement

8.1.1 La communauté DOIT définir des mécanismes de changement explicites pour modifier, ajouter, suspendre ou supprimer des règles, rôles, artefacts ou structures de décision.

8.1.2 Les mécanismes de changement DOIVENT explicitement distinguer entre :
- Les modifications permanentes de règles
- Les expérimentations limitées dans le temps telles que définies dans la Section 8.3

8.1.3 Chaque changement proposé DOIT spécifier, au minimum :
- Le(s) artefact(s), couche(s) et section(s) concerné(e)s
- Le type de décision et le chemin de décision autorisé tel que défini dans la Couche 2
- L'effet visé, la portée et les risques connus
- La date d'entrée en vigueur et toute période de transition
- Les exigences de migration pour les rôles, accords ou registres existants

8.1.4 Les changements affectant la finalité, la portée, les invariants ou les contraintes d'identité de la Couche 0 DOIVENT être classés comme changements constitutionnels et DOIVENT suivre le mécanisme de décision constitutionnel.

8.1.5 La communauté DOIT définir des mécanismes de révision explicites pour les changements adoptés, y compris la manière dont les changements sont évalués, révisés ou annulés lorsqu'ils produisent des préjudices, de l'instabilité ou une concentration involontaire du pouvoir.

## 8.2 Versionnement et autorité

8.2.1 Tous les changements adoptés DOIVENT être versionnés et traçables.

8.2.2 La communauté DOIT maintenir un **Historique des versions** qui enregistre, au minimum :
- L'identifiant de version
- La date d'adoption et la date d'entrée en vigueur
- La référence au registre de décision (autorité, mécanisme, seuil)
- Le résumé des changements
- Les notes de migration et les contraintes de compatibilité (le cas échéant)

8.2.3 À tout moment, la communauté DOIT être en mesure de déterminer sans ambiguïté :
- Quelle version est actuellement en vigueur
- Quels artefacts font autorité en matière de conformité

8.2.4 Les règles remplacées DOIVENT rester accessibles à des fins d'auditabilité, d'apprentissage et de résolution de conflits, accompagnées des dates pendant lesquelles elles étaient en vigueur.

8.2.5 Aucune modification de règle informelle, non documentée ou « implicitement convenue » NE PEUT être considérée comme valide.

## 8.3 Expérimentations

8.3.1 La communauté PEUT adopter des expérimentations en tant que déviations, extensions ou projets pilotes explicitement limités dans le temps et réversibles, destinés à l'apprentissage.

8.3.2 Chaque expérimentation DOIT définir, au minimum :
- La portée (ce qui est modifié et ce qui ne l'est explicitement pas)
- La durée et les points de contrôle de révision
- Les critères de succès et d'échec
- Les conditions de retour en arrière et le processus de retour en arrière
- Le chemin de décision autorisé pour démarrer, prolonger, modifier ou mettre fin à l'expérimentation

8.3.3 Les expérimentations NE DOIVENT PAS outrepasser les invariants de la Couche 0 et NE DOIVENT PAS contourner les contraintes de gouvernance définies dans la Couche 2.

8.3.4 Les expérimentations DOIVENT être explicitement étiquetées comme expérimentales dans tous les artefacts concernés et DOIVENT inclure une date d'expiration non prolongeable, sauf renouvellement par une décision autorisée.

8.3.5 Si une expérimentation introduit un risque pour la sécurité, de la coercition ou un préjudice durable, la communauté DOIT suspendre ou mettre fin à l'expérimentation immédiatement par une action protectrice, suivie d'une révision a posteriori.

## 8.4 Capture des apprentissages et des retours

8.4.1 Les échecs majeurs, les adaptations, les annulations et les apprentissages systémiques DOIVENT être documentés.

8.4.2 La capture des apprentissages DOIT inclure, au minimum :
- Ce qui s'est passé et pourquoi c'est important
- Quelles couches, règles ou artefacts étaient impliqués
- Ce qui a été modifié, tenté ou arrêté
- Quels signaux, preuves ou seuils ont déclenché l'action

8.4.3 Les registres d'apprentissage DOIVENT être accessibles conformément aux règles d'accès à l'information de la Couche 5.

8.4.4 Les schémas d'échec récurrents DOIVENT déclencher une révision structurelle plutôt qu'un blâme individuel.

## 8.5 Sécurité du changement et réversibilité

8.5.1 Le système DOIT privilégier les changements réversibles par rapport aux changements irréversibles lorsque c'est possible.

8.5.2 Les changements irréversibles ou à fort impact DOIVENT inclure :
- Des périodes prolongées de délibération ou de révision
- Des seuils de décision plus élevés lorsque c'est approprié
- Une reconnaissance explicite des risques

8.5.3 Les changements d'urgence NE PEUVENT être autorisés que lorsqu'ils sont explicitement définis, DOIVENT être limités dans le temps, NE DOIVENT PAS outrepasser les invariants de la Couche 0, et DOIVENT faire l'objet d'une révision a posteriori obligatoire suivie d'une ratification ou d'un retour en arrière.

## 8.6 Artefacts

8.6.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 6 :
- Protocole de changement
- Historique des versions
- Journal des apprentissages

8.6.2 Les artefacts de la Couche 6 DOIVENT être :
- Explicites et sans ambiguïté
- Versionnés
- Accessibles à tous les membres, avec des protections de confidentialité clairement délimitées
- Adoptés par un processus de gouvernance autorisé

8.6.3 Le Protocole de changement DOIT définir, au minimum :
- Comment les changements sont proposés, examinés, adoptés, publiés et rejetés
- Comment les propositions sont classées par type de décision
- Le contenu requis des propositions de changement
- Les attentes en matière de transition, de migration et de dépréciation
- Les mécanismes de révision, de modification et de retour en arrière
- Les dispositions relatives aux changements d'urgence, y compris des limites temporelles strictes et une révision obligatoire

8.6.4 L'Historique des versions DOIT définir :
- La structure faisant autorité pour les identifiants de version et les journaux de changements
- Comment les versions remplacées sont conservées et consultées
- Comment la version actuellement en vigueur est déterminée

8.6.5 Le Journal des apprentissages DOIT définir :
- Ce qui constitue un événement donnant lieu à un apprentissage
- Le format de documentation et la responsabilité
- La cadence de révision et de synthèse

## 8.7 Invariants de couche

8.7.1 Le changement DOIT être possible mais encadré ; aucun changement NE PEUT être instantané, implicite ou non révisable.

8.7.2 Tous les changements adoptés DOIVENT être versionnés, documentés et traçables.

8.7.3 Les expérimentations DOIVENT être limitées dans le temps, explicitement étiquetées et réversibles.

8.7.4 Les échecs majeurs et les adaptations DOIVENT être capturés comme apprentissages partagés, et non effacés ou dissimulés.

## 8.8 Règles d'explicitation

8.8.1 Les éléments suivants DOIVENT être explicites :
- Comment les règles changent et qui décide
- Les processus de versionnement, d'autorité et de révision
- La portée des expérimentations, leur durée et les conditions de retour en arrière
- Les conditions et limites des changements d'urgence

8.8.2 Les éléments suivants PEUVENT être explicites :
- La fréquence et la cadence de révision
- Les clauses de caducité
- Les méthodes de retour d'information et de détection

8.8.3 Les éléments suivants DOIVENT rester optionnels et hors du champ d'application :
- Le rythme d'innovation
- Les attitudes culturelles envers le risque dans les limites définies
