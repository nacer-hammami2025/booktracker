# ============================================
# BookTracker - Windows Deployment Script
# ============================================
# Auteurs: Mohamed Nacer Hammami & Dhia Ben Saidane
# Usage: .\deploy.ps1 [-Environment production]

param(
    [string]$Environment = "production"
)

$ComposeFile = "docker-compose.prod.yml"
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   📚 BookTracker - Déploiement         ║" -ForegroundColor Cyan
Write-Host "║   Environnement: $Environment          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Vérifier les prérequis
Write-Host "🔍 Vérification des prérequis..." -ForegroundColor Yellow

try {
    docker --version | Out-Null
    Write-Host "✅ Docker installé" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker n'est pas installé!" -ForegroundColor Red
    exit 1
}

try {
    docker compose version | Out-Null
    Write-Host "✅ Docker Compose installé" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose n'est pas installé!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".env.$Environment")) {
    Write-Host "❌ Fichier .env.$Environment introuvable!" -ForegroundColor Red
    Write-Host "Créez-le à partir de .env.production" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Fichier .env.$Environment trouvé" -ForegroundColor Green
Write-Host ""

# Charger les variables d'environnement
Write-Host "📋 Chargement des variables d'environnement..." -ForegroundColor Yellow
Get-Content ".env.$Environment" | ForEach-Object {
    if ($_ -match "^([^=]+)=(.*)$") {
        $name = $matches[1]
        $value = $matches[2]
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}
Write-Host "✅ Variables chargées" -ForegroundColor Green
Write-Host ""

# Arrêter les anciens conteneurs
Write-Host "🛑 Arrêt des anciens conteneurs..." -ForegroundColor Yellow
try {
    docker compose -f $ComposeFile down 2>$null
} catch {
    # Ignore si aucun conteneur n'est en cours d'exécution
}
Write-Host "✅ Conteneurs arrêtés" -ForegroundColor Green
Write-Host ""

# Build les images
Write-Host "🏗️  Build des images Docker..." -ForegroundColor Yellow
Write-Host "⏳ Cela peut prendre 10-15 minutes la première fois..." -ForegroundColor Cyan
docker compose -f $ComposeFile build --no-cache
Write-Host "✅ Build terminé" -ForegroundColor Green
Write-Host ""

# Démarrer les services
Write-Host "🚀 Démarrage des services..." -ForegroundColor Yellow
docker compose -f $ComposeFile up -d
Write-Host "✅ Services démarrés" -ForegroundColor Green
Write-Host ""

# Attendre que les services soient prêts
Write-Host "⏳ Attente du démarrage complet des services..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

# Vérifier l'état des services
Write-Host ""
Write-Host "📊 État des services:" -ForegroundColor Yellow
docker compose -f $ComposeFile ps
Write-Host ""

# Afficher les logs récents
Write-Host "📝 Derniers logs:" -ForegroundColor Yellow
docker compose -f $ComposeFile logs --tail=50
Write-Host ""

# Health check
Write-Host "🏥 Vérification de la santé des services..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

try {
    $gatewayHealth = docker exec booktracker-gateway wget -q -O- http://localhost:8080/actuator/health 2>$null
    if ($gatewayHealth -like "*UP*") {
        Write-Host "✅ API Gateway: OK" -ForegroundColor Green
    } else {
        Write-Host "⚠️  API Gateway: En cours de démarrage..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  API Gateway: En cours de démarrage..." -ForegroundColor Yellow
}

try {
    $frontendHealth = docker exec booktracker-frontend wget -q -O- http://localhost/ 2>$null
    if ($frontendHealth -like "*<!DOCTYPE*") {
        Write-Host "✅ Frontend: OK" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Frontend: En cours de démarrage..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Frontend: En cours de démarrage..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   🎉 Déploiement terminé!              ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Application disponible sur:" -ForegroundColor Cyan
Write-Host "   👉 http://localhost (développement)" -ForegroundColor White
Write-Host "   👉 https://nacer-dev.me (production)" -ForegroundColor White
Write-Host ""
Write-Host "📚 Commandes utiles:" -ForegroundColor Cyan
Write-Host "   • Voir les logs:     docker compose -f $ComposeFile logs -f" -ForegroundColor White
Write-Host "   • Arrêter:           docker compose -f $ComposeFile down" -ForegroundColor White
Write-Host "   • Redémarrer:        docker compose -f $ComposeFile restart" -ForegroundColor White
Write-Host "   • État des services: docker compose -f $ComposeFile ps" -ForegroundColor White
Write-Host ""
Write-Host "💡 Pour plus d'infos, consultez DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""
