# 📁 BookTracker - Index des Documents

## Navigation Rapide

Ce fichier sert de **table des matières complète** pour tous les documents et ressources du projet BookTracker.

---

## 📚 Rapports et Présentations

### Livrables Principaux (PFA)

| Document | Description | Taille | Lien |
|----------|-------------|--------|------|
| 📄 **Rapport PFA** | Rapport technique complet : architecture, implémentation, sécurité, tests, déploiement | 20 pages (~8,500 mots) | [Rapport_PFA_BookTracker.md](Rapport_PFA_BookTracker.md) |
| 📊 **Présentation PowerPoint** | Slides professionnels avec diagrammes, métriques, captures d'écran, démonstration | 20 slides | [Presentation_BookTracker.md](Presentation_BookTracker.md) |

### Contenu du Rapport PFA

1. Introduction et contexte
2. Analyse des besoins (fonctionnels et non fonctionnels)
3. Architecture technique (microservices, patterns)
4. Stack technologique détaillé
5. Modélisation des données (11 tables SQL)
6. Développement backend sprint par sprint
7. Développement frontend (React 18 + TypeScript)
8. Sécurité (JWT, BCrypt, RBAC)
9. Tests et qualité (78% couverture)
10. Déploiement (Docker Compose)
11. Gestion de projet (4 sprints Scrum)
12. Résultats et métriques
13. Défis rencontrés et solutions
14. Évolutions futures
15. Conclusion
16. Bibliographie

### Contenu de la Présentation

1. Page de titre
2. Contexte et problématique
3. Objectifs (fonctionnels + techniques)
4. Architecture globale (diagramme)
5. Principes architecturaux (4 patterns)
6. Backend - Services (5 microservices, 41 endpoints)
7. Backend - Fonctionnalités détaillées
8. Backend - Sécurité (JWT, RBAC)
9. Frontend - Architecture React
10. Frontend - Pages principales
11. Frontend - Fonctionnalités avancées
12. Composants réutilisables (13 composants)
13. Tests et qualité (78%)
14. Déploiement Docker (10 conteneurs)
15. Résultats et métriques finales
16. Défis et solutions
17. Évolutions futures
18. Démo utilisateur
19. Compétences développées
20. Conclusion + Contact

---

## 📖 Documentation Technique

### Guides Essentiels

| Document | Utilité | Lien |
|----------|---------|------|
| 🏠 **README.md** | Vue d'ensemble complète du projet (architecture, technologies, démarrage) | [README.md](README.md) |
| ⚡ **QUICKSTART.md** | Démarrage rapide en moins de 5 minutes | [QUICKSTART.md](QUICKSTART.md) |
| 📊 **PROGRESS.md** | Journal de développement sprint par sprint avec % d'avancement | [PROGRESS.md](PROGRESS.md) |
| 📋 **SUMMARY.md** | Résumé exécutif en une page (métriques, objectifs, résultats) | [SUMMARY.md](SUMMARY.md) |
| 📁 **INDEX.md** | Ce fichier - Navigation complète | [INDEX.md](INDEX.md) |

### Spécifications Projet

| Document | Contenu | Lien |
|----------|---------|------|
| 📝 **Cahier de Charge Final** | Spécifications complètes, user stories, critères d'acceptation | [Cahier_de_Charge_Final_PFA.md](Cahier_de_Charge_Final_PFA.md) |
| 📝 **Cahier de Charge BookTracker** | Version intermédiaire du cahier de charge | [Cahier_de_Charge_BookTracker.md](Cahier_de_Charge_BookTracker.md) |
| 📝 **Cahier de Charge BookTracker PFA** | Première version du cahier de charge | [Cahier_de_Charge_BookTracker_PFA.md](Cahier_de_Charge_BookTracker_PFA.md) |

---

## 🔧 Configuration et Déploiement

### Fichiers de Configuration Racine

| Fichier | Description | Lien |
|---------|-------------|------|
| 🐳 **docker-compose.yml** | Orchestration de 10 conteneurs (5 services + 4 PostgreSQL + 1 Redis) | [docker-compose.yml](docker-compose.yml) |
| 📦 **pom.xml** | Maven parent POM (multi-module : gateway, auth, book, tracker, reco) | [pom.xml](pom.xml) |

