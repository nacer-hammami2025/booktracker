# ✅ Checklist de Déploiement sur Serveur

## Avant de Commencer

- [ ] **SSH fonctionne** : `ssh votre-username@nacer-dev.me`
- [ ] **Docker installé** sur le serveur
- [ ] **Docker Compose installé**
- [ ] **Caddy ou Nginx** disponible
- [ ] **Accès au DNS** (pour ajouter booktracker.nacer-dev.me)

---

## Étape 1 : Préparation

- [ ] Éditer `deploy-server.ps1` avec votre username SSH
- [ ] Vérifier que le code est à jour sur GitHub
- [ ] Tester la connexion SSH une fois manuellement

---

## Étape 2 : Déploiement

### Option A - Script Automatique
- [ ] Lancer `.\deploy-server.ps1`
- [ ] Attendre 10-15 minutes (première fois)
- [ ] Vérifier que tous les services sont UP

### Option B - Manuel
- [ ] Se connecter au serveur via SSH
- [ ] Cloner le projet dans `/var/www/booktracker`
- [ ] Build le frontend : `npm install && npm run build`
- [ ] Lancer Docker Compose : `docker-compose -f docker-compose.prod.yml up -d --build`
- [ ] Attendre 30 secondes
- [ ] Vérifier les services : `docker-compose ps`

---

## Étape 3 : Reverse Proxy

### Caddy (Recommandé)
- [ ] Installer Caddy : `sudo apt install caddy`
- [ ] Éditer `/etc/caddy/Caddyfile`
- [ ] Ajouter la configuration pour `booktracker.nacer-dev.me`
- [ ] Recharger Caddy : `sudo systemctl reload caddy`
- [ ] Vérifier : `sudo systemctl status caddy`

### Nginx (Alternative)
- [ ] Créer `/etc/nginx/sites-available/booktracker`
- [ ] Ajouter la configuration
- [ ] Lien symbolique : `sudo ln -s /etc/nginx/sites-available/booktracker /etc/nginx/sites-enabled/`
- [ ] Tester : `sudo nginx -t`
- [ ] Recharger : `sudo systemctl reload nginx`
- [ ] SSL : `sudo certbot --nginx -d booktracker.nacer-dev.me`

---

## Étape 4 : DNS

- [ ] Aller chez votre provider DNS
- [ ] Ajouter un enregistrement :
  - **Type :** A ou CNAME
  - **Nom :** booktracker
  - **Valeur :** IP du serveur ou nacer-dev.me
  - **TTL :** 3600
- [ ] Attendre 5-10 minutes pour la propagation
- [ ] Vérifier : `nslookup booktracker.nacer-dev.me`

---

## Étape 5 : Vérification Finale

- [ ] Health check : `curl https://booktracker.nacer-dev.me/api/actuator/health`
- [ ] Ouvrir dans le navigateur : `https://booktracker.nacer-dev.me`
- [ ] Tester l'inscription d'un utilisateur
- [ ] Tester la connexion
- [ ] Tester l'ajout d'un livre
- [ ] Vérifier les graphiques du Dashboard

---

## Étape 6 : Surveillance

- [ ] Voir les logs : `cd /var/www/booktracker && docker-compose logs -f`
- [ ] Check CPU/RAM : `docker stats`
- [ ] Vérifier l'espace disque : `df -h`

---

## Commandes Utiles pour Plus Tard

### Mettre à jour l'application
```bash
cd /var/www/booktracker
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

### Redémarrer un service
```bash
docker-compose restart api-gateway
```

### Voir les logs d'un service
```bash
docker-compose logs -f auth-service
```

### Backup de la base
```bash
docker exec booktracker-book-db pg_dump -U book_user book_db > backup_$(date +%Y%m%d).sql
```

---

## 🎉 Résultat Attendu

✅ **Frontend :** https://booktracker.nacer-dev.me  
✅ **API :** https://booktracker.nacer-dev.me/api  
✅ **Health :** https://booktracker.nacer-dev.me/api/actuator/health  
✅ **Status :** {"status":"UP"}  

---

**Durée totale estimée : 15-20 minutes**  
**Coût : 0€ (serveur existant)**  
**Difficulté : 2/5** ⭐⭐
