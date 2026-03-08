#!/bin/bash

# ============================================
# BookTracker - Script de Sauvegarde
# ============================================
# Sauvegarde toutes les bases de données

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Sauvegarde des bases de données dans $BACKUP_DIR..."

# Auth DB
echo "💾 Sauvegarde auth-db..."
docker exec booktracker-auth-db pg_dump -U auth_user auth_db > "$BACKUP_DIR/auth_db.sql"

# Book DB
echo "💾 Sauvegarde book-db..."
docker exec booktracker-book-db pg_dump -U book_user book_db > "$BACKUP_DIR/book_db.sql"

# Tracker DB
echo "💾 Sauvegarde tracker-db..."
docker exec booktracker-tracker-db pg_dump -U tracker_user tracker_db > "$BACKUP_DIR/tracker_db.sql"

# Reco DB
echo "💾 Sauvegarde reco-db..."
docker exec booktracker-reco-db pg_dump -U reco_user reco_db > "$BACKUP_DIR/reco_db.sql"

# Redis
echo "💾 Sauvegarde redis..."
docker exec booktracker-redis redis-cli --rdb "$BACKUP_DIR/redis_dump.rdb" > /dev/null 2>&1

echo ""
echo "✅ Sauvegarde terminée!"
echo "📁 Emplacement: $BACKUP_DIR"
echo ""
echo "Fichiers créés:"
ls -lh "$BACKUP_DIR"
