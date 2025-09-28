#!/bin/bash

echo "🚀 Creating deployment package for Netlify..."

# Navigate to project root
cd /Users/apple/Desktop/krowd11

# Clean and rebuild
echo "🧹 Cleaning and rebuilding..."
cd client
rm -rf dist
npm run build

if [ -d "dist" ]; then
    echo "✅ Build successful!"
    
    # Verify important files exist
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html found"
    else
        echo "❌ index.html missing!"
        exit 1
    fi
    
    if [ -f "dist/_redirects" ]; then
        echo "✅ _redirects found"
    else
        echo "❌ _redirects missing!"
        exit 1
    fi
    
    echo ""
    echo "📦 Deployment package ready in client/dist/"
    echo "📊 Package contents:"
    ls -la dist/
    echo ""
    echo "🚀 Manual Deployment Instructions:"
    echo "1. Go to https://app.netlify.com/"
    echo "2. Drag and drop the 'client/dist' folder"
    echo "3. Your site will be deployed automatically"
    echo ""
    echo "🔧 Git Deployment Settings:"
    echo "Base directory: client"
    echo "Build command: npm ci && npm run build"
    echo "Publish directory: dist"
    
else
    echo "❌ Build failed!"
    exit 1
fi