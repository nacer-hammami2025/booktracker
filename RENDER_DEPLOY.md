# 🚀 Guide de Déploiement Rapide sur Render

## Configuration pour nacer-dev.me

**Temps estimé:** 30-45 minutes  
**Coût:** Gratuit (Free Tier) ou $7-21/mois (pour production)

---

## 🎯 Option 1: Sous-domaine (RECOMMANDÉ)

### URL finale: `booktracker.nacer-dev.me` ou `books.nacer-dev.me`

---

## 📋 Étape 1: Préparer le Repository GitHub

### 1.1 Créer un dépôt GitHub

```bash
# Initialiser Git (si ce n'est pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - BookTracker Application"

# Créer un repo sur GitHub.com, puis:
git remote add origin https://github.com/VOTRE_USERNAME/booktracker.git
git branch -M main
git push -u origin main
```

---

## 🚢 Étape 2: Déployer sur Render

### 2.1 Configuration Simplifiée (Frontend uniquement d'abord)

1. **Connectez-vous à Render.com**
   - Allez sur https://render.com
   - Sign in avec votre compte GitHub

2. **Créer un nouveau Static Site**
   - Cliquez sur "New +" → "Static Site"
   - Connectez votre repository GitHub `booktracker`
   - Configurez:
     ```
     Name: booktracker-frontend
     Branch: main
     Build Command: cd frontend && npm install && npm run build
     Publish Directory: frontend/dist
     ```

3. **Variables d'environnement Frontend**
   - Dans les Settings, ajoutez:
     ```
     VITE_API_URL=https://booktracker-gateway.onrender.com
     ```

4. **Déployez** → Cliquez sur "Create Static Site"

### 2.2 Configuration Backend (Microservices)

#### Option A: Blueprint (Automatique - RECOMMANDÉ)

1. **Dans Render Dashboard**
   - Cliquez "New +" → "Blueprint"
   - Sélectionnez votre repo `booktracker`
   - Render détectera automatiquement `render.yaml`
   - Cliquez "Apply" → Tous les services seront créés !

#### Option B: Manuelle (une par une)

**Pour chaque microservice:**

1. **API Gateway**
   ```
   New + → Web Service
   Repository: booktracker
   Name: booktracker-gateway
   Region: Frankfurt (proche de vous)
   Branch: main
   Root Directory: ./
   Environment: Docker
   Dockerfile Path: ./Dockerfile.gateway
   Instance Type: Free
   ```

2. **Auth Service** (même processus)
   ```
   Name: booktracker-auth
   Dockerfile Path: ./Dockerfile.auth
   Environment Variables:
     - SPRING_PROFILES_ACTIVE=prod
     - SERVER_PORT=8081
     - DB_HOST=[depuis database]
     - JWT_SECRET=[générer un secret fort]
   ```

3. **Book Service**
   ```
   Name: booktracker-book
   Dockerfile Path: ./Dockerfile.book
   ```

4. **Tracker Service**
   ```
   Name: booktracker-tracker
   Dockerfile Path: ./Dockerfile.tracker
   ```

5. **Reco Service**
   ```
   Name: booktracker-reco
   Dockerfile Path: ./Dockerfile.reco
   ```

### 2.3 Créer les Bases de Données

1. **Créer PostgreSQL Database**
   ```
   New + → PostgreSQL
   Name: booktracker-auth-db
   Database: auth_db
   User: auth_user
   Region: Frankfurt
   Plan: Free (ou Starter $7/mois)
   ```

2. **Répéter pour:**
   - `booktracker-book-db`
   - `booktracker-tracker-db`
   - `booktracker-reco-db`

3. **Créer Redis**
   ```
   New + → Redis
   Name: booktracker-redis
   Plan: Free
   ```

### 2.4 Configurer les Variables d'Environnement

Pour **chaque service**, allez dans Settings → Environment:

**Gateway:**
```env
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
AUTH_SERVICE_URL=https://booktracker-auth.onrender.com
BOOK_SERVICE_URL=https://booktracker-book.onrender.com
TRACKER_SERVICE_URL=https://booktracker-tracker.onrender.com
RECO_SERVICE_URL=https://booktracker-reco.onrender.com
CORS_ALLOWED_ORIGINS=https://booktracker.nacer-dev.me,https://nacer-dev.me
```

**Auth Service:**
```env
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8081
SPRING_DATASOURCE_URL=<Internal Database URL>
SPRING_DATASOURCE_USERNAME=auth_user
SPRING_DATASOURCE_PASSWORD=<Auto généré>
JWT_SECRET=<Générer avec: openssl rand -base64 64>
JWT_EXPIRATION=86400000
```

---

## 🌐 Étape 3: Configurer le Domaine nacer-dev.me

### 3.1 Ajouter le Custom Domain dans Render

1. **Dans votre Static Site (Frontend)**
   - Allez dans Settings → Custom Domain
   - Cliquez "Add Custom Domain"
   - Entrez: `booktracker.nacer-dev.me`

2. **Render va vous donner des enregistrements DNS**
   ```
   Type: CNAME
   Name: booktracker
   Value: booktracker-frontend.onrender.com
   ```

### 3.2 Configurer DNS chez votre Provider

