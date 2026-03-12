# 🚀 Guide de Démarrage - BookTracker
## Présentation Professionnelle devant le Jury

---

## 📋 Prérequis (à vérifier AVANT la présentation)

### 1. Logiciels installés
- [x] **Docker Desktop** - pour les services backend
- [x] **Java 21** - JDK installé et configuré
- [x] **Node.js** (v18+) - pour le frontend React
- [x] **Maven 3.9.12** - pour la compilation des services

### 2. Vérification rapide (1 minute)
```powershell
# Vérifier Java
java -version
# Doit afficher: openjdk version "21.0.8"

# Vérifier Docker
docker --version
# Doit afficher: Docker version 20.x.x ou supérieur

# Vérifier Node.js
node --version
# Doit afficher: v18.x.x ou supérieur

# Vérifier que Docker Desktop est démarré
docker ps
# Ne doit PAS afficher d'erreur
```

---

## 🎯 Démarrage de l'Application (3-4 minutes)

### **ÉTAPE 1: Démarrer Docker Desktop** ⏱️ 30 secondes
1. Ouvrir **Docker Desktop**
2. Attendre que l'icône devienne **verte** (Docker est prêt)
3. Vérifier dans PowerShell:
```powershell
docker ps
```
✅ Si aucune erreur → Docker est prêt

---

### **ÉTAPE 2: Naviguer vers le projet** ⏱️ 5 secondes
```powershell
cd C:\Users\mohamednacer.hammami\Downloads\JavaProjectA
```

---

### **ÉTAPE 3: Démarrer les services backend** ⏱️ 1-2 minutes

```powershell
# Démarrer tous les services en arrière-plan
docker-compose up -d
```

**Explication pour le jury:**
> "Cette commande démarre 10 conteneurs Docker qui constituent notre architecture microservices :
> - 4 bases de données PostgreSQL (auth, book, tracker, reco)
> - 1 cache Redis
> - 5 services Spring Boot (auth, book, tracker, reco, gateway)"

**Vérification:**
```powershell
docker ps
```
✅ Vous devez voir **10 conteneurs** en cours d'exécution

**Attendre 10-15 secondes** que tous les services soient "Healthy"

---

### **ÉTAPE 4: Vérifier les services backend** ⏱️ 15 secondes

```powershell
# Vérifier l'API Gateway (point d'entrée principal)
docker logs booktracker-gateway --tail 5
```

✅ Vous devez voir: `Started ApiGatewayApplication in X seconds`

**Test rapide de l'API:**
```powershell
# Tester l'endpoint de santé
curl http://localhost:8080/actuator/health
```
✅ Devrait retourner: `{"status":"UP"}`

---

### **ÉTAPE 5: Démarrer le frontend** ⏱️ 1 minute

```powershell
# Se déplacer dans le dossier frontend
cd frontend

# Démarrer le serveur de développement
npm run dev
```

**Explication pour le jury:**
> "Le frontend est une application React moderne utilisant Vite comme build tool. 
> Elle communique avec nos microservices via l'API Gateway sur le port 8080."

✅ Attendez le message: `Local: http://localhost:3000/`

---

### **ÉTAPE 6: Accéder à l'application** ⏱️ 5 secondes

Ouvrir le navigateur et accéder à:
```
http://localhost:3000
```

✅ Vous devez voir la **page de connexion BookTracker**

---

## 🎬 Scénario de Démonstration

### 1. **Page d'accueil et Authentification**
- Montrer l'interface de connexion/inscription
- Créer un nouveau compte de démonstration:
  - Username: `demo_jury`
  - Email: `jury@booktracker.com`
  - Password: `DemoJury2026!`

**Point à souligner:**
> "L'authentification est gérée par notre Auth Service avec JWT tokens 
> et sécurité Spring Security. Les mots de passe sont hashés avec BCrypt."

---

### 2. **Catalogue de Livres** 📚
- Naviguer vers la section "Livres"
- Montrer la liste des livres disponibles
- Utiliser la recherche et les filtres

**Point à souligner:**
> "Le Book Service expose un catalogue riche avec pagination, 
> recherche full-text, et filtrage par genre/auteur."

---

### 3. **Gestion de la Bibliothèque Personnelle**
- Ajouter un livre à la bibliothèque
- Marquer un livre comme "En cours de lecture"
- Mettre à jour la progression (ex: 50 pages lues)

**Point à souligner:**
> "Le Tracker Service gère l'état de lecture personnel de chaque utilisateur
> avec un système de statuts et de suivi de progression."

---

### 4. **Recommandations Personnalisées** 🎯
- Accéder à la section "Recommandations"
- Montrer les suggestions basées sur l'historique

