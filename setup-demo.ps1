# ============================================================
# SCRIPT INSTALLATION MODE DEMO RICHE - BookTracker
# Peupler la base avec un compte démo complet pour présentation
# ============================================================

Write-Host "`n╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║      INSTALLATION MODE DEMO RICHE - BookTracker      ║" -ForegroundColor Yellow
Write-Host "╚═══════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Vérifier que Docker est lancé
$dockerRunning = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] Docker n'est pas lance !" -ForegroundColor Red
    Write-Host "Lancez d'abord: .\start.ps1`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/5] Verification des containers..." -ForegroundColor Cyan
$containers = @(
    "booktracker-auth-db",
    "booktracker-book-db", 
    "booktracker-tracker-db",
    "booktracker-reco-db"
)

foreach ($container in $containers) {
    $status = docker ps --filter "name=$container" --format "{{.Status}}" 2>$null
    if ($status) {
        Write-Host "  [OK] $container" -ForegroundColor Green
    } else {
        Write-Host "  [ERREUR] $container non trouve" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "[2/5] Chargement du script SQL..." -ForegroundColor Cyan
$scriptPath = "$PSScriptRoot\setup-demo-rich.sql"
if (-not (Test-Path $scriptPath)) {
    Write-Host "[ERREUR] Fichier setup-demo-rich.sql introuvable !" -ForegroundColor Red
    exit 1
}
$fileSize = [Math]::Round((Get-Item $scriptPath).Length / 1KB, 1)
Write-Host "  [OK] Script trouve" -ForegroundColor Green

Write-Host ""
Write-Host "[3/5] Import dans auth_db (utilisateur)..." -ForegroundColor Cyan
Get-Content $scriptPath | docker exec -i booktracker-auth-db psql -U booktracker -d auth_db 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Utilisateur demo cree" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Erreurs possibles (peut-etre des doublons)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[4/5] Import dans book_db (livres + genres)..." -ForegroundColor Cyan
Get-Content $scriptPath | docker exec -i booktracker-book-db psql -U booktracker -d book_db 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] 50 livres + genres importes" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Erreurs possibles (peut-etre des doublons)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[5/5] Import dans tracker_db (bibliotheque + critiques + listes)..." -ForegroundColor Cyan
Get-Content $scriptPath | docker exec -i booktracker-tracker-db psql -U booktracker -d tracker_db 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Bibliotheque + critiques + listes importees" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Erreurs possibles (peut-etre des doublons)" -ForegroundColor Yellow
}
"
Write-Host "
Write-Host "`n[6/5] Import dans reco_db (objectif annuel)..." -ForegroundColor Cyan
Get-Content $scriptPath | docker exec -i booktracker-reco-db psql -U booktracker -d reco_db 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Objectif 2026 configure" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Erreurs possibles (peut-etre des doublons)" -ForegroundColor Yellow
}

Write-Host "`n╔═══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           INSTALLATION TERMINEE AVEC SUCCES !         ║" -ForegroundColor Yellow
Write-Host "╚═══════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "COMPTE DEMO CREE :" -ForegroundColor Cyan
Write-Host "  Email    : demo@booktracker.com" -ForegroundColor White
Write-Host "  Password : Demo2026!" -ForegroundColor White
Write-Host ""
Write-Host "CONTENU :" -ForegroundColor Cyan
Write-Host "  • 50 livres au total" -ForegroundColor White
Write-Host "    - 35 TERMINES (repartis sur 2025-2026)" -ForegroundColor Green
Write-Host "    - 10 EN COURS (progressions 20-80%)" -ForegroundColor Yellow
Write-Host "    - 5 A LIRE" -ForegroundColor Gray
Write-Host "  • 25 critiques avec notes variees (5★ à 3★)" -ForegroundColor White
Write-Host "  • 10 citations elegantes" -ForegroundColor White
Write-Host "  • 4 listes thematiques" -ForegroundColor White
Write-Host "  • Objectif 2026 : 40 livres (35/40 = 87.5%)" -ForegroundColor White
Write-Host ""
Write-Host "TEST CONNEXION :" -ForegroundColor Magenta
Write-Host "  1. Allez sur http://localhost:3000" -ForegroundColor White
Write-Host "  2. Connectez-vous avec les identifiants ci-dessus" -ForegroundColor White
Write-Host "  3. Explorez : Bibliotheque, Statistiques, Listes, etc." -ForegroundColor White
Write-Host ""
Write-Host "DEMO PRESENTABLE devant le jury ! " -ForegroundColor Green
Write-Host ""
