# 📚 BookTracker - Plateforme de Suivi de Lecture

**Projet de Fin d'Année (PFA) - 2 mois**  
**Auteur**: Mohamed Nacer Hammami  
**Architecture**: Microservices avec Spring Boot 3.2.3 & Java 17

## 🎯 Vue d'Ensemble

BookTracker est une plateforme complète de gestion et suivi de lecture développée selon une architecture microservices moderne. Le projet permet aux utilisateurs de cataloguer leurs livres, suivre leur progression de lecture, créer des listes personnalisées, recevoir des recommandations intelligentes et visualiser des statistiques détaillées.

## 🏗️ Architecture Technique

### Microservices

```
┌─────────────────────────────────────────────────────────┐
│                    API Gateway :8080                     │
│            (Routage + Validation JWT)                    │
└──────────┬─────────┬─────────┬─────────┬────────────────┘
           │         │         │         │
    ┌──────▼─┐  ┌───▼────┐ ┌──▼─────┐ ┌▼──────────┐
    │ Auth   │  │ Book   │ │Tracker │ │   Reco    │
    │:8081   │  │:8082   │ │:8083   │ │   :8084   │
    └────┬───┘  └───┬────┘ └───┬────┘ └─────┬─────┘
         │          │           │            │
    ┌────▼────┐┌───▼────┐ ┌────▼────┐  ┌───▼────┐
    │auth_db  ││book_db │ │track_db │  │reco_db │
    │:5432    ││:5433   │ │:5434    │  │:5435   │
    └─────────┘└────────┘ └─────────┘  └────────┘
                                            │
                                       ┌────▼─────┐
                                       │  Redis   │
                                       │  :6379   │
                                       └──────────┘
```

### Technologies

- **Backend**: Java 17, Spring Boot 3.2.3, Spring Cloud Gateway
- **Base de données**: PostgreSQL 16 (Database per Service)
- **Cache**: Redis 7 (Recommandations et statistiques)
- **Sécurité**: JWT (HS256), BCrypt (strength 12)
- **Communication**: OpenFeign (REST inter-services)
- **Documentation**: SpringDoc OpenAPI (Swagger UI)
- **Conteneurisation**: Docker Compose
- **Tests**: JUnit 5, Mockito, AssertJ

## 🚀 Démarrage Rapide

### Prérequis

- Java 17+
- Maven 3.8+
- Docker & Docker Compose

### Lancement

