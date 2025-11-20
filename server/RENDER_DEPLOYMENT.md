# Deploy to Render - Step by Step Guide

## Prerequisites

1. ✅ GitHub account (your code should be in a GitHub repository)
2. ✅ Render account (sign up at https://render.com - free tier available)
3. ✅ Supabase keys ready

## Step 1: Push Your Code to GitHub

If your code isn't on GitHub yet:

```bash
# In your project root
git init
git add .
git commit -m "Initial commit - Supabase migration complete"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended - easier integration)
3. Verify your email

## Step 3: Create New Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository: `29-team-rocket` (or your repo name)
4. Click **"Connect"**

## Step 4: Configure Service

Fill in these settings:

### Basic Settings
- **Name**: `food-delivery-server` (or any name you like)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server` (important! Your server code is in the server folder)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables

Click **"Add Environment Variable"** and add these:

1. **NODE_ENV**
   - Value: `production`

2. **PORT**
   - Value: `10000` (Render sets this automatically, but good to have)

3. **SUPABASE_URL**
   - Value: `https://ovisawqwfapvmedivuam.supabase.co`

4. **SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzAyNjYsImV4cCI6MjA3OTI0NjI2Nn0.Ose6e0ndw7bL-DEpZrNMhMyh3hB92WGq_9xYvIhXQDU`
   - Or use your actual anon key

5. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your service role key from Supabase Dashboard
   - ⚠️ **Keep this secret!** Don't share it publicly

### Advanced Settings (Optional)

- **Auto-Deploy**: `Yes` (deploys automatically on git push)
- **Health Check Path**: `/api/health`

## Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Start your server (`npm start`)
   - This takes 2-5 minutes

## Step 6: Get Your Live URL

After deployment succeeds, you'll get a URL like:
```
https://food-delivery-server.onrender.com
```

Your API will be available at:
- `https://food-delivery-server.onrender.com/api/health`
- `https://food-delivery-server.onrender.com/api/auth/signup`
- `https://food-delivery-server.onrender.com/api/vendors`
- etc.

## Step 7: Update Frontend

Update your frontend API calls from:
```javascript
const API_URL = 'http://localhost:5000/api/auth';
```

To:
```javascript
const API_URL = 'https://food-delivery-server.onrender.com/api/auth';
```

Or use environment variables:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';
```

## Render Free Tier Limits

- ✅ 750 hours/month (enough for 24/7 if you're the only user)
- ✅ Automatic SSL (HTTPS)
- ✅ Auto-deploy on git push
- ⚠️ Spins down after 15 minutes of inactivity (takes ~30 seconds to wake up)
- ⚠️ Limited to 512MB RAM

## Troubleshooting

### Deployment Fails

**Error: "Build failed"**
- Check build logs in Render dashboard
- Make sure `package.json` has correct `start` script
- Verify all dependencies are listed

**Error: "Service crashed"**
- Check logs in Render dashboard
- Verify environment variables are set correctly
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is correct

**Error: "Cannot find module"**
- Check that `node_modules` is in `.gitignore`
- Render will install dependencies automatically

### Service is Slow to Respond

- First request after inactivity takes ~30 seconds (waking up)
- Subsequent requests are fast
- Consider upgrading to paid plan for always-on service

### Environment Variables Not Working

- Make sure variables are set in Render dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after changing environment variables

## Custom Domain (Optional)

1. In Render dashboard → Your service → Settings
2. Scroll to "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

## Monitoring

- View logs: Render dashboard → Your service → Logs
- View metrics: Render dashboard → Your service → Metrics
- Set up alerts: Render dashboard → Your service → Alerts

## Next Steps

1. ✅ Deploy to Render
2. ✅ Test your live API endpoints
3. ✅ Update frontend to use production URL
4. ✅ Test signup/login on production
5. ✅ Monitor logs for any issues

## Support

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com
- Render Community: https://community.render.com

