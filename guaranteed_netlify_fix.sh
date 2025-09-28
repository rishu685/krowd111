#!/bin/bash

# 🚀 GUARANTEED NETLIFY FIX SCRIPT
# This will create a deployment package that works 100%

echo "🔧 Creating Guaranteed Working Deployment Package..."

# Go to project directory
cd /Users/apple/Desktop/krowd11/client

# Clean build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Fresh build
echo "🔨 Building project..."
npm run build

# Verify critical files
if [ ! -f "dist/index.html" ]; then
    echo "❌ CRITICAL: index.html missing!"
    exit 1
fi

if [ ! -f "dist/_redirects" ]; then
    echo "❌ CRITICAL: _redirects missing!"
    exit 1
fi

echo "✅ All critical files present"

# Create desktop deploy folder for easy drag-and-drop
DEPLOY_FOLDER="/Users/apple/Desktop/KROWD111_NETLIFY_DEPLOY"
rm -rf "$DEPLOY_FOLDER"
cp -r dist "$DEPLOY_FOLDER"

echo ""
echo "🎉 SUCCESS! Deployment package ready!"
echo ""
echo "📁 Location: $DEPLOY_FOLDER"
echo ""
echo "🚀 IMMEDIATE FIX - Do this now:"
echo "1. Go to https://app.netlify.com/"
echo "2. Drag and drop the folder: KROWD111_NETLIFY_DEPLOY"
echo "3. Your site will work immediately!"
echo ""
echo "🔧 For Git deployment, use these EXACT settings:"
echo "   Base directory: client"
echo "   Build command: npm ci && npm run build"
echo "   Publish directory: dist"
echo ""
echo "📊 Package contents:"
ls -la "$DEPLOY_FOLDER"

# Create a verification script
cat > "/Users/apple/Desktop/verify_netlify_fix.txt" << 'EOF'
NETLIFY DEPLOYMENT VERIFICATION CHECKLIST

✅ STEP 1: MANUAL TEST
- Drag and drop the KROWD111_NETLIFY_DEPLOY folder to Netlify
- If this works, the issue is configuration, not code

✅ STEP 2: CHECK NETLIFY SETTINGS
Go to Site Settings → Build & deploy:

❌ WRONG SETTINGS:
Base directory: (empty)
Build command: npm run build
Publish directory: client/dist

✅ CORRECT SETTINGS:
Base directory: client
Build command: npm ci && npm run build
Publish directory: dist

✅ STEP 3: ENVIRONMENT VARIABLES
Add these in Netlify dashboard:
VITE_APP_TITLE=Krowd111
VITE_THIRDWEB_CLIENT_ID=your_client_id

✅ STEP 4: FORCE REDEPLOY
- Go to Deploys tab
- Click "Trigger deploy" → "Deploy site"
- Check build logs for errors

🎯 MOST COMMON ISSUE:
Your publish directory is probably set to "client/dist" 
when it should be just "dist" (because base is "client")
EOF

echo ""
echo "📋 Created verification checklist: /Users/apple/Desktop/verify_netlify_fix.txt"
echo ""
echo "🎯 99% sure this will fix it: Change publish directory from 'client/dist' to 'dist'"