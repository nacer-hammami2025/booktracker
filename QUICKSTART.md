# 🚀 Guide de Démarrage Rapide - BookTracker

## Prérequis

- ✅ Java 17+
- ✅ Maven 3.8+
- ✅ Docker & Docker Compose
- ✅ Git

## Étape 1: Vérifier Java et Maven

```powershell
java -version
# Doit afficher: openjdk version "17" ou supérieur

mvn -version
# Doit afficher: Apache Maven 3.8.x ou supérieur
```

## Étape 2: Compiler les services Maven

```powershell
# Se placer à la racine du projet
cd c:\Users\mohamednacer.hammami\Downloads\JavaProjectA

# Compiler tous les services (sans tests pour l'instant)
mvn clean install -DskipTests
```

**Résultat attendu:**
```
[INFO] BookTracker - Parent ........................... SUCCESS
[INFO] BookTracker - API Gateway ...................... SUCCESS
[INFO] BookTracker - Auth Service ..................... SUCCESS
[INFO] BookTracker - Book Service ..................... SUCCESS
[INFO] BookTracker - Tracker Service .................. SUCCESS
[INFO] BookTracker - Reco Service ..................... SUCCESS
[INFO] BUILD SUCCESS
```

## Étape 3: Lancer l'infrastructure avec Docker Compose

```powershell
# Lancer tous les services en arrière-plan
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f auth-service
docker-compose logs -f api-gateway
```

**Vérifier que tous les conteneurs sont UP:**
```powershell
docker-compose ps
```

Vous devriez voir:
- ✅ booktracker-gateway (8080)
- ✅ booktracker-auth-service (8081)
- ✅ booktracker-book-service (8082)
- ✅ booktracker-tracker-service (8083)
- ✅ booktracker-reco-service (8084)
- ✅ booktracker-auth-db (5432)
- ✅ booktracker-book-db (5433)
- ✅ booktracker-tracker-db (5434)
- ✅ booktracker-redis (6379)

## Étape 4: Tester l'Auth Service

### 4.1 Health Check

```powershell
# Via le Gateway
curl http://localhost:8080/actuator/health

# Directement sur Auth Service
curl http://localhost:8081/actuator/health
```

### 4.2 Inscription (Register)

**PowerShell:**
```powershell
$body = @{
    username = "nacer"
    email = "nacer@booktracker.com"
    password = "password123"
    fullName = "Mohamed Nacer Hammami"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/auth/register" `
    -ContentType "application/json" `
    -Body $body
```

**Réponse attendue:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 1,
  "username": "nacer",
  "email": "nacer@booktracker.com",
  "role": "READER",
  "expiresIn": 86400
}
```

**💾 IMPORTANT: Sauvegarder le token pour les prochaines requêtes!**

### 4.3 Connexion (Login)

```powershell
$body = @{
    username = "nacer"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/auth/login" `
    -ContentType "application/json" `
    -Body $body
```

### 4.4 Obtenir le profil (route protégée)

```powershell
# Remplacer YOUR_TOKEN par le token reçu lors de l'inscription/login
$token = "YOUR_TOKEN_HERE"

Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/auth/profile" `
    -Headers @{
        "Authorization" = "Bearer $token"
    }
```

**Réponse attendue:**
```json
{
  "id": 1,
  "username": "nacer",
  "email": "nacer@booktracker.com",
  "fullName": "Mohamed Nacer Hammami",
  "role": "READER",
  "active": true,
  "createdAt": "2026-03-06T...",
  "updatedAt": "2026-03-06T..."
}
```

## Étape 5: Explorer Swagger UI

### Auth Service
```
http://localhost:8081/swagger-ui.html
```

### Book Service (une fois implémenté)
```
http://localhost:8082/swagger-ui.html
```

### Tracker Service (une fois implémenté)
```
http://localhost:8083/swagger-ui.html
```

### Reco Service (une fois implémenté)
```
http://localhost:8084/swagger-ui.html
```

## Étape 6: Arrêter l'infrastructure

```powershell
# Arrêter tous les services
docker-compose down

# Arrêter ET supprimer les volumes (bases de données)
docker-compose down -v
```

## 🐛 Troubleshooting

### Problème: Port déjà utilisé

**Symptôme:** 
```
Error starting userland proxy: listen tcp 0.0.0.0:5432: bind: address already in use
```

**Solution:**
```powershell
# Trouver les processus utilisant les ports
netstat -ano | findstr :5432
netstat -ano | findstr :8080

# Tuer le processus (remplacer PID par l'ID du processus)
taskkill /PID 1234 /F

# Ou changer les ports dans docker-compose.yml
```

### Problème: Service ne démarre pas

**Solution:**
```powershell
# Voir les logs du service
docker-compose logs auth-service

# Redémarrer un service spécifique
docker-compose restart auth-service

# Reconstruire et relancer
docker-compose up --build auth-service
```

### Problème: PostgreSQL pas prêt

**Symptôme:** Service démarre avant que la base soit prête

**Solution:** Les `healthcheck` dans docker-compose.yml gèrent cela automatiquement avec `depends_on: condition: service_healthy`

### Problème: JWT Invalid

**Symptôme:** Token rejeté par le Gateway

**Solution:**
- Vérifier que le secret JWT est identique dans `.env`, Gateway et Auth Service
- Vérifier que le token n'est pas expiré (24h par défaut)
- S'assurer que le header est bien `Authorization: Bearer <token>`

## 📊 Vérification Complète

Checklist avant de continuer au Sprint 1:

- [ ] Compilation Maven réussie
- [ ] Tous les services Docker UP (9 conteneurs)
- [ ] Inscription utilisateur fonctionne
- [ ] Login utilisateur fonctionne
- [ ] Accès au profil avec JWT fonctionne
- [ ] Swagger UI accessible sur auth-service
- [ ] Health checks OK sur tous les services

## 🎯 Prochaine Étape

Une fois que tous les tests passent:
➡️ **Sprint 1**: Implémenter le Book Service et le Frontend React

---

**Besoin d'aide?** Consulter [PROGRESS.md](PROGRESS.md) pour l'état du projet.
