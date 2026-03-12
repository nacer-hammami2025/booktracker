# Script PowerShell de deploiement rapide sur Render
# Usage: .\quick-deploy.ps1

Write-Host "[DEPLOY] BookTracker - Deploiement Rapide sur Render" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# Verifier si git est initialise
if (-not (Test-Path .git)) {
    Write-Host "[INFO] Initialisation du repository Git..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - BookTracker Application with Java 21"
    Write-Host "[OK] Git initialise" -ForegroundColor Green
}
else {
    Write-Host "[OK] Repository Git deja initialise" -ForegroundColor Green
}

# Verifier si remote est configure
$remote = git remote
if (-not ($remote -contains "origin")) {
    Write-Host ""
    Write-Host "[WARNING] Aucun remote configure" -ForegroundColor Yellow
    Write-Host "[INFO] Veuillez creer un repository sur GitHub, puis executez:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/VOTRE_USERNAME/booktracker.git" -ForegroundColor White
    Write-Host "   git branch -M main" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host "[OK] Remote origin configure" -ForegroundColor Green
}

# Build test local
Write-Host ""
Write-Host "[BUILD] Test de build du frontend..." -ForegroundColor Yellow
Push-Location frontend
npm install --silent
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Build frontend reussi" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Erreur lors du build" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

# Build test des services Java
Write-Host ""
Write-Host "[BUILD] Test de build des services backend..." -ForegroundColor Yellow

# Verifier si Maven est installe
$mvnExists = Get-Command mvn -ErrorAction SilentlyContinue
if ($mvnExists) {
    mvn clean package -DskipTests -q
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Build backend reussi" -ForegroundColor Green
    }
    else {
        Write-Host "[ERROR] Erreur lors du build Maven" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "[SKIP] Maven non installe - Build backend sera fait par Render (Docker)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[SUCCESS] Tous les tests de build sont reussis!" -ForegroundColor Green
Write-Host ""
Write-Host "[NEXT] Prochaines etapes:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Push votre code sur GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Ready for Render deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Allez sur https://render.com" -ForegroundColor White
Write-Host ""
Write-Host "3. Suivez le guide: RENDER_DEPLOY.md" -ForegroundColor White
Write-Host ""
Write-Host "4. Votre app sera disponible sur: https://booktracker.nacer-dev.me" -ForegroundColor White
Write-Host ""
Write-Host "[DONE] Bonne chance!" -ForegroundColor Green
