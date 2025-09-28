# 🚨 URGENT: Netlify Dashboard Override Issue

## 🔍 **Problem Identified:**

The Netlify build logs show:
```
build.command from netlify.toml
$ npm ci && npm run build
```

But our `netlify.toml` file correctly has:
```
command = "npm install && npm run build"
```

This means **Netlify Dashboard settings are overriding the netlify.toml file!**

## ⚡ **IMMEDIATE FIX - Update Netlify Dashboard:**

### Step 1: Go to Netlify Dashboard
1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Select your krowd111 site
3. Go to **Site settings** → **Build & deploy**

### Step 2: Update Build Settings
In the "Build settings" section, change:

```
❌ CURRENT (WRONG):
Build command: npm ci && npm run build

✅ CHANGE TO (CORRECT):
Build command: npm install && npm run build
```

### Step 3: Clear Deploy Cache
1. Go to **Deploys** tab
2. Click **Deploy settings**
3. Scroll down to **Build settings**
4. Click **Clear cache and retry deploy**

## 🔧 **Alternative: Force netlify.toml Priority**

Update the netlify.toml to be more explicit:

```toml
[build]
base = "client"
command = "npm install --no-audit --no-fund && npm run build"
publish = "dist"
commandOrigin = "config"

[build.environment]
NODE_VERSION = "18"
NPM_FLAGS = "--no-audit --no-fund"
VITE_APP_TITLE = "Krowd111"
VITE_BACKEND_URL = "https://your-backend-url.com"
```

## 🎯 **Root Cause:**

Netlify dashboard build settings take **precedence** over netlify.toml when both are present. The dashboard still has the old `npm ci` command.

## ✅ **Quick Test:**

After updating dashboard settings:
1. Trigger a new deploy
2. Check build logs show: `$ npm install && npm run build`
3. Build should succeed

---

**Priority**: Update Netlify Dashboard build command ASAP! 🚨