**Chez votre fournisseur DNS (Cloudflare, OVH, etc.):**

1. Allez dans DNS Settings pour `nacer-dev.me`
2. Ajoutez un nouvel enregistrement:
   ```
   Type: CNAME
   Name: booktracker
   Target: booktracker-frontend.onrender.com
   TTL: 3600 (ou Auto)
   Proxy: Désactivé (important!)
   ```

3. **Sauvegardez** et attendez 5-10 minutes

### 3.3 Activer HTTPS

Render le fait automatiquement avec Let's Encrypt ! 🎉  
Une fois le DNS propagé, le certificat SSL sera provisonné automatiquement.

---

## 🔒 Étape 4: Initialiser les Bases de Données

### 4.1 Connectez-vous aux BDs via Render Shell

1. **Pour Book DB** (ajouter les livres):
   ```bash
   # Dans Render Console de booktracker-book-db
   psql -U book_user -d book_db
   
   # Copier le contenu de init-books.sql
   # Ou uploader via Render CLI
   ```

2. **Pour Tracker DB**:
   ```bash
   psql -U tracker_user -d tracker_db
   # Copier le contenu de init-tracker.sql
   ```

### 4.2 Ou utiliser DBeaver/pgAdmin

Utilisez les credentials de connexion depuis Render Dashboard:
- Host: [donné par Render]
- Port: 5432
- Username: [défini]
- Password: [généré par Render]
- Database: [défini]

---

## ✅ Étape 5: Vérification

### 5.1 Tests Backend

Visitez:
- ✅ `https://booktracker-gateway.onrender.com/actuator/health`
- ✅ `https://booktracker-auth.onrender.com/actuator/health`
- ✅ `https://booktracker-book.onrender.com/actuator/health`

### 5.2 Test Frontend

Visitez: `https://booktracker.nacer-dev.me`

Vous devriez voir votre magnifique Landing Page animée ! 🚀

---

## 🎨 Configuration Frontend pour Production

### Mettre à jour l'URL API

```bash
# Dans frontend/.env.production
VITE_API_URL=https://booktracker-gateway.onrender.com/api
```

### Rebuild et redéployer

Render le fait automatiquement à chaque push sur GitHub !

---

## ⚡ Optimisations pour Production

### 1. Activer le Plan Starter ($7/mois par service)
- Pas de sleep après inactivité
- Plus de RAM et CPU
- Persistent connections

### 2. Configurer Auto-Deploy

Dans chaque service Settings:
- ✅ Auto-Deploy: Yes
- Branch: main

### 3. Configurer les Health Checks

Render utilise `/actuator/health` automatiquement pour Spring Boot !

---

## 🐛 Troubleshooting

### Services ne démarrent pas?

1. **Vérifier les logs** dans Render Dashboard → Logs
2. **Vérifier les variables d'env** sont toutes définies
3. **Vérifier les connexions DB** avec les Internal URLs

### Free Tier Sleep?

Les services Render gratuits dorment après 15 min d'inactivité.  
**Solutions:**
- Upgrade vers Starter plan ($7/mois)
- Utiliser un service de ping (UptimeRobot, Cron-Job.org)

### CORS Errors?

Vérifiez que `CORS_ALLOWED_ORIGINS` contient bien votre domaine:
```
CORS_ALLOWED_ORIGINS=https://booktracker.nacer-dev.me,https://nacer-dev.me
```

---

## 🎯 Architecture Finale

```
Internet
    ↓
https://booktracker.nacer-dev.me (Frontend - Static Site)
    ↓
https://booktracker-gateway.onrender.com (API Gateway)
    ↓
    ├─→ Auth Service (PostgreSQL)
    ├─→ Book Service (PostgreSQL)
    ├─→ Tracker Service (PostgreSQL)
    └─→ Reco Service (PostgreSQL + Redis)
```

---

## 💰 Coûts Estimés

### Option Gratuite (Free Tier)
- Frontend: Gratuit (100GB bandwidth)
- Services: Gratuit (750h/mois, sleep après 15min)
- PostgreSQL: Gratuit (256MB chacune)
- Redis: Gratuit (25MB)
- **Total: 0€/mois** ✅

### Option Production (Starter)
- Frontend: Gratuit
- Gateway: $7/mois
- Auth: $7/mois
- Book: $7/mois
- Tracker: $7/mois
- Reco: $7/mois
- PostgreSQL: $7/mois (pooled)
- Redis: Inclus
- **Total: ~$42/mois** (ou ~$20 si vous mutualisez)

---

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Spring Boot on Render](https://render.com/docs/deploy-spring-boot)
- [Custom Domains](https://render.com/docs/custom-domains)
- [PostgreSQL on Render](https://render.com/docs/databases)

---

## ✨ Prêt à Déployer!

**Temps total: 30-45 minutes**

1. ✅ Push sur GitHub (5 min)
2. ✅ Créer services Render (15 min)
3. ✅ Configurer DNS (5 min + attente propagation)
4. ✅ Initialiser BDs (10 min)
5. ✅ Tester (5 min)

**Votre application sera en ligne sur `https://booktracker.nacer-dev.me` ! 🎉**

---

*Réalisé par Mohamed Nacer Hammami & Dhia Ben Saidane - Mars 2026*