**Point à souligner:**
> "Le Recommendation Service utilise Redis pour le caching et analyse
> les habitudes de lecture pour suggérer des livres pertinents."

---

### 5. **Ajouter un Avis**
- Laisser un avis sur un livre terminé
- Noter le livre (1-5 étoiles)
- Ajouter un commentaire

**Point à souligner:**
> "Les avis sont stockés et indexés, permettant aux autres utilisateurs
> de découvrir des livres via les retours de la communauté."

---

## 📊 Architecture à Présenter

### Schéma des ports:
```
┌─────────────────────────────────────────────┐
│         Frontend (React + Vite)              │
│         http://localhost:3000                │
└──────────────┬──────────────────────────────┘
               │ REST API
               ▼
┌─────────────────────────────────────────────┐
│         API Gateway (Spring Cloud)           │
│         http://localhost:8080                │
└──┬───┬───┬───┬──────────────────────────────┘
   │   │   │   │
   │   │   │   └──────────────────┐
   │   │   │                      │
   ▼   ▼   ▼   ▼                  ▼
┌────┐ ┌────┐ ┌────┐ ┌────┐   ┌─────┐
│Auth│ │Book│ │Trac│ │Reco│   │Redis│
│8081│ │8082│ │8083│ │8084│   │6379 │
└─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘   └─────┘
  │      │      │      │
  ▼      ▼      ▼      ▼
┌───┐  ┌───┐  ┌───┐  ┌───┐
│PG │  │PG │  │PG │  │PG │
│DB │  │DB │  │DB │  │DB │
└───┘  └───┘  └───┘  └───┘
```

---

## 🛑 Arrêt Propre de l'Application

### Après la démonstration:

**1. Arrêter le frontend** (dans le terminal frontend)
```
Ctrl + C
```

**2. Arrêter les services Docker**
```powershell
# Revenir au dossier racine
cd ..

# Arrêter tous les conteneurs
docker-compose down
```

**Option: Nettoyer complètement** (si besoin)
```powershell
# Arrêter et supprimer les volumes (données)
docker-compose down -v
```

---

## ⚠️ Dépannage Rapide

### Si le frontend ne démarre pas:
```powershell
cd frontend
npm install
npm run dev
```

### Si un service Docker ne démarre pas:
```powershell
# Voir les logs d'un service spécifique
docker logs booktracker-auth-service
docker logs booktracker-book-service
docker logs booktracker-gateway

# Redémarrer un service
docker-compose restart auth-service
```

### Si l'authentification échoue:
```powershell
# Vérifier que l'auth-service est accessible
curl http://localhost:8081/actuator/health
```

---

## 📝 Points Techniques à Mentionner

### Technologies Utilisées:
- **Backend**: Java 21, Spring Boot 3.2.3, Spring Cloud Gateway
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Base de données**: PostgreSQL 16
- **Cache**: Redis
- **Conteneurisation**: Docker & Docker Compose
- **Sécurité**: JWT, Spring Security, BCrypt
- **Architecture**: Microservices, API Gateway Pattern

### Choix Architecturaux:
1. **Microservices** pour la scalabilité et la séparation des responsabilités
2. **API Gateway** pour le routing centralisé et la sécurité
3. **Base de données par service** pour l'isolation des données
4. **Redis** pour améliorer les performances des recommandations
5. **JWT** pour l'authentification stateless

### Migration Java 21:
Mentionner l'upgrade récent:
> "Nous venons de migrer vers Java 21 LTS, bénéficiant des dernières
> améliorations de performance et de sécurité. Tous les tests passent à 100%."

---

## ✅ Checklist Pre-Présentation

**La veille:**
- [ ] Tester le démarrage complet
- [ ] Préparer des données de démonstration intéressantes
- [ ] Vérifier que tous les fichiers sont à jour
- [ ] Tester le scénario de démonstration A-Z

**1 heure avant:**
- [ ] Démarrer Docker Desktop
- [ ] Fermer les applications inutiles
- [ ] Brancher l'ordinateur (ne pas dépendre de la batterie)
- [ ] Désactiver les notifications Windows

**5 minutes avant:**
- [ ] Ouvrir PowerShell dans le dossier du projet
- [ ] Avoir un navigateur prêt (nouvel onglet vide)
- [ ] Avoir ce guide ouvert dans un autre écran/fenêtre

---

## 🎓 Message pour le Jury

> "BookTracker est une application de suivi de lecture moderne utilisant
> une architecture microservices robuste et évolutive. Chaque service est
> indépendant, déployable séparément, et communique via une API Gateway
> centralisée. L'application démontre la maîtrise des technologies Java
> modernes, de Spring Boot, des bases de données, du caching, et de
> l'architecture distribuée."

---

**Bonne présentation ! 🎯**
