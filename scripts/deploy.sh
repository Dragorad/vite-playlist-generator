#!/bin/bash

# Production deployment script for Oracle VM

set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Backend deployment
echo "🔧 Deploying backend..."
cd backend

# Create production environment file
echo "📝 Creating environment file..."
cat > .env << EOF
MONGODB_URI=${MONGODB_URI}
FIREBASE_SERVICE_ACCOUNT=${FIREBASE_SERVICE_ACCOUNT}
NODE_ENV=production
PORT=3000
EOF

# Build and deploy with Docker
echo "🐳 Building Docker containers..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Health check
echo "🔍 Running health check..."
if curl -f http://localhost/health; then
    echo "✅ Deployment successful!"
else
    echo "❌ Health check failed!"
    exit 1
fi

echo "🎉 Deployment completed successfully!"