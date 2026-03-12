# 📚 Index des Guides de Déploiement

Choisissez le guide qui correspond à votre besoin :

---

## ⚡ Je veux déployer RAPIDEMENT (30 min)

**👉 [DEPLOY_EXPRESS.md](./DEPLOY_EXPRESS.md)**
- 3 commandes simples
- Interface graphique Render
- Déploiement automatique via Blueprint
- **Recommandé pour gagner du temps !**

---

## 📋 Je veux une checklist détaillée

**👉 [CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md)**
- Checklist étape par étape
- Cases à cocher pour suivre progression
- Tests de vérification
- Troubleshooting
- **Parfait pour premier déploiement !**

---

## 📖 Je veux comprendre en profondeur

**👉 [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)**
- Guide complet et détaillé
- Explications de chaque étape
- Configuration avancée
- Variables d'environnement
- Optimisations
- **Pour maîtriser le déploiement !**

---

## 🎯 Je veux un résumé visuel

**👉 [DEPLOY_RENDER_QUICK.md](./DEPLOY_RENDER_QUICK.md)**
- Résumé en une page
- Architecture finale
- Comparaison des solutions
- Tableau des coûts
- **Vue d'ensemble rapide !**

---

## 🛠️ Je veux juste tester localement

**Avant de déployer, testez en local :**

```powershell
# Option automatique
.\start.ps1

# Option manuelle
docker-compose up --build

# Frontend seul
cd frontend
npm install
npm run dev
```

**URLs locales :**
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

---

## 🔧 Fichiers de Configuration

### Frontend
- [frontend/.env.development](./frontend/.env.development) - Variables dev
- [frontend/.env.production](./frontend/.env.production) - Variables prod
- [frontend/.env.example](./frontend/.env.example) - Template

### Backend
- [render.yaml](./render.yaml) - Blueprint Render (automatique)
- [docker-compose.yml](./docker-compose.yml) - Développement local
- [docker-compose.prod.yml](./docker-compose.prod.yml) - Production

### Scripts
- [quick-deploy.ps1](./quick-deploy.ps1) - Vérification avant déploiement
- [start.ps1](./start.ps1) - Démarrer en local
- [stop.ps1](./stop.ps1) - Arrêter les services

---

## 🌐 URLs après Déploiement

**Production :**
- 🎨 Frontend: `https://booktracker.nacer-dev.me`
- 🚪 API Gateway: `https://booktracker-gateway.onrender.com/api`
- 📋 Swagger: `https://booktracker-gateway.onrender.com/swagger-ui.html`
- 📊 Health: `https://booktracker-gateway.onrender.com/actuator/health`

---

## 🆘 Besoin d'Aide ?

### Problèmes Communs
1. **Build échoue** → Vérifiez Java 21 installé : `java -version`
2. **CORS errors** → Vérifiez `CORS_ALLOWED_ORIGINS` dans Gateway
3. **Services sleep** → Normal sur Free Tier (15 min inactivité)
4. **DNS ne marche pas** → Vérifiez Proxy OFF, attendez 5-10 min

### Ressources
- [README.md](./README.md) - Documentation principale du projet
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guide déploiement VPS (avancé)
- [Render Docs](https://render.com/docs)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)

---

## 📊 Comparaison des Guides

| Guide | Temps | Détail | Difficulté | Idéal pour |
|-------|-------|--------|------------|------------|
| **EXPRESS** | 30 min | ⭐⭐ | ⭐ Facile | Déployer vite |
| **CHECKLIST** | 45 min | ⭐⭐⭐⭐ | ⭐⭐ Moyen | Premier déploiement |
| **RENDER** | 1h | ⭐⭐⭐⭐⭐ | ⭐⭐ Moyen | Comprendre en profondeur |
| **QUICK** | 5 min | ⭐ | ⭐ Facile | Vue d'ensemble |

---

## 🚀 Démarrage Rapide en 3 Étapes

```powershell
# 1. Vérifier
.\quick-deploy.ps1

# 2. Push GitHub
git add .
git commit -m "Ready for deployment 🚀"
git push origin main

# 3. Déployer sur Render
# → Ouvrir https://render.com
# → New + → Blueprint
# → Sélectionner repo → Apply
```

**🎉 C'est tout ! Votre app sera en ligne en 30 minutes !**

---

## ✨ Recommandation

**Pour votre première fois :**
1. Lisez [DEPLOY_EXPRESS.md](./DEPLOY_EXPRESS.md) (5 min)
2. Suivez [CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md) (45 min)
3. Consultez [RENDER_DEPLOY.md](./RENDER_DEPLOY.md) si besoin d'aide

**Prêt à déployer ? Commencez maintenant ! 🚀**

---

*Index créé par Mohamed Nacer Hammami & Dhia Ben Saidane - Mars 2026*
