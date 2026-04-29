**RCOS — Système d'Exploitation de Communauté Régénérative**

# Spécification RCOS Core — v0.1

- **Généré:** 2026-04-29
- **Source (version la plus récente):** [https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1)

- Statut : Brouillon
- Version : RCOS-Core v0.1
- Public visé : Fondateurs de communautés, praticiens, auditeurs, implémenteurs
- Mots-clés normatifs : `DOIT`, `NE DOIT PAS`, `DEVRAIT`, `PEUT` (style RFC)

## Table des matières

- [À propos de RCOS Core](#-propos-de-rcos-core)
- [0. Introduction](#0-introduction)
- [1. Modèle de conformité RCOS](#1-modle-de-conformit-rcos)
- [2. Couche 0 — Identité & Périmètre](#2-couche-0-identit-primtre)
- [3. Couche 1 — Système d'adhésion](#3-couche-1-systme-dadhsion)
- [4. Couche 2 — Gouvernance & logique de décision](#4-couche-2-gouvernance-logique-de-dcision)
- [5. Couche 3 — Système économique et de ressources](#5-couche-3-systme-conomique-et-de-ressources)
- [6. Couche 4 — Conflit, réparation et responsabilité](#6-couche-4-conflit-rparation-et-responsabilit)
- [7. Couche 5 — Opérations & Coordination](#7-couche-5-oprations-coordination)
- [8. Couche 6 — Évolution et adaptation](#8-couche-6-volution-et-adaptation)
- [9. Sections non normatives](#9-sections-non-normatives)
- [10. Conformité & Audit](#10-conformit-audit)
- [11. Versionnement et gouvernance du standard](#11-versionnement-et-gouvernance-du-standard)
- [Annexe A — Glossaire](#annexe-a-glossaire)
- [Annexe B — Exemples d'artefacts (non normatif)](#annexe-b-exemples-dartefacts-non-normatif)
- [Annexe C — Résumé de l'implémentation de référence](#annexe-c-rsum-de-limplmentation-de-rfrence)

---

# À propos de RCOS Core

## Ce qu'est RCOS

Le **Regenerative Community Operating System (RCOS)** est une spécification formelle et stratifiée pour concevoir, exploiter et faire évoluer des communautés intentionnelles sans dépendre du charisme, de l'idéologie ou du pouvoir informel.

RCOS traite une communauté comme un **système gouverné**, et non comme une expérience sociale. Il définit les exigences structurelles minimales nécessaires pour qu'une communauté reste :

- cohérente sous tension,
- équitable face aux asymétries de pouvoir,
- adaptable sans s'effondrer,
- et régénérative dans le temps.

RCOS n'est ni un mode de vie, ni un système de croyances, ni une identité culturelle. C'est un **système d'exploitation** : un ensemble de règles explicites, d'interfaces, d'invariants et de cas de test qui rendent la vie communautaire lisible, auditable et viable.

---

## Quel problème RCOS résout

La plupart des communautés n'échouent pas à cause de mauvaises intentions. Elles échouent à cause d'une **structure implicite**.

Les schémas d'échec courants comprennent :

- des leaders informels qui contournent les processus formels,
- des normes tacites appliquées comme des règles,
- un travail invisible menant à l'épuisement,
- la richesse ou le charisme se transformant en pouvoir,
- les conflits évités jusqu'à ce qu'ils deviennent existentiels,
- les décisions d'urgence devenant des exceptions permanentes.

RCOS existe pour rendre ces modes d'échec **structurellement impossibles ou explicitement traitables**.

---

## Ce que RCOS n'est pas

RCOS ne prescrit explicitement **pas** :

- une culture, une croyance ou une spiritualité spécifique,
- une idéologie politique ou économique,
- une méthode de gouvernance (par ex. consensus vs sociocratie),
- ni la façon dont les gens _devraient_ vivre ensemble.

Au lieu de cela, RCOS contraint _la manière dont les choix sont faits_, _la manière dont le pouvoir est encadré_ et _la manière dont le changement se produit_, indépendamment des valeurs.

---

## Principes de conception (non négociables)

> **Rien d'essentiel ne PEUT rester implicite.**

- **Basé sur les contraintes, pas sur les valeurs** — Définit des règles et des limites au lieu de prescrire des croyances. Les valeurs varient ; les contraintes maintiennent les systèmes fonctionnels sous tension.
- **Pré-engagement plutôt qu'improvisation** — Les décisions critiques (conflit, pouvoir, argent) sont convenues avant que les émotions, la rareté ou les luttes de pouvoir ne surviennent.
- **Modulaire par défaut** — Le noyau reste stable tandis que des modules de domaine optionnels peuvent être ajoutés, remplacés ou supprimés sans casser le système.
- **À échelle humaine (≈ 5–150 personnes)** — Optimisé pour des groupes suffisamment petits pour maintenir la confiance, la responsabilité et un contexte partagé sans bureaucratie.
- **Tolérant aux défaillances, pas aveugle aux défaillances** — Suppose que les conflits, l'épuisement et les erreurs surviendront et fournit des chemins de récupération explicites.

Tout ce qui affecte les éléments suivants DOIT être explicitement déclaré, versionné et révisable :

- l'autorité
- l'adhésion
- les ressources
- les conflits
- l'évolution du système

- Le silence n'est jamais traité comme un consentement.
- La tradition n'est jamais traitée comme une autorité.
- L'urgence n'est jamais traitée comme une justification.

---

## Sur la taille du groupe : pourquoi ~150 ?

**150** ≈ Nombre de Dunbar : limite cognitive pour des relations sociales stables.

- **Communauté minimale viable (5–7 personnes) :**
  En dessous, la séparation des rôles et la résolution des conflits s'effondrent.
- **Plage horizontale optimale (8–40 personnes) :**
  Confiance élevée, faible bureaucratie, participation directe possible.
- **Taille maximale non segmentée (120–150 personnes) :**
  Au-delà, la gouvernance informelle échoue.

Le Noyau RCOS s'applique à toute taille, mais au-delà d'environ 150 personnes, des sous-structures obligatoires (cercles, domaines, quartiers) sont REQUISES.

---

## Pourquoi la structure du Noyau RCOS est importante

- Empêche la dominance des fondateurs
- Rend le pouvoir explicite
- Réduit les normes cachées
- Survit aux conflits
- Permet la réplication
- S'intègre proprement avec les outils DAO, _sans en dépendre_

---

## Ce qui n'est délibérément pas dans le Noyau RCOS

Ces éléments appartiennent à des **modules optionnels**, pas au noyau :

- Design en permaculture
- Philosophie éducative
- Pratiques spirituelles ou culturelles
- Idéologie politique
- Choix esthétiques ou de mode de vie

Le noyau gouverne la manière dont les décisions sont prises, pas quelles décisions doivent être prises.

---

## Invariants (s'appliquent à toutes les Couches)

### L'explicite l'emporte sur l'implicite

Si ce n'est pas écrit, convenu et versionné, **cela n'existe pas**.

### Pourquoi c'est important

Les invariants de Couche garantissent qu'aucune dose de bonne volonté, de charisme, d'urgence ou de consensus ne peut silencieusement éroder le système.

---

## La règle d'explicité RCOS (principe fondamental)

**Tout ce qui alloue du pouvoir, du risque, de la responsabilité ou des conditions de sortie DOIT être explicite.**

Tout ce qui exprime une préférence, un style ou une optimisation locale PEUT être optionnel.

### Explicite vs Optionnel par Couche

Nous utilisons trois catégories :

- **DOIT être explicite** → requis pour la conformité RCOS
- **PEUT être explicite** → recommandé mais dépendant du contexte
- **DOIT rester optionnel** → jamais imposé par le noyau

### Invariant inter-couches sur l'explicité

**Si quelque chose peut :**

- Retirer les droits de quelqu'un
- Engager le temps ou le travail de quelqu'un
- Contrôler des ressources partagées
- Réduire au silence la dissidence
- Empêcher la sortie

**Alors cela DOIT être explicite, documenté et révisable.**

Aucune exception.

Cette approche garantit que :

- RCOS ne **devient pas** bureaucratique
- Les communautés conservent leur liberté culturelle
- Seul le _risque structurel_ est régulé
- Les modules optionnels restent puissants, pas contraints

---

## Conception pilotée par les tests de résistance

RCOS est validé non par l'intention mais par la **résistance aux défaillances**.

La spécification inclut une suite croissante de **tests de résistance** dérivés d'effondrements communautaires réels, tels que :

- la domination en réunion
- le droit de veto du fondateur
- la privatisation des biens communs
- les cultures d'évitement des conflits
- l'autorité spirituelle charismatique
- les contournements de règles d'urgence

Une communauté est considérée alignée RCOS uniquement si elle peut **résister à ces scénarios sans recours à des solutions informelles**.

Presque chaque échec survient parce que :

**Quelque chose de puissant a été autorisé à rester implicite.**

RCOS transforme :

- Le pouvoir implicite → des rôles explicites
- Les valeurs implicites → des règles délimitées
- La punition implicite → une procédure régulière
- La propriété implicite → des droits déclarés

### Modes d'échec connus que RCOS est conçu pour prévenir

Voir [Tests de résistance RCOS](https://blueprint.ecohubs.community/fr/articles/rcos-stress-tests?id=6acbe9a7)

## Implémentations de référence

RCOS encourage de petites **communautés de référence** concrètes qui :

- implémentent explicitement les couches fondamentales,
- documentent les écarts et les échecs,
- et publient les enseignements pour enrichir le standard.

L'objectif n'est pas la perfection, mais l'**évolution par la transparence**.

---

## Pourquoi « Régénératif »

RCOS utilise le terme _régénératif_ délibérément.

Un système régénératif :

- ne repose pas sur une croissance constante,
- n'épuise pas ses membres,
- répare les dommages au lieu de les dissimuler,
- et se renforce en intégrant les échecs.

RCOS est conçu pour que **la tension produise de l'apprentissage**, pas de l'effondrement.

---

## À qui RCOS s'adresse

RCOS est destiné aux :

- communautés intentionnelles,
- écovillages et projets d'habitat partagé,
- coopératives et organisations basées sur les communs,
- expériences de vie collective à long terme,
- et tout groupe qui veut survivre à son propre succès.

RCOS est particulièrement utile pour les groupes qui partagent déjà des valeurs fortes — et veulent s'assurer que ces valeurs ne deviennent pas des outils de coercition.

---

## Comment utiliser RCOS

RCOS peut être utilisé comme :

- un **plan de conception** avant de fonder une communauté,
- un **cadre d'audit** pour les groupes existants,
- un **outil de test de résistance** en cas de conflit,
- ou un **langage commun** pour les conversations structurelles difficiles.

L'adoption peut être progressive. La conformité peut être partielle. Ce qui compte, c'est l'**explicité, pas la pureté**.

---

## L'affirmation fondamentale

> Les communautés n'échouent pas parce que les gens sont imparfaits.
> Elles échouent parce que les systèmes sont vagues.

RCOS existe pour remplacer le vague par la structure —
afin que le soin, l'autonomie et la régénération aient quelque chose de solide sur quoi s'appuyer.

---

## Journal des modifications

- [v0.1](https://blueprint.ecohubs.community/fr/articles/rcos-core/v0-1?id=e6de7a5d) — Version initiale


---

# 0. Introduction

## 0.1 Objectif du RCOS

Définit un système d'exploitation standardisé et modulaire pour les petites communautés intentionnelles, axé sur la résilience, l'équité et la régénération.

## 0.2 Portée du noyau

Cette spécification définit les **couches fondamentales obligatoires** requises pour la conformité au RCOS. Les pratiques spécifiques à un domaine sont exclues et traitées via des modules optionnels.

## 0.3 Principes de conception

- Basé sur les contraintes, pas sur les valeurs
- Pré-engagement plutôt qu'improvisation
- Modulaire par défaut
- À échelle humaine
- Tolérant aux défaillances

## 0.4 Définitions et terminologie

- Communauté
- Membre
- Rôle
- Domaine
- Communs
- Invariant
- Type de décision
- Conformité


---

# 1. Modèle de conformité RCOS

## 1.1 Niveaux de conformité

- Conforme à RCOS-Core
- RCOS-Core + modules (non normatif)

## 1.2 Exigence d'explicitation

Tout mécanisme affectant le pouvoir, les ressources, les obligations ou la sortie `DOIT` être explicite, documenté et vérifiable.

## 1.3 Méta-invariant

Si ce n'est pas écrit et adopté, cela n'existe pas.


---

# 2. Couche 0 — Identité & Périmètre

La Couche 0 définit l'identité constitutionnelle de la communauté. Elle établit ce que la communauté *est*, ce qu'elle *n'est pas*, et les contraintes non négociables sous lesquelles toutes les autres couches opèrent. Aucune règle, décision ou pratique des couches supérieures ne PEUT contredire la Couche 0.

## 2.1 Définition de la raison d'être

2.1.1 Une communauté DOIT définir exactement une raison d'être principale.

2.1.2 La raison d'être principale DOIT décrire la raison durable de l'existence de la communauté et NE DOIT PAS être un objectif à court terme, un projet ou une stratégie.

2.1.3 La raison d'être principale DOIT être stable dans le temps et NE DOIT être modifiée que par une décision constitutionnelle telle que définie dans la Couche 2 et exécutée via le processus de modification défini dans la Couche 6.

2.1.4 Des raisons d'être secondaires PEUVENT être définies, mais NE DOIVENT PAS entrer en conflit avec la raison d'être principale ni la supplanter.

2.1.5 Aucune action, décision ou allocation de ressources NE PEUT contredire matériellement la raison d'être principale déclarée.

## 2.2 Déclaration de périmètre

2.2.1 La communauté DOIT déclarer explicitement le périmètre de ce qu'elle gouverne.

2.2.2 La déclaration de périmètre DOIT inclure, au minimum :
- Les actifs gouvernés par la communauté
- Les domaines d'autorité décisionnelle
- Les activités et responsabilités sous contrôle collectif

2.2.3 La déclaration de périmètre DOIT lister explicitement ce qui est hors périmètre.

2.2.4 Tout ce qui n'est pas explicitement déclaré comme étant dans le périmètre DOIT être considéré comme hors périmètre.

2.2.5 La communauté NE DOIT PAS exercer d'autorité sur des personnes, des actifs ou des domaines déclarés hors périmètre.

## 2.3 Invariants

2.3.1 Les invariants sont des contraintes qui définissent ce qui NE DOIT PAS être violé tant qu'ils sont en vigueur.

2.3.2 Les invariants DOIVENT être explicitement listés et documentés.

2.3.3 Les invariants DOIVENT s'appliquer à travers toutes les couches du RCOS.

2.3.4 Aucune décision, rôle, processus ou mesure d'urgence NE PEUT outrepasser un invariant.

2.3.5 Si un conflit survient entre un invariant et toute autre règle, l'invariant DOIT prévaloir.

2.3.6 Les invariants NE PEUVENT être modifiés ou supprimés que par un processus de modification constitutionnelle tel que défini dans la Couche 2 et la Couche 6.

## 2.4 Contraintes d'identité

2.4.1 La communauté DOIT déclarer toute contrainte d'identité qui affecte matériellement la participation, le comportement ou la gouvernance.

2.4.2 Les contraintes d'identité PEUVENT inclure, sans s'y limiter :
- Les limites éthiques ou comportementales
- Les prérequis de participation
- Les contraintes culturelles ou écologiques non négociables

2.4.3 Les contraintes d'identité DOIVENT être vérifiables et applicables à travers des processus définis.

2.4.4 Les contraintes d'identité NE DOIVENT PAS être appliquées de manière implicite ou informelle.

## 2.5 Artefacts

2.5.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 0 :
- Charte de raison d'être
- Déclaration de périmètre
- Registre des invariants
- Registre des contraintes d'identité

2.5.2 Les artefacts de la Couche 0 DOIVENT être :
- Accessibles publiquement à tous les membres
- Versionnés
- Adoptés par un processus formel de ratification

2.5.3 Si les artefacts de la Couche 0 sont manquants, ambigus ou en contradiction interne, la communauté DOIT être considérée comme non conforme au RCOS-Core.


---

# 3. Couche 1 — Système d'adhésion

La Couche 1 définit comment les individus entrent dans la communauté, y participent et la quittent. Elle établit la relation explicite entre l'individu et le collectif, y compris les droits, les obligations et les procédures régulières. Aucune personne ne PEUT être traitée comme membre sans avoir passé par les mécanismes définis dans cette couche.

## 3.1 États d'adhésion

3.1.1 La communauté DOIT définir des états d'adhésion explicites.

3.1.2 Au minimum, les états d'adhésion suivants DOIVENT exister :
- Candidat
- Membre en période d'essai / probatoire
- Membre à part entière
- Membre sorti

3.1.3 Chaque état d'adhésion DOIT avoir des droits, des obligations et des limitations clairement définis.

3.1.4 Aucun individu NE PEUT détenir plusieurs états d'adhésion simultanément.

3.1.5 Aucun droit ni aucune obligation NE PEUT être présumé en dehors de l'état d'adhésion actuel de l'individu.

## 3.2 Entrée et intégration

3.2.1 L'entrée dans la communauté DOIT suivre un processus d'intégration explicite.

3.2.2 Le processus d'intégration DOIT inclure :
- L'examen de tous les artefacts RCOS-Core
- Le consentement explicite aux règles de la Couche 0 et de la Couche 1
- La déclaration de l'état d'adhésion initial

3.2.3 Les critères d'admission DOIVENT être explicites et documentés.

3.2.4 L'adhésion informelle, implicite ou rétroactive NE DOIT PAS être autorisée.

## 3.3 Période d'essai et évaluation

3.3.1 La communauté DOIT définir une période probatoire pour les nouveaux membres.

3.3.2 La période probatoire DOIT comporter :
- Une durée définie
- Des critères d'évaluation explicites
- Un processus de décision de transition clair

3.3.3 Pendant la période probatoire, les droits PEUVENT être limités mais les obligations DOIVENT être explicites.

3.3.4 L'absence de transition à l'issue de la période probatoire DOIT déclencher un processus de sortie ou de prolongation défini.

## 3.4 Droits et obligations

3.4.1 La communauté DOIT définir explicitement les droits des membres.

3.4.2 La communauté DOIT définir explicitement les obligations des membres.

3.4.3 Les droits et obligations DOIVENT être symétriques et proportionnels à l'état d'adhésion.

3.4.4 Aucune obligation NE PEUT être imposée sans un droit correspondant et documenté.

3.4.5 Les obligations NE DOIVENT PAS être ouvertes ou indéfinies.

## 3.5 Participation et contribution

3.5.1 Les attentes en matière de participation DOIVENT être explicitement définies.

3.5.2 Les formes acceptables de contribution DOIVENT être énumérées.

3.5.3 La substitution de participation (par exemple, l'externalisation du travail) DOIT être explicitement encadrée.

3.5.4 La non-participation persistante DOIT déclencher un processus de responsabilisation tel que défini dans la Couche 4.

## 3.6 Sortie et séparation

3.6.1 La sortie volontaire DOIT être possible à tout moment.

3.6.2 Les procédures de sortie DOIVENT être explicites, documentées et non punitives.

3.6.3 La sortie forcée DOIT suivre une procédure régulière et être traitée par les mécanismes de la Couche 4.

3.6.4 La sortie NE DOIT PAS entraîner la perte de droits au-delà de ceux explicitement liés à l'adhésion.

3.6.5 La séparation des actifs, des rôles et des responsabilités DOIT être définie avant la sortie.

## 3.7 Suspension et statut temporaire

3.7.1 La communauté PEUT définir des états de suspension temporaire.

3.7.2 Les conditions de suspension DOIVENT être explicites, limitées dans le temps et révisables.

3.7.3 La suspension NE DOIT PAS être utilisée comme substitut indéfini ou punitif à la sortie.

## 3.8 Artefacts

3.8.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 1 :
- Accord d'adhésion
- Protocole d'intégration
- Protocole de sortie et de séparation
- Registre des états d'adhésion

3.8.2 Les artefacts de la Couche 1 DOIVENT être :
- Explicites et non ambigus
- Versionnés
- Accessibles à tous les membres

3.8.3 L'absence, l'ambiguïté ou la violation systématique des artefacts de la Couche 1 DOIT entraîner la perte de la conformité RCOS-Core.


---

# 4. Couche 2 — Gouvernance & logique de décision

La Couche 2 définit comment les décisions collectives sont prises, qui est autorisé à les prendre et comment l'autorité est encadrée. La gouvernance sous RCOS est conçue pour rendre le pouvoir explicite, limité, révisable et réversible.

## 4.1 Types de décisions

4.1.1 Toutes les décisions collectives DOIVENT être classifiées dans exactement un des types de décision suivants :
- Décisions opérationnelles
- Décisions stratégiques
- Décisions constitutionnelles

4.1.2 Les décisions opérationnelles concernent le fonctionnement quotidien et l'exécution dans le cadre des règles existantes.

4.1.3 Les décisions stratégiques concernent l'orientation à long terme, l'allocation de ressources significatives ou la création/suppression de structures majeures.

4.1.4 Les décisions constitutionnelles concernent les modifications des invariants de la Couche 0, de la finalité, du périmètre ou du système de gouvernance lui-même.

4.1.5 Si une décision ne peut pas être clairement classifiée, elle DOIT être traitée par défaut selon le type de décision à plus fort impact.

## 4.2 Mécanismes de décision

4.2.1 Chaque type de décision DOIT disposer d'un mécanisme de prise de décision explicitement défini.

4.2.2 Les mécanismes de décision PEUVENT inclure, sans s'y limiter :
- Prise de décision par consentement
- Vote à la majorité
- Vote à la supermajorité
- Autorité déléguée
- Attribution aléatoire ou par rotation

4.2.3 Les mécanismes de décision DOIVENT spécifier :
- Les participants éligibles
- Les seuils de décision
- Les conditions de blocage ou de veto, le cas échéant
- Les contraintes de temps

4.2.4 Aucun mécanisme de décision informel ou ad hoc NE PEUT être utilisé pour les décisions collectives.

## 4.3 Limites de l'autorité

4.3.1 Toute autorité DOIT être attribuée à des rôles, cercles ou organes explicitement définis.

4.3.2 Les attributions d'autorité DOIVENT inclure :
- Le périmètre de l'autorité
- Les limites de l'autorité
- La durée ou le mandat, le cas échéant

4.3.3 Aucun individu ou organe NE PEUT exercer une autorité en dehors du périmètre qui lui a été explicitement attribué.

4.3.4 L'autorité NE DOIT PAS découler du charisme, de l'ancienneté, de la propriété ou d'une influence informelle.

4.3.5 L'autorité temporaire ou d'urgence DOIT être explicitement définie, limitée dans le temps et soumise à révision.

## 4.4 Matrice de décision

4.4.1 La communauté DOIT maintenir une matrice de décision en tant qu'artefact de gouvernance central.

4.4.2 La matrice de décision DOIT cartographier, au minimum :
- Le type de décision
- Le domaine de décision
- Le rôle ou organe autorisé
- Le mécanisme de décision
- Le seuil d'approbation
- Le chemin d'escalade

4.4.3 La matrice de décision DOIT être publiquement accessible à tous les membres.

4.4.4 Les décisions prises en dehors de la matrice de décision DOIVENT être considérées comme invalides.

## 4.5 Protocole de gouvernance

4.5.1 La communauté DOIT définir un protocole de gouvernance décrivant le cycle de vie complet d'une décision.

4.5.2 Le protocole de gouvernance DOIT inclure :
- Les exigences de soumission de proposition
- Le processus d'examen et de délibération
- L'exécution de la décision
- La documentation et la publication
- Les mécanismes d'appel et de révision

4.5.3 Le protocole de gouvernance DOIT définir comment les conflits entre décisions sont résolus.

4.5.4 Toutes les actions de gouvernance DOIVENT être documentées conformément aux règles de documentation de la Couche 5.

## 4.6 Garde-fous et modes de défaillance

4.6.1 Le système de gouvernance DOIT inclure des garde-fous contre :
- La concentration du pouvoir décisionnel
- Les vetos informels
- La capture de décisions par des sous-groupes
- L'enracinement de fondateurs ou de rôles

4.6.2 Les mécanismes de gouvernance DOIVENT permettre la contestation et la révision sans représailles.

4.6.3 Les défaillances persistantes de gouvernance DOIVENT déclencher un processus formel de révision ou un processus constitutionnel.

## 4.7 Artefacts

4.7.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 2 :
- Matrice de décision
- Protocole de gouvernance
- Registre des autorités

4.7.2 Les artefacts de la Couche 2 DOIVENT être :
- Explicites et non ambigus
- Versionnés
- Accessibles à tous les membres

4.7.3 L'absence, l'ambiguïté ou la violation systématique des artefacts de la Couche 2 DOIT entraîner la perte de la conformité RCOS-Core.


---

# 5. Couche 3 — Système économique et de ressources

La Couche 3 définit comment la valeur, les ressources et les obligations circulent au sein de la communauté.  
Son objectif est de rendre le pouvoir économique explicite, encadré, vérifiable et subordonné à la gouvernance, en empêchant l'accumulation cachée, la dépendance ou la coercition.

## 5.1 Ressources communes vs privées

5.1.1 Toutes les ressources comprises dans le périmètre gouverné déclaré DOIVENT être explicitement classifiées comme **communes** ou **privées**.

5.1.2 La communauté DOIT maintenir un registre unique, explicite et versionné des ressources gouvernées, incluant au minimum :
- Nom ou identifiant unique de la ressource  
- Classification (commune ou privée)  
- Intendant ou propriétaire (selon le cas)  
- Règles d'accès et d'utilisation  
- Contraintes de transfert, de vente ou de privatisation (le cas échéant)

5.1.3 Toute ressource non explicitement classifiée DOIT être traitée comme **non classifiée**, et la communauté NE DOIT PAS l'allouer, la grever, la monétiser ou la transférer tant que la classification n'a pas été effectuée par une décision autorisée.

5.1.4 Pour les ressources communes, la communauté DOIT définir explicitement :
- Les responsabilités d'intendance  
- L'organe ou le rôle décisionnel autorisé  
- Les obligations de maintenance  
- Les mécanismes de financement ou de contribution (le cas échéant)

5.1.5 Pour les ressources privées, la communauté NE DOIT PAS exercer d'autorité au-delà de ce qui est explicitement déclaré dans le périmètre, les accords d'adhésion ou les autres artefacts gouvernés.

## 5.2 Reconnaissance des contributions

5.2.1 La communauté DOIT définir explicitement quelles catégories de contributions sont reconnues. Celles-ci PEUVENT inclure, sans s'y limiter :
- Le travail  
- Le soin et le travail émotionnel  
- Le savoir et l'éducation  
- L'intendance et la maintenance  
- Le travail administratif ou de coordination  

5.2.2 La communauté DOIT définir un mécanisme de reconnaissance des contributions spécifiant :
- Ce qui constitue une contribution  
- Comment les contributions sont enregistrées ou reconnues  
- Qui peut enregistrer, valider ou contester des contributions  
- Si et comment la reconnaissance des contributions affecte l'accès aux ressources, privilèges ou obligations  

5.2.3 La communauté NE DOIT PAS dépendre structurellement d'un travail non rémunéré, invisible ou informel pour la survie du système sans définir explicitement les obligations, la reconnaissance ou les mécanismes de compensation correspondants.

5.2.4 Si des unités économiques internes sont utilisées (par ex. crédits-temps, points, jetons), le Protocole d'Économie Interne DOIT définir :
- Les règles d'émission  
- Les règles de transférabilité  
- Les mécanismes d'expiration, de décroissance ou de plafonnement (le cas échéant)  
- Les mécanismes de prévention de la fraude, de traitement des litiges et de correction  
- Les règles de confidentialité et de transparence pour les soldes et les transactions  

5.2.5 La reconnaissance des contributions NE DOIT PAS créer d'autorité décisionnelle implicite, de droit de veto ou d'influence sur la gouvernance au-delà de ce qui est défini dans la Couche 2.

## 5.3 Gestion de la trésorerie

5.3.1 La communauté DOIT définir explicitement quelles ressources sont détenues dans la trésorerie partagée et comment les frontières de la trésorerie s'articulent avec les ressources privées.

5.3.2 Les sources de revenus et toute interface de revenus externes DOIVENT être explicitement définies.

5.3.3 L'autorité de dépense DOIT être explicitement encadrée par :
- Des attributions d'autorité claires  
- Des seuils par montant et/ou catégorie  
- Des parcours d'approbation et d'escalade  
- Des exigences obligatoires de tenue de registres  

5.3.4 La transparence DOIT être la règle par défaut pour les soldes de trésorerie, les entrées, les sorties, les obligations et les engagements.

5.3.5 Toute exception à la transparence DOIT être explicitement définie, justifiée, limitée dans le temps, et NE DOIT PAS empêcher les membres de vérifier la conformité.

5.3.6 La communauté DOIT définir des politiques de réserve, de risque et de responsabilité, incluant :
- Les limites d'endettement  
- Les obligations à long terme  
- Les réserves de contingence (le cas échéant)

## 5.4 Contraintes d'accumulation

5.4.1 Les systèmes économiques internes DOIVENT empêcher la concentration illimitée d'influence ou de contrôle interne par le biais de ressources, de crédits ou d'obligations financières.

5.4.2 Si des unités internes existent, la communauté DOIT définir un ou plusieurs mécanismes de limitation de l'accumulation, qui PEUVENT inclure :
- Des plafonds  
- La décroissance ou l'expiration  
- La non-transférabilité  
- Des mécanismes de redistribution ou de taxation  
- Une validité limitée dans le temps  

5.4.3 Les mécanismes économiques NE DOIVENT PAS permettre aux membres de contourner les limites d'autorité de gouvernance définies dans la Couche 2, y compris par l'achat d'influence, la création de dépendance ou la conversion du pouvoir économique en autorité décisionnelle informelle.

5.4.4 La communauté DOIT définir des indicateurs vérifiables de risque de concentration économique et un mécanisme explicite pour ajuster les contraintes lorsque de tels risques sont détectés.

## 5.5 Artefacts

5.5.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 3 :
- Protocole d'Économie Interne  
- Règlement de Trésorerie  

5.5.2 Les artefacts de la Couche 3 DOIVENT être :
- Explicites et sans ambiguïté  
- Versionnés  
- Accessibles à tous les membres (avec des exceptions explicites et encadrées)  
- Adoptés par un processus de gouvernance autorisé  

5.5.3 Le Protocole d'Économie Interne DOIT définir, au minimum :
- Les catégories de contributions et les mécanismes de reconnaissance  
- Les frontières entre commun et privé et les règles d'allocation  
- Les unités internes (le cas échéant) et les contraintes d'accumulation  
- Les interfaces de revenus externes (le cas échéant)  
- Les mécanismes de résolution des litiges et de correction des registres économiques  

5.5.4 Le Règlement de Trésorerie DOIT définir, au minimum :
- Les sources de revenus  
- Les seuils d'autorité de dépense et les parcours d'approbation  
- Les exigences de transparence et de reporting (y compris les exceptions encadrées)  
- Les contraintes de réserve, de risque et d'endettement  
- Les règles relatives aux conflits d'intérêts pour les dépenses et les approvisionnements  

## 5.6 Invariants de couche

5.6.1 Les ressources partagées, les flux et les obligations DOIVENT être visibles par la communauté par défaut, avec uniquement des exceptions limitées et explicites.

5.6.2 Les ressources déclarées comme communes NE DOIVENT PAS être privatisées par une action informelle, implicite ou unilatérale.

5.6.3 La reconnaissance des contributions DOIT être explicite de sorte que le travail non rémunéré ou invisible ne soit pas structurellement requis pour la survie du système.

5.6.4 Les mécanismes économiques DOIVENT empêcher la concentration indéfinie d'influence interne.

## 5.7 Règles d'explicitation

5.7.1 Les éléments suivants DOIVENT être explicites :
- Les classifications commun vs privé  
- Les règles d'allocation et d'accès aux ressources partagées  
- Les limites d'autorité de dépense  
- Les règles de transparence  
- Les interfaces de revenus externes  

5.7.2 Les éléments suivants PEUVENT être explicites :
- Les modèles de valorisation des contributions  
- Les unités internes (jetons, heures, points)  
- Les catégories budgétaires et les structures comptables internes  

5.7.3 Les éléments suivants DOIVENT rester optionnels et hors périmètre :
- Les attitudes envers la richesse  
- Les résultats égalitaires vs différenciés  
- Les choix financiers personnels


---

# 6. Couche 4 — Conflit, réparation et responsabilité

La Couche 4 définit comment la communauté réagit lorsque la confiance, la coordination ou la sécurité se détériore.
Son objectif est de garantir que les conflits soient traités de manière explicite, équitable et sûre, tout en empêchant les abus de pouvoir, la normalisation des préjudices ou l'exclusion silencieuse.

## 6.1 Classification des conflits

6.1.1 La communauté DOIT définir un système explicite de classification des conflits qui soit connu, accessible et utilisable par tous les membres.

6.1.2 Au minimum, le système de classification DOIT inclure les classes suivantes :
- Conflits interpersonnels (entre individus)
- Conflits liés aux rôles (autorité, responsabilité ou litiges de mandat)
- Conflits structurels (incitations systémiques, règles ou problèmes d'allocation des ressources)
- Violations éthiques ou de limites (violations des normes déclarées, du périmètre ou des limites de sécurité)

6.1.3 Chaque classe de conflit DOIT définir explicitement :
- Les critères d'entrée (comment une situation est classée dans cette classe)
- La priorité de réponse attendue et les délais (le cas échéant)
- Les voies de résolution autorisées et requises
- Les exigences de documentation et les limites de confidentialité

6.1.4 Les conflits impliquant des risques crédibles pour la sécurité, de la coercition, des abus ou des menaces DOIVENT être classés comme **critiques pour la sécurité** et DOIVENT déclencher des mesures de protection renforcées telles que définies à la Section 6.3.

6.1.5 La classification erronée ou l'évitement de la classification DOIT être traité comme une défaillance de processus soumise à examen.

## 6.2 Voies de résolution

6.2.1 La communauté DOIT définir un processus minimum de résolution des conflits applicable à toutes les classes de conflits.

6.2.2 Le processus de résolution DOIT inclure une **échelle de résolution** clairement définie avec des étapes d'escalade explicites.

6.2.3 L'échelle de résolution DOIT définir, au minimum :
- Comment un conflit est signalé, enregistré et accusé de réception
- Comment les parties impliquées sont notifiées et invitées à participer
- Comment le refus, l'absence de réponse ou le retrait est géré
- Comment les médiateurs ou facilitateurs sont sélectionnés, remplacés ou récusés
- Les attentes temporelles pour chaque étape (le cas échéant)
- Les exigences de documentation et les règles d'accès
- Un processus d'examen des défaillances procédurales ou des blocages

6.2.4 Le processus de résolution DOIT être accessible sans exiger de statut social, d'ancienneté, de charisme ou de proximité informelle avec les décideurs.

6.2.5 Les conflits non résolus DOIVENT être escaladés par les voies de gouvernance définies sans contourner la Matrice de Décision définie à la Couche 2.

## 6.3 Mesures de protection

6.3.1 La communauté DOIT définir des mesures de protection explicites pour les conflits impliquant des asymétries de pouvoir, des relations de dépendance ou des risques pour la sécurité.

6.3.2 Les mesures de protection DOIVENT inclure des protections contre les représailles pour :
- Le signalement d'une préoccupation
- La demande de médiation
- La fourniture de témoignages ou de preuves
- La participation à un examen ou un appel

6.3.3 Lorsqu'un différentiel de pouvoir existe entre les parties, des mesures de protection renforcées DOIVENT être appliquées, ce qui PEUT inclure :
- Une facilitation indépendante ou externe
- Des canaux séparés de collecte, de documentation ou de communication
- La suspension ou la limitation temporaire de l'autorité liée au rôle
- Des seuils supplémentaires de preuves et d'examen avant les sanctions

6.3.4 Pour les conflits critiques pour la sécurité, la communauté DOIT définir des actions de protection immédiates pouvant être prises avant l'achèvement complet du processus, ce qui PEUT inclure :
- Des mesures de séparation temporaire
- Un accès restreint aux espaces ou ressources partagés
- La suspension temporaire de rôle
- Des délais d'escalade d'urgence

6.3.5 Les mesures de protection liées à la sécurité DOIVENT prévaloir sur les droits de participation, la continuité des rôles et la commodité opérationnelle.

## 6.4 Sanctions, réparation et séparation

6.4.1 La communauté DOIT définir un cadre explicite de sanctions et de réparation.

6.4.2 Les sanctions et les actions de réparation DOIVENT être :
- Proportionnelles à la violation
- Explicitement documentées
- Limitées dans le temps le cas échéant
- Révisables et susceptibles d'appel

6.4.3 Le cadre DOIT définir, au minimum :
- Les types de sanctions et de réparations disponibles
- Les conditions préalables et les normes de preuve
- Les rôles ou organes autorisés pour leur application
- Les mécanismes d'examen et d'appel
- Les conditions de rétablissement des droits, rôles ou participation

6.4.4 Les actions de séparation, de suspension ou d'exclusion DOIVENT suivre une procédure régulière et DOIVENT être conformes aux règles de sortie et de séparation définies à la Couche 1.

6.4.5 Les sanctions NE DOIVENT PAS être appliquées par exclusion informelle, pression sociale, silence ou retrait implicite de droits.

6.4.6 Les actions orientées vers la réparation DOIVENT être prioritaires par rapport aux actions punitives, sauf dans les cas critiques pour la sécurité.

## 6.5 Artefacts

6.5.1 Les artefacts suivants sont obligatoires pour la conformité à la Couche 4 :
- Échelle de résolution des conflits
- Protocole de responsabilité

6.5.2 Les artefacts de la Couche 4 DOIVENT être :
- Explicites et sans ambiguïté
- Versionnés
- Accessibles à tous les membres, avec des protections de confidentialité clairement délimitées
- Adoptés par un processus de gouvernance autorisé

6.5.3 L'Échelle de résolution des conflits DOIT définir, au minimum :
- Les entrées de classification des conflits et les seuils d'escalade
- Les étapes de résolution et les règles de sélection des facilitateurs
- Les limites de documentation et d'accès à l'information
- Les exceptions critiques pour la sécurité et les mesures de protection immédiates

6.5.4 Le Protocole de responsabilité DOIT définir, au minimum :
- Les mécanismes d'investigation, d'examen et de décision
- Les garanties de procédure régulière et les protections contre les représailles
- Les options de sanctions et de réparation avec des règles de proportionnalité
- Les voies d'appel, de supervision et d'escalade
- La coordination avec les processus de sortie et de séparation de la Couche 1

## 6.6 Invariants de la couche

6.6.1 Le conflit DOIT être traité comme une condition gérée avec des voies définies ; ignorer, supprimer ou normaliser un conflit non résolu DOIT être considéré comme une violation du système.

6.6.2 Les conflits impliquant des asymétries de pouvoir DOIVENT déclencher des mesures de protection renforcées.

6.6.3 La réparation et la restauration DOIVENT précéder la punition, sauf lorsque la sécurité immédiate est en jeu.

6.6.4 La sécurité physique, psychologique et celle des enfants DOIT prévaloir sur les droits de participation, la continuité des rôles et les préoccupations de réputation.

## 6.7 Règles d'explicitation

6.7.1 Les éléments suivants DOIVENT être explicites :
- Le système de classification des conflits
- Le processus minimum de résolution et d'escalade
- Les mesures de protection et les protections contre les représailles
- Les seuils de sanctions, de réparation et de séparation

6.7.2 Les éléments suivants PEUVENT être explicites :
- Les styles ou méthodologies de médiation
- Les préférences de sélection des facilitateurs au-delà des mesures de protection minimales
- Les pratiques restauratives ou réparatrices

6.7.3 Les éléments suivants DOIVENT rester optionnels et hors périmètre :
- Les normes d'expression émotionnelle
- Le cadrage thérapeutique, spirituel ou idéologique du conflit


---

# 7. Couche 5 — Opérations & Coordination

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


---

# 8. Couche 6 — Évolution et adaptation

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


---

# 9. Sections non normatives

Les sections de ce chapitre sont **informatives**, et non normatives.
Elles ne définissent pas d'exigences de conformité, mais fournissent des orientations, du contexte, des exemples et un support d'apprentissage pour les communautés, les personnes chargées de la mise en œuvre, les auditeurs et les gardiens du standard.

Rien dans cette section ne peut supplanter ou affaiblir les exigences définies dans les Couches 0 à 6.

## 9.1 Modules optionnels

9.1.1 Les modules optionnels sont des extensions spécifiques à un domaine qui s'appuient sur le RCOS-Core sans modifier ses couches obligatoires.

9.1.2 Les modules optionnels DOIVENT :
- Déclarer quelles couches RCOS ils étendent ou dont ils dépendent
- Indiquer explicitement tout rôle, règle ou artefact supplémentaire qu'ils introduisent
- NE PAS supplanter ou contredire les invariants de la Couche 0 ou les exigences du RCOS-Core

9.1.3 Les modules optionnels PEUVENT définir :
- Des pratiques spécifiques à un domaine
- Des contraintes ou standards supplémentaires
- Des modèles de gouvernance ou opérationnels spécialisés

9.1.4 Les domaines typiques des modules optionnels PEUVENT inclure, sans s'y limiter :
- La permaculture et la gestion régénérative des terres
- Les systèmes éducatifs alternatifs ou communautaires
- Les pratiques de santé, de soin et de bien-être
- Les pratiques culturelles ou spirituelles
- Les spécialisations économiques (par ex. coopératives, fiducies foncières, crédit mutuel)

9.1.5 L'adoption de modules optionnels DOIT suivre les mécanismes de changement définis dans la Couche 6.

9.1.6 Une communauté PEUT être conforme au RCOS-Core sans adopter aucun module optionnel.

## 9.2 Implémentations de référence

9.2.1 Une implémentation de référence est une communauté réelle qui documente publiquement la manière dont elle applique le RCOS-Core.

9.2.2 Les implémentations de référence sont **descriptives**, et non prescriptives.
Elles illustrent comment le RCOS peut être instancié, et non comment il doit l'être.

9.2.3 Une communauté PEUT se revendiquer comme implémentation de référence RCOS uniquement si elle :
- Est conforme au RCOS-Core
- Documente publiquement ses artefacts des Couches 0 à 6
- Indique clairement les écarts, expérimentations ou extensions

9.2.4 La documentation d'une implémentation de référence DEVRAIT inclure :
- Le contexte et l'échelle (taille, localisation, finalité)
- Les modules optionnels adoptés
- Les défis et échecs connus
- L'historique d'évolution et les adaptations majeures

9.2.5 Les implémentations de référence NE DOIVENT PAS être considérées comme des interprétations faisant autorité du standard.

## 9.3 Modes de défaillance connus

9.3.1 Les modes de défaillance connus documentent les schémas de rupture récurrents observés dans des communautés réelles.

9.3.2 Les modes de défaillance sont des **signaux informatifs**, et non des critères de conformité.

9.3.3 Les modes de défaillance PEUVENT inclure, sans s'y limiter :
- L'accumulation informelle de pouvoir
- La domination du fondateur ou du propriétaire foncier
- La dépendance au travail invisible ou genré
- La paralysie de gouvernance ou la surcharge de réunions
- Le blocage de sortie ou la coercition douce
- La captation économique par l'endettement ou le contrôle des actifs
- L'évitement des conflits menant à une fragmentation silencieuse

9.3.4 L'objectif de la documentation des modes de défaillance est de :
- Soutenir les tests de résistance des structures RCOS
- Améliorer les décisions de conception
- Permettre une détection précoce dans les communautés en activité

9.3.5 La documentation des modes de défaillance DEVRAIT indiquer quelles couches RCOS sont destinées à atténuer le schéma concerné.


---

# 10. Conformité & Audit

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


---

# 11. Versionnement et gouvernance du standard

Ce chapitre définit comment le RCOS lui-même évolue en tant que standard.

## 11.1 Intendance du standard

11.1.1 Le RCOS DOIT avoir un organisme ou un processus d'intendance identifiable.

11.1.2 Les responsabilités de l'intendant DOIVENT inclure :
- Maintenir la spécification canonique  
- Gérer les publications de versions  
- Organiser les matériaux de référence et d'apprentissage  
- Protéger les invariants de la Couche 0 du standard lui-même  

11.1.3 L'intendant NE DOIT PAS agir comme une autorité d'application auprès des communautés.

11.1.4 L'intendance du RCOS DOIT privilégier la clarté, la stabilité et les apprentissages issus du terrain plutôt que la pureté idéologique.

## 11.2 Processus de modification

11.2.1 Les modifications apportées au RCOS-Core DOIVENT suivre un processus de modification défini.

11.2.2 Le processus de modification DOIT inclure :
- Soumission de proposition  
- Période de revue publique et de retours  
- Mécanisme de décision et autorité décisionnelle  
- Versionnement et publication  

11.2.3 La compatibilité ascendante DEVRAIT être préservée dans la mesure du possible.

11.2.4 Les changements non rétrocompatibles DOIVENT être clairement signalés et justifiés.

11.2.5 Les versions remplacées du RCOS DOIVENT rester accessibles publiquement.

11.2.6 Le RCOS lui-même DOIT incarner les mêmes principes qu'il exige des communautés : explicité, autorité délimitée, réversibilité et apprentissage.


---

# Annexe A — Glossaire

Ce glossaire fournit des **définitions informatives** pour les termes clés utilisés dans l'ensemble de la spécification RCOS.  
Les entrées du glossaire n'introduisent pas de nouvelles exigences et ne remplacent pas les sections normatives.

**Redevabilité (Accountability)**  
L'attente que les rôles et les membres puissent être invités à expliquer leurs actions, résultats et conformité aux règles convenues, avec des mécanismes définis de revue et de correction.

**Protocole de redevabilité**  
Un artéfact définissant comment les violations, préjudices ou manquements répétés sont examinés, documentés et traités, y compris la procédure régulière, les garanties et les voies d'escalade.

**Artéfact**  
Un objet documenté et versionné (par ex. protocole, registre, charte) adopté par un processus autorisé et utilisé pour opérationnaliser les couches RCOS.

**Limite d'autorité**  
Les limites explicites dans lesquelles un rôle, un cercle ou un organe peut prendre des décisions ou agir.

**Protocole de changement**  
Un artéfact définissant comment les changements sont proposés, examinés, adoptés, publiés et annulés, y compris la classification des types de décision et les dispositions d'urgence.

**Communs**  
Ressources gouvernées collectivement selon des règles explicites d'intendance, d'accès et de décision.

**Communauté**  
Un groupe de personnes qui se coordonnent volontairement autour d'un objectif partagé, dans un périmètre défini et un système de gouvernance.

**Conformité**  
L'état de satisfaction de toutes les exigences obligatoires de RCOS-Core à travers les Couches 0 à 6.

**Échelle de résolution des conflits**  
Un processus de conflit par étapes définissant les étapes minimales de résolution et les seuils d'escalade, allant de la réparation de faible intensité à la revue de gouvernance et, si nécessaire, à la séparation.

**Décision constitutionnelle**  
Une décision qui modifie l'objectif, le périmètre, les invariants ou les contraintes d'identité de la Couche 0, ou le système de gouvernance lui-même.

**Matrice de décision**  
Un artéfact de gouvernance associant les types et domaines de décision aux rôles autorisés, mécanismes, seuils et voies d'escalade.

**Type de décision**  
Une classification des décisions (opérationnelle, stratégique, constitutionnelle) utilisée pour déterminer l'autorité et le processus.

**Procédure régulière (Due Process)**  
Les garanties minimales d'équité requises avant de restreindre des droits, d'appliquer des sanctions ou de déclencher une séparation, y compris les voies de notification, de revue et d'appel telles que définies.

**Changement d'urgence**  
Un changement limité dans le temps, adopté dans des conditions d'urgence explicitement définies, nécessitant une revue a posteriori et une ratification ou une annulation.

**Explicite**  
Écrit, adopté, accessible et vérifiable.  
Tout ce qui n'est pas explicite est considéré comme inexistant sous RCOS.

**Règle d'explicité**  
Le principe selon lequel les mécanismes attribuant le pouvoir, le risque, la responsabilité ou les conditions de sortie DOIVENT être écrits, adoptés et vérifiables.

**Expérimentation**  
Un changement limité dans le temps, réversible, adopté à des fins d'apprentissage et d'évaluation.

**Protocole de sortie et de séparation**  
Un artéfact définissant la sortie volontaire, la procédure régulière de sortie forcée, et la séparation des actifs, rôles, accès et obligations.

**Protocole de gouvernance**  
Un artéfact définissant le cycle de vie des décisions (proposition, délibération, adoption, documentation, revue) et la manière dont les conflits de gouvernance sont résolus.

**Dans le périmètre / Hors périmètre**  
Dans le périmètre désigne les personnes, actifs, domaines et activités explicitement gouvernés par la communauté. Hors périmètre désigne tout ce qui est explicitement exclu ou non déclaré dans le périmètre.

**Protocole d'économie interne**  
Un artéfact définissant la reconnaissance des contributions et tout mécanisme d'échange interne, y compris les contraintes d'accumulation et la correction des litiges.

**Invariant**  
Une contrainte non négociable qui ne PEUT pas être outrepassée tant qu'elle est en vigueur.

**Couche**  
Un domaine fonctionnel de RCOS qui définit un aspect spécifique du fonctionnement de la communauté.

**Journal d'apprentissage**  
Un artéfact consignant les échecs majeurs, adaptations, retours en arrière et leçons tirées, y compris les déclencheurs, les artéfacts affectés et les résultats.

**Membre**  
Une personne qui a explicitement intégré la communauté par le processus d'adhésion défini.

**Module optionnel**  
Une extension spécifique à un domaine qui s'appuie sur RCOS-Core sans modifier ses couches obligatoires.

**Registre**  
Un artéfact qui enregistre un ensemble d'entrées faisant autorité (par ex. rôles, ressources, statuts d'adhésion) avec une propriété claire, des règles de mise à jour et un historique de versions.

**Implémentation de référence**  
Une communauté réelle qui documente publiquement son application de RCOS-Core.

**Rôle**  
Un ensemble explicitement défini de responsabilités, d'autorité et de redevabilité, indépendant de la personne qui l'occupe.

**Critique pour la sécurité**  
Une situation dans laquelle la sécurité physique, psychologique ou celle des enfants est en danger, nécessitant des garanties renforcées et potentiellement une action protectrice immédiate.

**Sanction**  
Une restriction ou action corrective définie et documentée, appliquée par un processus autorisé, proportionnée à une violation et soumise à revue.

**Périmètre**  
Les domaines, actifs et activités explicitement déclarés sur lesquels la communauté exerce son autorité.

**Intendance**  
La responsabilité du soin, de la maintenance et de la gouvernance d'une ressource dans des limites définies.

**Trésorerie**  
L'ensemble des ressources partagées, soldes, obligations et engagements détenus selon des règles collectives.

**Règles de trésorerie**  
Un artéfact définissant comment les ressources de la trésorerie sont détenues, dépensées, rapportées, auditées et encadrées, y compris les seuils et les règles de conflit d'intérêts.

**Exception de transparence**  
Une limitation explicitement définie, justifiée et limitée dans le temps de l'accès à l'information, qui permet néanmoins l'audit de conformité.

**Historique de versions**  
Un artéfact enregistrant quelle version est en vigueur et documentant les changements adoptés, les dates d'entrée en vigueur et les références de décision.


---

# Annexe B — Exemples d'artefacts (non normatif)

Cette annexe fournit des **exemples illustratifs** d'artefacts référencés dans la spécification.  
Les exemples sont donnés à titre informatif uniquement et ne doivent pas être considérés comme des formats ou des implémentations obligatoires.

## B.1 Exemple de charte de finalité (extrait)

- Finalité principale (unique) : « Entretenir et prendre soin d'un lieu de vie partagé et régénératif offrant un logement stable et une restauration écologique. »
- Finalités secondaires (délimitées) :
  - « Gérer un petit programme éducatif sur les pratiques régénératives. »
  - « Exploiter une coopérative détenue par les membres pour la production alimentaire locale. »
- Non-objectifs / exclusions :
  - « Pas un parti politique. »
  - « Pas un collectif de projet à court terme. »
  - « Pas un véhicule immobilier à but lucratif. »
- Conditions de modification de la finalité :
  - « Les modifications de finalité nécessitent une décision constitutionnelle et une re-ratification complète. »
- Registre de ratification :
  - Adopté : 2026-01-01
  - Type de décision : Constitutionnel
  - Version : 0.3
  - Lien vers le registre de décision : [placeholder]

## B.2 Exemple de déclaration de périmètre (extrait)

- Actifs inclus dans le périmètre :
  - Parcelle de terrain « North Field »
  - Bâtiments : « Common House », « Workshop »
  - Fonds partagés : trésorerie d'exploitation, fonds de réserve
  - Infrastructure partagée : système d'eau, installation solaire, véhicules partagés
- Domaines d'autorité inclus dans le périmètre :
  - Règles de gouvernance et processus de décision (Couche 2)
  - Règles d'adhésion et états (Couche 1)
  - Trésorerie et allocation des ressources partagées (Couche 3)
  - Coordination opérationnelle pour le travail partagé (Couche 5)
- Domaines hors périmètre :
  - Revenus personnels, dettes privées et comptes bancaires privés
  - Relations privées et espaces de vie privés (sauf conditions critiques pour la sécurité)
  - Entreprises hors site n'utilisant pas les actifs de la communauté

## B.3 Exemple de matrice de décision (extrait)

| Domaine de décision | Type de décision | Organe autorisé | Mécanisme | Seuil | Escalade |
|----------------|--------------|-----------------|-----------|-----------|------------|
| Approbation du budget (annuel) | Stratégique | Cercle Finance | Consentement | Aucune objection | Cercle Général |
| Dépense d'urgence ≤ 500 | Opérationnel | Trésorier·ère | Autorité déléguée | N/A | Cercle Finance |
| Dépense 501–5 000 | Stratégique | Cercle Finance | Vote | Majorité | Cercle Général |
| Ajouter/supprimer un invariant fondamental | Constitutionnel | Cercle Général | Vote | Supermajorité (80 %) | Révision constitutionnelle |
| Nomination à un rôle | Opérationnel | Responsable de Cercle | Consentement | Aucune objection | Cercle de Gouvernance |

## B.4 Exemple de protocole d'économie interne (extrait)

- Catégories de contribution reconnues :
  - Travail (maintenance, construction, production alimentaire)
  - Soin (garde d'enfants, soins aux personnes âgées, soutien en cas de conflit)
  - Savoir (formation, documentation, facilitation)
  - Intendance (entretien des ressources, supervision des achats)
- Mécanisme d'enregistrement :
  - Journal de contribution hebdomadaire soumis par les membres
  - Revue mensuelle par le Cercle des Opérations pour vérification et corrections
- Unités internes (optionnel) :
  - « Crédits-temps » comptabilisés en heures pour certaines allocations partagées
- Contraintes d'accumulation (si des unités internes existent) :
  - Plafonds de solde
  - Expiration après 12 mois sauf renouvellement par revue
- Litige et correction :
  - Tout membre peut demander la révision d'un enregistrement dans un délai de 30 jours
  - Les corrections nécessitent une justification documentée et sont consignées dans un historique des modifications

## B.5 Exemple d'échelle de résolution des conflits (extrait)

1. Conversation directe (réparation informelle)  
2. Médiation facilitée (facilitateur·rice neutre sélectionné·e à partir d'une liste approuvée)  
3. Prise en charge de la responsabilisation (prise en charge documentée ; mesures anti-représailles activées)  
4. Examen de responsabilisation (conclusions, plan de réparation et réponses proportionnelles)  
5. Décision de gouvernance (si l'autorité, l'accès ou les rôles doivent changer)  
6. Processus de séparation (si nécessaire ; coordonné avec le protocole de sortie et de séparation de la Couche 1)

## B.6 Exemple de modèle de proposition de changement (extrait)

- Titre du changement :
- Résumé (1 à 3 phrases) :
- Couches et artefacts concernés (liens) :
- Type de changement :
  - Changement permanent / Expérimentation
- Type de décision et voie de décision autorisée (référence à la matrice de décision) :
- Justification :
- Risques et mesures d'atténuation :
- Plan de transition et de migration :
- Plan de retour en arrière et déclencheurs de retour en arrière :
- Date d'entrée en vigueur et date de revue :

## B.7 Exemple d'accord d'adhésion (extrait)

- État d'adhésion à la signature : Essai / Plein
- Droits des membres (exemples) :
  - Accès aux registres de décision définis comme transparents
  - Droits de participation selon le type de décision
  - Une voie de sortie définie à tout moment
- Obligations des membres (exemples) :
  - Attentes de contribution telles que définies par le rôle et l'état d'adhésion
  - Respect des invariants déclarés et des règles de sécurité
  - Participation aux processus minimum d'intégration et de revue
- Référence au processus équitable :
  - « Toute sortie forcée ou restriction d'accès suit le processus équitable de la Couche 4 et le protocole de sortie. »

## B.8 Exemple de protocole d'intégration (extrait)

1. Fournir l'accès aux artefacts RCOS (Couches 0 à 6) et aux modules locaux
2. Confirmer le consentement explicite aux artefacts de la Couche 0 et de la Couche 1
3. Attribuer l'état d'adhésion initial et un·e parrain/marraine d'intégration
4. Compléter l'orientation sur les processus de sécurité et de résolution des conflits
5. Passer en revue les limites du périmètre et ce qui est hors périmètre
6. Enregistrer l'achèvement de l'intégration dans le registre des membres

## B.9 Exemple d'entrée dans le registre des rôles (extrait)

- Nom du rôle : Trésorier·ère
- Finalité : Tenir les registres de trésorerie et exécuter les paiements autorisés
- Périmètre d'autorité :
  - Exécuter des paiements ≤ 500 dans les catégories approuvées
- Limites :
  - Aucune autorité pour approuver des budgets ou modifier les règles de transparence
- Mandat :
  - 6 mois, renouvelable une fois sans revue
- Redevabilité :
  - Rapport de trésorerie mensuel publié ; contrôle d'audit trimestriel
- Nomination/révocation :
  - Nommé·e par le Cercle Finance ; révocable par revue du Cercle de Gouvernance

## B.10 Exemple de règlement de trésorerie (extrait)

- Transparence :
  - Bilan mensuel et synthèse des flux de trésorerie publiés à l'ensemble des membres
- Seuils de dépenses :

| Montant | Type de décision | Organe autorisé | Mécanisme |
|---:|---|---|---|
| ≤ 500 | Opérationnel | Trésorier·ère | Délégué |
| 501–5 000 | Stratégique | Cercle Finance | Vote à la majorité |
| > 5 000 | Stratégique | Cercle Général | Vote à la majorité |
| Dette / obligation à long terme | Constitutionnel | Cercle Général | Supermajorité |

- Conflit d'intérêts :
  - Un·e demandeur·euse ne peut pas approuver sa propre demande de dépense

## B.11 Exemple de modèle de réunion (extrait)

- Type de réunion : Opérations
- Date/heure :
- Facilitateur·rice :
- Participant·es :
- Ordre du jour :
  1. Tour de parole (temps limité)
  2. Revue des dernières actions
  3. Mises à jour opérationnelles
  4. Décisions (le cas échéant)
  5. Prochaines actions et responsables
- Registre de décision (si utilisé) :
  - Type de décision :
  - Autorité :
  - Mécanisme/seuil :
  - Résultat :
  - Date d'entrée en vigueur :

## B.12 Exemple d'entrée dans le journal d'apprentissage (extrait)

- Date :
- Événement déclencheur :
- Ce qui s'est passé (récit court) :
- Couches/artefacts impliqués :
- Signaux ayant déclenché l'action :
- Ce qui a changé (ou ce qui a été tenté) :
- Résultat après revue :
- Responsable de l'action de suivi et date d'échéance :


---

# Annexe C — Résumé de l'implémentation de référence

Cette annexe définit une **structure de documentation recommandée** pour les communautés qui souhaitent se présenter comme des implémentations de référence RCOS. L'objectif est de rendre l'adoption auditable, comparable et instructive sans impliquer une approbation.

## C.1 Contexte de la communauté

- Nom et localisation
- Taille et échelle (par ex., 12 membres ; 3 foyers ; 25 hectares)
- Objectif principal (Couche 0)
- Date de fondation et date d'adoption du RCOS (si différente)
- Forme(s) juridique(s) pertinente(s) (le cas échéant)
- Point de contact public

## C.2 Aperçu de l'adoption du RCOS

- Version de RCOS-Core utilisée
- Référence du procès-verbal de décision d'adoption (autorité, mécanisme, date)
- Résumé des modules optionnels adoptés (le cas échéant), incluant :
  - Nom et périmètre du module
  - Date d'adoption
  - Lien vers la spécification du module
  - Dépendances de couches déclarées

## C.3 Résumé couche par couche

Pour chaque couche (0–6) :
- Artefacts implémentés (avec liens)
- Écarts ou adaptations (avec liens)
- Défis connus et modes de défaillance rencontrés

Format recommandé :

| Couche | Artefacts requis implémentés | Lien(s) public(s) | Version/date | Notes |
|---:|---|---|---|---|
| 0 | Charte de raison d'être ; Déclaration de périmètre ; Registre des invariants | [placeholder] | v0.3 / 2026-01-01 | Raison d'être stable ; invariants révisés trimestriellement |
| 1 | Accord d'adhésion ; Protocole d'intégration ; Protocole de sortie et de séparation ; Registre des statuts d'adhésion | [placeholder] | v1.1 / 2026-02-15 | La période d'essai est de 3 mois |
| 2 | Matrice de décision ; Protocole de gouvernance ; Registre des autorités | [placeholder] | v0.8 / 2026-03-10 | Consentement pour les opérations, vote pour le stratégique |
| 3 | Protocole d'économie interne ; Règlement de trésorerie | [placeholder] | v0.5 / 2026-03-20 | Rapports de trésorerie mensuels publiés |
| 4 | Échelle de résolution des conflits ; Protocole de redevabilité | [placeholder] | v0.6 / 2026-04-01 | Politique anti-représailles incluse |
| 5 | Manuel opérationnel ; Registre des rôles ; Modèles de réunion | [placeholder] | v0.4 / 2026-04-15 | Charge de réunion plafonnée à 4h/semaine |
| 6 | Protocole de changement ; Historique des versions ; Journal d'apprentissage | [placeholder] | v0.2 / 2026-05-01 | Les expérimentations expirent si elles ne sont pas renouvelées |

## C.4 Gouvernance et évolution

- Mécanismes de décision en usage (avec extrait de la matrice de décision ou lien)
- Historique des changements et expérimentations (avec liens vers les procès-verbaux de changement)
- Principaux apprentissages et échecs (avec liens vers les entrées du journal d'apprentissage)
- Registre des écarts (recommandé) :

| Élément | Couche(s) | Type | Statut | Début | Révision/Fin | Lien |
|---|---|---|---|---|---|---|
| Essai de facilitation tournante | 5 | Expérimentation | Actif | 2026-06-01 | 2026-08-01 | [placeholder] |
| Exception de transparence de trésorerie (sécurité) | 3/4 | Permanent | Actif | 2026-04-10 | Révision annuelle | [placeholder] |


## C.5 Déclaration de conformité
- Statut de conformité actuel : Conforme / Non conforme / Inconnu
- Date du dernier auto-audit ou audit externe
- Méthode d'audit (auto-audit vs externe)
- Périodes de non-conformité connues (le cas échéant) et résumé des mesures correctives
- Liens de preuves (recommandé) :

| Preuve | Date | Lien |
|---|---:|---|
| Résultat de la checklist couche par couche | 2026-07-01 | [placeholder] |
| Notes / conclusions d'audit | 2026-07-01 | [placeholder] |
| Journal des mesures correctives | 2026-07-15 | [placeholder] |
- Périodes de non-conformité connues (le cas échéant)  

## C.6 Transparence publique
- Index des artefacts publics (recommandé) :

| Artefact | Couche | Lien public | Version/date | Notes |
|---|---:|---|---:|---|
| Charte de raison d'être | 0 | [placeholder] | 2026-01-01 | |
| Matrice de décision | 2 | [placeholder] | 2026-03-10 | |
| Rapports de trésorerie | 3 | [placeholder] | 2026-06-30 | mensuel |
| Journal d'apprentissage | 6 | [placeholder] | 2026-06-15 | caviardages signalés |

- Canal de contact ou de demande de renseignements
- Déclaration explicite de ce qui est privé et public, et pourquoi
- Lien vers la version actuelle de RCOS-Core utilisée et le journal des modifications
- Canal de contact ou de demande de renseignements  

---

## Note informative

Les implémentations de référence sont des instruments d'apprentissage, pas des approbations.

