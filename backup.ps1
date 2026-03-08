# ============================================
# BookTracker - Windows Backup Script
# ============================================

$BackupDir = ".\backups\$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

Write-Host "📦 Sauvegarde des bases de données dans $BackupDir..." -ForegroundColor Cyan
Write-Host ""

# Auth DB
Write-Host "💾 Sauvegarde auth-db..." -ForegroundColor Yellow
docker exec booktracker-auth-db pg_dump -U auth_user auth_db | Out-File -FilePath "$BackupDir\auth_db.sql" -Encoding UTF8

# Book DB
Write-Host "💾 Sauvegarde book-db..." -ForegroundColor Yellow
docker exec booktracker-book-db pg_dump -U book_user book_db | Out-File -FilePath "$BackupDir\book_db.sql" -Encoding UTF8

# Tracker DB
Write-Host "💾 Sauvegarde tracker-db..." -ForegroundColor Yellow
docker exec booktracker-tracker-db pg_dump -U tracker_user tracker_db | Out-File -FilePath "$BackupDir\tracker_db.sql" -Encoding UTF8

# Reco DB
Write-Host "💾 Sauvegarde reco-db..." -ForegroundColor Yellow
docker exec booktracker-reco-db pg_dump -U reco_user reco_db | Out-File -FilePath "$BackupDir\reco_db.sql" -Encoding UTF8

Write-Host ""
Write-Host "✅ Sauvegarde terminée!" -ForegroundColor Green
Write-Host "📁 Emplacement: $BackupDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "Fichiers créés:" -ForegroundColor Yellow
Get-ChildItem -Path $BackupDir | Format-Table Name, Length, LastWriteTime
