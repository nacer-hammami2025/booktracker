# ✅ Checklist de Déploiement - BookTracker

## 🎯 Objectif: Déployer sur https://booktracker.nacer-dev.me

**Temps estimé:** 30-45 minutes  
**Difficulté:** ⭐⭐ Facile (avec Render)

---

## 📋 Phase 1: Préparation (5 min)

### ✅ Vérifications Locales

- [ ] Java 21 LTS installé (`java -version`)
- [ ] Docker Desktop en cours d'exécution
- [ ] Node.js 18+ installé (`node -version`)
- [ ] Git configuré (`git --version`)
- [ ] Compte GitHub actif
- [ ] Compte Render.com créé (gratuit)

### ✅ Tests Build

```powershell
# Exécuter le script de vérification
.\quick-deploy.ps1
```

**Attendu:**
- ✅ Git initialisé
- ✅ Frontend build réussi
- ✅ Backend build réussi

---

## 📦 Phase 2: Repository GitHub (5 min)

### ✅ Créer le Repository

1. Allez sur https://github.com/new
2. Nom: `booktracker` (ou votre choix)
3. Visibilité: Private ou Public
4. ✅ Ne pas initialiser avec README (déjà présent)
5. Cliquez "Create repository"

### ✅ Push Initial

```powershell
# Si pas encore configuré
git remote add origin https://github.com/VOTRE_USERNAME/booktracker.git
git branch -M main

# Push
git add .
git commit -m "Ready for production deployment 🚀"
git push -u origin main
```

**Vérification:**
- [ ] Code visible sur GitHub
- [ ] Tous les fichiers présents
- [ ] render.yaml présent à la racine

---

## 🚀 Phase 3: Déploiement Render (20 min)

### ✅ Étape 3.1: Blueprint Deployment

1. **Connexion:**
   - [ ] Allez sur https://render.com
   - [ ] Sign in avec GitHub
   - [ ] Autoriser l'accès à votre repo

2. **Créer Blueprint:**
   - [ ] Cliquez "New +" dans le header
   - [ ] Sélectionnez "Blueprint"
   - [ ] Choisissez votre repo `booktracker`
   - [ ] Render détecte `render.yaml` automatiquement
   - [ ] Cliquez "Apply Blueprint"

3. **Services Créés (attendre ~15-20 min):**
   - [ ] ✅ booktracker-frontend (Static Site)
   - [ ] ✅ booktracker-gateway (Web Service)
   - [ ] ✅ booktracker-auth (Web Service)
   - [ ] ✅ booktracker-book (Web Service)
   - [ ] ✅ booktracker-tracker (Web Service)
   - [ ] ✅ booktracker-reco (Web Service)
   - [ ] ✅ booktracker-auth-db (PostgreSQL)
   - [ ] ✅ booktracker-book-db (PostgreSQL)
   - [ ] ✅ booktracker-tracker-db (PostgreSQL)
   - [ ] ✅ booktracker-reco-db (PostgreSQL)

### ✅ Étape 3.2: Créer Redis (Manuel - 2 min)

**Render Blueprint ne supporte pas Redis, créez-le manuellement:**

1. [ ] Dashboard → "New +" → "Redis"
2. [ ] Name: `booktracker-redis`
3. [ ] Region: Frankfurt (EU Central)
4. [ ] Plan: Free (25MB)
5. [ ] Cliquez "Create Redis"

### ✅ Étape 3.3: Configurer Redis dans Reco Service

1. [ ] Allez dans `booktracker-reco` service
2. [ ] Settings → Environment
3. [ ] Ajoutez:
   ```
   REDIS_HOST=[copier depuis booktracker-redis Internal Hostname]
   REDIS_PORT=6379
   ```
4. [ ] Save → Le service redémarrera automatiquement

### ✅ Étape 3.4: Vérifier Variables d'Environnement

**Pour chaque service, vérifiez dans Settings → Environment:**

**booktracker-gateway:**
- [ ] `AUTH_SERVICE_URL` défini
- [ ] `BOOK_SERVICE_URL` défini
- [ ] `TRACKER_SERVICE_URL` défini
- [ ] `RECO_SERVICE_URL` défini
- [ ] `CORS_ALLOWED_ORIGINS` défini

**booktracker-auth:**
- [ ] `JWT_SECRET` généré automatiquement
- [ ] `DB_HOST`, `DB_USER`, `DB_PASSWORD` depuis database

**booktracker-book, tracker, reco:**
- [ ] Connexions databases configurées

### ✅ Étape 3.5: Initialiser les Bases de Données

**Option A: Via Render Shell (Recommandé)**

