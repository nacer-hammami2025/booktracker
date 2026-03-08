# Cahier de Charges — Projet de Fin d'Année

## Application de Suivi de Lecture — **BookTracker**

---

| **Information** | **Détail** |
|-----------------|------------|
| **Étudiant** | Mohamed Nacer Hammami |
| **Date** | 24 Février 2026 |
| **Durée** | 8 semaines (2 mois) |
| **Méthodologie** | Scrum — 4 sprints × 2 semaines |
| **Architecture** | Microservices (4 services + API Gateway) |
| **Déploiement** | Docker Compose |

---

## 1. Contexte et Motivation

Étant moi-même un lecteur passionné, j'ai identifié les difficultés rencontrées pour organiser mes lectures, suivre ma progression et découvrir de nouveaux livres. **BookTracker** est une application web en architecture microservices permettant de gérer sa bibliothèque, suivre ses lectures, définir des objectifs et recevoir des recommandations personnalisées.

---

## 2. Objectifs

**Fonctionnels :** Gestion bibliothèque (statuts : lu/en cours/à lire), suivi progression (pages lues, barres visuelles), recommandations personnalisées (genres), critiques/notes, objectifs annuels, statistiques et graphiques.

**Pédagogiques :** Maîtriser microservices (Spring Cloud), approfondir full-stack (React + Spring Boot), appliquer Scrum, comprendre Docker/conteneurisation.

---

## 3. Architecture Microservices

### Vision Globale

```
Frontend React → API Gateway (8080) → 4 Services Backend
                                       ↓
                        [auth-service] [book-service] 
                        [tracker-service] [reco-service]
                                       ↓
                           PostgreSQL (1 DB/service) + Redis
```

### Services

| Service | Port | Responsabilité |
|---------|------|----------------|
| **api-gateway** | 8080 | Routage, validation JWT, CORS |
| **auth-service** | 8081 | Authentification, profils |
| **book-service** | 8082 | Catalogue, Google Books API |
| **tracker-service** | 8083 | Suivi lecture, critiques |
| **reco-service** | 8084 | Recommandations, stats, Redis |

**Principes :** Database per Service (PostgreSQL), communication REST (OpenFeign), JWT stateless, Docker Compose.

---

## 4. Périmètre Fonctionnel

### Inclus (MVP — 2 mois)

1. **Utilisateurs** : Inscription, connexion JWT, profil, reset mot de passe
2. **Catalogue** : Recherche livres, fiches détaillées, Google Books API, CRUD admin
3. **Bibliothèque** : Statuts (lu/en cours/à lire), progression (pages, barres visuelles), historique, listes personnalisées
4. **Critiques** : Notes (1-5★), critiques détaillées, citations, modération
5. **Recommandations** : Algorithme content-based (genres préférés), cache Redis
6. **Statistiques** : Objectifs annuels, dashboard (livres lus, pages, graphiques genre/timeline)

### Exclus (raisons de temps)

Réseau social (amis/groupes/flux), filtrage collaboratif ML, app mobile, déploiement cloud, OAuth2 (optionnel si temps).

---

## 5. Stack Technique

**Backend :** Java 17, Spring Boot 3.x, Spring Cloud (Gateway, OpenFeign), Spring Security, JWT  
**Frontend :** React 18, TypeScript, Tailwind CSS, shadcn/ui  
**Données :** PostgreSQL 16 (1 DB/service), Redis 7 (cache)  
**DevOps :** Docker, Docker Compose, Maven, Vite, GitHub Actions  
**APIs :** Google Books API, Swagger (SpringDoc)  
**Tests :** JUnit 5, Mockito (>70% couverture)

---

## 6. Modélisation (Database per Service)

- **auth_db** : `users`
- **book_db** : `books`, `authors`, `genres`, `book_genre`
- **tracker_db** : `user_books`, `reviews`, `reading_lists`
- **reco_db** : cache Redis

---

## 7. Planning Agile (Scrum)

**Organisation :** 4 sprints × 2 semaines | Vélocité : 20-25 pts/sprint | Outil : GitHub Projects

**Sprint 0 :** Setup Maven multi-modules, React, Docker Compose, GitHub Actions

| Sprint | Semaines | Objectif | Points |
|--------|----------|----------|--------|
| **S1** | 1-2 | Auth (JWT, inscription), Catalogue (recherche, Google Books API), Frontend | 25 |
| **S2** | 3-4 | Bibliothèque (statuts, progression, listes), Historique, Frontend | 21 |
| **S3** | 5-6 | Critiques/Notes, Recommandations (algo + Redis), Objectifs, Frontend | 22 |
| **S4** | 7-8 | Statistiques (dashboard, graphiques), Tests (>70%), Swagger, Docker, Rapport | 23 |

---

## 8. Sécurité

JWT stateless (Gateway), BCrypt (strength 12), RBAC (READER/ADMIN), CORS restreint, Rate Limiting, Bean Validation, secrets en variables d'environnement.

---

## 9. Exigences Non Fonctionnelles

API < 500ms (P95), Frontend < 3s, Tests > 70%, Swagger 100%, Checkstyle/ESLint, Responsive (mobile/desktop), Chrome/Firefox.

---

## 10. Gestion des Risques

| Risque | Mitigation |
|--------|------------|
| Surcharge travail solo | Priorisation MoSCoW, exclusion réseau social |
| Complexité microservices | Docker Compose (pas K8s), 4 services seulement |
| Recommandations complexes | Algorithme simple (genres), pas de ML |
| Retard sprint | Report fonctionnalités Should/Could, simplification |

---

## 11. Livrables (Semaine 8)

Code source GitHub, Docker Compose opérationnel, Swagger par service, tests JUnit, guide déploiement, rapport PFA (PDF 15-20p), présentation (15 slides), vidéo démo (3-5min).

---

## 12. Évolutions Futures

Réseau social (amis/groupes/flux), ML (filtrage collaboratif), Cloud (AWS EKS/RDS), Kubernetes/Helm, Kafka/RabbitMQ, OAuth2, app mobile, WebSocket, Elasticsearch.

---

## 13. Conclusion

**BookTracker** me permet de développer une solution concrète répondant à un besoin réel, tout en maîtrisant les technologies modernes (microservices, Docker, React, Spring Cloud). Ce projet représente un challenge technique stimulant avec un périmètre réaliste pour 8 semaines.

**Compétences acquises :** Architecture distribuée, Cloud-Native, Scrum, stack moderne (Spring Boot 3, React 18, TypeScript, PostgreSQL, Redis), sécurité (JWT/RBAC), qualité logicielle (tests, CI/CD).

**Demande de validation :**  
Je sollicite votre approbation sur l'adaptation du sujet en architecture web microservices (vs JavaFX desktop), le périmètre retenu (exclusion réseau social) et le planning 4 sprints. Je reste disponible pour ajustements.

---

> **Rédigé par :** Mohamed Nacer Hammami  
> **Date :** 24/02/2026  
> **Version :** 1.0 — PFA (2 mois)  
> **Statut :** Soumis pour validation
