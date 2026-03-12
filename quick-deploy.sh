#!/bin/bash
# Script de déploiement rapide sur Render
# Usage: ./quick-deploy.sh

echo "🚀 BookTracker - Déploiement Rapide sur Render"
echo "================================================"
echo ""

# Vérifier si git est initialisé
if [ ! -d .git ]; then
    echo "📦 Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - BookTracker Application with Java 21"
    echo "✅ Git initialisé"
else
    echo "✅ Repository Git déjà initialisé"
fi

# Vérifier si remote est configuré
if ! git remote | grep -q origin; then
    echo ""
    echo "⚠️  Aucun remote configuré"
    echo "📋 Veuillez créer un repository sur GitHub, puis exécutez:"
    echo ""
    echo "   git remote add origin https://github.com/VOTRE_USERNAME/booktracker.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
else
    echo "✅ Remote origin configuré"
fi

# Build test local
echo ""
echo "🔨 Test de build du frontend..."
cd frontend
npm install --silent
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build frontend réussi"
else
    echo "❌ Erreur lors du build"
    exit 1
fi
cd ..

# Build test des services Java
echo ""
echo "🔨 Test de build des services backend..."
mvn clean package -DskipTests -q
if [ $? -eq 0 ]; then
    echo "✅ Build backend réussi"
else
    echo "❌ Erreur lors du build Maven"
    exit 1
fi

echo ""
echo "✅ Tous les tests de build sont réussis!"
echo ""
echo "📋 Prochaines étapes:"
echo ""
echo "1. Push votre code sur GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Render deployment'"
echo "   git push origin main"
echo ""
echo "2. Allez sur https://render.com"
echo ""
echo "3. Suivez le guide: RENDER_DEPLOY.md"
echo ""
echo "4. Votre app sera disponible sur: https://booktracker.nacer-dev.me"
echo ""
echo "🎉 Bonne chance!"
