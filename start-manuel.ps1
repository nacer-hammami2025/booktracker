# Script de demarrage manuel - BookTracker
# Utiliser ce script si Docker Desktop est DEJA demarre

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   BookTracker - Demarrage Manuel" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configurer Java 21
$env:JAVA_HOME = "C:\Users\mohamednacer.hammami\.jdk\jdk-21.0.8"
$env:PATH = "C:\Users\mohamednacer.hammami\.jdk\jdk-21.0.8\bin;$env:PATH"

Write-Host "[1/3] Verification de Docker..." -ForegroundColor Yellow
try {
    $test = docker ps 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERREUR: Docker Desktop n'est pas demarre!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Veuillez:" -ForegroundColor Yellow
        Write-Host "  1. Ouvrir Docker Desktop depuis le menu Demarrer" -ForegroundColor White
        Write-Host "  2. Attendre que l'icone devienne verte (30-60 secondes)" -ForegroundColor White
        Write-Host "  3. Relancer ce script" -ForegroundColor White
        Write-Host ""
        exit 1
    }
    Write-Host "  OK - Docker est pret" -ForegroundColor Green
} catch {
    Write-Host "  ERREUR - Docker non trouve" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/3] Demarrage des services backend..." -ForegroundColor Yellow
docker-compose up -d

Write-Host ""
Write-Host "  Attente du demarrage (30 secondes)..." -ForegroundColor Gray
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "[3/3] Verification des conteneurs..." -ForegroundColor Yellow
docker ps --format "table {{.Names}}\t{{.Status}}" | Select-String "booktracker"

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   Backend Demarre!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Pour demarrer le frontend, executez dans un AUTRE terminal:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  cd frontend" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Puis ouvrez: http://localhost:3000" -ForegroundColor Green
Write-Host ""
