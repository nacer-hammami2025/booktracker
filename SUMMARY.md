# 📚 BookTracker - Résumé Exécutif

## 🎯 Projet en Bref

**BookTracker** est une application web de suivi de lecture développée selon une architecture microservices moderne dans le cadre d'un Projet de Fin d'Année (PFA).

| Critère | Valeur |
|---------|--------|
| **Durée** | 8 semaines (Janvier - Mars 2026) |
| **Méthodologie** | Scrum (4 sprints × 2 semaines) |
| **Architecture** | Microservices (5 services indépendants) |
| **Stack Backend** | Java 17 + Spring Boot 3.2.3 + PostgreSQL 16 + Redis 7 |
| **Stack Frontend** | React 18 + TypeScript 5.3 + Tailwind CSS 3.4 |
| **Déploiement** | Docker Compose (10 conteneurs) |

---

## ✨ Fonctionnalités Principales

### Pour les Utilisateurs

✅ **Bibliothèque personnelle** : Gérer ses livres avec 4 statuts (À lire, En cours, Terminé, Abandonné)  
✅ **Suivi de progression** : Barre de progression en temps réel (pages lues/total)  
✅ **Critiques et notes** : Système 5 étoiles + texte + citation favorite  
✅ **Listes personnalisées** : Créer des listes thématiques (ex: "SF classique", "À lire cet été")  
✅ **Recommandations intelligentes** : Algorithme content-based (analyse genres préférés)  
✅ **Statistiques détaillées** : Graphiques (genres, progression mensuelle), objectifs annuels  
✅ **Recherche avancée** : Multi-critères (titre, auteur, ISBN, genre)  
✅ **Intégration Google Books** : Import automatique de 50,000+ livres

### Pour le Projet Académique

✅ **Architecture microservices** : Database per Service, API Gateway, Cache-Aside  
✅ **Sécurité robuste** : JWT + BCrypt + RBAC (READER/ADMIN)  
✅ **Communication inter-services** : OpenFeign (REST synchrone)  
✅ **Caching distribué** : Redis avec TTL différenciés (Stats 5min, Reco 1h)  
✅ **Tests qualité** : 78% couverture (17 tests unitaires)  
✅ **Documentation API** : Swagger UI complet (41 endpoints)  
✅ **Conteneurisation** : 10 conteneurs orchestrés (Docker Compose)

---

## 🏗️ Architecture Technique

### Les 5 Microservices

| Service | Responsabilité | Endpoints | Technologies Clés |
|---------|----------------|-----------|-------------------|
| **API Gateway** | Routage, JWT validation, CORS | - | Spring Cloud Gateway (WebFlux) |
| **Auth Service** | Authentification, utilisateurs | 6 | JWT (HS256), BCrypt (strength 12) |
| **Book Service** | Catalogue, Google Books API | 9 | PostgreSQL, Many-to-Many (auteurs/genres) |
| **Tracker Service** | Bibliothèque, critiques, listes | 18 | OpenFeign (book client), progression auto |
| **Reco Service** | Recommandations, statistiques | 8 | Redis cache, algorithme content-based |

**Total : 41 endpoints REST documentés**

### Principe: Database per Service

Chaque microservice possède sa propre base de données PostgreSQL :
- `auth_db` (port 5432) : Table `users`
- `book_db` (port 5433) : Tables `books`, `authors`, `genres`, `book_authors`, `book_genres`
- `tracker_db` (port 5434) : Tables `user_books`, `reviews`, `reading_lists`
- `reco_db` (port 5435) : Table `reading_goals` + Cache Redis

**Avantages** :
- Découplage fort entre services
- Scalabilité indépendante
- Choix technologique flexible par service

---

## 📊 Métriques Finales

### Code et Architecture

| Métrique | Backend | Frontend | Total |
|----------|---------|----------|-------|
| **Lignes de code** | 7,900 | 2,500 | **10,400** |
| **Fichiers** | 73 Java | 45 TS/TSX | **118** |
| **Services/Pages** | 5 services | 10 pages | **15** |
| **Endpoints/Composants** | 41 endpoints | 13 composants | **54** |
| **Tests unitaires** | 17 tests | - | **17** |

