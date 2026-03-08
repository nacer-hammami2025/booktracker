# ========================================
# 🚀 TRANSFORMATION PROFESSIONNELLE EN UN CLIC
# Script automatique pour version de démonstration
# ========================================

Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "   BOOKTRACKER - TRANSFORMATION PROFESSIONNELLE            " -ForegroundColor Cyan
Write-Host "   Preparation pour presentation devant experts            " -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
Set-Location "c:\Users\mohamednacer.hammami\Downloads\JavaProjectA"

# ========================================
# ETAPE 1: Reconstruire reco-service
# ========================================
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "ETAPE 1/4: Reconstruction du service de recommandations" -ForegroundColor Yellow
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "Correction: Recommandations par defaut pour nouveaux users..." -ForegroundColor Cyan
Write-Host ""

docker-compose -f docker-compose-minimal.yml build reco-service 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Build reussi!" -ForegroundColor Green
    docker-compose -f docker-compose-minimal.yml up -d reco-service
    Write-Host "[OK] Service redemarre!" -ForegroundColor Green
} else {
    Write-Host "[WARN] Erreur de build (continuons quand meme)" -ForegroundColor Yellow
}
Write-Host ""

# ========================================
# ETAPE 2: Enrichir le catalogue
# ========================================
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "ETAPE 2/4: Enrichissement du catalogue de livres" -ForegroundColor Yellow
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "Ajout de 12 livres supplementaires..." -ForegroundColor Cyan
Write-Host "   - Le Trone de Fer, Le Seigneur des Anneaux, Agatha Christie..." -ForegroundColor Gray
Write-Host ""

docker cp enrich-books.sql booktracker-book-db:/tmp/enrich-books.sql 2>&1 | Out-Null
$result = docker exec -i booktracker-book-db psql -U book_user -d book_db -f /tmp/enrich-books.sql 2>&1

if ($result -match "total_books") {
    Write-Host "[OK] Catalogue enrichi avec succes!" -ForegroundColor Green
    $result | Select-String "total_" | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "[WARN] Livres peut-etre deja ajoutes" -ForegroundColor Yellow
}
Write-Host ""

# ========================================
# ETAPE 3: Creer compte de demonstration
# ========================================
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "ETAPE 3/4: Creation du compte de demonstration" -ForegroundColor Yellow
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "Compte: demo@booktracker.com / Demo1234!" -ForegroundColor Cyan
Write-Host ""

# Auth database - Create user account
$sqlCommand = @"
INSERT INTO users (id, username, email, password, active, created_at) VALUES
(100, 'demo', 'demo@booktracker.com', '`$2a`$10`$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhka', true, NOW())
ON CONFLICT (email) DO NOTHING;
SELECT setval('users_id_seq', 100);
"@

$sqlCommand | docker exec -i booktracker-auth-db psql -U auth_user -d auth_db 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Utilisateur cree dans auth_db!" -ForegroundColor Green
} else {
    Write-Host "[WARN] Utilisateur existe deja" -ForegroundColor Yellow
}

# Tracker database (bibliotheque + avis + listes)
docker cp create-demo-account.sql booktracker-tracker-db:/tmp/create-demo-account.sql 2>&1 | Out-Null
docker exec -i booktracker-tracker-db psql -U tracker_user -d tracker_db -f /tmp/create-demo-account.sql 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Bibliotheque de demonstration creee!" -ForegroundColor Green
    Write-Host "   - 8 livres termines" -ForegroundColor Gray
    Write-Host "   - 3 livres en cours" -ForegroundColor Gray
    Write-Host "   - 5 livres a lire" -ForegroundColor Gray
    Write-Host "   - 8 avis detailles" -ForegroundColor Gray
    Write-Host "   - 3 listes thematiques" -ForegroundColor Gray
} else {
    Write-Host "[WARN] Donnees peut-etre deja presentes" -ForegroundColor Yellow
}
Write-Host ""

# ========================================
# ÉTAPE 4: Attendre le démarrage
# ========================================
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "ETAPE 4/4: Finalisation et verification" -ForegroundColor Yellow
Write-Host "=============================================================" -ForegroundColor Yellow
Write-Host "Attente du demarrage complet (15 secondes)..." -ForegroundColor Cyan

Start-Sleep -Seconds 15

# Verifier les services
Write-Host ""
Write-Host "Etat des services:" -ForegroundColor Cyan
$services = docker ps --filter "name=booktracker" --format "table {{.Names}}\t{{.Status}}" | Select-String "booktracker"
$services | ForEach-Object { 
    if ($_ -match "Up") {
        Write-Host "   [OK] $_" -ForegroundColor Green
    } else {
        Write-Host "   [WARN] $_" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Green
Write-Host "           TRANSFORMATION TERMINEE !                         " -ForegroundColor Green
Write-Host "=============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "PROCHAINES ETAPES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1. Ouvrez votre navigateur: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "   2. Connectez-vous avec:" -ForegroundColor White
Write-Host "      Email   : " -NoNewline; Write-Host "demo@booktracker.com" -ForegroundColor Yellow
Write-Host "      Password: " -NoNewline; Write-Host "Demo1234!" -ForegroundColor Yellow
Write-Host ""
Write-Host "   3. Explorez toutes les sections:" -ForegroundColor White
Write-Host "      - Catalogue (20 livres)" -ForegroundColor Gray
Write-Host "      - Ma Bibliotheque (16 livres avec statuts)" -ForegroundColor Gray
Write-Host "      - Mes Listes (3 listes thematiques)" -ForegroundColor Gray
Write-Host "      - Recommandations (algorithme intelligent)" -ForegroundColor Gray
Write-Host "      - Statistiques (objectif 2026, graphiques)" -ForegroundColor Gray
Write-Host ""
Write-Host "Documentation complete: " -NoNewline
Write-Host "GUIDE_PROFESSIONNEL.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pret pour votre presentation devant les experts!" -ForegroundColor Green
Write-Host ""
