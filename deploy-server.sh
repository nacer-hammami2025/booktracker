#!/bin/bash
# Script de déploiement sur votre serveur
# Usage: ./deploy-server.sh

set -e  # Exit on error

echo "================================================"
echo "BookTracker - Deployment to nacer-dev.me Server"
echo "================================================"
echo ""

# Variables
SERVER_USER="your-username"  # MODIFIER: votre username SSH
SERVER_HOST="nacer-dev.me"   # Votre serveur
DEPLOY_PATH="/var/www/booktracker"
GITHUB_REPO="https://github.com/nacer-hammami2025/booktracker.git"

echo "1. Connexion au serveur..."
echo "   Server: $SERVER_HOST"
echo "   User: $SERVER_USER"
echo ""

# Commandes à exécuter sur le serveur
ssh ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}[INFO] Starting deployment...${NC}"

# 1. Créer le répertoire si nécessaire
echo -e "${YELLOW}[STEP 1/8] Creating directory...${NC}"
sudo mkdir -p /var/www/booktracker
sudo chown -R $USER:$USER /var/www/booktracker
cd /var/www/booktracker

# 2. Cloner ou mettre à jour le repo
echo -e "${YELLOW}[STEP 2/8] Fetching code from GitHub...${NC}"
if [ -d ".git" ]; then
    echo "Repository exists, pulling latest changes..."
    git pull origin main
else
    echo "Cloning repository..."
    git clone https://github.com/nacer-hammami2025/booktracker.git .
fi

# 3. Vérifier Docker
echo -e "${YELLOW}[STEP 3/8] Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[ERROR] Docker not installed!${NC}"
    echo "Install Docker: curl -fsSL https://get.docker.com | sh"
    exit 1
fi
echo "Docker version: $(docker --version)"

# 4. Vérifier Docker Compose
echo -e "${YELLOW}[STEP 4/8] Checking Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}[ERROR] Docker Compose not installed!${NC}"
    echo "Install: sudo apt install docker-compose-plugin"
    exit 1
fi
echo "Docker Compose version: $(docker-compose --version)"

# 5. Créer fichier .env pour production
echo -e "${YELLOW}[STEP 5/8] Creating environment file...${NC}"
cat > .env << 'EOF'
# Production Environment Variables
AUTH_DB_PASSWORD=$(openssl rand -base64 32)
BOOK_DB_PASSWORD=$(openssl rand -base64 32)
TRACKER_DB_PASSWORD=$(openssl rand -base64 32)
RECO_DB_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 64)
EOF

echo "Environment variables created."

# 6. Build et démarrer les services
echo -e "${YELLOW}[STEP 6/8] Building and starting services...${NC}"
echo "This may take 10-15 minutes on first run..."
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
docker-compose -f docker-compose.prod.yml up -d --build

# 7. Attendre que les services démarrent
echo -e "${YELLOW}[STEP 7/8] Waiting for services to start...${NC}"
sleep 30

# 8. Vérifier les services
echo -e "${YELLOW}[STEP 8/8] Checking services status...${NC}"
docker-compose -f docker-compose.prod.yml ps

# Vérifier health des services
echo ""
echo "Health Check:"
curl -s http://localhost:8080/actuator/health && echo -e "${GREEN}[OK] Gateway UP${NC}" || echo -e "${RED}[ERROR] Gateway DOWN${NC}"
curl -s http://localhost:8081/actuator/health && echo -e "${GREEN}[OK] Auth UP${NC}" || echo -e "${RED}[ERROR] Auth DOWN${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Services running:"
echo "  - Frontend: http://localhost:3000"
echo "  - API Gateway: http://localhost:8080"
echo "  - Auth Service: http://localhost:8081"
echo "  - Book Service: http://localhost:8082"
echo "  - Tracker Service: http://localhost:8083"
echo "  - Reco Service: http://localhost:8084"
echo ""
echo "Next steps:"
echo "  1. Configure Caddy/Nginx reverse proxy"
echo "  2. Point booktracker.nacer-dev.me to this server"
echo ""

ENDSSH

echo ""
echo "================================================"
echo "Deployment script completed!"
echo "================================================"