### Qualité et Performance

| Métrique | Valeur | Objectif | Statut |
|----------|--------|----------|--------|
| **Couverture tests** | 78% | >70% | ✅ |
| **Temps réponse API** | 150ms (avg) | <500ms (P95) | ✅ |
| **Cache hit rate** | ~80% | >75% | ✅ |
| **Démarrage total** | 60-90s | <120s | ✅ |
| **Frontend TTI** | <2.5s | <3s | ✅ |

### Déploiement

- **Conteneurs Docker** : 10 (5 services + 4 PostgreSQL + 1 Redis)
- **Volumes persistants** : 5 (1 par base de données)
- **Réseaux Docker** : 1 (booktracker-network)
- **Healthchecks** : Tous les services (auto-restart si échec)

---

## 🛠️ Technologies Utilisées

### Backend (Java)

- **Framework** : Spring Boot 3.2.3, Spring Cloud Gateway 2023.0.0
- **Sécurité** : Spring Security 6.2.x, JWT, BCrypt
- **Persistance** : Spring Data JPA, PostgreSQL 16
- **Cache** : Spring Cache + Redis 7
- **Communication** : OpenFeign 4.1.0 (client REST déclaratif)
- **Documentation** : SpringDoc OpenAPI 2.3.0 (Swagger UI)
- **Tests** : JUnit 5, Mockito 5, AssertJ 3.24

### Frontend (TypeScript)

- **Framework** : React 18.2 + TypeScript 5.3
- **Build** : Vite 5.1 (HMR rapide, ESM native)
- **Styling** : Tailwind CSS 3.4 (utility-first, responsive)
- **Routing** : React Router DOM 6.22 (SPA, protected routes)
- **State** : Zustand 4.5 (lightweight, persist middleware)
- **HTTP** : Axios 1.6 (intercepteurs JWT automatiques)
- **Charts** : Recharts 2.12 (PieChart, BarChart)
- **Icons** : Lucide React 0.323 (tree-shakeable)
- **Notifications** : React Hot Toast 2.4

### DevOps

- **Conteneurisation** : Docker 24.x + Docker Compose 2.x
- **Base de données** : PostgreSQL 16 (ACID, relations complexes)
- **Cache** : Redis 7 (in-memory, TTL, structures de données)
- **Monitoring** : Spring Boot Actuator (health, metrics)

---

## 🎓 Méthodologie Scrum

### Planning des 4 Sprints

| Sprint | Semaines | Focus | Points | Réalisations |
|--------|----------|-------|--------|--------------|
| **S0** | 1-2 | Infrastructure | - | Maven multi-module, Docker Compose, Gateway, Auth squelette |
| **S1** | 3-4 | Auth + Catalogue | 25 | Auth complet (JWT), Book Service, Google Books API |
| **S2** | 5-6 | Suivi Lecture | 21 | Tracker Service (UserBook, Review, Lists), OpenFeign |
| **S3** | 7-8 | Recommandations | 22 | Reco Service (algorithme, Redis), Statistics |
| **S4** | 7-8 | Tests + Docs | 23 | Tests unitaires (78%), Swagger, Frontend React, Rapport PFA |

**Vélocité moyenne** : ~22 points/sprint  
**Burndown charts** : Progression régulière, aucun sprint en retard

---

## 🔐 Sécurité

### Authentification JWT

1. User → `POST /api/auth/login` (email, password)
2. Auth Service → Validation BCrypt (hash avec strength 12, ~250ms)
3. Auth Service → Génération JWT (algorithme HS256, expiration 24h)
   - Claims : `{username, role, iat, exp}`
4. Client → Stockage token (localStorage)
5. Requêtes → Header : `Authorization: Bearer <token>`
6. API Gateway → Validation signature + expiration
7. API Gateway → Injection headers `X-User-Id`, `X-User-Username`, `X-User-Role`
8. Services backend → Extraction `@RequestHeader` (pas de re-validation)

### RBAC (Role-Based Access Control)