1. **Book Database:**
   - [ ] Dashboard → `booktracker-book-db` → "Shell"
   - [ ] Exécutez: `psql -U book_user -d book_db`
   - [ ] Copiez le contenu de `init-books.sql` et collez
   - [ ] Appuyez Entrée
   - [ ] Vérifiez: `SELECT COUNT(*) FROM books;` → Devrait afficher ~50 livres

2. **Tracker Database:**
   - [ ] Dashboard → `booktracker-tracker-db` → "Shell"
   - [ ] Exécutez: `psql -U tracker_user -d tracker_db`
   - [ ] Copiez le contenu de `init-tracker.sql` et collez
   - [ ] Appuyez Entrée

**Option B: Via Client PostgreSQL (pgAdmin/DBeaver)**

1. [ ] Copiez les credentials depuis Render Database → External Connection
2. [ ] Connectez-vous avec votre client SQL
3. [ ] Exécutez `init-books.sql` sur `book_db`
4. [ ] Exécutez `init-tracker.sql` sur `tracker_db`

---

## 🌐 Phase 4: Configuration Domaine (10 min)

### ✅ Étape 4.1: Ajouter Custom Domain

1. [ ] Dashboard → `booktracker-frontend` service
2. [ ] Settings → "Custom Domain"
3. [ ] Cliquez "Add Custom Domain"
4. [ ] Entrez: `booktracker.nacer-dev.me`
5. [ ] Render affiche les instructions DNS

**Copier les informations affichées:**
```
Type: CNAME
Name: booktracker
Value: booktracker-frontend.onrender.com
```

### ✅ Étape 4.2: Configurer DNS

**Chez votre provider DNS (Cloudflare, OVH, Namecheap, etc.):**

1. [ ] Connectez-vous à votre compte DNS
2. [ ] Allez dans DNS Management pour `nacer-dev.me`
3. [ ] Ajoutez un nouvel enregistrement:
   - Type: `CNAME`
   - Name: `booktracker`
   - Content/Target: `booktracker-frontend.onrender.com`
   - TTL: `3600` (ou Auto)
   - **Proxy Status: OFF** (très important si Cloudflare!)
4. [ ] Sauvegardez

### ✅ Étape 4.3: Vérifier Propagation DNS

**Attendre 5-10 minutes, puis tester:**

```powershell
# Windows PowerShell
nslookup booktracker.nacer-dev.me

# Ou en ligne: https://dnschecker.org
```

**Résultat attendu:**
- [ ] Le CNAME pointe vers `booktracker-frontend.onrender.com`
- [ ] Pas d'erreur "domain not found"

### ✅ Étape 4.4: HTTPS Automatique

