#!/bin/bash

# ============================================
# BookTracker - Script de Déploiement Rapide
# ============================================
# Auteurs: Mohamed Nacer Hammami & Dhia Ben Saidane
# Usage: ./deploy.sh [production|staging|development]

set -e

ENVIRONMENT=${1:-production}
COMPOSE_FILE="docker-compose.prod.yml"

echo "╔════════════════════════════════════════╗"
echo "║   📚 BookTracker - Déploiement         ║"
echo "║   Environnement: $ENVIRONMENT          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Vérifier les prérequis
echo "🔍 Vérification des prérequis..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé!"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé!"
    exit 1
fi

if [ ! -f ".env.$ENVIRONMENT" ]; then
    echo "❌ Fichier .env.$ENVIRONMENT introuvable!"
    echo "Créez-le à partir de .env.production.example"
    exit 1
fi

echo "✅ Prérequis OK"
echo ""

# Charger les variables d'environnement
echo "📋 Chargement des variables d'environnement..."
export $(cat .env.$ENVIRONMENT | grep -v '^#' | xargs)
echo "✅ Variables chargées"
echo ""

# Arrêter les anciens conteneurs
echo "🛑 Arrêt des anciens conteneurs..."
docker compose -f $COMPOSE_FILE down 2>/dev/null || true
echo "✅ Conteneurs arrêtés"
echo ""

# Build les images
echo "🏗️  Build des images Docker..."
echo "⏳ Cela peut prendre 10-15 minutes la première fois..."
docker compose -f $COMPOSE_FILE build --no-cache
echo "✅ Build terminé"
echo ""

# Démarrer les services
echo "🚀 Démarrage des services..."
docker compose -f $COMPOSE_FILE up -d
echo "✅ Services démarrés"
echo ""

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage complet des services..."
sleep 10

# Vérifier l'état des services
echo ""
echo "📊 État des services:"
docker compose -f $COMPOSE_FILE ps
echo ""

# Afficher les logs
echo "📝 Derniers logs:"
docker compose -f $COMPOSE_FILE logs --tail=50
echo ""

# Health check
echo "🏥 Vérification de la santé des services..."
sleep 5

GATEWAY_HEALTH=$(docker exec booktracker-gateway wget -q -O- http://localhost:8080/actuator/health 2>/dev/null || echo "DOWN")
if [[ $GATEWAY_HEALTH == *"UP"* ]]; then
    echo "✅ API Gateway: OK"
else
    echo "⚠️  API Gateway: En cours de démarrage..."
fi

FRONTEND_HEALTH=$(docker exec booktracker-frontend wget -q -O- http://localhost/ 2>/dev/null || echo "DOWN")
if [[ $FRONTEND_HEALTH == *"<!DOCTYPE"* ]]; then
    echo "✅ Frontend: OK"
else
    echo "⚠️  Frontend: En cours de démarrage..."
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   🎉 Déploiement terminé!              ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "🌐 Application disponible sur:"
echo "   👉 http://localhost (développement)"
echo "   👉 https://nacer-dev.me (production)"
echo ""
echo "📚 Commandes utiles:"
echo "   • Voir les logs:     docker compose -f $COMPOSE_FILE logs -f"
echo "   • Arrêter:           docker compose -f $COMPOSE_FILE down"
echo "   • Redémarrer:        docker compose -f $COMPOSE_FILE restart"
echo "   • État des services: docker compose -f $COMPOSE_FILE ps"
echo ""
echo "💡 Pour plus d'infos, consultez DEPLOYMENT.md"
echo ""
