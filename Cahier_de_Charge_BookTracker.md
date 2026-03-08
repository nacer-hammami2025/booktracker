# Cahier de Charges

## Application de Suivi de Lecture et de Recommandation de Livres — **BookTracker**

---

| **Information**         | **Détail**                                                         |
|-------------------------|--------------------------------------------------------------------|
| **Projet**              | Projet de Fin d'Année (PFA)                                       |
| **Version**             | 1.0                                                                |
| **Date**                | 19 Février 2026                                                    |
| **Auteur**              | Mohamed Nacer Hammami                                              |
| **Méthodologie**        | Scrum (Agile)                                                      |
| **Déploiement**         | Cloud (AWS)                                                        |

---

## Table des Matières

1. [Contexte et Objectifs du Projet](#1-contexte-et-objectifs-du-projet)
2. [Périmètre Fonctionnel](#2-périmètre-fonctionnel)
3. [Architecture Technique](#3-architecture-technique)
4. [Choix Technologiques](#4-choix-technologiques)
5. [Modélisation de la Base de Données](#5-modélisation-de-la-base-de-données)
6. [Sécurité](#6-sécurité)
7. [Déploiement Cloud & DevOps](#7-déploiement-cloud--devops)
8. [Approche Scrum — Organisation du Projet](#8-approche-scrum--organisation-du-projet)
9. [Product Backlog](#9-product-backlog)
10. [Planning des Sprints](#10-planning-des-sprints)
11. [Exigences Non Fonctionnelles](#11-exigences-non-fonctionnelles)
12. [Diagrammes UML](#12-diagrammes-uml)
13. [Maquettes UI/UX](#13-maquettes-uiux)
14. [Gestion des Risques](#14-gestion-des-risques)
15. [Livrables](#15-livrables)
16. [Annexes](#16-annexes)

---

## 1. Contexte et Objectifs du Projet

### 1.1 Contexte

Dans un monde où la consommation de contenus littéraires est en constante augmentation, les lecteurs font face à plusieurs défis :
- **Difficulté à organiser** et suivre leurs lectures en cours, terminées ou planifiées.
- **Manque de recommandations personnalisées** adaptées à leurs goûts et habitudes de lecture.
- **Absence d'une communauté** pour partager avis, notes et découvertes littéraires.

**BookTracker** vise à répondre à ces problématiques en proposant une plateforme complète de suivi de lecture enrichie d'un moteur de recommandation intelligent.

### 1.2 Objectifs

| # | Objectif | Description |
|---|----------|-------------|
| O1 | **Suivi de lecture** | Permettre aux utilisateurs de gérer leur bibliothèque personnelle (à lire, en cours, terminé) |
| O2 | **Recommandation intelligente** | Offrir des suggestions personnalisées basées sur l'historique et les préférences |
| O3 | **Interaction sociale** | Permettre les avis, notes, commentaires et partage entre lecteurs |
| O4 | **Statistiques** | Fournir des tableaux de bord avec des métriques de lecture (pages/jour, livres/mois…) |
| O5 | **Sécurité** | Assurer la protection des données personnelles (RGPD) et l'authentification robuste |
| O6 | **Cloud Native** | Déployer l'application sur une infrastructure cloud scalable et résiliente |

### 1.3 Public Cible

- Lecteurs réguliers souhaitant organiser leur suivi de lecture
- Clubs de lecture et communautés littéraires
- Bibliothèques et médiathèques souhaitant offrir un service numérique

---

## 2. Périmètre Fonctionnel

### 2.1 Acteurs du Système

| Acteur | Description |
|--------|-------------|
| **Visiteur** | Utilisateur non authentifié — peut consulter le catalogue et créer un compte |
| **Lecteur** | Utilisateur authentifié — accède à toutes les fonctionnalités de suivi et recommandation |
| **Administrateur** | Gère les utilisateurs, le catalogue de livres et les paramètres système |
| **Système de Recommandation** | Acteur système — génère automatiquement les recommandations |

### 2.2 Modules Fonctionnels

#### Module 1 — Gestion des Utilisateurs
| ID | User Story | Priorité |
|----|-----------|----------|
| US-01 | En tant que visiteur, je veux m'inscrire avec email/mot de passe ou via Google/GitHub | Must |
| US-02 | En tant qu'utilisateur, je veux me connecter de manière sécurisée (JWT + OAuth2) | Must |
| US-03 | En tant qu'utilisateur, je veux gérer mon profil (avatar, bio, préférences de genre) | Should |
| US-04 | En tant qu'utilisateur, je veux réinitialiser mon mot de passe par email | Must |
| US-05 | En tant qu'admin, je veux gérer les comptes utilisateurs (activer/désactiver/supprimer) | Must |

#### Module 2 — Catalogue de Livres
| ID | User Story | Priorité |
|----|-----------|----------|
| US-06 | En tant qu'utilisateur, je veux rechercher des livres par titre, auteur, ISBN ou genre | Must |
| US-07 | En tant qu'utilisateur, je veux consulter la fiche détaillée d'un livre (résumé, auteur, couverture, note moyenne) | Must |
| US-08 | En tant qu'admin, je veux ajouter/modifier/supprimer des livres dans le catalogue | Must |
| US-09 | En tant que système, je veux enrichir automatiquement les fiches livres via l'API Google Books | Should |
| US-10 | En tant qu'utilisateur, je veux filtrer les livres par genre, langue, note, année de publication | Should |

#### Module 3 — Suivi de Lecture (Reading Tracker)
| ID | User Story | Priorité |
|----|-----------|----------|
| US-11 | En tant que lecteur, je veux ajouter un livre à ma bibliothèque avec un statut (À lire / En cours / Terminé / Abandonné) | Must |
| US-12 | En tant que lecteur, je veux mettre à jour ma progression de lecture (page actuelle / pourcentage) | Must |
| US-13 | En tant que lecteur, je veux définir un objectif de lecture annuel (ex: 24 livres/an) | Should |
| US-14 | En tant que lecteur, je veux voir l'historique complet de mes lectures avec dates de début/fin | Must |
| US-15 | En tant que lecteur, je veux organiser mes livres dans des étagères personnalisées (ex: "Sci-Fi préférés", "Été 2026") | Could |

#### Module 4 — Avis et Notes
| ID | User Story | Priorité |
|----|-----------|----------|
| US-16 | En tant que lecteur, je veux noter un livre (1 à 5 étoiles) | Must |
| US-17 | En tant que lecteur, je veux rédiger une critique/avis sur un livre | Must |
| US-18 | En tant que lecteur, je veux liker/commenter les avis d'autres lecteurs | Should |
| US-19 | En tant qu'admin, je veux modérer les avis signalés | Should |

#### Module 5 — Recommandation de Livres
| ID | User Story | Priorité |
|----|-----------|----------|
| US-20 | En tant que lecteur, je veux recevoir des recommandations basées sur mes lectures passées | Must |
| US-21 | En tant que lecteur, je veux voir les livres populaires et tendances | Should |
| US-22 | En tant que lecteur, je veux recevoir des recommandations basées sur les lecteurs ayant des goûts similaires (filtrage collaboratif) | Should |
| US-23 | En tant que lecteur, je veux découvrir des livres par thématiques/collections éditoriales | Could |

#### Module 6 — Statistiques et Tableaux de Bord
| ID | User Story | Priorité |
|----|-----------|----------|
| US-24 | En tant que lecteur, je veux voir mes statistiques de lecture (livres lus, pages totales, temps moyen) | Must |
| US-25 | En tant que lecteur, je veux visualiser ma progression vers mon objectif annuel | Should |
| US-26 | En tant que lecteur, je veux voir la répartition de mes lectures par genre (graphique) | Should |
| US-27 | En tant qu'admin, je veux voir les statistiques globales de la plateforme (utilisateurs actifs, livres les plus lus) | Should |

#### Module 7 — Notifications
| ID | User Story | Priorité |
|----|-----------|----------|
| US-28 | En tant que lecteur, je veux recevoir des rappels pour reprendre une lecture en pause | Could |
| US-29 | En tant que lecteur, je veux être notifié des nouvelles recommandations | Could |
| US-30 | En tant que lecteur, je veux recevoir une notification quand quelqu'un commente mon avis | Could |

---

## 3. Architecture Technique

### 3.1 Architecture Globale — Microservices

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React.js)                         │
│                     Hébergé sur AWS CloudFront + S3                │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS (REST API)
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       API GATEWAY (Spring Cloud Gateway)           │
│                    ┌──────────────────────────────┐                │
│                    │   Rate Limiting │ CORS │ JWT  │                │
│                    └──────────────────────────────┘                │
└──────┬──────────┬──────────┬───────────┬──────────┬────────────────┘
       │          │          │           │          │
       ▼          ▼          ▼           ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────┐
│ Auth     │ │ Book     │ │ Reading  │ │ Review  │ │ Recommend.   │
│ Service  │ │ Service  │ │ Tracker  │ │ Service │ │ Engine       │
│          │ │          │ │ Service  │ │         │ │              │
│ Spring   │ │ Spring   │ │ Spring   │ │ Spring  │ │ Spring Boot  │
│ Security │ │ Boot     │ │ Boot     │ │ Boot    │ │ + ML Model   │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬────┘ └──────┬───────┘
     │            │            │             │             │
     ▼            ▼            ▼             ▼             ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│PostgreSQL│ │PostgreSQL│ │PostgreSQL│ │PostgreSQL│ │  MongoDB     │
│ (Users)  │ │ (Books)  │ │(Tracking)│ │(Reviews) │ │(Recommend.)  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘
                                                           │
                                                    ┌──────┴───────┐
                                                    │ Redis Cache  │
                                                    └──────────────┘
```

### 3.2 Architecture en Couches (par Microservice)

```
┌─────────────────────────────────────┐
│        Controller Layer             │  ← REST API (@RestController)
├─────────────────────────────────────┤
│        DTO / Mapper Layer           │  ← MapStruct / ModelMapper
├─────────────────────────────────────┤
│        Service Layer                │  ← Business Logic (@Service)
├─────────────────────────────────────┤
│        Repository Layer             │  ← Data Access (@Repository)
├─────────────────────────────────────┤
│        Entity / Model Layer         │  ← JPA Entities (@Entity)
└─────────────────────────────────────┘
```

### 3.3 Communication Inter-Services

| Type | Technologie | Usage |
|------|------------|-------|
| Synchrone | REST (OpenFeign) | Appels directs entre services |
| Asynchrone | RabbitMQ / Kafka | Notifications, événements de lecture |
| Service Discovery | Eureka Server | Découverte automatique des services |
| Configuration | Spring Cloud Config | Configuration centralisée |
| Circuit Breaker | Resilience4j | Tolérance aux pannes |

---

## 4. Choix Technologiques

### 4.1 Stack Technique

| Couche | Technologie | Justification |
|--------|------------|---------------|
| **Backend** | Java 17 + Spring Boot 3.x | Robustesse, écosystème riche, standard industrie |
| **Frontend** | React.js 18 + TypeScript | SPA performante, large communauté, typage fort |
| **UI Framework** | Tailwind CSS + shadcn/ui | Design moderne, composants accessibles |
| **Base de données relationnelle** | PostgreSQL 16 | Open source, performant, support JSON natif |
| **Base de données NoSQL** | MongoDB 7 | Flexibilité pour les données de recommandation |
| **Cache** | Redis 7 | Cache distribué, sessions, rate limiting |
| **Message Broker** | RabbitMQ | Communication asynchrone inter-services |
| **Recherche** | Elasticsearch 8 | Recherche full-text avancée sur le catalogue |
| **API Documentation** | SpringDoc OpenAPI (Swagger) | Documentation auto-générée des APIs |
| **Tests** | JUnit 5, Mockito, Testcontainers | Tests unitaires, intégration, e2e |
| **Build Backend** | Maven | Gestion des dépendances Java |
| **Build Frontend** | Vite | Build rapide, HMR |
| **Conteneurisation** | Docker + Docker Compose | Isolation des services |
| **Orchestration** | Kubernetes (EKS) | Scalabilité et gestion des conteneurs |
| **CI/CD** | GitHub Actions | Automatisation du pipeline |
| **Monitoring** | Prometheus + Grafana | Métriques et dashboards |
| **Logging** | ELK Stack (Elasticsearch, Logstash, Kibana) | Centralisation des logs |
| **Cloud** | AWS (Amazon Web Services) | Infrastructure scalable et fiable |

### 4.2 Architecture Frontend (React.js)

```
src/
├── api/                  # Axios instances, interceptors, API calls
│   ├── axiosConfig.ts
│   ├── authApi.ts
│   ├── bookApi.ts
│   └── readingApi.ts
├── components/           # Composants réutilisables
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer, Sidebar
│   ├── books/            # BookCard, BookList, BookDetail
│   ├── reading/          # ReadingProgress, StatusBadge
│   └── charts/           # StatChart, GenrePieChart
├── pages/                # Pages principales
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── BookCatalog.tsx
│   ├── BookDetail.tsx
│   ├── MyLibrary.tsx
│   ├── Recommendations.tsx
│   ├── Statistics.tsx
│   ├── Profile.tsx
│   └── AdminPanel.tsx
├── hooks/                # Custom hooks
├── store/                # Zustand / Redux state management
├── utils/                # Helpers, formatters
├── types/                # TypeScript interfaces
└── App.tsx
```

---

## 5. Modélisation de la Base de Données

### 5.1 Modèle Conceptuel de Données (MCD) — Entités Principales

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   USER       │       │   BOOK           │       │   AUTHOR     │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)          │       │ id (PK)      │
│ email        │       │ title            │       │ name         │
│ password     │       │ isbn             │       │ biography    │
│ first_name   │       │ description      │       │ nationality  │
│ last_name    │       │ cover_image_url  │       │ birth_date   │
│ avatar_url   │       │ page_count       │       └──────┬───────┘
│ bio          │       │ publish_date     │              │
│ role         │       │ language         │              │ 1..N
│ reading_goal │       │ average_rating   │       ┌──────┴───────┐
│ is_active    │       │ author_id (FK)   │───────│  BOOK_AUTHOR │
│ created_at   │       │ publisher        │       │  (N:M)       │
│ updated_at   │       │ created_at       │       └──────────────┘
└──────┬───────┘       └────────┬─────────┘
       │                        │
       │    ┌──────────────┐    │        ┌──────────────┐
       │    │ USER_BOOK    │    │        │   GENRE      │
       ├───▶├──────────────┤◄───┤        ├──────────────┤
       │    │ id (PK)      │    │        │ id (PK)      │
       │    │ user_id (FK) │    │        │ name         │
       │    │ book_id (FK) │    │        │ description  │
       │    │ status       │    │        └──────┬───────┘
       │    │ current_page │    │               │
       │    │ start_date   │    │        ┌──────┴───────┐
       │    │ end_date     │    ├────────│  BOOK_GENRE  │
       │    │ rating       │    │        │  (N:M)       │
       │    │ created_at   │    │        └──────────────┘
       │    │ updated_at   │    │
       │    └──────────────┘    │
       │                        │
       │    ┌──────────────┐    │
       │    │   REVIEW     │    │
       ├───▶├──────────────┤◄───┘
       │    │ id (PK)      │
       │    │ user_id (FK) │
       │    │ book_id (FK) │
       │    │ content      │
       │    │ rating       │
       │    │ likes_count  │
       │    │ is_flagged   │
       │    │ created_at   │
       │    └──────┬───────┘
       │           │
       │    ┌──────┴───────┐
       │    │   COMMENT    │
       └───▶├──────────────┤
            │ id (PK)      │
            │ review_id(FK)│
            │ user_id (FK) │
            │ content      │
            │ created_at   │
            └──────────────┘

┌──────────────┐       ┌──────────────────┐
│   SHELF      │       │   NOTIFICATION   │
├──────────────┤       ├──────────────────┤
│ id (PK)      │       │ id (PK)          │
│ user_id (FK) │       │ user_id (FK)     │
│ name         │       │ type             │
│ description  │       │ message          │
│ is_public    │       │ is_read          │
│ created_at   │       │ created_at       │
└──────┬───────┘       └──────────────────┘
       │
┌──────┴───────┐
│  SHELF_BOOK  │
│  (N:M)       │
└──────────────┘
```

### 5.2 Dictionnaire de Données

| Entité | Attribut | Type | Contrainte | Description |
|--------|----------|------|-----------|-------------|
| USER | id | UUID | PK, NOT NULL | Identifiant unique |
| USER | email | VARCHAR(255) | UNIQUE, NOT NULL | Adresse email |
| USER | password | VARCHAR(255) | NOT NULL | Hash BCrypt du mot de passe |
| USER | role | ENUM | NOT NULL | READER, ADMIN |
| USER | reading_goal | INTEGER | NULL | Objectif annuel de livres |
| BOOK | isbn | VARCHAR(13) | UNIQUE | Code ISBN-13 |
| BOOK | page_count | INTEGER | NOT NULL | Nombre de pages |
| USER_BOOK | status | ENUM | NOT NULL | TO_READ, READING, FINISHED, ABANDONED |
| USER_BOOK | current_page | INTEGER | DEFAULT 0 | Page actuelle |
| REVIEW | rating | DECIMAL(2,1) | 1.0 - 5.0 | Note du livre |

---

## 6. Sécurité

### 6.1 Stratégie de Sécurité Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHES DE SÉCURITÉ                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 1. RÉSEAU — WAF, HTTPS/TLS 1.3, Security Groups (AWS)  │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 2. API GATEWAY — Rate Limiting, CORS, IP Whitelist      │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 3. AUTHENTIFICATION — JWT + OAuth2 (Google, GitHub)     │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 4. AUTORISATION — RBAC (Role-Based Access Control)      │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 5. DONNÉES — Chiffrement AES-256, BCrypt, Validation    │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 6. APPLICATION — OWASP Top 10, Input Sanitization       │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 7. AUDIT — Logging, Monitoring, Alerting                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Authentification & Autorisation

#### JWT (JSON Web Token) — Flux d'authentification

```
Client                    Auth Service               Resource Service
  │                            │                            │
  │── POST /auth/login ───────▶│                            │
  │   {email, password}        │                            │
  │                            │── Vérification credentials │
  │                            │── Génération JWT ──────────│
  │◄── 200 {accessToken,  ────│                            │
  │        refreshToken}       │                            │
  │                            │                            │
  │── GET /api/books ──────────┼───────────────────────────▶│
  │   Header: Bearer <JWT>     │                            │
  │                            │        Validation JWT ◄────│
  │                            │        Extraction rôles ◄──│
  │◄── 200 {books[]} ─────────┼────────────────────────────│
  │                            │                            │
  │── POST /auth/refresh ─────▶│                            │
  │   {refreshToken}           │                            │
  │◄── 200 {newAccessToken} ──│                            │
```

#### Configuration Spring Security

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| Access Token Expiration | 15 minutes | Durée de vie du token d'accès |
| Refresh Token Expiration | 7 jours | Durée de vie du token de rafraîchissement |
| Algorithme JWT | RS256 | Signature asymétrique RSA |
| Password Hashing | BCrypt (strength=12) | Hachage sécurisé des mots de passe |
| CORS Origins | Frontend URL uniquement | Restriction des origines |
| CSRF | Désactivé (API stateless) | Non nécessaire avec JWT |

#### OAuth2 — Authentification Sociale

| Provider | Client ID | Scopes |
|----------|-----------|--------|
| Google | Configuré via env | openid, email, profile |
| GitHub | Configuré via env | user:email, read:user |

### 6.3 Matrice d'Autorisation (RBAC)

| Ressource | Visiteur | Lecteur (READER) | Admin (ADMIN) |
|-----------|----------|-------------------|---------------|
| Consulter catalogue | ✅ | ✅ | ✅ |
| Rechercher livres | ✅ | ✅ | ✅ |
| Inscription/Connexion | ✅ | — | — |
| Gérer bibliothèque personnelle | ❌ | ✅ | ✅ |
| Suivi de lecture | ❌ | ✅ | ✅ |
| Écrire un avis | ❌ | ✅ | ✅ |
| Voir recommandations | ❌ | ✅ | ✅ |
| Voir statistiques perso. | ❌ | ✅ | ✅ |
| Gérer catalogue (CRUD livres) | ❌ | ❌ | ✅ |
| Gérer utilisateurs | ❌ | ❌ | ✅ |
| Modérer avis | ❌ | ❌ | ✅ |
| Statistiques plateforme | ❌ | ❌ | ✅ |

### 6.4 Protection OWASP Top 10

| Vulnérabilité | Mesure de Protection |
|---------------|---------------------|
| **A01 — Broken Access Control** | RBAC via Spring Security, annotations `@PreAuthorize` |
| **A02 — Cryptographic Failures** | TLS 1.3, BCrypt, AES-256 pour données sensibles |
| **A03 — Injection (SQL/NoSQL)** | JPA Criteria API, requêtes paramétrées, validation input |
| **A04 — Insecure Design** | Threat modeling, security reviews, principes STRIDE |
| **A05 — Security Misconfiguration** | Hardening headers, désactivation endpoints par défaut |
| **A06 — Vulnerable Components** | OWASP Dependency-Check dans CI/CD, Dependabot |
| **A07 — Auth Failures** | MFA optionnel, rate limiting sur login, account lockout |
| **A08 — Data Integrity Failures** | Vérification des signatures JWT, intégrité des données |
| **A09 — Logging Failures** | ELK Stack, audit trail, alertes sur événements critiques |
| **A10 — SSRF** | Validation stricte des URLs, whitelist API externes |

### 6.5 Conformité RGPD

| Exigence | Implémentation |
|----------|---------------|
| Consentement | Opt-in explicite lors de l'inscription |
| Droit d'accès | Endpoint `GET /api/users/me/data` — export JSON |
| Droit à l'oubli | Endpoint `DELETE /api/users/me` — suppression complète |
| Portabilité | Export des données au format JSON/CSV |
| Minimisation | Collecte uniquement des données nécessaires |
| Notification de breach | Procédure d'alerte sous 72h |

---

## 7. Déploiement Cloud & DevOps

### 7.1 Infrastructure AWS

```
┌──────────────────────────────────────────────────────────────────────┐
│                         AWS CLOUD                                    │
│                                                                      │
│  ┌────────────────┐    ┌───────────────────────────────────────┐     │
│  │  Route 53      │    │          VPC (10.0.0.0/16)            │     │
│  │  (DNS)         │    │                                       │     │
│  └───────┬────────┘    │  ┌─────────────────────────────────┐  │     │
│          │             │  │     Public Subnet                │  │     │
│  ┌───────┴────────┐    │  │  ┌───────────┐ ┌─────────────┐  │  │     │
│  │  CloudFront    │    │  │  │    ALB    │ │  NAT Gateway│  │  │     │
│  │  (CDN)         │    │  │  └─────┬─────┘ └─────────────┘  │  │     │
│  └───────┬────────┘    │  └───────┼─────────────────────────┘  │     │
│          │             │          │                             │     │
│  ┌───────┴────────┐    │  ┌───────┼─────────────────────────┐  │     │
│  │  S3 Bucket     │    │  │     Private Subnet               │  │     │
│  │  (Frontend)    │    │  │  ┌───┴──────────────────────┐   │  │     │
│  └────────────────┘    │  │  │    EKS Cluster           │   │  │     │
│                        │  │  │  ┌──────┐ ┌──────┐       │   │  │     │
│  ┌────────────────┐    │  │  │  │Auth  │ │Book  │       │   │  │     │
│  │  ECR           │    │  │  │  │Svc   │ │Svc   │       │   │  │     │
│  │  (Docker Reg.) │    │  │  │  └──────┘ └──────┘       │   │  │     │
│  └────────────────┘    │  │  │  ┌──────┐ ┌──────┐       │   │  │     │
│                        │  │  │  │Track │ │Recom.│       │   │  │     │
│  ┌────────────────┐    │  │  │  │Svc   │ │Svc   │       │   │  │     │
│  │  SES           │    │  │  │  └──────┘ └──────┘       │   │  │     │
│  │  (Email)       │    │  │  └──────────────────────────┘   │  │     │
│  └────────────────┘    │  │                                  │  │     │
│                        │  │  ┌──────────────────────────┐   │  │     │
│  ┌────────────────┐    │  │  │  RDS PostgreSQL          │   │  │     │
│  │  CloudWatch    │    │  │  │  (Multi-AZ)              │   │  │     │
│  │  (Monitoring)  │    │  │  └──────────────────────────┘   │  │     │
│  └────────────────┘    │  │  ┌──────────┐ ┌────────────┐   │  │     │
│                        │  │  │  MongoDB  │ │ ElastiCache│   │  │     │
│  ┌────────────────┐    │  │  │  Atlas    │ │ (Redis)    │   │  │     │
│  │  Secrets Mgr   │    │  │  └──────────┘ └────────────┘   │  │     │
│  │  (Secrets)     │    │  └──────────────────────────────────┘  │     │
│  └────────────────┘    └───────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 7.2 Services AWS Utilisés

| Service AWS | Usage | Justification |
|-------------|-------|---------------|
| **EKS** | Orchestration Kubernetes | Gestion des microservices |
| **ECR** | Registre Docker | Stockage des images Docker |
| **RDS** | PostgreSQL managé | Base de données relationnelle HA |
| **ElastiCache** | Redis managé | Cache distribué et sessions |
| **S3** | Stockage statique | Frontend SPA, images de couvertures |
| **CloudFront** | CDN | Distribution globale du frontend |
| **Route 53** | DNS | Résolution de noms de domaine |
| **ALB** | Load Balancer | Répartition de charge |
| **SES** | Email | Envoi d'emails transactionnels |
| **CloudWatch** | Monitoring | Logs et métriques |
| **Secrets Manager** | Secrets | Gestion sécurisée des credentials |
| **WAF** | Firewall applicatif | Protection contre attaques web |
| **IAM** | Gestion identité | Contrôle d'accès AWS |

### 7.3 Pipeline CI/CD (GitHub Actions)

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  COMMIT  │───▶│  BUILD   │───▶│  TEST    │───▶│  SCAN    │───▶│  DEPLOY  │
│          │    │          │    │          │    │          │    │          │
│ Git Push │    │ Maven    │    │ JUnit 5  │    │ Sonar    │    │ Docker   │
│ PR Open  │    │ npm build│    │ Cypress  │    │ OWASP    │    │ K8s      │
└──────────┘    └──────────┘    │ Mockito  │    │ Trivy    │    │ Helm     │
                                └──────────┘    └──────────┘    └──────────┘
                                                                     │
                                                        ┌────────────┴────┐
                                                        │                 │
                                                   ┌────┴─────┐   ┌──────┴────┐
                                                   │  STAGING  │   │   PROD    │
                                                   │  (auto)   │   │  (manual) │
                                                   └──────────┘   └───────────┘
```

#### Étapes détaillées du Pipeline

| Étape | Actions | Outils |
|-------|---------|--------|
| **1. Build** | Compilation Java, build React, vérification dépendances | Maven, Vite |
| **2. Test** | Tests unitaires, tests d'intégration, tests E2E | JUnit 5, Mockito, Testcontainers, Cypress |
| **3. Quality** | Analyse qualité code, couverture | SonarQube (>80% coverage) |
| **4. Security** | Scan vulnérabilités dépendances, scan images Docker | OWASP Dependency-Check, Trivy |
| **5. Package** | Build images Docker, push vers ECR | Docker, AWS ECR |
| **6. Deploy Staging** | Déploiement automatique sur environnement staging | Helm, kubectl |
| **7. Deploy Prod** | Déploiement manuel approuvé (blue/green) | Helm, kubectl |

### 7.4 Environnements

| Environnement | Usage | Infrastructure |
|--------------|-------|----------------|
| **Local** | Développement | Docker Compose |
| **Dev** | Intégration continue | EKS (namespace dev) |
| **Staging** | Pré-production, tests UAT | EKS (namespace staging) |
| **Production** | Application live | EKS (namespace prod), Multi-AZ |

---

## 8. Approche Scrum — Organisation du Projet

### 8.1 Rôles Scrum

| Rôle | Responsable | Responsabilités |
|------|------------|-----------------|
| **Product Owner** | Mohamed Nacer Hammami | Définition du backlog, priorisation, validation |
| **Scrum Master** | Mohamed Nacer Hammami | Facilitation des cérémonies, suppression des obstacles |
| **Équipe de Développement** | Mohamed Nacer Hammami | Conception, développement, tests |

### 8.2 Cérémonies Scrum

| Cérémonie | Fréquence | Durée | Description |
|-----------|-----------|-------|-------------|
| **Sprint Planning** | Début de sprint | 2h | Planification des tâches du sprint |
| **Daily Standup** | Quotidien | 15 min | Point d'avancement (fait, à faire, blockers) |
| **Sprint Review** | Fin de sprint | 1h | Démonstration des fonctionnalités développées |
| **Sprint Retrospective** | Fin de sprint | 1h | Retour d'expérience et amélioration continue |
| **Backlog Refinement** | Mi-sprint | 1h | Affinage des user stories à venir |

### 8.3 Paramètres du Projet

| Paramètre | Valeur |
|-----------|--------|
| Durée du sprint | **2 semaines** |
| Nombre de sprints | **6 sprints** (12 semaines) |
| Vélocité estimée | **30 story points / sprint** |
| Definition of Done | Code reviewé, testé (>80% coverage), documenté, déployé sur staging |
| Outil de gestion | Jira / GitHub Projects |

---

## 9. Product Backlog

### 9.1 Estimation (Story Points — Fibonacci)

| Points | Complexité | Exemple |
|--------|-----------|---------|
| 1 | Triviale | Changement de texte, ajout d'un champ |
| 2 | Simple | CRUD simple, formulaire basique |
| 3 | Modérée | Fonctionnalité avec logique métier |
| 5 | Complexe | Intégration API externe, logique avancée |
| 8 | Très complexe | Moteur de recommandation, recherche avancée |
| 13 | Épique | Infrastructure cloud, pipeline CI/CD complet |

### 9.2 Backlog Priorisé

| ID | User Story | Module | Points | Priorité | Sprint |
|----|-----------|--------|--------|----------|--------|
| US-01 | Inscription email/OAuth2 | Auth | 5 | Must | S1 |
| US-02 | Connexion sécurisée JWT | Auth | 5 | Must | S1 |
| US-04 | Réinitialisation mot de passe | Auth | 3 | Must | S1 |
| US-05 | Gestion comptes admin | Auth | 3 | Must | S1 |
| US-06 | Recherche de livres | Catalogue | 5 | Must | S1 |
| US-07 | Fiche détaillée livre | Catalogue | 3 | Must | S1 |
| US-08 | CRUD livres (admin) | Catalogue | 5 | Must | S2 |
| US-11 | Ajout livre + statut | Tracking | 3 | Must | S2 |
| US-12 | Progression de lecture | Tracking | 3 | Must | S2 |
| US-14 | Historique lectures | Tracking | 3 | Must | S2 |
| US-16 | Notation livre | Reviews | 2 | Must | S2 |
| US-17 | Rédaction avis | Reviews | 3 | Must | S2 |
| US-03 | Profil utilisateur | Auth | 3 | Should | S3 |
| US-09 | Intégration Google Books API | Catalogue | 5 | Should | S3 |
| US-10 | Filtres avancés catalogue | Catalogue | 5 | Should | S3 |
| US-13 | Objectif de lecture | Tracking | 3 | Should | S3 |
| US-18 | Like/commenter avis | Reviews | 3 | Should | S3 |
| US-19 | Modération avis | Reviews | 3 | Should | S3 |
| US-20 | Recommandations basiques | Reco | 8 | Must | S4 |
| US-21 | Livres populaires/tendances | Reco | 3 | Should | S4 |
| US-24 | Statistiques lecture | Stats | 5 | Must | S4 |
| US-25 | Progression objectif | Stats | 3 | Should | S4 |
| US-26 | Répartition par genre | Stats | 3 | Should | S4 |
| US-27 | Stats admin plateforme | Stats | 5 | Should | S4 |
| US-22 | Filtrage collaboratif | Reco | 8 | Should | S5 |
| US-15 | Étagères personnalisées | Tracking | 5 | Could | S5 |
| US-23 | Collections thématiques | Reco | 3 | Could | S5 |
| US-28 | Rappels de lecture | Notif | 5 | Could | S5 |
| US-29 | Notif recommandations | Notif | 3 | Could | S6 |
| US-30 | Notif commentaires | Notif | 3 | Could | S6 |
| — | Infrastructure Cloud | DevOps | 13 | Must | S6 |
| — | Tests E2E & Performance | QA | 8 | Must | S6 |

---

## 10. Planning des Sprints

### Sprint 0 — Setup & Architecture (Semaine 0)
- [x] Initialisation du projet Spring Boot (multi-modules Maven)
- [x] Initialisation du projet React.js (Vite + TypeScript)
- [x] Configuration Docker Compose (PostgreSQL, Redis, RabbitMQ)
- [x] Mise en place du pipeline CI/CD de base (GitHub Actions)
- [x] Configuration de SonarQube
- [x] Création du repository Git, branches (main, develop, feature/*)

### Sprint 1 — Authentification & Catalogue de Base (Semaines 1-2)
**Objectif :** L'utilisateur peut s'inscrire, se connecter et parcourir le catalogue.

| Tâche | Description | Points |
|-------|------------|--------|
| T1.1 | Modèle User + Repository + Migration | 2 |
| T1.2 | Service d'authentification (JWT + BCrypt) | 5 |
| T1.3 | OAuth2 Google/GitHub | 5 |
| T1.4 | Réinitialisation mot de passe | 3 |
| T1.5 | Modèle Book + Author + Genre | 2 |
| T1.6 | API REST catalogue (GET, search, filter) | 5 |
| T1.7 | Pages Login/Register (React) | 3 |
| T1.8 | Page Catalogue + Recherche (React) | 5 |
| **Total** | | **30** |

### Sprint 2 — Suivi de Lecture & Avis (Semaines 3-4)
**Objectif :** Le lecteur peut gérer sa bibliothèque et donner des avis.

| Tâche | Description | Points |
|-------|------------|--------|
| T2.1 | CRUD livres admin + validation | 5 |
| T2.2 | Modèle UserBook (tracking) + API | 3 |
| T2.3 | Mise à jour progression lecture | 3 |
| T2.4 | Historique des lectures | 3 |
| T2.5 | Modèle Review + Comment + API | 5 |
| T2.6 | Page Ma Bibliothèque (React) | 5 |
| T2.7 | Composant notation + avis (React) | 3 |
| T2.8 | Panel admin livres (React) | 3 |
| **Total** | | **30** |

### Sprint 3 — Enrichissement & Interactions (Semaines 5-6)
**Objectif :** Profils, intégration Google Books, filtres avancés, interactions sociales.

| Tâche | Description | Points |
|-------|------------|--------|
| T3.1 | Profil utilisateur (API + Frontend) | 3 |
| T3.2 | Intégration API Google Books | 5 |
| T3.3 | Filtres avancés catalogue | 5 |
| T3.4 | Objectif de lecture annuel | 3 |
| T3.5 | Likes/Commentaires sur avis | 3 |
| T3.6 | Modération des avis (admin) | 3 |
| T3.7 | Elasticsearch — recherche full-text | 5 |
| T3.8 | Amélioration UX/UI global | 3 |
| **Total** | | **30** |

### Sprint 4 — Recommandation & Statistiques (Semaines 7-8)
**Objectif :** Moteur de recommandation et tableaux de bord.

| Tâche | Description | Points |
|-------|------------|--------|
| T4.1 | Algorithme recommandation (content-based) | 8 |
| T4.2 | API recommandations | 3 |
| T4.3 | Page Recommandations (React) | 3 |
| T4.4 | Service statistiques (API) | 5 |
| T4.5 | Dashboard statistiques lecteur (React) | 5 |
| T4.6 | Dashboard admin (React) | 5 |
| T4.7 | Graphiques Chart.js/Recharts | 3 |
| **Total** | | **32** |

### Sprint 5 — Fonctionnalités Avancées (Semaines 9-10)
**Objectif :** Filtrage collaboratif, étagères, notifications.

| Tâche | Description | Points |
|-------|------------|--------|
| T5.1 | Filtrage collaboratif (user-based) | 8 |
| T5.2 | Étagères personnalisées (CRUD) | 5 |
| T5.3 | Collections thématiques | 3 |
| T5.4 | Système de notifications (RabbitMQ) | 5 |
| T5.5 | Rappels de lecture | 3 |
| T5.6 | Optimisation performance (cache Redis) | 3 |
| T5.7 | Tests d'intégration complets | 3 |
| **Total** | | **30** |

### Sprint 6 — Cloud, Sécurité & Finalisation (Semaines 11-12)
**Objectif :** Déploiement cloud, hardening sécurité, tests finaux.

| Tâche | Description | Points |
|-------|------------|--------|
| T6.1 | Dockerisation complète des services | 5 |
| T6.2 | Configuration Kubernetes (Helm charts) | 8 |
| T6.3 | Déploiement AWS (EKS, RDS, S3, CloudFront) | 8 |
| T6.4 | Configuration WAF + SSL/TLS | 3 |
| T6.5 | Monitoring (Prometheus + Grafana) | 3 |
| T6.6 | Tests de charge (JMeter/Gatling) | 3 |
| T6.7 | Documentation API (Swagger) | 2 |
| T6.8 | Documentation utilisateur | 2 |
| **Total** | | **34** |

---

## 11. Exigences Non Fonctionnelles

### 11.1 Performance

| Métrique | Objectif |
|----------|----------|
| Temps de réponse API | < 200ms (P95) |
| Temps de chargement page | < 2 secondes |
| Requêtes simultanées | 500 utilisateurs concurrents |
| Disponibilité | 99.5% uptime (SLA) |
| Temps de déploiement | < 10 minutes (zero-downtime) |

### 11.2 Scalabilité

| Aspect | Stratégie |
|--------|-----------|
| Horizontal | Auto-scaling Kubernetes (HPA) |
| Base de données | Read replicas PostgreSQL |
| Cache | Cluster Redis |
| Frontend | CDN CloudFront (edge locations) |

### 11.3 Qualité du Code

| Critère | Objectif |
|---------|----------|
| Couverture de tests | > 80% |
| Complexité cyclomatique | < 15 |
| Code smells | 0 (critique), < 10 (mineur) |
| Duplication | < 3% |
| Documentation API | 100% des endpoints |

### 11.4 Accessibilité & UX

| Critère | Standard |
|---------|---------|
| Accessibilité | WCAG 2.1 AA |
| Responsive Design | Mobile-first (320px — 1920px) |
| Navigateurs supportés | Chrome, Firefox, Safari, Edge (dernières 2 versions) |
| Internationalisation | Français (FR), Anglais (EN) |

---

## 12. Diagrammes UML

### 12.1 Diagramme de Cas d'Utilisation Principal

```
                          ┌─────────────────────────────────────────┐
                          │          BookTracker System              │
                          │                                         │
   ┌──────────┐           │  ┌──────────────────────────────┐       │
   │ Visiteur │──────────▶│  │  Consulter catalogue          │       │
   └──────────┘     │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    └────▶│  │  S'inscrire / Se connecter    │       │
                          │  └──────────────────────────────┘       │
                          │                                         │
   ┌──────────┐           │  ┌──────────────────────────────┐       │
   │ Lecteur  │──────────▶│  │  Gérer bibliothèque           │       │
   └──────────┘     │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    ├────▶│  │  Suivre progression lecture    │       │
                    │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    ├────▶│  │  Écrire avis / Noter livre    │       │
                    │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    ├────▶│  │  Consulter recommandations     │       │
                    │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    └────▶│  │  Voir statistiques             │       │
                          │  └──────────────────────────────┘       │
                          │                                         │
   ┌──────────┐           │  ┌──────────────────────────────┐       │
   │  Admin   │──────────▶│  │  Gérer catalogue (CRUD)       │       │
   └──────────┘     │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    ├────▶│  │  Gérer utilisateurs            │       │
                    │     │  └──────────────────────────────┘       │
                    │     │  ┌──────────────────────────────┐       │
                    └────▶│  │  Modérer avis / Statistiques   │       │
                          │  └──────────────────────────────┘       │
                          │                                         │
   ┌──────────┐           │  ┌──────────────────────────────┐       │
   │ Google   │◁─ ─ ─ ─ ▶│  │  Enrichir données livres      │       │
   │ Books API│           │  └──────────────────────────────┘       │
   └──────────┘           │                                         │
                          └─────────────────────────────────────────┘
```

### 12.2 Diagramme de Séquence — Ajout d'un Livre à la Bibliothèque

```
Lecteur          Frontend         API Gateway     BookService      TrackingService    DB
  │                  │                │                │                  │            │
  │─ Cliquer        │                │                │                  │            │
  │  "Ajouter"      │                │                │                  │            │
  │─────────────────▶│                │                │                  │            │
  │                  │─ POST /api/    │                │                  │            │
  │                  │  tracking      │                │                  │            │
  │                  │───────────────▶│                │                  │            │
  │                  │                │─ Valider JWT   │                  │            │
  │                  │                │───────────────▶│                  │            │
  │                  │                │                │─ Vérifier livre  │            │
  │                  │                │                │  existe          │            │
  │                  │                │                │─────────────────▶│            │
  │                  │                │                │                  │─ INSERT    │
  │                  │                │                │                  │  user_book │
  │                  │                │                │                  │───────────▶│
  │                  │                │                │                  │◄───────────│
  │                  │                │                │◄─────────────────│            │
  │                  │                │◄───────────────│                  │            │
  │                  │◄───────────────│                │                  │            │
  │◄─────────────────│                │                │                  │            │
  │  ✅ Livre ajouté │                │                │                  │            │
```

### 12.3 Diagramme de Classes Simplifié

```
┌───────────────────┐     1     ┌───────────────────┐     N     ┌──────────────────┐
│      User         │◄─────────│     UserBook       │─────────▶│      Book        │
├───────────────────┤           ├───────────────────┤           ├──────────────────┤
│ - id: UUID        │           │ - id: Long         │           │ - id: Long       │
│ - email: String   │           │ - status: Status   │           │ - title: String  │
│ - password: String│           │ - currentPage: int │           │ - isbn: String   │
│ - firstName: Str  │     1     │ - startDate: Date  │           │ - pageCount: int │
│ - lastName: Str   │◄─────┐   │ - endDate: Date    │           │ - avgRating: Dbl │
│ - role: Role      │      │   │ - rating: Double   │     N     │ - publishDate    │
│ - readingGoal: int│      │   └───────────────────┘  ┌───────▶│ - coverUrl: Str  │
├───────────────────┤      │                           │        ├──────────────────┤
│ + register()      │      │   ┌───────────────────┐   │        │ + getDetails()   │
│ + login()         │      │   │     Review         │   │        │ + search()       │
│ + updateProfile() │      └───│─ userId            │───┘        └────────┬─────────┘
└───────────────────┘          │ - bookId           │                     │ N:M
                               │ - content: String  │              ┌──────┴─────────┐
                               │ - rating: Double   │              │    Genre        │
                               │ - likesCount: int  │              ├────────────────┤
                               │ - isFlagged: bool  │              │ - id: Long      │
                               ├───────────────────┤              │ - name: String  │
                               │ + create()         │              └────────────────┘
                               │ + update()         │
                               │ + delete()         │         ┌──────────────────┐
                               └───────┬───────────┘         │    Author         │
                                       │ 1:N                  ├──────────────────┤
                               ┌───────┴───────────┐         │ - id: Long       │
                               │    Comment         │         │ - name: String   │
                               ├───────────────────┤         │ - bio: String    │
                               │ - id: Long         │         └──────────────────┘
                               │ - content: String  │
                               │ - userId: UUID     │
                               │ - createdAt: Date  │
                               └───────────────────┘
```

---

## 13. Maquettes UI/UX

### 13.1 Pages Principales

#### Page d'Accueil (Landing)
```
┌────────────────────────────────────────────────────────────┐
│  🔖 BookTracker          [Catalogue] [Login] [S'inscrire]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│        Suivez vos lectures.                                │
│        Découvrez de nouveaux livres.                       │
│                                                            │
│        [🔍 Rechercher un livre...                      ]   │
│                                                            │
│        [Commencer gratuitement]                            │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  📚 Livres Populaires                                      │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ 📘     │ │ 📗     │ │ 📕     │ │ 📙     │ │ 📓     │   │
│  │ Titre1 │ │ Titre2 │ │ Titre3 │ │ Titre4 │ │ Titre5 │   │
│  │ ⭐4.5  │ │ ⭐4.2  │ │ ⭐4.8  │ │ ⭐4.1  │ │ ⭐4.6  │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
├────────────────────────────────────────────────────────────┤
│  Footer │ © 2026 BookTracker │ Contact │ CGU              │
└────────────────────────────────────────────────────────────┘
```

#### Dashboard Lecteur
```
┌────────────────────────────────────────────────────────────┐
│  🔖 BookTracker    [Catalogue] [Biblio] [Stats]  👤 Profil │
├────────┬───────────────────────────────────────────────────┤
│        │  📊 Mon Tableau de Bord                           │
│ Menu   │                                                   │
│        │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ 📚     │  │ 12       │ │ 3        │ │ 156      │          │
│ Biblio │  │ Livres   │ │ En cours │ │ Jours de │          │
│        │  │ lus      │ │          │ │ lecture  │          │
│ 📈     │  └──────────┘ └──────────┘ └──────────┘          │
│ Stats  │                                                   │
│        │  📖 En Cours de Lecture                            │
│ 💡     │  ┌─────────────────────────────────────────┐      │
│ Reco   │  │ Dune — F. Herbert      [████████░░] 78% │      │
│        │  │ 1984 — G. Orwell       [██████░░░░] 55% │      │
│ ⚙️     │  │ Sapiens — Y. Harari    [███░░░░░░░] 25% │      │
│ Param  │  └─────────────────────────────────────────┘      │
│        │                                                   │
│        │  🎯 Objectif 2026: 12/24 livres (50%)             │
│        │  [████████████░░░░░░░░░░░░]                       │
│        │                                                   │
│        │  💡 Recommandations pour vous                      │
│        │  ┌────────┐ ┌────────┐ ┌────────┐                 │
│        │  │ 📘     │ │ 📗     │ │ 📕     │                 │
│        │  │ Titre  │ │ Titre  │ │ Titre  │                 │
│        │  │ ⭐4.7  │ │ ⭐4.3  │ │ ⭐4.9  │                 │
│        │  └────────┘ └────────┘ └────────┘                 │
└────────┴───────────────────────────────────────────────────┘
```

---

## 14. Gestion des Risques

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|-------------|--------|------------|
| R1 | Complexité du moteur de recommandation | Élevée | Moyen | Commencer par un algorithme simple (content-based), itérer |
| R2 | Surcharge de travail (projet solo) | Élevée | Élevé | Priorisation MoSCoW stricte, focus sur le MVP |
| R3 | Coûts AWS imprévus | Moyenne | Moyen | Utiliser le Free Tier, alertes budget, dimensionnement minimal |
| R4 | Faille de sécurité | Moyenne | Élevé | Scan automatisé, OWASP, audit de code |
| R5 | Indisponibilité API Google Books | Faible | Moyen | Cache des résultats, fallback vers données locales |
| R6 | Problèmes de performance | Moyenne | Moyen | Cache Redis, pagination, lazy loading, profiling régulier |
| R7 | Incompatibilité versions | Faible | Faible | Docker pour uniformiser les environnements |
| R8 | Perte de données | Faible | Élevé | Backups automatisés RDS, versionning S3 |

---

## 15. Livrables

| # | Livrable | Format | Sprint |
|---|----------|--------|--------|
| L1 | Cahier de charges (ce document) | Markdown / PDF | S0 |
| L2 | Code source Backend (Java/Spring Boot) | GitHub Repository | S1-S6 |
| L3 | Code source Frontend (React.js) | GitHub Repository | S1-S6 |
| L4 | Documentation API (Swagger/OpenAPI) | HTML auto-généré | S6 |
| L5 | Scripts de déploiement (Docker, K8s, Helm) | GitHub Repository | S6 |
| L6 | Pipeline CI/CD (GitHub Actions) | YAML | S0-S6 |
| L7 | Rapport de tests (unitaires, intégration, E2E) | HTML (JUnit/Cypress) | S6 |
| L8 | Rapport d'analyse de sécurité | PDF (OWASP/Trivy) | S6 |
| L9 | Guide de déploiement | Markdown | S6 |
| L10 | Présentation finale (soutenance) | PowerPoint / PDF | S6 |
| L11 | Vidéo de démonstration | MP4 (5 min) | S6 |

---

## 16. Annexes

### Annexe A — API REST — Endpoints Principaux

#### Auth Service (`/api/auth`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/register` | Inscription | Non |
| POST | `/api/auth/login` | Connexion | Non |
| POST | `/api/auth/refresh` | Rafraîchir token | Non |
| POST | `/api/auth/forgot-password` | Demander reset | Non |
| POST | `/api/auth/reset-password` | Reset mot de passe | Non |
| GET | `/api/auth/oauth2/google` | OAuth2 Google | Non |
| GET | `/api/auth/oauth2/github` | OAuth2 GitHub | Non |

#### User Service (`/api/users`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/users/me` | Profil courant | READER |
| PUT | `/api/users/me` | Modifier profil | READER |
| DELETE | `/api/users/me` | Supprimer compte (RGPD) | READER |
| GET | `/api/users` | Lister utilisateurs | ADMIN |
| PUT | `/api/users/{id}/status` | Activer/Désactiver | ADMIN |

#### Book Service (`/api/books`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/books` | Lister/Rechercher livres | Non |
| GET | `/api/books/{id}` | Détail d'un livre | Non |
| POST | `/api/books` | Ajouter un livre | ADMIN |
| PUT | `/api/books/{id}` | Modifier un livre | ADMIN |
| DELETE | `/api/books/{id}` | Supprimer un livre | ADMIN |
| GET | `/api/books/search?q=` | Recherche full-text | Non |
| GET | `/api/books/popular` | Livres populaires | Non |

#### Reading Tracker (`/api/tracking`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/tracking/library` | Ma bibliothèque | READER |
| POST | `/api/tracking/library` | Ajouter un livre | READER |
| PUT | `/api/tracking/library/{id}` | Modifier statut/progression | READER |
| DELETE | `/api/tracking/library/{id}` | Retirer un livre | READER |
| GET | `/api/tracking/history` | Historique lectures | READER |
| GET | `/api/tracking/goal` | Objectif annuel | READER |
| PUT | `/api/tracking/goal` | Définir objectif | READER |

#### Review Service (`/api/reviews`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/reviews/book/{bookId}` | Avis d'un livre | Non |
| POST | `/api/reviews` | Créer un avis | READER |
| PUT | `/api/reviews/{id}` | Modifier un avis | READER |
| DELETE | `/api/reviews/{id}` | Supprimer un avis | READER |
| POST | `/api/reviews/{id}/like` | Liker un avis | READER |
| POST | `/api/reviews/{id}/comments` | Commenter un avis | READER |
| PUT | `/api/reviews/{id}/flag` | Signaler un avis | READER |

#### Recommendation Service (`/api/recommendations`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/recommendations` | Mes recommandations | READER |
| GET | `/api/recommendations/trending` | Tendances | Non |
| GET | `/api/recommendations/similar/{bookId}` | Livres similaires | Non |

#### Statistics Service (`/api/stats`)
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/stats/me` | Mes statistiques | READER |
| GET | `/api/stats/me/genres` | Répartition par genre | READER |
| GET | `/api/stats/me/timeline` | Timeline de lecture | READER |
| GET | `/api/stats/platform` | Stats plateforme | ADMIN |

### Annexe B — Variables d'Environnement

```env
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/booktracker
SPRING_DATASOURCE_USERNAME=booktracker
SPRING_DATASOURCE_PASSWORD=****

# MongoDB
SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/booktracker_reco

# Redis
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379

# JWT
JWT_SECRET_KEY=****
JWT_ACCESS_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

# OAuth2
GOOGLE_CLIENT_ID=****
GOOGLE_CLIENT_SECRET=****
GITHUB_CLIENT_ID=****
GITHUB_CLIENT_SECRET=****

# Google Books API
GOOGLE_BOOKS_API_KEY=****

# AWS
AWS_REGION=eu-west-3
AWS_S3_BUCKET=booktracker-assets

# RabbitMQ
SPRING_RABBITMQ_HOST=localhost
SPRING_RABBITMQ_PORT=5672

# Elasticsearch
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
```

### Annexe C — Structure du Projet Backend (Maven Multi-Modules)

```
booktracker/
├── pom.xml                          # Parent POM
├── booktracker-gateway/             # API Gateway (Spring Cloud Gateway)
│   ├── pom.xml
│   └── src/
├── booktracker-discovery/           # Service Discovery (Eureka)
│   ├── pom.xml
│   └── src/
├── booktracker-config/              # Configuration Server
│   ├── pom.xml
│   └── src/
├── booktracker-auth/                # Auth Service
│   ├── pom.xml
│   └── src/main/java/com/booktracker/auth/
│       ├── config/SecurityConfig.java
│       ├── controller/AuthController.java
│       ├── dto/LoginRequest.java
│       ├── dto/RegisterRequest.java
│       ├── entity/User.java
│       ├── repository/UserRepository.java
│       ├── service/AuthService.java
│       ├── security/JwtTokenProvider.java
│       └── security/OAuth2Config.java
├── booktracker-book/                # Book Service
│   ├── pom.xml
│   └── src/main/java/com/booktracker/book/
│       ├── controller/BookController.java
│       ├── entity/Book.java
│       ├── entity/Author.java
│       ├── entity/Genre.java
│       ├── repository/BookRepository.java
│       ├── service/BookService.java
│       └── integration/GoogleBooksClient.java
├── booktracker-tracking/            # Reading Tracker Service
│   ├── pom.xml
│   └── src/main/java/com/booktracker/tracking/
├── booktracker-review/              # Review Service
│   ├── pom.xml
│   └── src/main/java/com/booktracker/review/
├── booktracker-recommendation/      # Recommendation Engine
│   ├── pom.xml
│   └── src/main/java/com/booktracker/recommendation/
├── booktracker-notification/        # Notification Service
│   ├── pom.xml
│   └── src/main/java/com/booktracker/notification/
├── booktracker-common/              # Shared DTOs, Utils
│   ├── pom.xml
│   └── src/
├── docker-compose.yml               # Local development stack
├── docker-compose.prod.yml          # Production stack
├── k8s/                             # Kubernetes manifests
│   ├── namespace.yaml
│   ├── auth-deployment.yaml
│   ├── book-deployment.yaml
│   └── ...
└── .github/
    └── workflows/
        ├── ci.yml                   # CI pipeline
        └── cd.yml                   # CD pipeline
```

---

### Annexe D — Glossaire

| Terme | Définition |
|-------|-----------|
| **JWT** | JSON Web Token — standard de token d'authentification |
| **OAuth2** | Protocole d'autorisation pour l'authentification sociale |
| **RBAC** | Role-Based Access Control — contrôle d'accès basé sur les rôles |
| **RGPD** | Règlement Général sur la Protection des Données |
| **MoSCoW** | Must/Should/Could/Won't — méthode de priorisation |
| **MVP** | Minimum Viable Product — produit minimum viable |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **HPA** | Horizontal Pod Autoscaler (Kubernetes) |
| **WAF** | Web Application Firewall |
| **SPA** | Single Page Application |
| **EKS** | Elastic Kubernetes Service (AWS) |
| **RDS** | Relational Database Service (AWS) |
| **SLA** | Service Level Agreement |

---

> **Document validé par :** Mohamed Nacer Hammami  
> **Date de validation :** 19/02/2026  
> **Version :** 1.0  
> **Statut :** En vigueur
