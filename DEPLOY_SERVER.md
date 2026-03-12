# Guide de Déploiement sur Votre Serveur nacer-dev.me

## 🎯 Objectif
Déployer BookTracker sur votre serveur existant : `booktracker.nacer-dev.me`

---

## 📋 Prérequis sur le Serveur

Votre serveur doit avoir :
- ✅ **Linux** (Ubuntu 20.04+ recommandé)
- ✅ **Docker** installé
- ✅ **Docker Compose** installé
- ✅ **Caddy ou Nginx** (reverse proxy)
- ✅ **Accès SSH** avec votre utilisateur

---

## 🚀 Méthode 1 : Déploiement Automatique (Recommandé)

### Étape 1 : Configurer le script

Éditez `deploy-server.sh` et modifiez :

```bash
SERVER_USER="your-username"  # Votre username SSH (ex: root, ubuntu, nacer)
SERVER_HOST="nacer-dev.me"   # Votre serveur (déjà correct)
```

### Étape 2 : Rendre exécutable et lancer

```bash
# Sur votre machine Windows (Git Bash ou WSL)
chmod +x deploy-server.sh
./deploy-server.sh
```

**Le script va :**
1. Se connecter à votre serveur via SSH
2. Cloner le code depuis GitHub
3. Démarrer Docker Compose
4. Vérifier que tout fonctionne

---

## 🛠️ Méthode 2 : Déploiement Manuel (Étape par étape)

### Étape 1 : Connexion au serveur

```powershell
# Depuis Windows
ssh votre-username@nacer-dev.me
```

### Étape 2 : Installer Docker (si pas déjà installé)

```bash
# Sur le serveur
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
sudo apt install docker-compose-plugin -y

# Vérifier
docker --version
docker-compose --version
```

### Étape 3 : Cloner le projet

```bash
# Créer le dossier
sudo mkdir -p /var/www/booktracker
sudo chown -R $USER:$USER /var/www/booktracker
cd /var/www/booktracker

# Cloner
git clone https://github.com/nacer-hammami2025/booktracker.git .
```

### Étape 4 : Créer les variables d'environnement

```bash
# Créer .env
cat > .env << 'EOF'
AUTH_DB_PASSWORD=$(openssl rand -base64 32)
BOOK_DB_PASSWORD=$(openssl rand -base64 32)
TRACKER_DB_PASSWORD=$(openssl rand -base64 32)
RECO_DB_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 64)
EOF

# Générer les vrais mots de passe
source .env
```

### Étape 5 : Démarrer les services

```bash
# Build et démarrer
docker-compose -f docker-compose.prod.yml up -d --build

# Voir les logs
docker-compose -f docker-compose.prod.yml logs -f

# Vérifier le status
docker-compose -f docker-compose.prod.yml ps
```

### Étape 6 : Vérifier que ça fonctionne

```bash
# Health checks
curl http://localhost:8080/actuator/health  # Gateway
curl http://localhost:8081/actuator/health  # Auth
curl http://localhost:8082/actuator/health  # Book
curl http://localhost:8083/actuator/health  # Tracker
curl http://localhost:8084/actuator/health  # Reco

# Tous doivent retourner: {"status":"UP"}
```

---

## 🌐 Étape 7 : Configurer le Reverse Proxy

### Option A : Caddy (Plus Simple - Recommandé)

```bash
# Installer Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Éditer la configuration
sudo nano /etc/caddy/Caddyfile
```

**Ajoutez cette configuration :**

```caddyfile
booktracker.nacer-dev.me {
    # Frontend
    root * /var/www/booktracker/frontend/dist
    file_server
    try_files {path} /index.html
    
    # API reverse proxy
    reverse_proxy /api/* localhost:8080
    
    encode gzip
}
```

**Redémarrer Caddy :**

```bash
sudo systemctl reload caddy
sudo systemctl status caddy
```

### Option B : Nginx (Alternative)

```bash
# Créer la configuration
sudo nano /etc/nginx/sites-available/booktracker
```

**Contenu :**

```nginx
server {
    listen 80;
    server_name booktracker.nacer-dev.me;
    
    # Frontend
    location / {
        root /var/www/booktracker/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # API
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Activer et redémarrer :**

```bash
sudo ln -s /etc/nginx/sites-available/booktracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL avec Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d booktracker.nacer-dev.me
```

---

## 🌍 Étape 8 : Configurer le DNS

**Chez votre provider DNS (Cloudflare, OVH, etc.) :**

```
Type: A
Name: booktracker
Value: [IP de votre serveur nacer-dev.me]
TTL: 3600
```

**Ou si vous utilisez CNAME :**

```
Type: CNAME
Name: booktracker
Value: nacer-dev.me
TTL: 3600
```

---

## ✅ Étape 9 : Tester

```bash
# Depuis votre machine
curl https://booktracker.nacer-dev.me
curl https://booktracker.nacer-dev.me/api/actuator/health

# Ouvrir dans le navigateur
start https://booktracker.nacer-dev.me
```

---

## 📊 Commandes Utiles

### Voir les logs

```bash
cd /var/www/booktracker

# Tous les services
docker-compose -f docker-compose.prod.yml logs -f

# Un service spécifique
docker-compose -f docker-compose.prod.yml logs -f api-gateway
docker-compose -f docker-compose.prod.yml logs -f auth-service
```

### Redémarrer les services

```bash
# Redémarrer tout
docker-compose -f docker-compose.prod.yml restart

# Un service spécifique
docker-compose -f docker-compose.prod.yml restart api-gateway
```

### Mettre à jour l'application

```bash
cd /var/www/booktracker
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

### Arrêter les services

```bash
docker-compose -f docker-compose.prod.yml down
```

### Voir l'utilisation des ressources

```bash
docker stats
```

---

## 🐛 Troubleshooting

### Services ne démarrent pas

```bash
# Voir les logs
docker-compose -f docker-compose.prod.yml logs

# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h
```

### Port déjà utilisé

```bash
# Voir ce qui utilise le port 8080
sudo lsof -i :8080

# Arrêter le processus si nécessaire
sudo kill -9 PID
```

### Base de données ne se connecte pas

```bash
# Vérifier que PostgreSQL est démarré
docker-compose -f docker-compose.prod.yml ps

# Logs de la base
docker-compose -f docker-compose.prod.yml logs book-db
```

---

## 🎉 Résultat Final

Après toutes ces étapes, votre application sera accessible sur :

**🌐 Frontend :** https://booktracker.nacer-dev.me  
**🔌 API :** https://booktracker.nacer-dev.me/api  
**📊 Health :** https://booktracker.nacer-dev.me/api/actuator/health

**Tout hébergé sur votre serveur, totalement gratuit ! 🚀**

---

## 📚 Notes

- Les données sont stockées dans des volumes Docker persistants
- Les backups sont dans `/var/www/booktracker/backups/`
- Les logs Caddy sont dans `/var/log/caddy/`
- HTTPS est géré automatiquement par Caddy

---

*Guide créé pour le déploiement de BookTracker - Mars 2026*
