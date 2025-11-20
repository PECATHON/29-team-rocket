# 🚀 Complete Deployment Guide - Render

## Overview

This guide will help you deploy your food delivery app to Render, making it accessible 24/7.

## Architecture

```
Frontend (Vite/React) → Deploy to Render Static Site
    ↓
Backend (Express/Node) → Deploy to Render Web Service
    ↓
Supabase (Database + Auth) → Already in cloud
```

## Part 1: Deploy Backend to Render

### Step 1: Push Code to GitHub

If not already done:

```bash
# In project root
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Verify email

### Step 3: Deploy Backend Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `29-team-rocket`
3. Configure:

   **Basic Settings:**
   - **Name**: `food-delivery-server`
   - **Region**: Choose closest (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: `server` ⚠️ **IMPORTANT!**
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

   **Environment Variables:**
   Click "Add Environment Variable" for each:

   ```
   NODE_ENV = production
   PORT = 10000
   SUPABASE_URL = https://ovisawqwfapvmedivuam.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzAyNjYsImV4cCI6MjA3OTI0NjI2Nn0.Ose6e0ndw7bL-DEpZrNMhMyh3hB92WGq_9xYvIhXQDU
  SUPABASE_SERVICE_ROLE_KEY = [Get from Supabase Dashboard → Settings → API → service_role] 
   ```

4. Click **"Create Web Service"**
5. Wait 2-5 minutes for deployment

### Step 4: Get Your Backend URL

After deployment, you'll get a URL like:
```
https://food-delivery-server.onrender.com
```

**Save this URL!** You'll need it for the frontend.

## Part 2: Update Frontend for Production

### Step 1: Create Frontend .env File

Create `.env` in the project root (not in `server/`):

```env
VITE_API_URL=https://food-delivery-server.onrender.com
```

Replace with your actual Render backend URL.

### Step 2: Test Locally

```bash
# In project root (not server/)
npm run dev
```

Your frontend will now call the deployed backend instead of localhost.

## Part 3: Deploy Frontend to Render

### Option A: Static Site (Recommended)

1. Build your frontend:
   ```bash
   npm run build
   ```

2. In Render dashboard:
   - Click **"New +"** → **"Static Site"**
   - Connect GitHub repository
   - Configure:
     - **Name**: `food-delivery-app`
     - **Branch**: `main`
     - **Root Directory**: `.` (root)
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

3. **Environment Variables:**
   ```
   VITE_API_URL = https://food-delivery-server.onrender.com
   ```

4. Click **"Create Static Site"**

### Option B: Web Service (Alternative)

If you need server-side rendering or more control:

1. Click **"New +"** → **"Web Service"**
2. Configure:
   - **Root Directory**: `.`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l 10000`
3. Add environment variables as above

## Part 4: Verify Deployment

### Test Backend

```bash
curl https://food-delivery-server.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "..."
}
```

### Test Frontend

Visit your frontend URL and test:
- Signup
- Login
- Create vendor
- List vendors

## Environment Variables Summary

### Backend (Render Web Service)
- `NODE_ENV=production`
- `PORT=10000`
- `SUPABASE_URL=...`
- `SUPABASE_ANON_KEY=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`

### Frontend (Render Static Site)
- `VITE_API_URL=https://food-delivery-server.onrender.com`

## Render Free Tier Notes

- ✅ 750 hours/month (enough for 24/7)
- ✅ Free SSL (HTTPS)
- ✅ Auto-deploy on git push
- ⚠️ Backend spins down after 15 min inactivity (~30s wake time)
- ⚠️ 512MB RAM limit

## Troubleshooting

### Backend Won't Start

**Check logs in Render dashboard:**
- Verify environment variables are set
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Ensure `Root Directory` is set to `server`

### Frontend Can't Connect

**Check:**
- `VITE_API_URL` matches your backend URL
- Backend is running (check Render dashboard)
- CORS is enabled (already done in your code)

### Slow First Request

- Normal on free tier (waking up)
- Subsequent requests are fast
- Upgrade to paid for always-on

## Next Steps

1. ✅ Deploy backend
2. ✅ Update frontend `.env`
3. ✅ Deploy frontend
4. ✅ Test everything
5. ✅ Share your live app! 🎉

## URLs After Deployment

- **Backend API**: `https://food-delivery-server.onrender.com`
- **Frontend App**: `https://food-delivery-app.onrender.com`
- **API Endpoints**:
  - `https://food-delivery-server.onrender.com/api/health`
  - `https://food-delivery-server.onrender.com/api/auth/signup`
  - `https://food-delivery-server.onrender.com/api/vendors`

## Support

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com