- [ ] Render provisionne automatiquement le certificat SSL (Let's Encrypt)
- [ ] Attendez 2-5 minutes après propagation DNS
- [ ] Le cadenas 🔒 apparaîtra automatiquement

---

## 🧪 Phase 5: Vérification & Tests (5 min)

### ✅ Tests Backend

**Health Checks:**

```powershell
# Gateway
Invoke-RestMethod https://booktracker-gateway.onrender.com/actuator/health

# Auth
Invoke-RestMethod https://booktracker-auth.onrender.com/actuator/health

# Book
Invoke-RestMethod https://booktracker-book.onrender.com/actuator/health

# Tracker
Invoke-RestMethod https://booktracker-tracker.onrender.com/actuator/health

# Reco
Invoke-RestMethod https://booktracker-reco.onrender.com/actuator/health
```

**Tous doivent retourner:**
```json
{
  "status": "UP"
}
```

- [ ] ✅ Gateway UP
- [ ] ✅ Auth UP
- [ ] ✅ Book UP
- [ ] ✅ Tracker UP
- [ ] ✅ Reco UP

### ✅ Test Frontend

1. **Ouvrir:** https://booktracker.nacer-dev.me

**Vérifications:**
- [ ] ✅ Page charge sans erreur
- [ ] ✅ Animations Framer Motion fonctionnent
- [ ] ✅ Landing page s'affiche correctement
- [ ] ✅ Stats affichées (2000+ Pages, Java 21, 5 Microservices)
- [ ] ✅ Pas d'erreurs dans la console navigateur

2. **Test de Connexion:**
- [ ] Cliquez "Connexion" ou "Commencer"
- [ ] Page Register/Login s'affiche
- [ ] Formulaire fonctionnel (peut créer un compte)

3. **Test API:**
- [ ] Créez un compte test
- [ ] Connectez-vous
- [ ] Dashboard s'affiche avec graphiques
- [ ] Navigation vers Technologies page fonctionne

### ✅ Performance Check

- [ ] Temps de chargement < 3 secondes
- [ ] Images chargent correctement
- [ ] Animations fluides (60 FPS)
- [ ] Responsive design (mobile/tablet)

---

## 📊 Phase 6: Monitoring (Optionnel)

### ✅ Configurer Monitoring

1. **Render Dashboard:**
   - [ ] Vos pour chaque service → "Metrics"
   - [ ] Vérifiez CPU, Memory, Requests

2. **Uptime Monitoring (Gratuit):**
   - [ ] Créez un compte UptimeRobot (gratuit)
   - [ ] Ajoutez monitor: `https://booktracker-gateway.onrender.com/actuator/health`
   - [ ] Intervalle: 5 minutes
   - [ ] Alert si DOWN

3. **Logs:**
   - [ ] Dashboard → Service → "Logs" pour debug

---

## 🎉 Phase Final: Succès !

### ✅ Tout Fonctionne !

**Votre application est maintenant en ligne ! 🚀**

**URLs:**
- 🌐 **Production:** https://booktracker.nacer-dev.me
- 🔌 **API:** https://booktracker-gateway.onrender.com/api
- 📚 **Docs:** https://booktracker-gateway.onrender.com/swagger-ui.html
- 📊 **Health:** https://booktracker-gateway.onrender.com/actuator/health

---

## 📢 Partager Votre Projet

### ✅ Préparer la Démo

1. **Créer compte de démo:**
   ```sql
   -- Exécuter dans auth-db
   INSERT INTO users (username, email, password) 
   VALUES ('demo', 'demo@booktracker.com', '<bcrypt_hash>');
   ```

2. **Ajouter des données de démo:**
   - Livres déjà présents (50+ via init-books.sql)
   - Créer listes personnalisées
   - Ajouter progressions de lecture

3. **Créer README publique:**
   - Screenshots de l'application
   - Vidéo démo (Loom, YouTube)
   - Architecture diagram

### ✅ LinkedIn / Portfolio

```markdown
🚀 Nouveau Projet: BookTracker

Plateforme moderne de suivi de lecture développée en architecture microservices.

🛠️ Technologies:
• Java 21 LTS + Spring Boot 3.2.3
• React 18 + TypeScript + Framer Motion
• PostgreSQL 16 + Redis 7
• Docker + Render.com

✨ Fonctionnalités:
• Catalogue de 50+ livres
• Recommandations IA
• Statistiques avec graphiques animés
• Architecture 5 microservices

🌐 Demo: https://booktracker.nacer-dev.me

#Java #SpringBoot #React #Microservices #DevOps
```

---

## 🐛 Troubleshooting

### ❌ Services ne démarrent pas

- [ ] Vérifier logs: Dashboard → Service → Logs
- [ ] Vérifier variables d'environnement
- [ ] Rebuild: Settings → "Manual Deploy" → Deploy

### ❌ DNS ne fonctionne pas

- [ ] Vérifier Proxy OFF (Cloudflare)
- [ ] Attendre jusqu'à 24h (rare)
- [ ] Tester avec `nslookup`

### ❌ CORS Errors

- [ ] Ajouter domaine dans `CORS_ALLOWED_ORIGINS`
- [ ] Format: `https://booktracker.nacer-dev.me,https://nacer-dev.me`
- [ ] Redémarrer Gateway service

### ❌ Free Tier Sleep

- [ ] Services dorment après 15 min (normal sur Free)
- [ ] Première requête réveille (~30 secondes)
- [ ] Solution: Upgrade Starter ($7/service) ou UptimeRobot pings

---

## 💰 Coûts Prévus

### Option Gratuite (Free Tier)
- ✅ Frontend: Gratuit
- ✅ 5 Services Backend: Gratuit (avec sleep)
- ✅ 4x PostgreSQL: Gratuit (256MB chacun)
- ✅ Redis: Gratuit (25MB)
- **Total: 0€/mois** 🎉

### Option Production (No Sleep)
- Frontend: Gratuit
- Gateway: $7/mois
- Auth + Book + Tracker + Reco: $7/mois chacun
- PostgreSQL Pooling: $7/mois (partagé)
- **Total: ~$42/mois** (peut être réduit à $21 avec optimisations)

---

## 📚 Ressources

- [Render Documentation](https://render.com/docs)
- [RENDER_DEPLOY.md](./RENDER_DEPLOY.md) - Guide détaillé
- [DEPLOY_EXPRESS.md](./DEPLOY_EXPRESS.md) - Guide express
- [Spring Boot Docs](https://spring.io/projects/spring-boot)

---

**✨ Félicitations ! Votre projet est en production ! ✨**

*Checklist créée par Mohamed Nacer Hammami & Dhia Ben Saidane - Mars 2026*
