# BookTracker - Guide Rapide de Déploiement

## 🚀 Déploiement en 5 Minutes

### 1. Préparer le fichier de configuration
```bash
# Copier le template
cp .env.production.example .env.production

# Générer des secrets sécurisés
openssl rand -base64 64  # JWT_SECRET

# Éditer et remplir les valeurs
nano .env.production
```

### 2. Déployer avec le script
```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh production

# Windows
.\deploy.ps1 -Environment production
```

### 3. Configurer HTTPS (Linux)
```bash
# Installer Caddy
sudo apt install caddy

# Copier la configuration
sudo cp Caddyfile /etc/caddy/Caddyfile

# Redémarrer Caddy (certificat SSL automatique)
sudo systemctl restart caddy
```

### 4. Vérifier
```bash
# Voir les services
docker compose -f docker-compose.prod.yml ps

# Tester
curl https://nacer-dev.me
```

## 📚 Documentation Complète

Pour un guide détaillé, consultez [DEPLOYMENT.md](DEPLOYMENT.md)

## ⚡ Commandes Rapides

```bash
# Voir les logs
docker compose -f docker-compose.prod.yml logs -f

# Redémarrer
docker compose -f docker-compose.prod.yml restart

# Arrêter
docker compose -f docker-compose.prod.yml down

# Sauvegarder
./backup.sh  # Linux
.\backup.ps1  # Windows
```

## 🆘 Support

Si vous rencontrez des problèmes, consultez la section Troubleshooting dans [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Développé par Mohamed Nacer Hammami & Dhia Ben Saidane**
