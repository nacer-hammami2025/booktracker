# BookTracker Frontend

Frontend React 18 + TypeScript + Tailwind CSS pour BookTracker.

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build production
npm run build
```

Le frontend sera accessible sur http://localhost:3000

## 🏗️ Stack Technique

- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Recharts** - Graphiques
- **Lucide React** - Icônes

## 📁 Structure

```
src/
├── components/     # Composants réutilisables
├── pages/          # Pages de l'application
├── services/       # Services API
├── stores/         # Stores Zustand
├── types/          # Types TypeScript
├── lib/            # Utilitaires
└── App.tsx         # Composant principal
```

## 🎨 Pages

- **Login/Register** - Authentification
- **Dashboard** - Vue d'ensemble
- **Catalog** - Catalogue de livres
- **BookDetails** - Détails d'un livre
- **Library** - Bibliothèque personnelle
- **ReadingLists** - Listes de lecture
- **Recommendations** - Recommandations personnalisées
- **Statistics** - Statistiques et graphiques
- **Profile** - Profil utilisateur

## 🔗 API

Le frontend communique avec le backend via le proxy Vite configuré pour `/api` → `http://localhost:8080`

## 📦 Scripts

```bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Preview du build
npm run lint     # Linter ESLint
```

---

**Projet PFA - Mars 2026**
