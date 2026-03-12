# 🚀 Déploiement Rapide sur Votre Serveur

## Option A : Mode Automatique (5 minutes)

### 1️⃣ Éditer le script

Ouvrez `deploy-server.ps1` et modifiez la ligne 5 :

```powershell
[string]$ServerUser = "your-username",  # Remplacer par votre username SSH
```

**Exemples de username :** `root`, `ubuntu`, `admin`, `nacer`, etc.

### 2️⃣ Lancer le déploiement

```powershell
.\deploy-server.ps1
```

**Le script fait tout automatiquement :**
- ✅ Pousse le code sur GitHub
- ✅ Se connecte à votre serveur
- ✅ Clone le projet
- ✅ Build le frontend
- ✅ Démarre Docker Compose
- ✅ Vérifie que tout marche

---

## Option B : Mode Manuel (10-15 minutes)

### 1️⃣ Connectez-vous à votre serveur

```powershell
ssh votre-username@nacer-dev.me
```

### 2️⃣ Exécutez ces commandes sur le serveur

```bash
# Cloner le projet
sudo mkdir -p /var/www/booktracker
sudo chown -R $USER:$USER /var/www/booktracker
cd /var/www/booktracker
git clone https://github.com/nacer-hammami2025/booktracker.git .

# Build frontend
cd frontend
npm install --legacy-peer-deps
npm run build
cd ..

# Démarrer les services
docker-compose -f docker-compose.prod.yml up -d --build

# Attendre 30 secondes
sleep 30

# Vérifier
docker-compose ps
curl http://localhost:8080/actuator/health
```

### 3️⃣ Configurer Caddy (reverse proxy)

```bash
# Installer Caddy
sudo apt install caddy

# Éditer la config
sudo nano /etc/caddy/Caddyfile
```

**Ajouter :**

```caddyfile
booktracker.nacer-dev.me {
    root * /var/www/booktracker/frontend/dist
    file_server
    try_files {path} /index.html
    reverse_proxy /api/* localhost:8080
    encode gzip
}
```

**Redémarrer Caddy :**

```bash
sudo systemctl reload caddy
```

---

## 3️⃣ Configurer le DNS

**Chez votre provider DNS :**

```
Type: A
Name: booktracker
Value: [IP de votre serveur]
TTL: 3600
```

**Ou CNAME :**

```
Type: CNAME  
Name: booktracker
Value: nacer-dev.me
TTL: 3600
```

---

## 4️⃣ Tester

Ouvrir dans le navigateur :

```
https://booktracker.nacer-dev.me
```

**✅ C'est en ligne !**

---

## 🆘 Problème ?

### Les services ne démarrent pas

```bash
cd /var/www/booktracker
docker-compose logs
```

### SSH ne fonctionne pas

Vérifiez que :
- Votre serveur est accessible
- Votre clé SSH est configurée
- Le username est correct

### Port déjà utilisé

```bash
sudo lsof -i :8080
sudo kill -9 [PID]
```

---

## 📚 Documentation Complète

Pour plus de détails, voir **[DEPLOY_SERVER.md](DEPLOY_SERVER.md)**

---

**Temps total : 10-15 minutes** ⏱️  
**Coût : 0€ (utilise votre serveur existant)** 💰