### Configuration Backend (par service)

#### API Gateway (`api-gateway/`)
- **[pom.xml](api-gateway/pom.xml)** : Spring Cloud Gateway, JWT utils
- **[application.yml](api-gateway/src/main/resources/application.yml)** : Routage, CORS, JWT secret
- **[application-docker.yml](api-gateway/src/main/resources/application-docker.yml)** : Config Docker
- **[Dockerfile](api-gateway/Dockerfile)** : Image Docker API Gateway

#### Auth Service (`auth-service/`)
- **[pom.xml](auth-service/pom.xml)** : Spring Security, PostgreSQL Driver, JWT
- **[application.yml](auth-service/src/main/resources/application.yml)** : DB auth_db, JWT, BCrypt
- **[application-docker.yml](auth-service/src/main/resources/application-docker.yml)** : Config Docker
- **[Dockerfile](auth-service/Dockerfile)** : Image Docker Auth Service

#### Book Service (`book-service/`)
- **[pom.xml](book-service/pom.xml)** : Spring Data JPA, PostgreSQL, RestTemplate
- **[application.yml](book-service/src/main/resources/application.yml)** : DB book_db, Swagger
- **[application-docker.yml](book-service/src/main/resources/application-docker.yml)** : Config Docker
- **[Dockerfile](book-service/Dockerfile)** : Image Docker Book Service

#### Tracker Service (`tracker-service/`)
- **[pom.xml](tracker-service/pom.xml)** : Spring Data JPA, OpenFeign, PostgreSQL
- **[application.yml](tracker-service/src/main/resources/application.yml)** : DB tracker_db, Feign clients
- **[application-docker.yml](tracker-service/src/main/resources/application-docker.yml)** : Config Docker
- **[Dockerfile](tracker-service/Dockerfile)** : Image Docker Tracker Service

#### Reco Service (`reco-service/`)
- **[pom.xml](reco-service/pom.xml)** : Spring Cache, Redis, OpenFeign, PostgreSQL
- **[application.yml](reco-service/src/main/resources/application.yml)** : DB reco_db, Redis TTL
- **[application-docker.yml](reco-service/src/main/resources/application-docker.yml)** : Config Docker
- **[Dockerfile](reco-service/Dockerfile)** : Image Docker Reco Service

### Configuration Frontend (`frontend/`)

| Fichier | Description | Lien |
|---------|-------------|------|
| 📦 **package.json** | Dépendances (React, TypeScript, Tailwind, Axios, Zustand, Recharts) | [frontend/package.json](frontend/package.json) |
| ⚡ **vite.config.ts** | Configuration Vite (proxy API :8080, build optimisé) | [frontend/vite.config.ts](frontend/vite.config.ts) |
| 🎨 **tailwind.config.js** | Thème Tailwind (couleurs primary, fonts Inter) | [frontend/tailwind.config.js](frontend/tailwind.config.js) |
| 📝 **tsconfig.json** | TypeScript strict mode, path aliases | [frontend/tsconfig.json](frontend/tsconfig.json) |
| ✅ **eslint.config.mjs** | Règles ESLint (React, TypeScript) | [frontend/eslint.config.mjs](frontend/eslint.config.mjs) |
| 🖼️ **index.html** | Point d'entrée HTML | [frontend/index.html](frontend/index.html) |
| 🌐 **.gitignore** | Fichiers ignorés (node_modules, dist) | [frontend/.gitignore](frontend/.gitignore) |
| 📖 **README.md** | Documentation frontend spécifique | [frontend/README.md](frontend/README.md) |

---

## 💻 Code Source Backend

### Structure Générale (par service)

```
src/main/java/com/booktracker/{service}/
├── {Service}Application.java        # Point d'entrée Spring Boot
├── config/                           # Configurations (Security, CORS, Redis)
├── controller/                       # REST Controllers (@RestController)
├── domain/                           # Entités JPA (@Entity)
├── dto/                              # DTO (Data Transfer Objects)
├── repository/                       # Repositories JPA (@Repository)
├── service/                          # Services métier (@Service)
├── util/                             # Utilitaires (JWT, validation)
└── client/ (si applicable)           # Clients OpenFeign (@FeignClient)
```

### API Gateway (`api-gateway/src/main/java/com/booktracker/gateway/`)

