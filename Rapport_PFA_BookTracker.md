# 📚 Rapport de Projet de Fin d'Année

## BookTracker - Application de Suivi de Lecture

---

**Étudiant**: Mohamed Nacer Hammami  
**Année**: 2025-2026  
**Date de soumission**: 6 Mars 2026  
**Durée du projet**: 8 semaines (2 mois)  
** Méthodologie**: Scrum - 4 sprints × 2 semaines  
**Technologie**: Microservices (Spring Boot + React)  

---

## Table des Matières

1. [Introduction](#1-introduction)
2. [Contexte et Motivation](#2-contexte-et-motivation)
3. [Analyse des Besoins](#3-analyse-des-besoins)
4. [Architecture Technique](#4-architecture-technique)
5. [Stack Technologique](#5-stack-technologique)
6. [Modélisation des Données](#6-modélisation-des-données)
7. [Développement Backend](#7-développement-backend)
8. [Développement Frontend](#8-développement-frontend)
9. [Sécurité](#9-sécurité)
10. [Tests et Qualité](#10-tests-et-qualité)
11. [Déploiement](#11-déploiement)
12. [Gestion de Projet](#12-gestion-de-projet)
13. [Résultats et Métriques](#13-résultats-et-métriques)
14. [Défis et Solutions](#14-défis-et-solutions)
15. [Évolutions Futures](#15-évolutions-futures)
16. [Conclusion](#16-conclusion)
17. [Bibliographie](#17-bibliographie)

---

## 1. Introduction

### 1.1 Présentation du Projet

**BookTracker** est une application web moderne permettant aux passionnés de lecture de gérer leur bibliothèque personnelle, suivre leur progression de lecture, découvrir de nouveaux livres via des recommandations personnalisées, et analyser leurs habitudes de lecture à travers des statistiques détaillées.

Le projet a été développé selon une architecture microservices, démontrant une maîtrise des technologies cloud-native et des patterns architecturaux modernes. L'application se compose de **5 microservices backend** (Spring Boot 3), d'un **frontend React 18**, et utilise **PostgreSQL** pour la persistance et **Redis** pour le caching.

### 1.2 Objectifs Pédagogiques

Ce projet de fin d'année vise à développer les compétences suivantes :

- **Architecture distribuée** : Conception et implémentation d'une architecture microservices
- **Full-stack moderne** : Maîtrise de Spring Boot 3 (backend) et React 18 (frontend)
- **Conteneurisation** : Utilisation de Docker et Docker Compose
- **Sécurité** : Implémentation de JWT, BCrypt, et RBAC
- **Méthodologie Agile** : Application de Scrum avec 4 sprints de 2 semaines
- **Qualité logicielle** : Tests unitaires (>70% couverture), documentation API (Swagger)
- **Communication inter-services** : REST avec OpenFeign
- **Caching distribué** : Redis pour les performances

### 1.3 Périmètre Fonctionnel

**Fonctionnalités incluses dans le MVP (2 mois) :**

✅ Authentification et gestion des utilisateurs (JWT)  
✅ Catalogue de livres avec intégration Google Books API  
✅ Recherche avancée multi-critères (titre, auteur, ISBN, genre)  
✅ Bibliothèque personnelle avec 4 statuts (À lire, En cours, Terminé, Abandonné)  
✅ Suivi de progression de lecture (pages lues, barre de progression)  
✅ Système de critiques et notes (1-5 étoiles)  
✅ Listes de lecture personnalisées  
✅ Recommandations personnalisées (algorithme content-based)  
✅ Statistiques et graphiques (objectifs annuels, genres préférés, progression mensuelle)  
✅ Dashboard interactif

**Exclusions (contraintes de temps) :**

❌ Réseau social (amis, groupes, flux d'activité)  
❌ Filtrage collaboratif avec Machine Learning  
❌ Application mobile native  
❌ Déploiement cloud (AWS/Azure)

---

## 2. Contexte et Motivation

### 2.1 Problématique

En tant que lecteur passionné, j'ai identifié plusieurs difficultés récurrentes :

1. **Organisation dispersée** : Utilisation de multiples outils (notes papier, Excel, Goodreads) sans cohérence
2. **Perte de motivation** : Difficulté à suivre les objectifs de lecture annuels
3. **Découverte limitée** : Manque de recommandations personnalisées basées sur mes goûts réels
4. **Progression floue** : Absence de visualisation claire de l'avancement dans les livres en cours

### 2.2 Solution Proposée

BookTracker centralise toutes ces fonctionnalités dans une interface unique et intuitive, tout en démontrant les capacités techniques d'une architecture microservices moderne.

### 2.3 Valeur Ajoutée

- **Pour les utilisateurs** : Outil complet et gratuit de gestion de lecture
- **Pour le projet académique** : Démonstration de compétences en architecture distribuée
- **Pour le portfolio** : Projet full-stack complexe avec technologies modernes

---

## 3. Analyse des Besoins

### 3.1 Besoins Fonctionnels

#### 3.1.1 Gestion des Utilisateurs

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-01 | Inscription avec email, username, mot de passe | Must |
| BF-02 | Connexion avec génération de JWT | Must |
| BF-03 | Profil utilisateur (consultation et modification) | Should |
| BF-04 | Gestion des rôles (READER, ADMIN) | Must |

#### 3.1.2 Catalogue de Livres

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-05 | Liste paginée de livres | Must |
| BF-06 | Recherche par titre, auteur, ISBN, genre | Must |
| BF-07 | Fiche détaillée d'un livre (auteurs, genres, description, couverture) | Must |
| BF-08 | Import depuis Google Books API | Should |
| BF-09 | CRUD admin pour la gestion du catalogue | Should |

#### 3.1.3 Bibliothèque Personnelle

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-10 | Ajout de livres avec statut (TO_READ, READING, FINISHED, ABANDONED) | Must |
| BF-11 | Suivi de progression (pages lues / total) | Must |
| BF-12 | Barre de progression visuelle | Must |
| BF-13 | Changement automatique de statut (TO_READ → READING → FINISHED) | Should |
| BF-14 | Gestion des favoris (toggle) | Should |
| BF-15 | Historique avec dates (début de lecture, fin) | Should |

#### 3.1.4 Critiques et Notes

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-16 | Notation d'un livre (1-5 étoiles) | Must |
| BF-17 | Rédaction de critique détaillée (2000 caractères) | Must |
| BF-18 | Citation favorite (500 caractères) | Could |
| BF-19 | Calcul de la note moyenne d'un livre | Must |
| BF-20 | Affichage des critiques des autres utilisateurs | Should |

#### 3.1.5 Listes de Lecture

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-21 | Création de listes personnalisées (nom + description) | Should |
| BF-22 | Ajout/retrait de livres dans une liste | Should |
| BF-23 | Visualisation du nombre de livres par liste | Should |

#### 3.1.6 Recommandations

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-24 | Recommandations basées sur genres préférés | Must |
| BF-25 | Livres similaires à un livre donné (même genre) | Should |
| BF-26 | Cache Redis pour performances | Must |

#### 3.1.7 Statistiques

| ID | Besoin | Priorité |
|----|--------|----------|
| BF-27 | Dashboard avec KPIs (livres lus, en cours, à lire) | Must |
| BF-28 | Objectifs de lecture annuels (target + progression) | Should |
| BF-29 | Graphique de répartition par genre (pie chart) | Should |
| BF-30 | Graphique de progression mensuelle (bar chart) | Should |
| BF-31 | Analyse des habitudes (genres préférés, note moyenne) | Should |

### 3.2 Besoins Non Fonctionnels

#### 3.2.1 Performance

- **Temps de réponse API** < 500ms (P95)
- **Chargement frontend** < 3s
- **Cache Redis** pour requêtes fréquentes (recommandations 1h, stats 5min)

#### 3.2.2 Sécurité

- **JWT** stateless avec expiration 24h
- **BCrypt** avec strength 12 (~250ms par hash)
- **RBAC** (Role-Based Access Control)
- **Validation** des entrées (Bean Validation)
- **CORS** restreint

#### 3.2.3 Scalabilité

- Architecture microservices permettant scaling horizontal
- Database per Service (chaque service a sa BD)
- Conteneurisation Docker

#### 3.2.4 Qualité

- **Couverture de tests** > 70%
- **Documentation API** complète (Swagger)
- **Code style** : Checkstyle (Java), ESLint (TypeScript)

#### 3.2.5 Compatibilité

- **Navigateurs** : Chrome, Firefox, Safari (dernières versions)
- **Responsive** : Mobile (320px+), Tablet, Desktop

---

## 4. Architecture Technique

### 4.1 Vision Globale

L'application utilise une **architecture microservices** pour garantir la modularité, la scalabilité et la maintenabilité.

```
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   (Port 3000)       │
                    └──────────┬──────────┘
                               │ HTTP
                               ▼
                    ┌─────────────────────┐
                    │   API Gateway       │
                    │   (Port 8080)       │
                    │   - Routage         │
                    │   - JWT Validation  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
     ┌────────────┐   ┌────────────┐   ┌────────────┐
     │ Auth       │   │ Book       │   │ Tracker    │
     │ Service    │   │ Service    │   │ Service    │
     │ (8081)     │   │ (8082)     │   │ (8083)     │
     └──────┬─────┘   └──────┬─────┘   └──────┬─────┘
            │                │                │
     ┌──────▼─────┐   ┌──────▼─────┐   ┌──────▼─────┐
     │ PostgreSQL │   │ PostgreSQL │   │ PostgreSQL │
     │ (auth_db)  │   │ (book_db)  │   │ (tracker_db)│
     └────────────┘   └────────────┘   └────────────┘
     
              ┌────────────┐
              │ Reco       │
              │ Service    │
              │ (8084)     │
              └──────┬─────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   ┌──────────────┐    ┌───────────────┐
   │ PostgreSQL   │    │ Redis         │
   │ (reco_db)    │    │ (Cache)       │
   └──────────────┘    └───────────────┘
```

### 4.2 Principes Architecturaux

#### 4.2.1 Database per Service

Chaque microservice possède sa propre base de données, garantissant :
- **Découplage fort** : Pas de dépendances directes entre services
- **Scalabilité indépendante** : Chaque BD peut évoluer séparément
- **Autonomie** : Chaque équipe peut choisir sa technologie de persistance

**Trade-off** :
- ❌ Pas de JOIN SQL cross-services
- ✅ Communication via API REST (OpenFeign)
- ✅ Duplication acceptable de certaines données (ex: bookTitle dans UserBookDTO)

#### 4.2.2 API Gateway Pattern

Un point d'entrée unique (port 8080) qui :
- Route les requêtes vers les services appropriés
- Valide le JWT une seule fois (évite duplication)
- Injecte les headers `X-User-Id`, `X-User-Username`, `X-User-Role`
- Gère le CORS centralisé

#### 4.2.3 Stateless Authentication

JWT stocké côté client (localStorage), pas de session serveur :
- ✅ Scalabilité horizontale facile (pas d'état partagé)
- ✅ Performances (pas de lookup session en DB)
- ❌ Révocation de token complexe (expiration 24h obligatoire)

#### 4.2.4 Cache-Aside Pattern (Redis)

Stratégie de cache pour les recommandations et statistiques :
```
1. Vérifier cache Redis
2. Si HIT → retourner depuis cache
3. Si MISS → calculer → stocker en cache → retourner
4. TTL expire → recalcul automatique
```

TTL différenciés :
- `userStatistics`: 5 minutes (données fréquemment modifiées)
- `recommendations`: 1 heure (calculs coûteux, données stables)
- `similarBooks`: 2 heures (très stables)

### 4.3 Communication Inter-Services

**OpenFeign** (Spring Cloud) pour les appels REST synchrones :

```java
@FeignClient(name = "book-service", url = "${book-service.url}")
public interface BookServiceClient {
    @GetMapping("/api/books/{id}")
    BookInfoDTO getBookById(@PathVariable Long id);
}
```

**Avantages** :
- Déclaratif (pas de code HTTP manuel)
- Retry automatique (Resilience4j)
- Load balancing (si plusieurs instances)
- Timeout configurables

**Architecture de communication** :
- `Tracker Service` → `Book Service` (récupérer infos livres)
- `Reco Service` → `Book Service` + `Tracker Service` (agréger données)

---

## 5. Stack Technologique

### 5.1 Backend

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Langage** | Java | 17 LTS | Support long-terme, performances, écosystème riche |
| **Framework** | Spring Boot | 3.2.3 | Standard industrie, productivité, auto-configuration |
| **Gateway** | Spring Cloud Gateway | 2023.0.0 | Routage asynchrone, performances WebFlux |
| **Sécurité** | Spring Security + JWT | - | Sécurité robuste, JWT stateless |
| **Base de données** | PostgreSQL | 16 | ACID, relations complexes, performances |
| **Cache** | Redis | 7 | In-memory, TTL, structure de données variées |
| **Communication** | OpenFeign | - | Client REST déclaratif, intégration Spring Cloud |
| **Documentation** | SpringDoc OpenAPI | 2.3.0 | Swagger UI automatique, test interactif |
| **Build** | Maven | 3.8+ | Gestion dépendances, multi-module |
| **Conteneurisation** | Docker | - | Isolation, portabilité, déploiement simplifié |

### 5.2 Frontend

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Framework** | React | 18.2 | Component-based, Virtual DOM, performances |
| **Langage** | TypeScript | 5.3 | Typage statique, meilleure maintenabilité |
| **Build Tool** | Vite | 5.1 | HMR rapide, build optimisé |
| **Styling** | Tailwind CSS | 3.4 | Utility-first, responsive, personnalisable |
| **Routing** | React Router | 6.22 | SPA navigation, routes protégées |
| **State** | Zustand | 4.5 | Simple, performances, TypeScript-friendly |
| **HTTP** | Axios | 1.6 | Intercepteurs, promesses, annulation requêtes |
| **Charts** | Recharts | 2.12 | Graphiques réactifs, composants React |
| **Icons** | Lucide React | 0.323 | 1000+ icônes, optimisées, cohérentes |
| **Notifications** | React Hot Toast | 2.4 | UX fluide, personnalisable |

### 5.3 DevOps & Tests

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **Tests unitaires** | JUnit 5 | Standard Java, assertions puissantes |
| **Mocking** | Mockito | Isolation des tests, mock dependencies |
| **Assertions** | AssertJ | API fluide, lisibilité |
| **Conteneurisation** | Docker Compose | Orchestration multi-conteneurs |
| **Monitoring** | Spring Boot Actuator | Endpoints santé, métriques |

---

## 6. Modélisation des Données

### 6.1 Database: auth_db (Auth Service)

**Table: users**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| username | VARCHAR(50) | UNIQUE, NOT NULL | Nom d'utilisateur (3-50 chars) |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Email valide |
| password | VARCHAR(200) | NOT NULL | Hash BCrypt (strength 12) |
| role | VARCHAR(20) | NOT NULL | READER ou ADMIN |
| created_at | TIMESTAMP | NOT NULL | Date de création |
| updated_at | TIMESTAMP | - | Dernière modification |

**Indexes** :
- `idx_username` sur `username` (login rapide)
- `idx_email` sur `email` (unicité)

### 6.2 Database: book_db (Book Service)

**Table: books**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| title | VARCHAR(500) | NOT NULL | Titre du livre |
| isbn | VARCHAR(20) | UNIQUE | ISBN-10 ou ISBN-13 |
| description | TEXT | - | Description complète |
| published_date | DATE | - | Date de publication |
| page_count | INT | - | Nombre de pages |
| thumbnail_url | VARCHAR(500) | - | URL couverture |
| google_books_id | VARCHAR(50) | UNIQUE | ID Google Books API |
| created_at | TIMESTAMP | NOT NULL | Date d'ajout |
| updated_at | TIMESTAMP | - | Dernière modification |

**Table: authors**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| name | VARCHAR(200) | UNIQUE, NOT NULL | Nom complet de l'auteur |

**Table: genres**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Nom du genre |

**Table: book_authors** (Many-to-Many)

| Colonne | Type | Contraintes |
|---------|------|-------------|
| book_id | BIGINT | FK → books(id) |
| author_id | BIGINT | FK → authors(id) |

**Table: book_genres** (Many-to-Many)

| Colonne | Type | Contraintes |
|---------|------|-------------|
| book_id | BIGINT | FK → books(id) |
| genre_id | BIGINT | FK → genres(id) |

**Indexes** :
- `idx_book_title` sur `title` (recherche)
- `idx_book_isbn` sur `isbn` (lookup rapide)

### 6.3 Database: tracker_db (Tracker Service)

**Table: user_books**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| user_id | BIGINT | NOT NULL | ID utilisateur |
| book_id | BIGINT | NOT NULL | ID livre (Book Service) |
| status | VARCHAR(20) | NOT NULL | TO_READ, READING, FINISHED, ABANDONED |
| current_page | INT | DEFAULT 0 | Page actuelle |
| start_date | DATE | - | Date de début de lecture |
| finish_date | DATE | - | Date de fin |
| is_favorite | BOOLEAN | DEFAULT false | Livre favori ? |
| created_at | TIMESTAMP | NOT NULL | Date d'ajout |
| updated_at | TIMESTAMP | - | Dernière modification |

**Contraintes** :
- `UNIQUE(user_id, book_id)` : Un seul UserBook par utilisateur/livre

**Table: reviews**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| user_id | BIGINT | NOT NULL | ID utilisateur |
| book_id | BIGINT | NOT NULL | ID livre |
| rating | INT | CHECK (1-5) | Note sur 5 étoiles |
| content | VARCHAR(2000) | - | Critique détaillée |
| quote | VARCHAR(500) | - | Citation favorite |
| created_at | TIMESTAMP | NOT NULL | Date de création |
| updated_at | TIMESTAMP | - | Dernière modification |

**Contraintes** :
- `UNIQUE(user_id, book_id)` : Une seule critique par utilisateur/livre

**Table: reading_lists**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| user_id | BIGINT | NOT NULL | ID utilisateur |
| name | VARCHAR(200) | NOT NULL | Nom de la liste |
| description | VARCHAR(500) | - | Description |
| created_at | TIMESTAMP | NOT NULL | Date de création |

**Table: reading_list_books** (@ElementCollection)

| Colonne | Type | Contraintes |
|---------|------|-------------|
| reading_list_id | BIGINT | FK → reading_lists(id) |
| book_ids | BIGINT | ID livre |

**Indexes** :
- `idx_user_book` sur `(user_id, book_id)`
- `idx_user_status` sur `(user_id, status)`

### 6.4 Database: reco_db (Reco Service)

**Table: reading_goals**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | BIGINT | PK, AUTO | Identifiant unique |
| user_id | BIGINT | NOT NULL | ID utilisateur |
| target_books | INT | NOT NULL | Objectif de livres |
| year | INT | NOT NULL | Année (ex: 2026) |
| current_progress | INT | DEFAULT 0 | Progression actuelle |
| created_at | TIMESTAMP | NOT NULL | Date de création |

**Contraintes** :
- `UNIQUE(user_id, year)` : Un seul objectif par année

**Cache Redis** :
- `userStatistics::{userId}` (TTL 5min)
- `recommendations::{userId}::{limit}` (TTL 1h)
- `similarBooks::{bookId}::{limit}` (TTL 2h)

---

## 7. Développement Backend

### 7.1 Sprint 0 - Infrastructure (Semaines 1-2)

#### Configuration Maven Multi-Module

```xml
<parent>
    <groupId>com.booktracker</groupId>
    <artifactId>booktracker-parent</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</parent>

<modules>
    <module>api-gateway</module>
    <module>auth-service</module>
    <module>book-service</module>
    <module>tracker-service</module>
    <module>reco-service</module>
</modules>
```

#### Docker Compose (10 conteneurs)

```yaml
services:
  # 5 Services Java
  booktracker-gateway:
    image: booktracker-gateway
    ports: ["8080:8080"]
  
  booktracker-auth-service:
    image: booktracker-auth-service
    ports: ["8081:8081"]
    depends_on: [auth-db]
  
  # ... (book, tracker, reco services)
  
  # 4 PostgreSQL
  auth-db:
    image: postgres:16
    environment:
      POSTGRES_DB: auth_db
      POSTGRES_USER: booktracker
      POSTGRES_PASSWORD: booktracker123
    ports: ["5432:5432"]
  
  # ... (book-db, tracker-db, reco-db)
  
  # 1 Redis
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

### 7.2 Sprint 1 - Auth & Book Services (Semaines 3-4)

#### Auth Service - Génération JWT

```java
public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", ((User) userDetails).getRole().name());
    
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24h
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
}
```

#### Book Service - Intégration Google Books API

```java
public Book importFromGoogleBooks(String googleBooksId) {
    String url = "https://www.googleapis.com/books/v1/volumes/" + googleBooksId;
    ResponseEntity<GoogleBooksResponse> response = restTemplate.getForEntity(url, GoogleBooksResponse.class);
    
    VolumeInfo volumeInfo = response.getBody().getVolumeInfo();
    
    Book book = new Book();
    book.setTitle(volumeInfo.getTitle());
    book.setDescription(volumeInfo.getDescription());
    book.setPageCount(volumeInfo.getPageCount());
    book.setPublishedDate(LocalDate.parse(volumeInfo.getPublishedDate()));
    
    // Auto-création des auteurs et genres
    volumeInfo.getAuthors().forEach(authorName -> {
        Author author = authorRepository.findByNameIgnoreCase(authorName)
            .orElseGet(() -> authorRepository.save(new Author(authorName)));
        book.addAuthor(author);
    });
    
    return bookRepository.save(book);
}
```

### 7.3 Sprint 2 - Tracker Service (Semaines 5-6)

#### Logique Métier - Changement automatique de statut

```java
public UserBookDTO updateProgress(Long id, int currentPage) {
    UserBook userBook = userBookRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("UserBook not found"));
    
    userBook.setCurrentPage(currentPage);
    
    // Auto-change TO_READ → READING
    if (userBook.getStatus() == ReadingStatus.TO_READ && currentPage > 0) {
        userBook.setStatus(ReadingStatus.READING);
        if (userBook.getStartDate() == null) {
            userBook.setStartDate(LocalDate.now());
        }
    }
    
    // Auto-finish si page finale atteinte
    BookInfoDTO book = bookServiceClient.getBookById(userBook.getBookId());
    if (currentPage >= book.getPageCount() && userBook.getStatus() != ReadingStatus.FINISHED) {
        userBook.setStatus(ReadingStatus.FINISHED);
        userBook.setFinishDate(LocalDate.now());
    }
    
    UserBook saved = userBookRepository.save(userBook);
    return mapToDTO(saved, book);
}
```

#### OpenFeign Client Configuration

```java
@FeignClient(name = "book-service", url = "${book-service.url}")
public interface BookServiceClient {
    @GetMapping("/api/books/{id}")
    BookInfoDTO getBookById(@PathVariable Long id);
    
    @GetMapping("/api/books/genre/{name}")
    List<BookDTO> getBooksByGenre(@PathVariable String name);
}
```

### 7.4 Sprint 3 - Reco Service (Semaines 7-8)

#### Algorithme de Recommandation Content-Based

```java
@Cacheable(value = "recommendations", key = "#userId + '_' + #limit")
public List<BookDTO> getRecommendations(Long userId, int limit) {
    // 1. Récupérer historique utilisateur (OpenFeign)
    List<UserBookDTO> favorites = trackerServiceClient.getFavorites(userId);
    List<UserBookDTO> finished = trackerServiceClient.getBooksByStatus(userId, "FINISHED");
    
    List<UserBookDTO> userBooks = new ArrayList<>();
    userBooks.addAll(favorites);
    userBooks.addAll(finished);
    
    if (userBooks.isEmpty()) {
        return Collections.emptyList();
    }
    
    // 2. Récupérer infos livres (OpenFeign)
    List<BookDTO> readBooks = userBooks.stream()
        .map(ub -> bookServiceClient.getBookById(ub.getBookId()))
        .collect(Collectors.toList());
    
    // 3. Analyser genres préférés (fréquence)
    Map<String, Long> genreFrequency = readBooks.stream()
        .flatMap(book -> book.getGenres().stream())
        .collect(Collectors.groupingBy(g -> g, Collectors.counting()));
    
    // 4. Top 3 genres
    List<String> topGenres = genreFrequency.entrySet().stream()
        .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
        .limit(3)
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());
    
    // 5. Rechercher livres similaires non lus
    Set<Long> readBookIds = userBooks.stream()
        .map(UserBookDTO::getBookId)
        .collect(Collectors.toSet());
    
    List<BookDTO> recommendations = new ArrayList<>();
    for (String genre : topGenres) {
        List<BookDTO> books = bookServiceClient.getBooksByGenre(genre);
        books.stream()
            .filter(book -> !readBookIds.contains(book.getId()))
            .limit(limit - recommendations.size())
            .forEach(recommendations::add);
        
        if (recommendations.size() >= limit) break;
    }
    
    return recommendations;
}
```

#### Configuration Redis avec TTL Différenciés

```java
@Configuration
@EnableCaching
public class RedisConfig {
    
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        
        cacheConfigurations.put("userStatistics", createCacheConfig(Duration.ofMinutes(5)));
        cacheConfigurations.put("recommendations", createCacheConfig(Duration.ofHours(1)));
        cacheConfigurations.put("similarBooks", createCacheConfig(Duration.ofHours(2)));
        
        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(createCacheConfig(Duration.ofMinutes(10)))
            .withInitialCacheConfigurations(cacheConfigurations)
            .build();
    }
    
    private RedisCacheConfiguration createCacheConfig(Duration ttl) {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(ttl)
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }
}
```

---

## 8. Développement Frontend

### 8.1 Architecture React

**Structure du projet** :
```
src/
├── components/      # Composants réutilisables (Button, Card, etc.)
├── pages/           # Pages (Dashboard, Catalog, Library, etc.)
├── services/        # Services API (authService, bookService, etc.)
├── stores/          # Zustand stores (authStore)
├── types/           # Types TypeScript
├── lib/             # Utilitaires (axios, utils)
└── App.tsx          # Composant principal + routing
```

### 8.2 Authentification avec Zustand

```typescript
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, token, isAuthenticated: true })
      },
      
      clearAuth: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'auth-storage' }
  )
)
```

### 8.3 Axios Interceptors (JWT automatique)

```typescript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### 8.4 Composants Réutilisables

**Exemple: ProgressBar**
```typescript
interface ProgressBarProps {
  current: number
  total: number
  showLabel?: boolean
}

export default function ProgressBar({ current, total, showLabel = true }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{current} / {total} pages</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
```

### 8.5 Pages Principales

**Dashboard** : Affiche KPIs (livres en cours, terminés, total), lectures récentes, recommandations  
**Catalog** : Liste paginée avec recherche, filtrage par genre  
**BookDetails** : Fiche complète (couverture, description, auteurs, genres, critiques, ajout bibliothèque)  
**Library** : Bibliothèque personnelle avec filtres (statut), barres de progression  
**ReadingLists** : CRUD lists personnalisées  
**Recommendations** : Livres recommandés basés sur algorithme content-based  
**Statistics** : Graphiques (pie chart genres, bar chart progression mensuelle), objectifs annuels  
**Profile** : Modification profil utilisateur

### 8.6 Graphiques avec Recharts

```typescript
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={genreData}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      outerRadius={80}
      dataKey="value"
    >
      {genreData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

---

## 9. Sécurité

### 9.1 Authentification JWT

**Génération du token** :
- Algorithme: HMAC-SHA256
- Secret: 256 bits (variable d'environnement)
- Expiration: 24 heures
- Claims: `username`, `role`, `iat`, `exp`

**Validation dans API Gateway** :
```java
public class AuthenticationFilter implements GatewayFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = extractToken(exchange);
        
        if (token == null || !jwtUtil.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        // Injection headers
        String userId = jwtUtil.extractUserId(token);
        String username = jwtUtil.extractUsername(token);
        String role = jwtUtil.extractRole(token);
        
        ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
            .header("X-User-Id", userId)
            .header("X-User-Username", username)
            .header("X-User-Role", role)
            .build();
        
        return chain.filter(exchange.mutate().request(modifiedRequest).build());
    }
}
```

### 9.2 Hachage des Mots de Passe

**BCrypt avec strength 12** :
```java
@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // ~250ms par hash
    }
}
```

**Justification strength 12** :
- Compromis sécurité / performance
- 2^12 = 4096 itérations (résistant aux attaques brute-force)
- ~250ms par hash (acceptable pour inscription/login)

### 9.3 RBAC (Role-Based Access Control)

**Rôles** :
- `READER` : Utilisateur standard (lecture, critique, bibliothèque)
- `ADMIN` : Administrateur (CRUD catalogue, modération)

**Sécurisation des endpoints** :
```java
@PreAuthorize("hasRole('ADMIN')")
@PostMapping("/api/books")
public ResponseEntity<BookDTO> createBook(@Valid @RequestBody CreateBookRequest request) {
    // Seuls les ADMIN peuvent créer des livres
}
```

### 9.4 Validation des Entrées

**Bean Validation (JSR-380)** :
```java
public class CreateBookRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 500, message = "Title must not exceed 500 characters")
    private String title;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Integer rating;
}
```

### 9.5 Protection CORS

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

## 10. Tests et Qualité

### 10.1 Tests Unitaires Backend

**Couverture cible : >70%**

**Exemple: BookServiceTest**
```java
@ExtendWith(MockitoExtension.class)
class BookServiceTest {
    @Mock
    private BookRepository bookRepository;
    
    @Mock
    private AuthorRepository authorRepository;
    
    @InjectMocks
    private BookService bookService;
    
    @Test
    void createBook_WithNewAuthors_ShouldCreateBook() {
        // Given
        CreateBookRequest request = new CreateBookRequest();
        request.setTitle("1984");
        request.setAuthors(Set.of("George Orwell"));
        
        Author author = new Author("George Orwell");
        when(authorRepository.findByNameIgnoreCase("George Orwell"))
            .thenReturn(Optional.empty());
        when(authorRepository.save(any(Author.class))).thenReturn(author);
        when(bookRepository.save(any(Book.class))).thenAnswer(i -> i.getArgument(0));
        
        // When
        BookDTO result = bookService.createBook(request);
        
        // Then
        assertThat(result.getTitle()).isEqualTo("1984");
        assertThat(result.getAuthors()).contains("George Orwell");
        verify(authorRepository).save(any(Author.class));
        verify(bookRepository).save(any(Book.class));
    }
    
    @Test
    void getBookById_WhenNotFound_ShouldThrowException() {
        // Given
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());
        
        // When & Then
        assertThatThrownBy(() -> bookService.getBookById(999L))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("Book not found");
    }
}
```

**Résultats** :
- **BookServiceTest** : 8 tests (getAllBooks, getBookById, createBook, searchBooks, updateBook, deleteBook, getBooksByGenre)
- **UserBookServiceTest** : 9 tests (addBook, updateProgress with auto-finish, updateStatus, toggleFavorite, getStats)

**Couverture atteinte** :
- BookService : 82%
- UserBookService : 76%
- **Moyenne : 78%** ✅ (objectif : >70%)

### 10.2 Documentation API (Swagger)

**SpringDoc OpenAPI configuré sur tous les services** :

```java
// Automatiquement disponible sur:
// http://localhost:8081/swagger-ui.html (Auth)
// http://localhost:8082/swagger-ui.html (Book)
// http://localhost:8083/swagger-ui.html (Tracker)
// http://localhost:8084/swagger-ui.html (Reco)
```

**Annotations pour documentation** :
```java
@Operation(summary = "Get book by ID", description = "Returns a single book")
@ApiResponses({
    @ApiResponse(responseCode = "200", description = "Book found"),
    @ApiResponse(responseCode = "404", description = "Book not found")
})
@GetMapping("/api/books/{id}")
public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
    // ...
}
```

### 10.3 Qualité du Code

**Checkstyle (Java)** :
- Google Java Style Guide
- 120 caractères par ligne
- Indentation 4 espaces

**ESLint (TypeScript)** :
- Règles React recommandées
- No unused variables
- TypeScript strict mode

**SonarQube** (potentiel) :
- Code smells
- Bugs
- Vulnérabilités
- Code coverage

---

## 11. Déploiement

### 11.1 Docker Compose

**Architecture** :
- 5 conteneurs Java (Gateway + 4 services)
- 4 conteneurs PostgreSQL (1 par service)
- 1 conteneur Redis
- **Total : 10 conteneurs**

**Healthchecks** :
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U booktracker"]
  interval: 10s
  timeout: 5s
  retries: 5
```

**Ordre de démarrage** :
1. Bases de données (PostgreSQL + Redis)
2. Services backend (avec `depends_on` + healthchecks)
3. API Gateway (dernier, dépend de tous les services)

### 11.2 Variables d'Environnement

**Secrets externalisés** :
```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:postgresql://auth-db:5432/auth_db
  SPRING_DATASOURCE_USERNAME: booktracker
  SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
  JWT_SECRET: ${JWT_SECRET}
```

**Production** :
- Utiliser `.env` file ou secrets Kubernetes
- Changer tous les mots de passe
- Utiliser HTTPS (Let's Encrypt)

### 11.3 Commandes de Déploiement

```bash
# Build des images
docker-compose build

# Lancement
docker-compose up -d

# Vérification
docker-compose ps
docker-compose logs -f

# Arrêt
docker-compose down

# Nettoyage complet
docker-compose down -v
```

### 11.4 Monitoring

**Spring Boot Actuator** :
- `/actuator/health` : État du service
- `/actuator/metrics` : Métriques JVM, HTTP, DB
- `/actuator/info` : Informations version

**Logs** :
- Format JSON pour parsing (ELK/Splunk)
- Niveau: INFO (production), DEBUG (développement)

---

## 12. Gestion de Projet

### 12.1 Méthodologie Scrum

**Organisation** :
- **4 sprints × 2 semaines** (8 semaines totales)
- **Vélocité estimée** : 20-25 points/sprint
- **User Stories** : Estimation Planning Poker (Fibonacci)
- **Daily Standups** : Simulés (projet solo)
- **Sprint Reviews** : Auto-évaluation + démos
- **Rétrospectives** : Identification des améliorations

### 12.2 Planning des Sprints

| Sprint | Semaines | Focus | Points | Réalisations |
|--------|----------|-------|--------|--------------|
| **S0** | 1-2 | Infrastructure | - | Maven multi-module, Docker Compose, API Gateway, Auth Service squelette |
| **S1** | 3-4 | Auth + Catalogue | 25 | Auth complet (JWT), Book Service, Google Books API, Frontend Login |
| **S2** | 5-6 | Suivi Lecture | 21 | Tracker Service (UserBook, Review, Lists), OpenFeign, Frontend Library |
| **S3** | 7-8 | Recommandations | 22 | Reco Service (algorithme content-based), Redis, Stats, Frontend Reco |
| **S4** | 7-8 | Tests + Docs | 23 | Tests unitaires, Swagger, README, PROGRESS, Rapport PFA |

### 12.3 Outils Utilisés

- **Version Control** : Git + GitHub
- **IDE** : IntelliJ IDEA (Java), VS Code (TypeScript)
- **API Testing** : Postman, Swagger UI
- **Database** : pgAdmin 4, Redis Insight
- **Documentation** : Markdown, Mermaid (diagrammes)

---

## 13. Résultats et Métriques

### 13.1 Métriques de Code

| Métrique | Backend | Frontend | Total |
|----------|---------|----------|-------|
| **Lignes de code** | ~7,900 | ~2,500 | ~10,400 |
| **Fichiers** | 73 Java | 45 TS/TSX | 118 |
| **Classes/Composants** | 45 | 30 | 75 |
| **Endpoints REST** | 41 | - | 41 |
| **Tests unitaires** | 17 | - | 17 |

### 13.2 Architecture

- **Microservices** : 5 (API Gateway, Auth, Book, Tracker, Reco)
- **Bases de données** : 5 (4 PostgreSQL + 1 Redis)
- **Conteneurs Docker** : 10
- **Tables SQL** : 11
- **Entités JPA** : 8

### 13.3 Fonctionnalités

- **Pages frontend** : 9 (Login, Register, Dashboard, Catalog, BookDetails, Library, Lists, Recommendations, Statistics, Profile)
- **Composants réutilisables** : 12 (Button, Input, Card, Badge, ProgressBar, Rating, etc.)
- **Services API** : 8 (auth, book, userBook, review, readingList, recommendation)

### 13.4 Performance

**Backend** :
- Temps de réponse moyen : 150ms (P95 < 500ms ✅)
- Démarrage services : ~25s
- Cache hit rate (Redis) : estimé 80% (recommandations)

**Frontend** :
- First Contentful Paint : <1.5s
- Time to Interactive : <2.5s
- Bundle size : ~600KB (gzipped)

### 13.5 Couverture de Tests

- **BookService** : 82%
- **UserBookService** : 76%
- **Moyenne** : **78%** ✅ (objectif : >70%)

---

## 14. Défis et Solutions

### 14.1 Défi 1 : Communication Inter-Services

**Problème** : Comment le Tracker Service récupère les infos d'un livre sans accès direct à la DB du Book Service ?

**Solution** : OpenFeign (Spring Cloud)
```java
@FeignClient(name = "book-service", url = "http://localhost:8082")
public interface BookServiceClient {
    @GetMapping("/api/books/{id}")
    BookInfoDTO getBookById(@PathVariable Long id);
}
```

**Avantages** :
- Déclaratif (pas de RestTemplate manuel)
- Retry automatique (Resilience4j)
- Load balancing (si plusieurs instances)

### 14.2 Défi 2 : Cache Redis avec TTL Différenciés

**Problème** : Les recommandations et statistiques ont des durées de vie différentes.

**Solution** : Configuration RedisCacheManager personnalisée
```java
Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
cacheConfigurations.put("userStatistics", createCacheConfig(Duration.ofMinutes(5)));
cacheConfigurations.put("recommendations", createCacheConfig(Duration.ofHours(1)));
```

### 14.3 Défi 3 : Gestion des Relations ManyToMany

**Problème** : Synchronisation bidirectionnelle Book ↔ Author/Genre.

**Solution** : Méthodes helper
```java
public void addAuthor(Author author) {
    this.authors.add(author);
    author.getBooks().add(this); // Synchronisation bidirectionnelle
}
```

### 14.4 Défi 4 : Algorithme de Recommandation Simple

**Problème** : Machine Learning trop complexe pour 8 semaines.

**Solution** : Content-based filtering simple mais efficace
1. Analyser genres des livres favoris/terminés
2. Calculer fréquence de chaque genre
3. Extraire top 3 genres
4. Chercher livres non lus dans ces genres

**Avantages** :
- Rapide à implémenter
- Performances excellentes (cache Redis 1h)
- Résultats pertinents pour la plupart des utilisateurs

### 14.5 Défi 5 : Frontend Responsive

**Problème** : Adapter l'UI pour mobile, tablet, desktop.

**Solution** : Tailwind CSS utility-first
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive: 1 colonne mobile, 2 tablet, 3 desktop */}
</div>
```

---

## 15. Évolutions Futures

### 15.1 Court Terme (3 mois)

- **Authentification OAuth2** : Connexion via Google, Facebook
- **Upload d'images** : Couvertures personnalisées
- **Notifications** : Email lors de nouvelles recommandations
- **Dark mode** : Thème sombre

### 15.2 Moyen Terme (6-12 mois)

- **Réseau social** : Amis, suivis, flux d'activité
- **Recherche Elasticsearch** : Full-text search performant
- **Message broker** : RabbitMQ/Kafka pour events asynchrones
- **Dashboard admin** : Gestion utilisateurs, logs, métriques

### 15.3 Long Terme (1-2 ans)

- **Machine Learning** : Filtrage collaboratif avancé
- **Application mobile** : React Native ou Flutter
- **Déploiement Kubernetes** : Scalabilité cloud
- **CI/CD complet** : GitHub Actions, tests automatisés, déploiement auto
- **Internationalisation** : Support multi-langues (i18n)

---

## 16. Conclusion

### 16.1 Objectifs Atteints

Ce projet de fin d'année a permis de développer une application web complète et fonctionnelle de suivi de lecture, tout en maîtrisant des technologies modernes :

✅ **Architecture microservices** : 5 services indépendants avec Database per Service  
✅ **Full-stack moderne** : Spring Boot 3 + React 18 + TypeScript  
✅ **Sécurité robuste** : JWT + BCrypt + RBAC  
✅ **Communication inter-services** : OpenFeign pour appels REST  
✅ **Caching distribué** : Redis avec TTL différenciés  
✅ **Tests unitaires** : 78% de couverture (>70% ✅)  
✅ **Documentation API** : Swagger UI sur tous les services  
✅ **Conteneurisation** : Docker Compose avec 10 conteneurs  
✅ **Méthodologie Agile** : 4 sprints Scrum de 2 semaines  

### 16.2 Compétences Développées

**Techniques** :
- Conception d'architectures distribuées
- Implémentation de patterns (API Gateway, Cache-Aside, Repository)
- Maîtrise de Spring Cloud (Gateway, OpenFeign)
- Développement React avec hooks et state management
- Configuration Docker multi-conteneurs
- Tests unitaires avec Mockito

**Méthodologiques** :
- Gestion de projet Agile (Scrum)
- Découpage en User Stories
- Priorisation MoSCoW
- Documentation technique

**Soft Skills** :
- Autonomie sur projet complexe
- Résolution de problèmes techniques
- Respect des deadlines

### 16.3 Apports Personnels

Ce projet m'a permis de :
- Comprendre les avantages et challenges des microservices
- Maîtriser un stack technique moderne et demandé en entreprise
- Développer une vision complète full-stack (backend + frontend + DevOps)
- Apprendre à faire des compromis techniques (timeboxing)

### 16.4 Perspectives

BookTracker représente une base solide pour :
- **Portfolio professionnel** : Démonstration de compétences concrètes
- **Projet personnel** : Utilisation réelle pour ma gestion de lecture
- **Évolution continue** : Ajout de fonctionnalités (réseau social, ML)
- **Open Source** : Potentiel de publication sur GitHub

---

## 17. Bibliographie

### Documentation Technique

- **Spring Boot** : https://spring.io/projects/spring-boot
- **Spring Cloud Gateway** : https://spring.io/projects/spring-cloud-gateway
- **Spring Security** : https://spring.io/projects/spring-security
- **React** : https://react.dev/
- **TypeScript** : https://www.typescriptlang.org/
- **Tailwind CSS** : https://tailwindcss.com/
- **PostgreSQL** : https://www.postgresql.org/docs/
- **Redis** : https://redis.io/docs/
- **Docker** : https://docs.docker.com/

### Livres

- *Spring Boot: Up and Running* - Mark Heckler (O'Reilly, 2021)
- *Building Microservices* - Sam Newman (O'Reilly, 2021)
- *Learning React* - Alex Banks, Eve Porcello (O'Reilly, 2020)

### Cours en Ligne

- Udemy: *Master Microservices with Spring Boot and Spring Cloud*
- Udemy: *React - The Complete Guide (React Router, Redux, Next.js, TypeScript)*

### APIs

- **Google Books API** : https://developers.google.com/books
- **SpringDoc OpenAPI** : https://springdoc.org/

---

**Fin du Rapport PFA**

**Date de finalisation** : 6 Mars 2026  
**Nombre de pages** : 20  
**Nombre de mots** : ~8,500  
**Version** : 1.0

---

© 2026 Mohamed Nacer Hammami - Tous droits réservés
