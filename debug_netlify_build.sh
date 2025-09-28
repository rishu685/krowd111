#!/bin/bash

# 🔍 Netlify Build Debug Script
echo "🔍 Debugging Netlify Build Configuration Issues..."

# Check current netlify.toml
echo "📄 Current netlify.toml build configuration:"
echo "============================================="
grep -A 10 "\[build\]" netlify.toml
echo ""

# Check if package.json and package-lock.json are in sync
echo "🔄 Checking package.json and package-lock.json sync:"
echo "===================================================="
cd client

if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json exists"
    
    # Test npm ci vs npm install
    echo "🧪 Testing npm ci (what Netlify is trying to use):"
    npm ci --dry-run 2>&1 | head -5
    
    echo ""
    echo "🧪 Testing npm install (what should work):"
    npm install --dry-run 2>&1 | head -5
    
else
    echo "❌ package-lock.json missing!"
fi

echo ""
echo "📊 Current package.json dependencies:"
echo "====================================="
grep -A 5 '"dependencies"' package.json

echo ""
echo "🎯 SOLUTION:"
echo "============"
echo "1. Go to Netlify Dashboard → Site Settings → Build & deploy"
echo "2. Change build command from 'npm ci && npm run build' to:"
echo "   'npm install && npm run build'"
echo ""
echo "OR use our fixed netlify.toml with explicit commandOrigin"

cd ..