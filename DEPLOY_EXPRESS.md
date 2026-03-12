# 🚀 Déploiement Express - 3 Commandes

## Objectif: Déployer sur `https://booktracker.nacer-dev.me`

---

## ⚡ Méthode Ultra-Rapide (30 minutes)

### Commande 1: Vérifier que tout compile ✅

```powershell
# Test build local
.\quick-deploy.ps1
```

**Ce que ça fait:**
- ✅ Vérifie Git
- ✅ Build le frontend
- ✅ Build le backend
- ✅ Prêt pour déploiement

---

### Commande 2: Push sur GitHub 📤

```powershell
# Si pas encore de repo GitHub, créez-en un d'abord sur github.com
git remote add origin https://github.com/VOTRE_USERNAME/booktracker.git
git branch -M main

# Puis push
git add .
git commit -m "Ready for Render deployment 🚀"
git push -u origin main
```

---

### Commande 3: Déployer sur Render (via Interface Web) 🌐

1. **Allez sur:** https://render.com
2. **Connectez-vous** avec votre compte GitHub
3. **Cliquez:** New + → Blueprint
4. **Sélectionnez:** votre repo `booktracker`
5. **Cliquez:** "Apply Blueprint"

**✨ AUTOMATIQUE:**
- ✅ Frontend déployé
- ✅ 5 microservices déployés
- ✅ 4 bases PostgreSQL créées
- ✅ URLs générées

**⚠️ MANUEL (2 minutes):**
- Créer Redis: New + → Redis → Name: `booktracker-redis` → Create

---

### Commande 4: Configurer le Domaine 🌐

**Dans Render (Frontend Service):**
1. Settings → Custom Domain
2. Add Custom Domain: `booktracker.nacer-dev.me`
3. Copier les instructions DNS affichées

**Chez votre provider DNS (ex: Cloudflare, OVH):**
```
Type: CNAME
Name: booktracker
Value: booktracker-frontend.onrender.com
TTL: 3600
Proxy: OFF (important!)
```

**⏱️ Attendre:** 5-10 minutes pour la propagation DNS  
**🔒 HTTPS:** Automatique via Let's Encrypt !

---

## 🎯 Résultat Final

Votre application sera accessible sur:

**🌐 Frontend:** https://booktracker.nacer-dev.me  
**🔌 API:** https://booktracker-gateway.onrender.com/api  
**📊 Health Check:** https://booktracker-gateway.onrender.com/actuator/health

---

## 📊 Services Déployés

| Service | URL Render | Port |
|---------|-----------|------|
| 🎨 Frontend | booktracker-frontend.onrender.com | - |
| 🚪 Gateway | booktracker-gateway.onrender.com | 8080 |
| 🔐 Auth | booktracker-auth.onrender.com | 8081 |
| 📚 Books | booktracker-book.onrender.com | 8082 |
| 📊 Tracker | booktracker-tracker.onrender.com | 8083 |
| 🤖 Reco | booktracker-reco.onrender.com | 8084 |

---

## 🗃️ Bases de Données

| Database | Service | Taille |
|----------|---------|--------|
| 🔐 auth-db | Auth Service | 256MB (Free) |
| 📚 book-db | Book Service | 256MB (Free) |
| 📊 tracker-db | Tracker Service | 256MB (Free) |
| 🤖 reco-db | Reco Service | 256MB (Free) |
| 🚀 redis | Reco Cache | 25MB (Free) |

---

## ⚙️ Configuration Post-Déploiement

### Initialiser les bases de données

**Option A: Via Render Shell (recommandé)**

1. Dans Render Dashboard → `booktracker-book-db` → Shell
2. Exécutez:
```bash
# Copiez le contenu de init-books.sql et collez-le
psql -U book_user -d book_db
# Puis collez le SQL
```

**Option B: Via Client PostgreSQL (pgAdmin, DBeaver)**

Credentials disponibles dans Render Dashboard → Database → Connect

```
Host: [fourni par Render]
Port: 5432
Database: book_db / tracker_db
Username: book_user / tracker_user
Password: [auto-généré]
```

---

## 🔧 Variables d'Environnement (Déjà configurées via render.yaml)

Render les configure automatiquement, mais vous pouvez les vérifier:

**Gateway:**
```env
AUTH_SERVICE_URL=https://booktracker-auth.onrender.com
BOOK_SERVICE_URL=https://booktracker-book.onrender.com
TRACKER_SERVICE_URL=https://booktracker-tracker.onrender.com
RECO_SERVICE_URL=https://booktracker-reco.onrender.com
CORS_ALLOWED_ORIGINS=https://booktracker.nacer-dev.me
```

**Auth:**
```env
JWT_SECRET=[auto-généré par Render]
DB_HOST=[auto depuis database]
```

---

## ✅ Vérification

### Test Backend
```bash
# Health checks
curl https://booktracker-gateway.onrender.com/actuator/health
curl https://booktracker-auth.onrender.com/actuator/health
curl https://booktracker-book.onrender.com/actuator/health
```

### Test Frontend
Ouvrez: https://booktracker.nacer-dev.me

Vous devriez voir votre Landing Page avec animations ! 🎉

---

## 💰 Coût

**Free Tier (Gratuit):**
- ✅ Frontend: Illimité
- ✅ 5 Services: 750h/mois chacun (dormance après 15min)
- ✅ PostgreSQL: 256MB chacune
- ✅ Redis: 25MB
- **Total: 0€/mois**

**Production (Starter - $7/service):**
- 🚀 Pas de dormance
- 🔄 Auto-scaling
- 📊 Metrics avancées
- **Total: ~$42/mois** (ou ~$21 si mutualisé)

---

## 📚 Documentation Complète

- **Guide détaillé:** [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)
- **Guide express:** [DEPLOY_RENDER_QUICK.md](./DEPLOY_RENDER_QUICK.md)
- **Fichier Blueprint:** [render.yaml](./render.yaml)

---

## 🐛 Problèmes Fréquents

### Services ne démarrent pas?
- Vérifiez les logs: Render Dashboard → Service → Logs
- Vérifiez les variables d'env sont définies

### CORS Errors?
Dans Gateway service, ajoutez dans Environment:
```
CORS_ALLOWED_ORIGINS=https://booktracker.nacer-dev.me,https://nacer-dev.me
```

### Services "sleeping"?
C'est normal sur Free Tier après 15min d'inactivité.  
**Solutions:**
- Upgrade vers Starter ($7/mois/service)
- Utiliser un service de ping (UptimeRobot)

### DNS ne se propage pas?
- Vérifiez que le Proxy est OFF
- Attendez jusqu'à 24h (généralement 5-10min)
- Testez avec: `nslookup booktracker.nacer-dev.me`

---

## 🎉 C'est Tout!

**Votre application moderne avec Java 21 + React 18 + Microservices est maintenant en ligne ! 🚀**

**URL:** https://booktracker.nacer-dev.me

---

*Temps total: 30-45 minutes*  
*Réalisé par Mohamed Nacer Hammami & Dhia Ben Saidane - Mars 2026*
