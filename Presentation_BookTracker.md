# 📚 Présentation BookTracker
## Application de Suivi de Lecture - Projet de Fin d'Année

**Mohamed Nacer Hammami**  
**Année Académique 2025-2026**  
**Date : 6 Mars 2026**

---

## 📋 Slide 1 : Page de Titre

# **BookTracker**
## Application de Suivi de Lecture

### Architecture Microservices  
### Spring Boot 3 + React 18

**Étudiant** : Mohamed Nacer Hammami  
**Encadrant** : [Nom de l'encadrant]  
**Établissement** : [Nom de l'établissement]  
**Durée** : 8 semaines (Janvier - Mars 2026)

---

## 📋 Slide 2 : Contexte et Problématique

### 🎯 Contexte

Les passionnés de lecture font face à plusieurs défis :

- 📑 **Organisation dispersée** : Notes papier, Excel, multiples apps
- 🎯 **Perte de motivation** : Difficulté à suivre les objectifs annuels  
- 📚 **Découverte limitée** : Manque de recommandations personnalisées
- 📈 **Progression floue** : Pas de visualisation claire de l'avancement

### ❓ Problématique

**Comment centraliser la gestion de lecture dans une application moderne tout en démontrant une maîtrise des architectures microservices ?**

---

## 📋 Slide 3 : Objectifs du Projet

### 🎯 Objectifs Fonctionnels

✅ Gérer une bibliothèque personnelle (4 statuts : À lire, En cours, Terminé, Abandonné)  
✅ Suivre la progression de lecture en temps réel  
✅ Découvrir de nouveaux livres via recommandations personnalisées  
✅ Analyser ses habitudes avec statistiques et graphiques  
✅ Partager critiques et notes (système 5 étoiles)

### 🛠️ Objectifs Techniques

✅ Architecture microservices (5 services indépendants)  
✅ Full-stack moderne (Java 17 + React 18 + TypeScript)  
✅ Sécurité robuste (JWT + BCrypt + RBAC)  
✅ Tests unitaires (>70% coverage)  
✅ Conteneurisation Docker (10 conteneurs)

---

## 📋 Slide 4 : Architecture Globale

### 🏗️ Architecture Microservices (5 services)

```
┌─────────────────────┐
│   React Frontend    │ ← Interface utilisateur
│   (Port 3000)       │   10 pages + 13 composants
└──────────┬──────────┘
           │ HTTP REST
           ▼
┌─────────────────────┐
│   API Gateway       │ ← Point d'entrée unique
│   (Port 8080)       │   Routage + JWT validation
└──────────┬──────────┘
           │
    ┌──────┴──────┬──────────┬──────────┐
    ▼             ▼          ▼          ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ Auth   │  │ Book   │  │Tracker │  │ Reco   │
│Service │  │Service │  │Service │  │Service │
│ 8081   │  │ 8082   │  │ 8083   │  │ 8084   │
└────┬───┘  └────┬───┘  └────┬───┘  └────┬───┘
     │           │           │           │
  ┌──▼──┐     ┌──▼──┐     ┌──▼──┐     ┌──▼──┐
  │PG DB│     │PG DB│     │PG DB│     │PG DB│ + Redis
  └─────┘     └─────┘     └─────┘     └──┬──┘
                                          └─► Cache
```

**Total : 10 conteneurs Docker**

---

## 📋 Slide 5 : Principes Architecturaux

### 🏗️ Patterns Utilisés

#### 1️⃣ **Database per Service**
- Chaque microservice possède sa propre BD
- Découplage fort entre services
- Scalabilité indépendante

#### 2️⃣ **API Gateway**
- Point d'entrée unique (port 8080)
- Validation JWT centralisée
- Routage vers services appropriés
- Injection headers (`X-User-Id`, `X-User-Role`)

#### 3️⃣ **Cache-Aside (Redis)**
- TTL différenciés : Stats (5min), Reco (1h)
- Performances : Hit rate ~80%
- Réduction charge DB

#### 4️⃣ **Stateless Authentication**
- JWT stocké côté client
- Expiration 24h (algorithme HS256)
- Scalabilité horizontale facile

---

## 📋 Slide 6 : Backend - Services

### ⚙️ Les 5 Microservices

| Service | Responsabilité | Endpoints | Port |
|---------|----------------|-----------|------|
| **API Gateway** | Routage, JWT validation | - | 8080 |
| **Auth Service** | Authentification, gestion users | 6 | 8081 |
| **Book Service** | Catalogue, Google Books API | 9 | 8082 |
| **Tracker Service** | Bibliothèque, progression, critiques, listes | 18 | 8083 |
| **Reco Service** | Recommandations, statistiques, objectifs | 8 | 8084 |

**Total : 41 endpoints REST**

### 🛠️ Technologies Backend

- **Framework** : Spring Boot 3.2.3 (Java 17)
- **Sécurité** : Spring Security + JWT + BCrypt (strength 12)
- **BD** : PostgreSQL 16 (4 DB) + Redis 7
- **Communication** : OpenFeign (REST synchrone)
- **Documentation** : Swagger UI (SpringDoc OpenAPI)
- **Tests** : JUnit 5 + Mockito + AssertJ

---

## 📋 Slide 7 : Backend - Fonctionnalités Détaillées

### 📚 Book Service (Catalogue)
- Import depuis **Google Books API** (50,000+ livres)
- Recherche multi-critères (titre, auteur, ISBN, genre)
- Gestion auteurs et genres (Many-to-Many)
- CRUD admin (création, modification, suppression)
- **9 endpoints**

### 📖 Tracker Service (Suivi Lecture)
- **UserBook** : Ajout livre avec statut (TO_READ, READING, FINISHED, ABANDONED)
- **Progression** : Pages lues / Total → Auto-finish si terminé
- **Favoris** : Toggle favori pour filtrage rapide
- **Critiques** : Note 1-5 étoiles + texte (2000 chars) + citation (500 chars)
- **Listes** : Création listes personnalisées (ex: "À lire cet été")
- **18 endpoints**

### 🤖 Reco Service (Recommandations)
- **Algorithme Content-Based** : Analyse genres préférés → Top 3 → Suggestions
- **Cache Redis 1h** : Performances optimisées
- **Statistiques** : Livres lus, en cours, note moyenne, genres préférés
- **Objectifs annuels** : Target + progression (ex: 50 livres en 2026)
- **8 endpoints**

---

## 📋 Slide 8 : Backend - Sécurité

### 🔐 Authentification JWT

```
1. User → POST /api/auth/login {email, password}
2. Auth Service → Valide BCrypt (strength 12)
3. Auth Service → Génère JWT (HS256, 24h)
   Claims: {username, role, iat, exp}
4. Client stocke token (localStorage)
5. Requêtes → Header: "Authorization: Bearer <token>"
6. API Gateway → Valide + Injecte X-User-Id, X-User-Role
```

### 🛡️ RBAC (Role-Based Access Control)

| Rôle | Permissions |
|------|-------------|
| **READER** | Bibliothèque, critiques, recommandations |
| **ADMIN** | + CRUD catalogue, modération |

**Annotations Spring Security** :
```java
@PreAuthorize("hasRole('ADMIN')")
@PostMapping("/api/books")
public ResponseEntity<BookDTO> createBook(...) {}
```

### ✅ Validation des Entrées (Bean Validation)
- `@NotBlank`, `@Email`, `@Size`, `@Min`, `@Max`
- Protection contre injections (SQL, XSS)

---

## 📋 Slide 9 : Frontend - Architecture React

### ⚛️ Stack Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 18.2 | Framework UI (JSX, Hooks, Virtual DOM) |
| **TypeScript** | 5.3 | Typage statique (100% type-safe) |
| **Vite** | 5.1 | Build tool (HMR rapide, bundle optimisé) |
| **Tailwind CSS** | 3.4 | Styling utility-first (responsive, theme custom) |
| **React Router** | 6.22 | Navigation SPA (routes protégées) |
| **Zustand** | 4.5 | State management (auth store + persist) |
| **Axios** | 1.6 | HTTP client (intercepteurs JWT auto) |
| **Recharts** | 2.12 | Graphiques (PieChart, BarChart) |
| **Lucide React** | 0.323 | Icônes (1000+ icons tree-shakeable) |

### 📁 Structure du Projet
```
src/
├── components/   # 13 composants réutilisables
├── pages/        # 10 pages (Dashboard, Catalog, Library, etc.)
├── services/     # 8 services API (authService, bookService, etc.)
├── stores/       # Zustand auth store (user, token, persist)
├── types/        # Types TypeScript complets
└── lib/          # Axios instance + utils
```

---

## 📋 Slide 10 : Frontend - Pages Principales

### 📱 Interface Utilisateur (10 pages)

#### 1️⃣ **Authentification**
- **Login** : Email + password → JWT → Redirection dashboard
- **Register** : Validation (password match, email format)

#### 2️⃣ **Dashboard** (Page d'accueil)
- 4 KPI cards : Livres en cours, Terminés, À lire, Total
- 6 lectures récentes avec barres de progression
- 6 recommandations personnalisées (preview)

#### 3️⃣ **Catalog** (Catalogue)
- Recherche (titre, auteur, ISBN)
- Filtres par genre
- Pagination (24 livres par page)
- Grid responsive (1-6 colonnes selon écran)

#### 4️⃣ **BookDetails** (Fiche livre)
- Couverture large + auteurs + genres
- Note moyenne (étoiles) + nombre de critiques
- Modal "Ajouter à ma bibliothèque" (choix statut)
- Section critiques utilisateurs (pagination)
- Livres similaires (même genre)

---

## 📋 Slide 11 : Frontend - Fonctionnalités Avancées

### 📚 **Library** (Bibliothèque Personnelle)
- Filtres par statut : TOUS, À lire, En cours, Terminé, Abandonné
- Cartes livres avec :
  - Barre de progression (pages lues / total)
  - Badge statut coloré
  - Icône favori (toggle)
- Empty state si vide → Lien vers catalogue

### 📝 **ReadingLists** (Listes de Lecture)
- Création modal (nom + description)
- Cartes listes (book count, date création)
- Ajout/retrait livres
- Suppression avec confirmation

### 🎯 **Recommendations** (Recommandations)
- Explication algorithme (encadré pédagogique)
- Grid 24 livres recommandés
- Badge "Recommandé" sur cartes
- Empty state : "Lisez et notez des livres pour obtenir des recommandations !"

### 📊 **Statistics** (Statistiques)
- 4 overview cards (read, reading, reviews, avg rating)
- Objectif annuel : Progress bar + %, badge achievement
- **PieChart** (Recharts) : Répartition par genre (6 couleurs)
- **BarChart** (Recharts) : Progression mensuelle (12 mois)
- Modal définir objectif (année, target)

---

## 📋 Slide 12 : Composants Réutilisables

### 🧩 Librairie de Composants (13 composants)

#### **Layout & Navigation**
- `Layout` : Header (logo, nav 6 tabs, user menu), footer
- `Button` : 4 variants (primary, secondary, outline, danger), 3 sizes, loading state
- `Input` : Label, error display, Tailwind styling
- `Card` : Base container avec hover effects

#### **UI Spécifiques Lectures**
- `ProgressBar` : Barre progression (current/total pages, %)
- `Badge` : Status badges colorés (to-read, reading, finished, abandoned)
- `Rating` : 5 étoiles interactives/readonly (pour noter/afficher)
- `UserBookCard` : Livre + progress + favorite icon
- `BookCard` : Couverture + titre + auteur

#### **États & Feedback**
- `LoadingSpinner` : Spinner centré avec overlay
- `LoadingCard` : Skeleton placeholder (animation pulse)
- `EmptyState` : Icon + titre + description + bouton action

**Total : ~2,500 lignes de code TypeScript**

---

## 📋 Slide 13 : Tests et Qualité

### 🧪 Tests Unitaires Backend

**Stratégie** :
- **JUnit 5** pour les tests
- **Mockito** pour les mocks (repository, clients Feign)
- **AssertJ** pour assertions fluides

**Résultats** :
- **17 tests unitaires** (BookServiceTest : 8, UserBookServiceTest : 9)
- **Couverture : 78%** ✅ (objectif : >70%)
  - BookService : 82%
  - UserBookService : 76%

**Exemple : Auto-finish progression**
```java
@Test
void updateProgress_WhenReachesLastPage_ShouldAutoFinish() {
    // Given: UserBook READING, currentPage = 299, book pageCount = 300
    // When: updateProgress(id, 300)
    // Then: status = FINISHED, finishDate = today
}
```

### 📚 Documentation API

- **Swagger UI** sur tous les services (ports 8081-8084)
- **41 endpoints documentés** avec annotations `@Operation`, `@ApiResponse`
- Test interactif (try it out)

---

## 📋 Slide 14 : Déploiement et DevOps

### 🐳 Docker Compose (10 conteneurs)

#### **Services Backend (5)**
```yaml
booktracker-gateway:       # API Gateway (8080)
booktracker-auth-service:  # Auth (8081)
booktracker-book-service:  # Book (8082)
booktracker-tracker-service: # Tracker (8083)
booktracker-reco-service:  # Reco (8084)
```

#### **Bases de Données (5)**
```yaml
auth-db:    # PostgreSQL (5432)
book-db:    # PostgreSQL (5433)
tracker-db: # PostgreSQL (5434)
reco-db:    # PostgreSQL (5435)
redis:      # Redis (6379)
```

### 🚀 Commandes
```bash
docker-compose build       # Build images
docker-compose up -d       # Démarrage
docker-compose ps          # Vérification
docker-compose logs -f     # Logs en temps réel
docker-compose down -v     # Arrêt + nettoyage
```

### 📊 Monitoring
- **Spring Boot Actuator** : `/actuator/health`, `/actuator/metrics`
- **Healthchecks** : Vérification readiness des DB

---

## 📋 Slide 15 : Résultats et Métriques Finales

### 📊 Métriques de Code

| Catégorie | Quantité |
|-----------|----------|
| **Lignes de code** | ~10,400 (7,900 Java + 2,500 TS) |
| **Microservices** | 5 (Gateway, Auth, Book, Tracker, Reco) |
| **Endpoints REST** | 41 |
| **Pages frontend** | 10 (Login → Profile) |
| **Composants React** | 13 réutilisables |
| **Services API** | 8 (auth, book, userBook, review, readingList, reco) |
| **Tests unitaires** | 17 (78% coverage ✅) |
| **Conteneurs Docker** | 10 |
| **Tables SQL** | 11 (4 DB PostgreSQL) |
| **Durée projet** | 8 semaines (4 sprints Scrum × 2 semaines) |

### ✅ Objectifs Atteints

✅ Architecture microservices complète (Database per Service)  
✅ Full-stack moderne (Spring Boot 3 + React 18 + TypeScript)  
✅ Sécurité robuste (JWT + BCrypt + RBAC)  
✅ Communication inter-services (OpenFeign)  
✅ Caching distribué (Redis avec TTL différenciés)  
✅ Tests et qualité (78% coverage, Swagger, ESLint)  
✅ Conteneurisation (Docker Compose orchestration)  
✅ Méthodologie Agile (4 sprints Scrum)

---

## 📋 Slide 16 : Défis et Solutions

### ⚠️ Challenges Rencontrés

#### 1️⃣ **Communication Inter-Services**
**Problème** : Tracker Service doit récupérer infos livres sans accès direct à book_db  
**Solution** : OpenFeign (client REST déclaratif) → Appels synchrones propres

#### 2️⃣ **Cache Redis avec TTL Différenciés**
**Problème** : Stats changent souvent (5min) vs Reco stables (1h)  
**Solution** : Configuration RedisCacheManager personnalisée par cache

#### 3️⃣ **Algorithme de Recommandation Simple**
**Problème** : Machine Learning trop complexe pour 8 semaines  
**Solution** : Content-based filtering (genres préférés) → Pertinent et rapide

#### 4️⃣ **Gestion Relations ManyToMany**
**Problème** : Synchronisation bidirectionnelle Book ↔ Author  
**Solution** : Méthodes helper `addAuthor()` avec synchro auto

#### 5️⃣ **Frontend Responsive**
**Problème** : Adapter UI pour mobile, tablet, desktop  
**Solution** : Tailwind CSS utility-first (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

---

## 📋 Slide 17 : Évolutions Futures

### 🚀 Court Terme (3 mois)

- 🔐 **OAuth2** : Connexion Google, Facebook
- 📸 **Upload images** : Couvertures personnalisées
- 📧 **Notifications email** : Nouvelles recommandations
- 🌙 **Dark mode** : Thème sombre

### 🚀 Moyen Terme (6-12 mois)

- 👥 **Réseau social** : Amis, suivis, flux d'activité, groupes de lecture
- 🔍 **Elasticsearch** : Recherche full-text performante
- 📨 **Message broker** : RabbitMQ/Kafka pour events asynchrones
- 📊 **Dashboard admin** : Gestion users, logs, métriques temps réel

### 🚀 Long Terme (1-2 ans)

- 🤖 **Machine Learning** : Filtrage collaboratif avancé (TensorFlow)
- 📱 **App mobile native** : React Native ou Flutter
- ☁️ **Déploiement cloud** : Kubernetes (AWS EKS, Azure AKS)
- 🔄 **CI/CD complet** : GitHub Actions, tests automatisés, déploiement auto
- 🌍 **Internationalisation** : Support multi-langues (i18n)

---

## 📋 Slide 18 : Démo (Capture d'Écran)

### 🎬 Parcours Utilisateur Type

#### 1️⃣ **Inscription & Connexion**
→ Formulaire validation → JWT généré → Dashboard

#### 2️⃣ **Découverte Catalogue**
→ Recherche "1984 George Orwell" → Fiche détaillée → Modal "Ajouter"

#### 3️⃣ **Ajout à Bibliothèque**
→ Choix statut "À lire" → Confirmation toast → Visible dans Library

#### 4️⃣ **Démarrage Lecture**
→ Changement statut "En cours" → Update progression 50/328 pages → Barre 15%

#### 5️⃣ **Fin de Lecture & Critique**
→ Progression 328/328 → Auto-finish → Note 5⭐ + critique

#### 6️⃣ **Recommandations**
→ Algorithme analyse genres préférés → Top 3 : Dystopie, Science-fiction, Classique  
→ Suggestions : "Le Meilleur des Mondes", "Fahrenheit 451"

#### 7️⃣ **Statistiques**
→ Dashboard : 3 livres terminés, 2 en cours  
→ PieChart genres : Dystopie 40%, SF 30%, Classique 30%  
→ BarChart : 12 livres en 2026 (objectif : 50 → 24%)

---

## 📋 Slide 19 : Compétences Développées

### 💼 Compétences Techniques

#### **Backend**
- Architecture microservices (Database per Service, API Gateway)
- Spring Boot 3 (REST, Security, Data JPA, Cloud Gateway/OpenFeign)
- Sécurité (JWT, BCrypt, RBAC)
- Bases de données (PostgreSQL, Redis)
- Tests unitaires (JUnit 5, Mockito, AssertJ)
- Documentation API (Swagger UI)

#### **Frontend**
- React 18 (Hooks, Context, Router)
- TypeScript (types complexes, génériques)
- State management (Zustand avec persist)
- Styling (Tailwind CSS responsive)
- Visualisation données (Recharts)

#### **DevOps**
- Docker & Docker Compose (orchestration multi-conteneurs)
- Configuration externalisée (YAML, variables env)
- Healthchecks et monitoring

---

## 📋 Slide 20 : Conclusion

### 🎯 Synthèse du Projet

**BookTracker** est une application web complète et fonctionnelle démontrant :

✅ **Maîtrise technique** : Architecture microservices moderne avec 5 services (41 endpoints)  
✅ **Full-stack** : Spring Boot 3 + React 18 + TypeScript + PostgreSQL + Redis  
✅ **Sécurité** : JWT + BCrypt + RBAC  
✅ **Qualité** : 78% couverture tests, documentation Swagger complète  
✅ **DevOps** : 10 conteneurs Docker orchestrés  
✅ **Méthodologie** : 4 sprints Scrum (8 semaines)

### 🏆 Réussites Clés

- **10,400 lignes de code** produites en 2 mois
- **41 endpoints REST** documentés
- **78% test coverage** (>70% ✅)
- **10 pages frontend** responsive et modernes
- **0 dette technique majeure** (clean code, patterns)

### 🌟 Apports Personnels

Ce projet m'a permis de :
- Comprendre les **avantages et défis des microservices**
- Maîtriser un **stack technique moderne** (demandé en entreprise)
- Développer une **vision complète full-stack** (backend + frontend + DevOps)
- Apprendre à **faire des compromis techniques** (timeboxing, MVP)

### 🚀 Perspectives

BookTracker représente :
- **Portfolio professionnel** : Démonstration compétences concrètes
- **Projet personnel** : Utilisation réelle quotidienne
- **Base d'évolution** : Réseau social, ML, app mobile
- **Open Source potentiel** : Publication GitHub

---

## 🙏 Merci !

### Questions ?

**Contact** :  
📧 Email : mohamed.nacer.hammami@example.com  
💼 LinkedIn : [Votre profil]  
🐙 GitHub : [Votre repo] (https://github.com/username/booktracker)

---

### 🔗 Ressources

**Démo live** : [https://booktracker-demo.com](https://booktracker-demo.com)  
**Documentation** : [https://docs.booktracker.com](https://docs.booktracker.com)  
**Swagger API** : http://localhost:8080/swagger-ui.html  
**Code source** : GitHub (public repository)

---

### 📊 Annexes

**Annexe A** : Diagramme ERD (schéma de base de données)  
**Annexe B** : User Stories complètes (Sprint Backlog)  
**Annexe C** : Screenshots de l'application  
**Annexe D** : Résultats tests unitaires détaillés  
**Annexe E** : Configuration Docker Compose complète

---

**Fin de la Présentation**

**Nombre de slides** : 20  
**Durée estimée** : 30-40 minutes (avec Q&A)  
**Version** : 1.0 - 6 Mars 2026

© 2026 Mohamed Nacer Hammami
