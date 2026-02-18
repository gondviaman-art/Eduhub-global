#!/bin/bash

# EduSphere AI - Deployment Script
# Deploy your app to Vercel in one command

echo "🚀 EduSphere AI - Deployment Script"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo "Please follow the prompts below:"
echo ""

vercel --prod

echo ""
echo "✨ Deployment complete!"
echo "Your app is now live on Vercel!"
