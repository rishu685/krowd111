# 🚀 Netlify Deployment Guide for Krowd111

## Quick Fix for Current Issue

The "Page not found" error you're seeing is likely due to one of these common issues:

### 1. **Check Your Build Settings in Netlify Dashboard**

Go to your Netlify site settings and ensure:

- **Base directory**: `client`
- **Build command**: `npm ci && npm run build`
- **Publish directory**: `client/dist` (or just `dist` if base is set to `client`)

### 2. **Environment Variables**

In your Netlify dashboard, go to Site Settings > Environment Variables and add:

```
VITE_APP_TITLE=Krowd111
VITE_THIRDWEB_CLIENT_ID=your_actual_thirdweb_client_id
VITE_BACKEND_URL=your_backend_url_here
```

### 3. **Deploy Settings Priority**

Netlify reads configuration in this order:
1. UI settings (dashboard)
2. `netlify.toml` file
3. `_redirects` file

Make sure they don't conflict.

## 🛠️ Step-by-Step Deployment Process

### Option 1: Git-based Deployment (Recommended)

1. **Push your latest changes to GitHub** (already done ✅)

2. **Connect your GitHub repo to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose GitHub and select your `krowd111` repository
   - Set build settings:
     - **Base directory**: `client`
     - **Build command**: `npm ci && npm run build`
     - **Publish directory**: `dist`

3. **Configure Environment Variables:**
   - In site settings, add the environment variables mentioned above

4. **Deploy!**

### Option 2: Manual Deployment

1. **Build locally:**
   ```bash
   ./deploy.sh
   ```

2. **Upload the `client/dist` folder to Netlify manually**

## 🐛 Common Issues and Solutions

### Issue 1: "Page not found" on refresh
**Solution**: The `netlify.toml` file should handle this with redirects. If not working, check that the file is in the root directory.

### Issue 2: Build fails with dependency errors
**Solution**: 
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try building locally first

### Issue 3: Environment variables not working
**Solution**: 
- Make sure they start with `VITE_`
- Set them in Netlify dashboard
- Redeploy after adding variables

### Issue 4: 404 on direct URL access
**Solution**: Ensure the `_redirects` file is in the `public` directory and contains:
```
/*    /index.html   200
```

## 🔧 Current Configuration Files

### netlify.toml (Root directory)
```toml
[build]
base = "client"
command = "npm ci && npm run build"
publish = "dist"

[build.environment]
NODE_VERSION = "18"
```

### _redirects (client/public directory)
```
/*    /index.html   200
```

## 🚀 Quick Test

Before deploying, test your build locally:

```bash
# Run the deployment script
./deploy.sh

# Or manually:
cd client
npm run build
npm run preview
```

Visit `http://localhost:4173` to test your built application.

## 📋 Deployment Checklist

- [ ] Latest changes pushed to GitHub
- [ ] Build script works locally
- [ ] Environment variables configured in Netlify
- [ ] `netlify.toml` in root directory
- [ ] `_redirects` file in `client/public`
- [ ] Site connected to GitHub repo in Netlify
- [ ] Build settings correct in Netlify dashboard

## 🔗 Your Site

Once deployed successfully, your site will be available at:
`https://your-site-name.netlify.app`

## 🆘 Still Having Issues?

If you're still getting the "Page not found" error:

1. Check the Netlify build logs for specific errors
2. Verify the publish directory contains `index.html`
3. Test the built files locally using `npm run preview`
4. Ensure all routes are handled by the SPA redirect

---

**Need help?** Check the build logs in your Netlify dashboard for specific error messages!