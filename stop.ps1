# Script d'arret pour BookTracker
# Usage: .\stop.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   BookTracker - Arret de l'Application" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

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

# Arreter les services Docker
Write-Step "Arret des services backend (Docker)..."
docker-compose down

Write-Success "Services backend arretes"
Write-Host ""

# Message pour le frontend
Write-Host "Note: Si le frontend (React) est toujours en cours d'execution," -ForegroundColor Yellow
Write-Host "      fermez le terminal ou il tourne ou appuyez sur Ctrl+C" -ForegroundColor Yellow
Write-Host ""

Write-Host "================================================" -ForegroundColor Green
Write-Host "   [OK] Arret Termine" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