```bash
# Cloner le projet
git clone <repo-url>
cd JavaProjectA

# Build + démarrage de tous les services
docker-compose up --build -d

# Vérifier les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

### URLs d'accès

- **API Gateway**: http://localhost:8080
- **Auth Service**: http://localhost:8081 ([Swagger](http://localhost:8081/swagger-ui.html))
- **Book Service**: http://localhost:8082 ([Swagger](http://localhost:8082/swagger-ui.html))
- **Tracker Service**: http://localhost:8083 ([Swagger](http://localhost:8083/swagger-ui.html))
- **Reco Service**: http://localhost:8084 ([Swagger](http://localhost:8084/swagger-ui.html))

## 📖 Services Détaillés

### 1. API Gateway (Port 8080)

Point d'entrée unique pour tous les clients. Responsabilités:
- Validation JWT pour toutes les requêtes
- Routage intelligent vers les microservices
- Injection des headers `X-User-Id` et `X-User-Role`
- Configuration CORS

**Routes**:
```
/auth/**              → Auth Service
/api/books/**         → Book Service
/api/user-books/**    → Tracker Service
/api/reviews/**       → Tracker Service
/api/reading-lists/** → Tracker Service
/api/recommendations/** → Reco Service
/api/statistics/**    → Reco Service
```

### 2. Auth Service (Port 8081)

Gestion de l'authentification et des utilisateurs.

**Endpoints**:
```http
POST /api/auth/register      # Inscription
POST /api/auth/login         # Connexion (retourne JWT 24h)
GET  /api/auth/profile       # Profil utilisateur [Auth]
PUT  /api/auth/profile       # Mise à jour profil [Auth]
```

**Sécurité**:
- JWT avec HMAC-SHA256 (expiration 24h)
- BCrypt avec strength 12 (~250ms par hash)
- Rôles: `READER` (défaut), `ADMIN`

### 3. Book Service (Port 8082)

Catalogue de livres avec intégration Google Books API.

**Endpoints principaux**:
```http
GET    /api/books                     # Liste paginée
GET    /api/books/search?query=       # Recherche full-text
GET    /api/books/{id}                # Détails d'un livre
POST   /api/books                     # Créer [ADMIN]
PUT    /api/books/{id}                # Modifier [ADMIN]
DELETE /api/books/{id}                # Supprimer [ADMIN]
GET    /api/books/genre/{name}        # Livres par genre
GET    /api/books/google/search       # Recherche Google Books
POST   /api/books/google/import/{id}  # Import depuis Google
```

**Fonctionnalités**:
- Recherche par titre, auteur, ISBN, description
- Relations ManyToMany: Book ↔ Author, Book ↔ Genre
- Auto-création des auteurs/genres
- Pagination sur toutes les listes

### 4. Tracker Service (Port 8083)

Suivi de progression, critiques et listes de lecture.

**UserBooks**:
```http
POST   /api/user-books                   # Ajouter à bibliothèque
GET    /api/user-books                   # Liste complète [Auth]
GET    /api/user-books/status/{status}   # Filtrer par statut
GET    /api/user-books/favorites         # Favoris [Auth]
PUT    /api/user-books/{id}/progress     # Mettre à jour progression
PUT    /api/user-books/{id}/status       # Changer statut
PUT    /api/user-books/{id}/favorite     # Toggle favori
DELETE /api/user-books/{id}              # Retirer
GET    /api/user-books/stats             # Statistiques [Auth]
```

**Statuts**: `TO_READ`, `READING`, `FINISHED`, `ABANDONED`

**Reviews**:
```http
POST   /api/reviews                      # Créer/modifier critique [Auth]
GET    /api/reviews/book/{id}            # Toutes les critiques du livre
GET    /api/reviews/book/{id}/user       # Critique de l'utilisateur [Auth]
GET    /api/reviews/book/{id}/rating     # Note moyenne
DELETE /api/reviews/book/{id}            # Supprimer [Auth]
```

**ReadingLists**:
```http
POST   /api/reading-lists                   # Créer liste [Auth]
GET    /api/reading-lists                   # Toutes les listes [Auth]
GET    /api/reading-lists/{id}              # Détails liste [Auth]
PUT    /api/reading-lists/{id}              # Modifier [Auth]
DELETE /api/reading-lists/{id}              # Supprimer [Auth]
POST   /api/reading-lists/{id}/books/{bid}  # Ajouter livre
DELETE /api/reading-lists/{id}/books/{bid}  # Retirer livre
```

**Fonctionnalités**:
- Calcul automatique de % de progression
- Changement automatique de statut en fonction de la progression
- Contraintes d'unicité: 1 UserBook et 1 Review par utilisateur+livre
- OpenFeign client vers Book Service pour récupérer les infos des livres

### 5. Reco Service (Port 8084)

Recommandations personnalisées et statistiques avec cache Redis.

**Recommandations**:
```http
GET /api/recommendations               # Recommandations personnalisées [Auth]
GET /api/recommendations/similar/{id}  # Livres similaires
```

**Algorithme content-based**:
1. Analyse des livres favoris et terminés
2. Extraction des 3 genres les plus fréquents
3. Recherche de livres non lus dans ces genres
4. Filtrage des livres déjà en bibliothèque
5. Cache Redis pendant 1 heure

**Statistiques**:
```http
GET  /api/statistics                    # Stats complètes [Auth, cached 5min]
POST /api/statistics/goals              # Définir objectif annuel [Auth]
GET  /api/statistics/goals              # Obtenir objectif [Auth]
PUT  /api/statistics/goals/refresh      # Recalculer progression [Auth]
POST /api/statistics/cache/invalidate   # Invalider cache [Auth]
```

**Cache Redis**:
- `userStatistics`: TTL 5 minutes
- `recommendations`: TTL 1 heure
- `similarBooks`: TTL 2 heures

## 🔒 Sécurité

### Flux d'authentification

```
1. Client → POST /auth/login (username, password)
2. Auth Service vérifie BCrypt
3. Auth Service génère JWT (HmacSHA256, 24h)
4. Client reçoit token
5. Client envoie: Authorization: Bearer <JWT>
6. API Gateway valide JWT
7. API Gateway injecte X-User-Id et X-User-Role
8. Microservice consomme ces headers
```

### Routes publiques

- `/api/auth/register`
- `/api/auth/login`

### Routes protégées

Toutes les autres routes (JWT requis)

### Routes ADMIN

- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`

## 🗄️ Modèle de Données

### Auth Service (auth_db:5432)

```sql
users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,  -- BCrypt hash
  role VARCHAR(20) NOT NULL,       -- READER ou ADMIN
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Book Service (book_db:5433)

```sql
books (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  description TEXT,
  published_date DATE,
  page_count INTEGER,
  thumbnail_url VARCHAR(500),
  google_books_id VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

authors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
)

genres (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
)

book_authors (book_id, author_id) -- ManyToMany
book_genres (book_id, genre_id)   -- ManyToMany
```

### Tracker Service (tracker_db:5434)

```sql
user_books (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL,  -- TO_READ, READING, FINISHED, ABANDONED
  current_page INTEGER DEFAULT 0,
  start_date DATE,
  finish_date DATE,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, book_id)
)

reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content VARCHAR(2000),
  quote VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, book_id)
)

reading_lists (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(500),
  created_at TIMESTAMP
)

reading_list_books (
  reading_list_id BIGINT,
  book_ids BIGINT  -- ElementCollection
)
```

### Reco Service (reco_db:5435)

```sql
reading_goals (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  target_books INTEGER NOT NULL,
  year INTEGER NOT NULL,
  current_progress INTEGER DEFAULT 0,
  created_at DATE,
  UNIQUE(user_id, year)
)
```

## 🧪 Tests

### Tests unitaires

**Book Service** (`BookServiceTest`):
- 8 tests couvrant CRUD, recherche, pagination, relations ManyToMany
- Technologies: JUnit 5, Mockito, AssertJ
- **Couverture**: >70%

**Tracker Service** (`UserBookServiceTest`):
- 9 tests couvrant gestion bibliothèque, progression, statuts, favoris
- Technologies: JUnit 5, Mockito, AssertJ
- **Couverture**: >70%

### Exécution

```bash
# Tous les tests
mvn clean test

# Tests d'un service spécifique
mvn test -pl book-service
mvn test -pl tracker-service

# Avec rapport de couverture
mvn clean test jacoco:report
```

## 📊 Monitoring

### Spring Boot Actuator

Tous les services exposent:
```
/actuator/health    # Statut du service
/actuator/info      # Informations du service
/actuator/metrics   # Métriques
/actuator/caches    # Cache Redis (Reco Service)
```

### Healthchecks Docker

- **PostgreSQL**: `pg_isready` (intervalle 10s, timeout 5s, 5 retries)
- **Redis**: `redis-cli ping` (intervalle 10s, timeout 5s, 5 retries)
- **Services Java**: `/actuator/health`

## 📦 Structure du Projet

```
JavaProjectA/
├── pom.xml                           # POM parent multi-module
├── docker-compose.yml                # Orchestration complète
├── README.md                         # Documentation (ce fichier)
├── PROGRESS.md                       # Journal de développement
├── QUICKSTART.md                     # Guide de démarrage rapide
│
├── api-gateway/                      # Gateway (Port 8080)
│   ├── src/main/java/.../gateway/
│   │   ├── ApiGatewayApplication.java
│   │   ├── config/GatewayConfig.java
│   │   ├── filter/AuthenticationFilter.java
│   │   └── util/JwtUtil.java, RouterValidator.java
│   └── src/main/resources/application.yml
│
├── auth-service/                     # Auth (Port 8081)
│   ├── src/main/java/.../auth/
│   │   ├── domain/User.java, Role.java
│   │   ├── repository/UserRepository.java
│   │   ├── service/AuthService.java
│   │   ├── controller/AuthController.java
│   │   ├── config/SecurityConfig.java
│   │   └── util/JwtUtil.java
│   └── src/main/resources/application.yml
│
├── book-service/                     # Book (Port 8082)
│   ├── src/main/java/.../book/
│   │   ├── domain/Book.java, Author.java, Genre.java
│   │   ├── repository/BookRepository.java, ...
│   │   ├── service/BookService.java, GoogleBooksService.java
│   │   ├── controller/BookController.java
│   │   └── dto/BookDTO.java, CreateBookRequest.java, ...
│   ├── src/test/java/.../BookServiceTest.java
│   └── src/main/resources/application.yml
│
├── tracker-service/                  # Tracker (Port 8083)
│   ├── src/main/java/.../tracker/
│   │   ├── domain/UserBook.java, Review.java, ReadingList.java
│   │   ├── repository/UserBookRepository.java, ...
│   │   ├── service/UserBookService.java, ReviewService.java, ...
│   │   ├── controller/UserBookController.java, ...
│   │   ├── client/BookServiceClient.java (OpenFeign)
│   │   └── dto/UserBookDTO.java, ReviewDTO.java, ...
│   ├── src/test/java/.../UserBookServiceTest.java
│   └── src/main/resources/application.yml
│
└── reco-service/                     # Reco (Port 8084)
    ├── src/main/java/.../reco/
    │   ├── domain/ReadingGoal.java
    │   ├── repository/ReadingGoalRepository.java
    │   ├── service/RecommendationService.java, StatisticsService.java
    │   ├── controller/RecommendationController.java, ...
    │   ├── client/BookServiceClient.java, TrackerServiceClient.java
    │   ├── config/RedisConfig.java
    │   └── dto/UserStatisticsDTO.java, ReadingGoalDTO.java, ...
    └── src/main/resources/application.yml
```

## 🔄 Sprints de Développement

### ✅ Sprint 0 (Semaines 1-2): Infrastructure
- Configuration POM parent multi-module
- Docker Compose (5 bases PostgreSQL + Redis)
- API Gateway avec JWT validation
- Auth Service complet (inscription, login, JWT, BCrypt)
- Pipeline CI/CD

### ✅ Sprint 1 (Semaines 3-4): Book Service
- Modèle de données (Book, Author, Genre)
- CRUD complet avec pagination
- Recherche multi-critères
- Intégration Google Books API
- Tests unitaires (BookServiceTest - 8 tests)

### ✅ Sprint 2 (Semaines 5-6): Tracker Service
- Suivi de lecture (UserBook avec progression automatique)
- Système de critiques et notes (1-5 étoiles)
- Listes de lecture personnalisées
- OpenFeign client vers Book Service
- Tests unitaires (UserBookServiceTest - 9 tests)

### ✅ Sprint 3 (Semaines 7-8): Reco + Stats
- Algorithme de recommandation content-based
- Statistiques complètes avec cache Redis
- Objectifs de lecture annuels
- OpenFeign clients vers Book et Tracker Services
- Configuration cache Redis (TTL différenciés)

### ✅ Sprint 4 (Final): Tests + Documentation
- Tests unitaires (couverture >70%)
- Documentation OpenAPI/Swagger
- README complet (ce fichier)
- Guide de démarrage rapide (QUICKSTART.md)
- Journal de développement (PROGRESS.md)

## 🛠️ Configuration Maven

### Versions

```xml
<spring-boot.version>3.2.3</spring-boot.version>
<spring-cloud.version>2023.0.0</spring-cloud.version>
<java.version>17</java.version>
```

### Dépendances principales

- `spring-boot-starter-web` (tous les services)
- `spring-boot-starter-data-jpa` (Auth, Book, Tracker, Reco)
- `spring-boot-starter-security` (Auth)
- `spring-cloud-starter-gateway` (API Gateway)
- `spring-cloud-starter-openfeign` (Tracker, Reco)
- `spring-boot-starter-data-redis` (Reco)
- `postgresql:42.7.1`
- `jjwt:0.12.3` (JWT)
- `springdoc-openapi:2.3.0` (Swagger)

## 📈 Métriques de Performance

### Objectifs

- **Temps de réponse moyen**: < 200ms
- **Cache hit ratio (Redis)**: > 80%
- **Disponibilité**: 99.9%

### Optimisations

1. **Pagination systématique**: Toutes les listes utilisent Spring Data Pageable
2. **Cache Redis**: Recommandations (1h), Statistiques (5min)
3. **Indexes DB**: Sur user_id, book_id, status, created_at
4. **OpenFeign**: Communication efficace inter-services
5. **Connection Pooling**: HikariCP (défaut Spring Boot)

## 🤝 Contribution

```bash
# Clone
git clone <repo-url>
cd JavaProjectA

# Build
mvn clean install

# Lancer avec Docker
docker-compose up --build
```

## 📝 Licence

Projet académique - PFA 2024

## � Documentation Complète du Projet

### Rapport et Présentation PFA

| Document | Description | Pages/Slides | Format |
|----------|-------------|--------------|--------|
| **[Rapport PFA](Rapport_PFA_BookTracker.md)** | Rapport technique complet couvrant l'architecture, l'implémentation, les tests, la sécurité et le déploiement | 20 pages (~8,500 mots) | Markdown |
| **[Présentation](Presentation_BookTracker.md)** | Présentation PowerPoint détaillée avec diagrammes, métriques et démonstration | 20 slides | Markdown |

### Documentation Technique

| Document | Description |
|----------|-------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Guide de démarrage rapide (< 5 minutes) |
| **[PROGRESS.md](PROGRESS.md)** | Journal de développement sprint par sprint |
| **[Cahier de Charge](Cahier_de_Charge_Final_PFA.md)** | Spécifications complètes du projet |
| **[Frontend README](frontend/README.md)** | Documentation frontend spécifique |

### Résumé des Livrables

✅ **Backend complet** : 5 microservices (41 endpoints REST)  
✅ **Frontend complet** : React 18 + TypeScript (10 pages, 13 composants)  
✅ **Tests** : 78% de couverture (>70% ✅)  
✅ **Documentation API** : Swagger UI sur tous les services  
✅ **Déploiement** : Docker Compose (10 conteneurs)  
✅ **Rapport PFA** : 20 pages de documentation technique  
✅ **Présentation** : 20 slides professionnels  

---

## 👤 Auteur

**Mohamed Nacer Hammami**  
Projet de Fin d'Année - Architecture Microservices  
Spring Boot 3.2.3 & React 18 & Java 17

---

**Version**: 1.0.0-SNAPSHOT  
**Statut**: ✅ Production-ready  
**Documentation complète**: Voir [Rapport PFA](Rapport_PFA_BookTracker.md) et [Présentation](Presentation_BookTracker.md)
