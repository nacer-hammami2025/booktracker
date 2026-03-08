# Script pour reconstruire et redémarrer reco-service avec recommandations par défaut
Write-Host "🔨 Reconstruction du service de recommandations..." -ForegroundColor Cyan

Set-Location "c:\Users\mohamednacer.hammami\Downloads\JavaProjectA"

# Rebuild reco-service
Write-Host "Construction de l'image Docker..." -ForegroundColor Yellow
docker-compose -f docker-compose-minimal.yml build reco-service

# Restart reco-service
Write-Host "Redémarrage du conteneur..." -ForegroundColor Yellow
docker-compose -f docker-compose-minimal.yml up -d reco-service

# Wait for startup
Write-Host "Attente du démarrage (15 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Check logs
Write-Host "`n✅ Service redémarré! Vérification des logs:" -ForegroundColor Green
docker logs booktracker-reco-service --tail 20

Write-Host "`n🎉 Terminé! Rafraîchissez la page des recommandations dans votre navigateur." -ForegroundColor Green
