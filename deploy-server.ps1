# Script PowerShell pour déployer depuis Windows vers votre serveur
# Usage: .\deploy-server.ps1

param(
    [string]$ServerUser = "your-username",  # MODIFIER: votre username SSH
    [string]$ServerHost = "nacer-dev.me",
    [string]$DeployPath = "/var/www/booktracker"
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "BookTracker - Deployment to nacer-dev.me Server" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[INFO] Configuration:" -ForegroundColor Yellow
Write-Host "  Server: $ServerHost"
Write-Host "  User: $ServerUser"
Write-Host "  Path: $DeployPath"
Write-Host ""

# Vérifier SSH
Write-Host "[STEP 1/3] Testing SSH connection..." -ForegroundColor Yellow
$sshTest = ssh -o ConnectTimeout=5 ${ServerUser}@${ServerHost} "echo 'SSH OK'"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Cannot connect to server via SSH!" -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  1. Server is running"
    Write-Host "  2. Username is correct ($ServerUser)"
    Write-Host "  3. SSH key is configured"
    exit 1
}
Write-Host "[OK] SSH connection successful!" -ForegroundColor Green
Write-Host ""

# Pousser les dernières modifications
Write-Host "[STEP 2/3] Pushing latest code to GitHub..." -ForegroundColor Yellow
try {
    git add .
    git commit -m "Deploy to production server - $(Get-Date -Format 'yyyy-MM-dd HH:mm')" -ErrorAction SilentlyContinue
    git push origin main
    Write-Host "[OK] Code pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "[INFO] No new changes to commit" -ForegroundColor Yellow
}
Write-Host ""

# Déployer sur le serveur
Write-Host "[STEP 3/3] Deploying on server..." -ForegroundColor Yellow
Write-Host "This will take 10-15 minutes on first deployment..." -ForegroundColor Yellow
Write-Host ""

# Créer un script temporaire pour l'exécution distante
$deployScript = @'
#!/bin/bash
set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}=====================================${NC}"
echo -e "${YELLOW}BookTracker Server Deployment${NC}"
echo -e "${YELLOW}=====================================${NC}"
echo ""

# 1. Créer et entrer dans le répertoire
echo -e "${YELLOW}[1/9] Setting up directory...${NC}"
sudo mkdir -p /var/www/booktracker
sudo chown -R $USER:$USER /var/www/booktracker
cd /var/www/booktracker

# 2. Clone ou update
echo -e "${YELLOW}[2/9] Fetching code from GitHub...${NC}"
if [ -d ".git" ]; then
    echo "Repository exists, pulling..."
    git reset --hard
    git pull origin main
else
    echo "Cloning repository..."
    git clone https://github.com/nacer-hammami2025/booktracker.git .
fi

# 3. Build frontend
echo -e "${YELLOW}[3/9] Building frontend...${NC}"
cd frontend
npm install --legacy-peer-deps
npm run build
cd ..

# 4. Créer .env si nécessaire
echo -e "${YELLOW}[4/9] Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    cat > .env << 'ENVEOF'
AUTH_DB_PASSWORD=MXduRZLe8kHqGpyv9tW2bCfDnJsQ3rYz
BOOK_DB_PASSWORD=7vNsK2wRbQxPyFc4LmZgT9jHdE6WnA8V
TRACKER_DB_PASSWORD=Wq5rBn3PkYm8xLv2TzHc9JsGf6DwN4aE
RECO_DB_PASSWORD=KZnQ7pLv3WmY5bRx8TcHf2JsG9DwN6Ea
JWT_SECRET=4y7b!E%H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeThWmYq3
CORS_ALLOWED_ORIGINS=https://booktracker.nacer-dev.me,https://nacer-dev.me
REDIS_PASSWORD=X9mK2wRbQxPyFc4LvZgT6jHdE8WnA3Vs
ENVEOF
    echo "Environment file created with secure passwords"
else
    echo "Environment file already exists"
fi

# 5. Vérifier Docker
echo -e "${YELLOW}[5/9] Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker not installed!${NC}"
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
fi
echo "Docker: $(docker --version)"

# 6. Vérifier Docker Compose
echo -e "${YELLOW}[6/9] Checking Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo apt install docker-compose-plugin -y
fi
echo "Docker Compose: $(docker-compose --version)"

# 7. Arrêter les anciens conteneurs
echo -e "${YELLOW}[7/9] Stopping old containers...${NC}"
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true

# 8. Démarrer les nouveaux services
echo -e "${YELLOW}[8/9] Starting services...${NC}"
docker-compose -f docker-compose.prod.yml up -d --build

# 9. Attendre et vérifier
echo -e "${YELLOW}[9/9] Waiting for services (30s)...${NC}"
sleep 30

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Deployment Status${NC}"
echo -e "${GREEN}=====================================${NC}"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo -e "${YELLOW}Health Checks:${NC}"
curl -s http://localhost:8080/actuator/health > /dev/null && echo -e "  Gateway: ${GREEN}UP${NC}" || echo -e "  Gateway: ${RED}DOWN${NC}"
curl -s http://localhost:8081/actuator/health > /dev/null && echo -e "  Auth: ${GREEN}UP${NC}" || echo -e "  Auth: ${RED}DOWN${NC}"
curl -s http://localhost:8082/actuator/health > /dev/null && echo -e "  Book: ${GREEN}UP${NC}" || echo -e "  Book: ${RED}DOWN${NC}"
curl -s http://localhost:8083/actuator/health > /dev/null && echo -e "  Tracker: ${GREEN}UP${NC}" || echo -e "  Tracker: ${RED}DOWN${NC}"
curl -s http://localhost:8084/actuator/health > /dev/null && echo -e "  Reco: ${GREEN}UP${NC}" || echo -e "  Reco: ${RED}DOWN${NC}"

echo ""
echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${GREEN}Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}API: http://localhost:8080${NC}"
echo ""
'@

# Sauvegarder le script temporaire
$deployScript | Out-File -FilePath ".\temp-deploy.sh" -Encoding UTF8 -NoNewline

# Copier le script sur le serveur et l'exécuter
scp .\temp-deploy.sh ${ServerUser}@${ServerHost}:/tmp/deploy.sh
ssh ${ServerUser}@${ServerHost} "chmod +x /tmp/deploy.sh && /tmp/deploy.sh"

# Nettoyer
Remove-Item .\temp-deploy.sh -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Deployment Completed!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Configure Caddy/Nginx on your server" -ForegroundColor White
Write-Host "  2. Add DNS record: booktracker.nacer-dev.me" -ForegroundColor White
Write-Host "  3. Test: https://booktracker.nacer-dev.me" -ForegroundColor White
Write-Host ""
Write-Host "See DEPLOY_SERVER.md for reverse proxy configuration" -ForegroundColor Cyan
Write-Host ""
