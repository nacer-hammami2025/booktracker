# Script de demarrage automatique pour BookTracker
# Usage: .\start.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   BookTracker - Demarrage Automatique" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour afficher les etapes
function Write-Step {
    param([string]$Message)
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')]" -ForegroundColor Yellow -NoNewline
    Write-Host " $Message" -ForegroundColor White
}

function Write-Success {
    param([string]$Message)
    Write-Host "  [OK] " -ForegroundColor Green -NoNewline
    Write-Host "$Message" -ForegroundColor White
}

function Write-Error-Message {
    param([string]$Message)
    Write-Host "  [ERREUR] " -ForegroundColor Red -NoNewline
    Write-Host "$Message" -ForegroundColor White
}

# Configuration: Utiliser Java 21 pour ce projet
$env:JAVA_HOME = "C:\Users\mohamednacer.hammami\.jdk\jdk-21.0.8"
$env:PATH = "C:\Users\mohamednacer.hammami\.jdk\jdk-21.0.8\bin;$env:PATH"

# Etape 1: Verifier les prerequis
Write-Step "Etape 1/5: Verification des prerequis..."

# Verifier Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version" | Select-Object -First 1
    if ($javaVersion -match "21") {
        Write-Success "Java 21 detecte"
    } else {
        Write-Success "Java 21 configure (trouve: $javaVersion)"
    }
} catch {
    Write-Error-Message "Java non trouve. Veuillez installer Java 21."
    exit 1
}

# Verifier Docker
try {
    $dockerVersion = docker --version
    Write-Success "Docker detecte: $dockerVersion"
} catch {
    Write-Error-Message "Docker non trouve. Veuillez installer Docker Desktop."
    exit 1
}

# Verifier que Docker est demarre
try {
    docker ps | Out-Null
    Write-Success "Docker Desktop est demarre"
} catch {
    Write-Error-Message "Docker Desktop n'est pas demarre. Veuillez le demarrer."
    exit 1
}

# Verifier Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js detecte: $nodeVersion"
} catch {
    Write-Error-Message "Node.js non trouve. Veuillez installer Node.js."
    exit 1
}

Write-Host ""

# Etape 2: Arreter les services existants
Write-Step "Etape 2/5: Nettoyage des services existants..."
docker-compose down -v 2>&1 | Out-Null
Write-Success "Services precedents arretes"
Write-Host ""

# Etape 3: Demarrer les services backend
Write-Step "Etape 3/5: Demarrage des services backend (Docker)..."
Write-Host "  Cette etape peut prendre 1-2 minutes..." -ForegroundColor Gray

docker-compose up -d

# Attendre que les services soient prets
Write-Host "  Attente du demarrage des services..." -ForegroundColor Gray
Start-Sleep -Seconds 5

$maxAttempts = 30
$attempt = 0
$allHealthy = $false

while (-not $allHealthy -and $attempt -lt $maxAttempts) {
    $attempt++
    $containers = docker ps --format "{{.Names}}\t{{.Status}}" | Where-Object { $_ -match "booktracker" }
    $healthyCount = ($containers | Where-Object { $_ -match "healthy|Up" }).Count
    $totalCount = ($containers).Count
    
    Write-Host "`r  Conteneurs sains: $healthyCount/$totalCount" -NoNewline -ForegroundColor Gray
    
    if ($healthyCount -eq $totalCount -and $totalCount -gt 0) {
        $allHealthy = $true
        Write-Host ""
    } else {
        Start-Sleep -Seconds 2
    }
}

if ($allHealthy) {
    Write-Success "Tous les services backend sont demarres"
    Write-Host ""
    
    # Afficher les services
    Write-Host "  Services actifs:" -ForegroundColor Cyan
    Write-Host "    - API Gateway:      http://localhost:8080" -ForegroundColor White
    Write-Host "    - Auth Service:     http://localhost:8081" -ForegroundColor White
    Write-Host "    - Book Service:     http://localhost:8082" -ForegroundColor White
    Write-Host "    - Tracker Service:  http://localhost:8083" -ForegroundColor White
    Write-Host "    - Reco Service:     http://localhost:8084" -ForegroundColor White
    Write-Host ""
} else {
    Write-Error-Message "Timeout: Les services n'ont pas demarre dans le delai imparti"
    Write-Host "  Verifiez les logs avec: docker-compose logs" -ForegroundColor Yellow
    exit 1
}

# Etape 4: Verifier l'API Gateway
Write-Step "Etape 4/5: Verification de l'API Gateway..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Success "API Gateway est accessible"
    }
} catch {
    Write-Error-Message "API Gateway non accessible"
    Write-Host "  Verifiez les logs avec: docker logs booktracker-gateway" -ForegroundColor Yellow
}
Write-Host ""

# Etape 5: Demarrer le frontend
Write-Step "Etape 5/5: Demarrage du frontend (React)..."

# Verifier si node_modules existe
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "  Installation des dependances npm (premiere fois)..." -ForegroundColor Gray
    Push-Location frontend
    npm install | Out-Null
    Pop-Location
    Write-Success "Dependances installees"
}

Write-Host "  Demarrage du serveur Vite..." -ForegroundColor Gray
Write-Host ""

# Demarrer le frontend dans un nouveau terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Start-Sleep -Seconds 3

# Message final
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   [OK] Demarrage Termine avec Succes !" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Application BookTracker demarree:" -ForegroundColor White
Write-Host ""
Write-Host "  >> Frontend:    " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:3000" -ForegroundColor Yellow
Write-Host "  >> API Gateway: " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "Le frontend s'ouvre dans un terminal separe." -ForegroundColor Gray
Write-Host "Attendez 5-10 secondes que Vite compile, puis ouvrez:" -ForegroundColor Gray
Write-Host ""
Write-Host "  ==> http://localhost:3000" -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host ""
Write-Host "Pour arreter l'application, utilisez: " -NoNewline -ForegroundColor White
Write-Host '.\stop.ps1' -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
