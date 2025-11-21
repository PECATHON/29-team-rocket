# ⚡ Quick Start: Deploy to Render (5 minutes)

## Prerequisites

- ✅ Code pushed to GitHub
- ✅ Render account (sign up at render.com)

## Step 1: Deploy Backend (3 min)

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo: `29-team-rocket`
4. Fill in:

   ```
   Name: food-delivery-server
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

5. Add Environment Variables:

   ```
   SUPABASE_URL = https://ovisawqwfapvmedivuam.supabase.co
   SUPABASE_ANON_KEY = [your anon key]
     = [get from Supabase Dashboard → Settings → API]
   NODE_ENV = production
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (2-5 min)
8. **Copy your backend URL**: `https://food-delivery-server.onrender.com`

## Step 2: Update Frontend (1 min)

1. Create `.env` in project root:

   ```env
   VITE_API_URL=https://food-delivery-server.onrender.com
   ```

   (Replace with your actual Render backend URL)

2. Test locally:
   ```bash
   npm run dev
   ```

## Step 3: Deploy Frontend (1 min)

1. In Render: **"New +"** → **"Static Site"**
2. Connect same GitHub repo
3. Configure:

   ```
   Name: food-delivery-app
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. Add Environment Variable:

   ```
   VITE_API_URL = https://food-delivery-server.onrender.com
   ```

5. Click **"Create Static Site"**

## Done! 🎉

Your app is now live:
- Backend: `https://food-delivery-server.onrender.com`
- Frontend: `https://food-delivery-app.onrender.com`

## Troubleshooting

**Backend won't start?**
- Check Root Directory is `server`
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check logs in Render dashboard

**Frontend can't connect?**
- Verify `VITE_API_URL` matches backend URL
- Rebuild frontend after changing env vars