| Fichier | Responsabilité |
|---------|----------------|
| **ApiGatewayApplication.java** | Point d'entrée Spring Boot |
| **config/GatewayConfig.java** | Configuration routes et CORS |
| **filter/AuthenticationFilter.java** | Filtre JWT (validation + injection headers) |
| **util/JwtUtil.java** | Utilitaires JWT (extraction claims) |

### Auth Service (`auth-service/src/main/java/com/booktracker/auth/`)

| Package | Fichiers | Responsabilité |
|---------|----------|----------------|
| **controller/** | AuthController.java | 6 endpoints (register, login, getProfile, updateProfile, changePassword, deleteAccount) |
| **domain/** | User.java, Role.java (enum) | Entité JPA `users` |
| **dto/** | LoginRequest, RegisterRequest, AuthResponse, UserDTO | DTO pour API |
| **repository/** | UserRepository.java | JPA Repository (findByUsername, findByEmail) |
| **service/** | AuthService.java, JwtService.java | Logique métier (BCrypt, JWT génération) |
| **config/** | SecurityConfig.java | Spring Security (BCrypt, JWT filter) |

### Book Service (`book-service/src/main/java/com/booktracker/book/`)

| Package | Fichiers | Responsabilité |
|---------|----------|----------------|
| **controller/** | BookController.java | 9 endpoints (CRUD, search, getByGenre, importFromGoogle) |
| **domain/** | Book.java, Author.java, Genre.java | Entités JPA (Many-to-Many) |
| **dto/** | BookDTO, CreateBookRequest, UpdateBookRequest, PageResponse, GoogleBooksResponse | DTO pour API |
| **repository/** | BookRepository, AuthorRepository, GenreRepository | JPA Repositories (custom queries) |
| **service/** | BookService.java | Logique métier (Google Books API, auto-création auteurs/genres) |

### Tracker Service (`tracker-service/src/main/java/com/booktracker/tracker/`)

| Package | Fichiers | Responsabilité |
|---------|----------|----------------|
| **controller/** | UserBookController, ReviewController, ReadingListController | 18 endpoints total |
| **domain/** | UserBook, Review, ReadingList, ReadingStatus (enum) | Entités JPA |
| **dto/** | UserBookDTO, AddBookRequest, ReviewDTO, ReadingListDTO, BookInfoDTO, UserBookStats | DTO pour API |
| **repository/** | UserBookRepository, ReviewRepository, ReadingListRepository | JPA Repositories |
| **service/** | UserBookService, ReviewService, ReadingListService | Logique métier (auto-finish, calcul stats) |
| **client/** | BookServiceClient.java | OpenFeign client (appel Book Service) |

### Reco Service (`reco-service/src/main/java/com/booktracker/reco/`)

| Package | Fichiers | Responsabilité |
|---------|----------|----------------|
| **controller/** | RecommendationController.java | 8 endpoints (getRecommendations, getSimilarBooks, getStats, goalCRUD) |
| **domain/** | ReadingGoal.java | Entité JPA `reading_goals` |
| **dto/** | UserStatistics, GenreStatistic, ReadingGoalDTO, BookDTO, UserBookDTO | DTO pour API |
| **repository/** | ReadingGoalRepository.java | JPA Repository |
| **service/** | RecommendationService.java | Algorithme content-based, cache Redis |
| **config/** | RedisConfig.java | Configuration Redis (TTL différenciés) |
| **client/** | BookServiceClient, TrackerServiceClient | Clients OpenFeign (appels Book + Tracker) |

### Tests Unitaires (par service)

| Fichier | Nombre de Tests | Couverture |
|---------|-----------------|------------|
| **BookServiceTest.java** | 8 tests | 82% |
| **UserBookServiceTest.java** | 9 tests | 76% |
| **Moyenne** | 17 tests | **78%** ✅ |

---

## 🎨 Code Source Frontend

### Structure Générale

```
frontend/src/
├── components/        # 13 composants réutilisables
├── pages/             # 10 pages (Login, Register, Dashboard, etc.)
├── services/          # 8 services API (authService, bookService, etc.)
├── stores/            # Zustand stores (authStore)
├── types/             # Types TypeScript complets
├── lib/               # Axios instance + utils
├── index.css          # Global styles + Tailwind
├── main.tsx           # Point d'entrée React
└── App.tsx            # Routes + Layout
```

### Composants Réutilisables (`frontend/src/components/`)

| Fichier | Description | Props |
|---------|-------------|-------|
| **Layout.tsx** | Layout principal (Header, Nav, Footer) | children |
| **Button.tsx** | Bouton stylisé (4 variants, 3 sizes, loading) | children, variant, size, loading, onClick |
| **Input.tsx** | Champ de formulaire avec label et erreur | label, error, type, value, onChange |
| **Card.tsx** | Conteneur avec hover effects | children, className |
| **Badge.tsx** | Badge de statut (4 variants colorés) | status |
| **ProgressBar.tsx** | Barre de progression (pages lues/total) | current, total, showLabel |
| **Rating.tsx** | Système 5 étoiles (interactif/readonly) | value, onChange, readonly, size |
| **UserBookCard.tsx** | Carte livre avec progression | userBook, onUpdate |
| **BookCard.tsx** | Carte livre catalogue | book, onAddToLibrary |
| **LoadingSpinner.tsx** | Spinner de chargement | fullScreen |
| **LoadingCard.tsx** | Skeleton placeholder | - |
| **EmptyState.tsx** | État vide (icon, titre, description, bouton) | icon, title, description, action |

### Pages Principales (`frontend/src/pages/`)

| Fichier | Route | Description | Lignes de Code |
|---------|-------|-------------|----------------|
| **Login.tsx** | `/login` | Formulaire de connexion | ~130 |
| **Register.tsx** | `/register` | Formulaire d'inscription | ~160 |
| **Dashboard.tsx** | `/` | Page d'accueil (KPIs, recent, reco) | ~150 |
| **Catalog.tsx** | `/catalog` | Catalogue de livres (search, pagination) | ~120 |
| **BookDetails.tsx** | `/books/:id` | Fiche détaillée livre (modal add, reviews) | ~280 |
| **Library.tsx** | `/library` | Bibliothèque personnelle (filtres statut) | ~120 |
| **ReadingLists.tsx** | `/lists` | Gestion listes de lecture (CRUD) | ~145 |
| **Recommendations.tsx** | `/recommendations` | Recommandations personnalisées | ~85 |
| **Statistics.tsx** | `/statistics` | Stats + graphiques (Recharts) | ~200 |
| **Profile.tsx** | `/profile` | Profil utilisateur (edit mode) | ~140 |

### Services API (`frontend/src/services/`)

| Fichier | Endpoints API | Fonctions |
|---------|---------------|-----------|
| **authService.ts** | 4 endpoints | login, register, getProfile, updateProfile |
| **bookService.ts** | 9 endpoints | getAllBooks, searchBooks, getBookById, createBook, updateBook, deleteBook, getBooksByGenre, searchGoogleBooks, importFromGoogle |
| **userBookService.ts** | 9 endpoints | addBook, getUserBooks, getBooksByStatus, getFavorites, updateProgress, updateStatus, toggleFavorite, removeBook, getStats |
| **reviewService.ts** | 5 endpoints | createOrUpdateReview, getUserReview, getBookReviews, getBookRating, deleteReview |
| **readingListService.ts** | 7 endpoints | createList, getUserLists, getListById, updateList, deleteList, addBookToList, removeBookFromList |
| **recommendationService.ts** | 7 endpoints | getRecommendations, getSimilarBooks, getUserStatistics, setReadingGoal, getReadingGoal, updateGoalProgress, invalidateCache |

### Types TypeScript (`frontend/src/types/index.ts`)

| Interface/Type | Propriétés | Usage |
|----------------|-----------|-------|
| **User** | id, username, email, role, createdAt | Représentation utilisateur |
| **AuthResponse** | user, token | Réponse login/register |
| **Book** | id, title, isbn, description, authors[], genres[], publishedDate, pageCount, thumbnailUrl | Livre complet |
| **UserBook** | id, userId, bookId, status, currentPage, startDate, finishDate, isFavorite, book | Livre dans bibliothèque |
| **Review** | id, userId, bookId, rating, content, quote, createdAt, updatedAt | Critique utilisateur |
| **ReadingList** | id, userId, name, description, bookIds[], createdAt | Liste personnalisée |
| **UserStatistics** | booksRead, currentlyReading, totalBooks, averageRating, genreStats[] | Stats utilisateur |
| **ReadingGoal** | id, userId, targetBooks, year, currentProgress | Objectif annuel |

### Stores Zustand (`frontend/src/stores/`)

| Fichier | State | Actions |
|---------|-------|---------|
| **authStore.ts** | user, token, isAuthenticated | setAuth, clearAuth |

### Utilitaires (`frontend/src/lib/`)

| Fichier | Fonctions |
|---------|-----------|
| **axios.ts** | Instance Axios configurée (baseURL, interceptors JWT, 401 redirect) |
| **utils.ts** | cn (className merge), formatDate, getStatusColor, getStatusLabel, calculateProgress, truncateText |

---

## 📊 API Documentation (Swagger UI)

### Accès aux Interfaces Swagger

| Service | URL Swagger UI | Nombre d'Endpoints |
|---------|----------------|---------------------|
| **Auth Service** | http://localhost:8081/swagger-ui.html | 6 |
| **Book Service** | http://localhost:8082/swagger-ui.html | 9 |
| **Tracker Service** | http://localhost:8083/swagger-ui.html | 18 |
| **Reco Service** | http://localhost:8084/swagger-ui.html | 8 |
| **Total** | - | **41 endpoints** |

### Endpoints par Service

#### Auth Service (6 endpoints)
1. `POST /api/auth/register` - Inscription
2. `POST /api/auth/login` - Connexion (génération JWT)
3. `GET /api/auth/profile` - Profil utilisateur
4. `PUT /api/auth/profile` - Modification profil
5. `PUT /api/auth/password` - Changement mot de passe
6. `DELETE /api/auth/account` - Suppression compte

#### Book Service (9 endpoints)
1. `GET /api/books` - Liste paginée de livres
2. `GET /api/books/{id}` - Livre par ID
3. `POST /api/books` - Création livre (ADMIN)
4. `PUT /api/books/{id}` - Modification livre (ADMIN)
5. `DELETE /api/books/{id}` - Suppression livre (ADMIN)
6. `GET /api/books/search` - Recherche multi-critères
7. `GET /api/books/genre/{name}` - Livres par genre
8. `GET /api/books/google/search` - Recherche Google Books
9. `POST /api/books/google/import/{googleBooksId}` - Import Google Books

#### Tracker Service (18 endpoints)
**UserBook (9)** :
1. `POST /api/user-books` - Ajout livre à bibliothèque
2. `GET /api/user-books` - Liste livres utilisateur
3. `GET /api/user-books/status/{status}` - Filtrer par statut
4. `GET /api/user-books/favorites` - Livres favoris
5. `PUT /api/user-books/{id}/progress` - Mise à jour progression
6. `PUT /api/user-books/{id}/status` - Changement statut
7. `PUT /api/user-books/{id}/favorite` - Toggle favori
8. `DELETE /api/user-books/{id}` - Retrait livre
9. `GET /api/user-books/stats` - Statistiques utilisateur

**Review (5)** :
10. `POST /api/reviews` - Créer/modifier critique
11. `GET /api/reviews/user/{bookId}` - Critique utilisateur pour un livre
12. `GET /api/reviews/book/{bookId}` - Toutes critiques d'un livre
13. `GET /api/reviews/book/{bookId}/rating` - Note moyenne livre
14. `DELETE /api/reviews/{id}` - Supprimer critique

**ReadingList (4)** :
15. `POST /api/reading-lists` - Créer liste
16. `GET /api/reading-lists` - Listes utilisateur
17. `PUT /api/reading-lists/{id}` - Modifier liste
18. `DELETE /api/reading-lists/{id}` - Supprimer liste

#### Reco Service (8 endpoints)
1. `GET /api/recommendations` - Recommandations personnalisées
2. `GET /api/recommendations/similar/{bookId}` - Livres similaires
3. `GET /api/recommendations/statistics` - Statistiques détaillées
4. `POST /api/recommendations/goal` - Définir objectif annuel
5. `GET /api/recommendations/goal` - Récupérer objectif
6. `PUT /api/recommendations/goal/{id}` - Modifier objectif
7. `PUT /api/recommendations/goal/{id}/progress` - Mise à jour progression
8. `POST /api/recommendations/cache/invalidate` - Invalider cache

---

## 🧪 Tests

### Fichiers de Tests Backend

| Fichier | Package | Tests | Couverture |
|---------|---------|-------|------------|
| **BookServiceTest.java** | book-service | 8 | 82% |
| **UserBookServiceTest.java** | tracker-service | 9 | 76% |

### Commandes Tests

```bash
# Tests unitaires
mvn test

# Tests avec couverture JaCoCo
mvn clean test jacoco:report

# Rapport dans : target/site/jacoco/index.html
```

---

## 🐳 Docker

### Images Docker

| Service | Image Base | Port | Dépendances |
|---------|------------|------|-------------|
| **API Gateway** | openjdk:17-jdk-slim | 8080 | auth-service, book-service, tracker-service, reco-service |
| **Auth Service** | openjdk:17-jdk-slim | 8081 | auth-db |
| **Book Service** | openjdk:17-jdk-slim | 8082 | book-db |
| **Tracker Service** | openjdk:17-jdk-slim | 8083 | tracker-db, book-service |
| **Reco Service** | openjdk:17-jdk-slim | 8084 | reco-db, redis, book-service, tracker-service |
| **PostgreSQL** | postgres:16 | 5432-5435 | - |
| **Redis** | redis:7-alpine | 6379 | - |

### Volumes Persistants

- `auth-db-data` : Données auth_db
- `book-db-data` : Données book_db
- `tracker-db-data` : Données tracker_db
- `reco-db-data` : Données reco_db
- `redis-data` : Cache Redis

---

## 📈 Métriques et Statistiques

### Métriques de Code

| Métrique | Backend | Frontend | Total |
|----------|---------|----------|-------|
| **Lignes de code** | 7,900 | 2,500 | **10,400** |
| **Fichiers** | 73 Java | 45 TS/TSX | **118** |
| **Classes/Composants** | 45 | 30 | **75** |
| **Endpoints/Services** | 41 | 8 | **49** |
| **Tests** | 17 | - | **17** |

### Couverture de Tests

- **BookService** : 82%
- **UserBookService** : 76%
- **Moyenne** : **78%** ✅ (objectif : >70%)

### Performance

- **Temps de réponse API** : 150ms (moyenne), P95 < 500ms ✅
- **Cache hit rate (Redis)** : ~80%
- **Démarrage total** : 60-90 secondes
- **Frontend TTI** : < 2.5s

---

## 🎓 Méthodologie

### Scrum (4 Sprints × 2 Semaines)

| Sprint | Semaines | Focus | Points | Statut |
|--------|----------|-------|--------|--------|
| **S0** | 1-2 | Infrastructure | - | ✅ Terminé |
| **S1** | 3-4 | Auth + Catalogue | 25 | ✅ Terminé |
| **S2** | 5-6 | Suivi Lecture | 21 | ✅ Terminé |
| **S3** | 7-8 | Recommandations + Stats | 22 | ✅ Terminé |
| **S4** | 7-8 | Tests + Frontend + Docs | 23 | ✅ Terminé |

**Total : 91 points story en 8 semaines**

---

## 🔗 Liens Utiles

### Documentation Externe

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Books API](https://developers.google.com/books)

### Outils

- **Postman** : Test d'API REST
- **pgAdmin 4** : Gestion PostgreSQL
- **Redis Insight** : Visualisation cache Redis
- **IntelliJ IDEA** : IDE Java (Ultimate)
- **VS Code** : Éditeur TypeScript/React

---

## 📞 Contact et Support

**Mohamed Nacer Hammami**  
📧 Email : mohamed.nacer.hammami@example.com  
💼 LinkedIn : [Votre profil]  
🐙 GitHub : [Votre profil]

**Encadrant** : [Nom de l'encadrant]  
**Établissement** : [Nom de l'établissement]  
**Année** : 2025-2026

---

## 📄 Licence

Projet réalisé dans le cadre d'un **Projet de Fin d'Année (PFA)** à des fins pédagogiques.

© 2026 Mohamed Nacer Hammami - Tous droits réservés

---

**📅 Dernière mise à jour** : 6 Mars 2026  
**✅ Statut** : Complet (Backend + Frontend + Rapport PFA + Présentation)  
**⭐ Version** : 1.0.0 - Production Ready
