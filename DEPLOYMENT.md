# 🚀 Guide de Déploiement BookTracker
## Déploiement sur nacer-dev.me

> **Auteurs:** Mohamed Nacer Hammami & Dhia Ben Saidane  
> **Date:** Mars 2026  
> **Version:** 1.0.0

---

## 📋 Prérequis

### Sur votre serveur (nacer-dev.me)

1. **Système d'exploitation:** Linux (Ubuntu 22.04 LTS recommandé)
2. **Docker:** Version 24.0 ou supérieure
3. **Docker Compose:** Version 2.20 ou supérieure
4. **Nom de domaine:** nacer-dev.me configuré avec DNS pointant vers votre serveur
5. **Ports ouverts:**
   - Port 80 (HTTP)
   - Port 443 (HTTPS - recommandé avec Let's Encrypt)
   - Port 22 (SSH pour administration)

### Installation Docker (si nécessaire)

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt install docker-compose-plugin

# Vérifier l'installation
docker --version
docker compose version
```

---

## 🔐 Étape 1: Configuration Sécurisée

### 1.1 Générer les secrets

Sur votre serveur, créez des mots de passe sécurisés:

```bash
# Générer un JWT secret (256 bits minimum)
openssl rand -base64 64

# Générer des mots de passe de base de données
openssl rand -base64 32  # Pour AUTH_DB_PASSWORD
openssl rand -base64 32  # Pour BOOK_DB_PASSWORD
openssl rand -base64 32  # Pour TRACKER_DB_PASSWORD
openssl rand -base64 32  # Pour RECO_DB_PASSWORD
```

### 1.2 Configurer les variables d'environnement

Créez le fichier `.env.production` sur votre serveur:

```bash
# Sur votre serveur
nano .env.production
```

Remplissez avec vos secrets générés:

```bash
# JWT Configuration
JWT_SECRET=VOTRE_JWT_SECRET_GENERE_ICI

# Database Passwords
AUTH_DB_PASSWORD=votre_password_auth_genere
BOOK_DB_PASSWORD=votre_password_book_genere
TRACKER_DB_PASSWORD=votre_password_tracker_genere
RECO_DB_PASSWORD=votre_password_reco_genere

# Google Books API (Optionnel)
GOOGLE_BOOKS_API_KEY=

# Domain Configuration
DOMAIN=nacer-dev.me
FRONTEND_URL=https://nacer-dev.me
API_URL=https://nacer-dev.me/api
```

**⚠️ IMPORTANT:** Ne commitez JAMAIS ce fichier dans Git!

---

## 📦 Étape 2: Transférer le Code sur le Serveur

### Option A: Via Git (Recommandé)

```bash
# Sur votre serveur
cd /opt
sudo mkdir booktracker
sudo chown $USER:$USER booktracker
cd booktracker

# Cloner votre repository
git clone https://github.com/VOTRE_USERNAME/booktracker.git .

# Copier votre fichier .env.production
nano .env.production
# Coller votre configuration
```

### Option B: Via SCP (Depuis votre machine locale)

```powershell
# Depuis Windows (PowerShell)
# Compresser le projet
Compress-Archive -Path "C:\Users\mohamednacer.hammami\Downloads\JavaProjectA\*" -DestinationPath "booktracker.zip"

# Transférer sur le serveur
scp booktracker.zip user@nacer-dev.me:/opt/booktracker/

# Sur le serveur
ssh user@nacer-dev.me
cd /opt/booktracker
unzip booktracker.zip
```

---

## 🏗️ Étape 3: Build et Démarrage

### 3.1 Charger les variables d'environnement

```bash
# Sur votre serveur
cd /opt/booktracker
export $(cat .env.production | xargs)
```

### 3.2 Build les services

```bash
# Build tous les services (peut prendre 10-15 minutes)
docker compose -f docker-compose.prod.yml build

# Optionnel: Voir la progression
docker compose -f docker-compose.prod.yml build --progress=plain
```

### 3.3 Démarrer l'application

```bash
# Démarrer tous les services en arrière-plan
docker compose -f docker-compose.prod.yml up -d

# Voir les logs en temps réel
docker compose -f docker-compose.prod.yml logs -f

# Voir l'état des services
docker compose -f docker-compose.prod.yml ps
```

### 3.4 Attendre que tout soit prêt

```bash
# Surveiller les logs jusqu'à ce que tous les services démarrent
# Attendez les messages "Started ...Application" pour chaque service
# Cela peut prendre 2-3 minutes

# Vérifier la santé des services
docker compose -f docker-compose.prod.yml ps
```

---

## 🌐 Étape 4: Configuration DNS et HTTPS

### 4.1 Configuration DNS

Ajoutez ces enregistrements DNS pour `nacer-dev.me`:

```
Type    Name    Value                   TTL
A       @       VOTRE_IP_SERVEUR        300
A       www     VOTRE_IP_SERVEUR        300
```

Testez la propagation DNS:

```bash
# Depuis votre machine locale
nslookup nacer-dev.me
ping nacer-dev.me
```

### 4.2 Installer un Reverse Proxy avec SSL (Recommandé)

#### Installation de Caddy (Simple et automatique)

Créez un fichier `Caddyfile`:

```bash
nano Caddyfile
```

Contenu:

```caddy
nacer-dev.me {
    reverse_proxy localhost:80
    encode gzip
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
    
    # Logs
    log {
        output file /var/log/caddy/booktracker.log
        format json
    }
}

www.nacer-dev.me {
    redir https://nacer-dev.me{uri} permanent
}
```

Installer et démarrer Caddy:

```bash
# Installer Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Copier le Caddyfile
sudo cp Caddyfile /etc/caddy/Caddyfile

# Redémarrer Caddy (obtient automatiquement un certificat Let's Encrypt)
sudo systemctl restart caddy
sudo systemctl enable caddy

# Vérifier le statut
sudo systemctl status caddy
```

**Note:** Caddy obtiendra automatiquement un certificat SSL gratuit de Let's Encrypt!

---

## ✅ Étape 5: Vérification du Déploiement

### 5.1 Tests de connectivité

```bash
# Test depuis le serveur
curl http://localhost/
curl http://localhost/api/health

# Test depuis votre machine
curl https://nacer-dev.me
curl https://nacer-dev.me/api/health
```

### 5.2 Vérifier les services

```bash
# État de tous les conteneurs
docker compose -f docker-compose.prod.yml ps

# Logs d'un service spécifique
docker compose -f docker-compose.prod.yml logs frontend
docker compose -f docker-compose.prod.yml logs api-gateway
docker compose -f docker-compose.prod.yml logs auth-service
```

### 5.3 Créer un compte de test

Ouvrez votre navigateur et allez sur:
```
https://nacer-dev.me
```

1. Cliquez sur "S'inscrire"
2. Créez un compte de test
3. Connectez-vous
4. Testez l'ajout de livres

---

## 👥 Étape 6: Inviter Dhia à Tester

Partagez ces informations avec Dhia:

```
🎉 BookTracker est maintenant en ligne!

URL: https://nacer-dev.me
Statut: Production

Pour tester:
1. Ouvrir https://nacer-dev.me
2. Créer un compte avec ton email
3. Commencer à tracker tes livres!

Features disponibles:
✅ Inscription/Connexion
✅ Catalogue de livres avec Google Books
✅ Suivi de lecture (En cours, Terminé, À lire)
✅ Recommandations personnalisées
✅ Critiques et notes
✅ Statistiques de lecture

Enjoy! 📚
```

---

## 🔧 Maintenance et Administration

### Commandes utiles

```bash
# Arrêter l'application
docker compose -f docker-compose.prod.yml down

# Redémarrer l'application
docker compose -f docker-compose.prod.yml restart

# Voir les logs en temps réel
docker compose -f docker-compose.prod.yml logs -f

# Update le code et redéployer
git pull
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Nettoyer les anciennes images
docker system prune -a

# Sauvegarder les bases de données
docker exec booktracker-auth-db pg_dump -U auth_user auth_db > backup_auth.sql
docker exec booktracker-book-db pg_dump -U book_user book_db > backup_book.sql
docker exec booktracker-tracker-db pg_dump -U tracker_user tracker_db > backup_tracker.sql
docker exec booktracker-reco-db pg_dump -U reco_user reco_db > backup_reco.sql
```

### Monitoring

```bash
# Voir l'utilisation des ressources
docker stats

# Voir l'espace disque utilisé
docker system df
```

### Mises à jour

```bash
# 1. Sauvegarder les données
./backup.sh  # Créez ce script avec les commandes pg_dump ci-dessus

# 2. Mettre à jour le code
git pull

# 3. Rebuild et redémarrer
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# 4. Vérifier que tout fonctionne
docker compose -f docker-compose.prod.yml ps
```

---

## 🐛 Troubleshooting

### Problème: Un service ne démarre pas

```bash
# Voir les logs du service
docker compose -f docker-compose.prod.yml logs SERVICE_NAME

# Redémarrer un service spécifique
docker compose -f docker-compose.prod.yml restart SERVICE_NAME
```

### Problème: Base de données inaccessible

```bash
# Vérifier que la DB est healthy
docker compose -f docker-compose.prod.yml ps

# Se connecter à la DB
docker exec -it booktracker-auth-db psql -U auth_user -d auth_db
```

### Problème: Frontend affiche une erreur 502

```bash
# Vérifier que l'API Gateway fonctionne
docker compose -f docker-compose.prod.yml logs api-gateway

# Vérifier la configuration Nginx du frontend
docker exec booktracker-frontend cat /etc/nginx/conf.d/default.conf
```

### Problème: Certificat SSL ne s'obtient pas

```bash
# Vérifier les logs Caddy
sudo journalctl -u caddy -f

# Vérifier que les ports 80 et 443 sont accessibles
sudo netstat -tlnp | grep -E '80|443'

# Vérifier le DNS
nslookup nacer-dev.me
```

---

## 📊 Monitoring Avancé (Optionnel)

### Ajouter Prometheus + Grafana

Créez un `docker-compose.monitoring.yml`:

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - booktracker-network

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - booktracker-network

volumes:
  prometheus-data:
  grafana-data:

networks:
  booktracker-network:
    external: true
```

---

## 🎯 Checklist Finale

Avant de dire que le déploiement est complet:

- [ ] Tous les services Docker sont "healthy"
- [ ] Le site est accessible sur https://nacer-dev.me
- [ ] Le certificat SSL est valide (cadenas vert)
- [ ] L'inscription fonctionne
- [ ] La connexion fonctionne
- [ ] Le catalogue de livres charge
- [ ] On peut ajouter un livre à "En cours"
- [ ] Le dashboard affiche les statistiques
- [ ] Les recommandations apparaissent
- [ ] Les critiques peuvent être ajoutées
- [ ] Le profil affiche les bonnes informations
- [ ] Dhia a été invité et peut tester
- [ ] Les sauvegardes automatiques sont configurées

---

## 📞 Support

Pour toute question ou problème:

- **Email:** mohamed.nacer.hammami@email.com
- **Projet:** BookTracker PFA 2026
- **Repository:** [Votre lien GitHub]

---

## 🎉 Félicitations!

Votre application BookTracker est maintenant déployée en production sur nacer-dev.me!

**Développé avec ❤️ par Mohamed Nacer Hammami & Dhia Ben Saidane**