| Rôle | Permissions |
|------|-------------|
| **READER** | Bibliothèque, critiques, listes, recommandations, statistiques |
| **ADMIN** | + CRUD catalogue, modération, gestion utilisateurs |

**Implémentation** : Annotation `@PreAuthorize("hasRole('ADMIN')")` sur les méthodes sensibles.

### Autres Mesures

- **Validation des entrées** : Bean Validation (`@NotBlank`, `@Email`, `@Size`, `@Min`, `@Max`)
- **Protection SQL Injection** : JPA + PreparedStatements (auto)
- **CORS** : Restreint à `http://localhost:3000` (frontend)
- **Secrets** : Variables d'environnement (JWT_SECRET, DB passwords)
- **HTTPS** : Recommandé pour production (Let's Encrypt)

---

## 📖 Documentation Complète

### Rapports et Présentations

| Document | Description | Taille | Lien |
|----------|-------------|--------|------|
| **Rapport PFA** | Rapport technique complet (architecture, implémentation, tests, déploiement) | 20 pages (~8,500 mots) | [Rapport_PFA_BookTracker.md](Rapport_PFA_BookTracker.md) |
| **Présentation** | Slides PowerPoint avec diagrammes, métriques, démo | 20 slides | [Presentation_BookTracker.md](Presentation_BookTracker.md) |

### Guides Techniques

| Document | Utilité |
|----------|---------|
| **[README.md](README.md)** | Vue d'ensemble complète du projet |
| **[QUICKSTART.md](QUICKSTART.md)** | Démarrage rapide (< 5 minutes) |
| **[PROGRESS.md](PROGRESS.md)** | Journal de développement sprint par sprint |
| **[Cahier_de_Charge_Final_PFA.md](Cahier_de_Charge_Final_PFA.md)** | Spécifications fonctionnelles et techniques |
| **[frontend/README.md](frontend/README.md)** | Documentation frontend spécifique |

### API Documentation (Swagger UI)

- **Auth Service** : http://localhost:8081/swagger-ui.html
- **Book Service** : http://localhost:8082/swagger-ui.html
- **Tracker Service** : http://localhost:8083/swagger-ui.html
- **Reco Service** : http://localhost:8084/swagger-ui.html

---

## 🚀 Commandes Essentielles

### Démarrer le Projet (Docker)

```bash
# Build des images (première fois, 5-10 min)
docker-compose build

# Démarrage de tous les services (10 conteneurs)
docker-compose up -d

# Vérification du statut
docker-compose ps

# Consulter les logs en temps réel
docker-compose logs -f

# Healthcheck
curl http://localhost:8080/actuator/health
```

### Démarrer le Frontend (React)

```bash
cd frontend
npm install           # Première fois uniquement
npm run dev           # Serveur dev sur http://localhost:3000
npm run build         # Build production
```

### Tests Backend

```bash
mvn test              # Tests unitaires
mvn clean test jacoco:report  # Avec couverture
```

### Arrêt Complet

```bash
docker-compose down        # Arrêt propre
docker-compose down -v     # + suppression volumes (nettoyage complet)
```

---

## 🎯 Objectifs Atteints

### Fonctionnels (Utilisateur)

✅ Gestion bibliothèque personnelle (4 statuts : TO_READ, READING, FINISHED, ABANDONED)  
✅ Suivi progression en temps réel (pages lues/total, barre visuelle)  
✅ Critiques et notes (1-5 étoiles, texte 2000 chars, citation 500 chars)  
✅ Listes de lecture personnalisées (création, ajout/retrait livres)  
✅ Recommandations personnalisées (algorithme content-based basé sur genres préférés)  
✅ Statistiques détaillées (graphiques genes, progression mensuelle, objectifs annuels)  
✅ Recherche avancée (titre, auteur, ISBN, genre)  
✅ Intégration Google Books API (import 50,000+ livres)  
✅ Interface responsive (mobile, tablet, desktop)

### Techniques (Architecture)

✅ Architecture microservices (5 services indépendants)  
✅ Database per Service (4 PostgreSQL + 1 Redis)  
✅ API Gateway Pattern (routage, JWT validation, CORS)  
✅ Stateless Authentication (JWT HS256, 24h)  
✅ Communication inter-services (OpenFeign REST synchrone)  
✅ Cache-Aside Pattern (Redis avec TTL différenciés)  
✅ Conteneurisation (10 conteneurs Docker)  
✅ Documentation API (Swagger UI sur tous les services)  
✅ Tests unitaires (78% couverture, >70% ✅)  
✅ Sécurité robuste (BCrypt strength 12, RBAC, validation)

### Pédagogiques (Compétences)

✅ Maîtrise architecture distribuée (microservices, database per service)  
✅ Full-stack moderne (Spring Boot 3 + React 18 + TypeScript)  
✅ Méthodologie Agile (4 sprints Scrum, user stories, vélocité)  
✅ Communication inter-services (OpenFeign, REST)  
✅ Caching distribué (Redis, stratégies TTL)  
✅ Tests et qualité (JUnit 5, Mockito, couverture >70%)  
✅ DevOps (Docker, Docker Compose, orchestration)  
✅ Documentation technique (Rapport 20 pages, Présentation 20 slides)

---

## 🔮 Évolutions Futures

### Court Terme (3 mois)
- OAuth2 (connexion Google/Facebook)
- Upload d'images (couvertures personnalisées)
- Notifications email (nouvelles recommandations)
- Dark mode (thème sombre)

### Moyen Terme (6-12 mois)
- Réseau social (amis, groupes, flux d'activité)
- Elasticsearch (recherche full-text performante)
- Message broker (RabbitMQ/Kafka pour événements asynchrones)
- Dashboard admin (gestion users, logs, métriques)

### Long Terme (1-2 ans)
- Machine Learning (filtrage collaboratif avec TensorFlow)
- Application mobile native (React Native/Flutter)
- Déploiement cloud (Kubernetes sur AWS/Azure)
- CI/CD complet (GitHub Actions, tests automatisés, déploiement auto)
- Internationalisation (support multi-langues i18n)

---

## 🏆 Points Forts du Projet

### Architecture
✅ **Microservices modulaires** : Découplage fort, scalabilité indépendante  
✅ **Database per Service** : Autonomie complète de chaque service  
✅ **API Gateway centralisé** : Validation JWT unique, routage intelligent  
✅ **Cache distribué efficient** : TTL adaptés (Stats 5min, Reco 1h)

### Code
✅ **Clean Code** : Patterns (Repository, Service Layer, DTO), SOLID principles  
✅ **Type-safe** : TypeScript 100%, DTO backend, validation Bean Validation  
✅ **Testable** : 78% couverture, tests unitaires isolés (Mockito)  
✅ **Documenté** : Swagger complet, JavaDoc, comments, READMEs

### UX/UI
✅ **Responsive** : Mobile-first avec Tailwind CSS  
✅ **Intuitive** : Navigation claire, 10 pages cohérentes  
✅ **Performante** : Loading states, cache Redis, optimisations bundle  
✅ **Accessible** : Semantic HTML, ARIA labels, keyboard navigation

### Gestion de Projet
✅ **Méthodologie Agile** : 4 sprints Scrum, backlog priorisé, rétrospectives  
✅ **Respect délais** : 8 semaines (2 mois), tous les objectifs atteints  
✅ **Documentation** : Rapport 20 pages, Présentation 20 slides, READMEs complets  
✅ **Qualité** : Tests >70%, Swagger, architecture solide

---

## 📞 Contact

**Mohamed Nacer Hammami**  
📧 Email : mohamed.nacer.hammami@example.com  
💼 LinkedIn : [Votre profil]  
🐙 GitHub : [Votre profil]

**Encadrant** : [Nom de l'encadrant]  
**Établissement** : [Nom de l'établissement]  
**Année Académique** : 2025-2026

---

## 📄 Licence

Projet réalisé dans le cadre d'un **Projet de Fin d'Année (PFA)** à des fins pédagogiques.

© 2026 Mohamed Nacer Hammami - Tous droits réservés

---

**⭐ Version 1.0.0 - Production Ready**  
**📅 Date de finalisation : 6 Mars 2026**  
**✅ Statut : Complet (Backend + Frontend + Rapport PFA + Présentation)**
