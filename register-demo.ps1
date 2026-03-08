# Script pour créer le compte demo via l'API d'inscription

$body = @{
    username = "demo"
    email = "demo@booktracker.com"
    password = "demo"
    fullName = "Compte Demo"
} | ConvertTo-Json

Write-Host "Creation du compte demo..." -ForegroundColor Cyan
Write-Host "Email: demo@booktracker.com" -ForegroundColor Yellow
Write-Host "Mot de passe: demo" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/auth/register" -ContentType "application/json" -Body $body
    Write-Host "REUSSI! Compte cree." -ForegroundColor Green
    Write-Host "Token: $($response.token)" -ForegroundColor Cyan
    
    # Ajouter les livres
    docker exec -i booktracker-tracker-db psql -U tracker_user -d tracker_db -c "DELETE FROM user_books WHERE user_id = (SELECT id FROM users WHERE email = 'demo@booktracker.com'); INSERT INTO user_books (user_id, book_id, status, current_page, is_favorite, start_date, finish_date, created_at, updated_at) VALUES ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 1, 'FINISHED', 320, true, CURRENT_DATE - INTERVAL '90 days', CURRENT_DATE - INTERVAL '80 days', NOW(), NOW()), ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 3, 'FINISHED', 96, true, CURRENT_DATE - INTERVAL '75 days', CURRENT_DATE - INTERVAL '74 days', NOW(), NOW()), ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 4, 'FINISHED', 1488, false, CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE - INTERVAL '30 days', NOW(), NOW()), ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 2, 'READING', 245, true, CURRENT_DATE - INTERVAL '5 days', NULL, NOW(), NOW()), ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 5, 'READING', 80, false, CURRENT_DATE - INTERVAL '3 days', NULL, NOW(), NOW()), ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 6, 'TO_READ', 0, false, NULL, NULL, NOW(), NOW()), ((SELECT id FROM users WHERE email = 'demo@booktracker.com'), 7, 'TO_READ', 0, false, NULL, NULL, NOW(), NOW());"
    
    Write-Host ""
    Write-Host "CONNECTEZ-VOUS AVEC:" -ForegroundColor Green -BackgroundColor Black
    Write-Host "  Email: demo@booktracker.com" -ForegroundColor White
    Write-Host "  Mot de passe: demo" -ForegroundColor White
    
} catch {
    Write-Host "ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Le compte existe peut-etre deja. Tentez de vous connecter avec:" -ForegroundColor Yellow
    Write-Host "  Email: demo@booktracker.com" -ForegroundColor White
    Write-Host "  Mot de passe: demo" -ForegroundColor White
}
