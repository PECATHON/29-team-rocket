# 📝 Step 2: Update Frontend for Production API

## Overview

You need to tell your frontend to use your deployed Render backend instead of `localhost:5000`.

## Step-by-Step Instructions

### Step 1: Get Your Backend URL from Render

1. Go to your Render dashboard: https://render.com/dashboard
2. Click on your backend service (e.g., `food-delivery-server`)
3. Copy the URL at the top (looks like: `https://food-delivery-server.onrender.com`)
4. **Save this URL** - you'll need it!

### Step 2: Create `.env` File in Project Root

**Important:** The `.env` file goes in the **project root** (same level as `package.json`), NOT in the `server/` folder.

1. In your project root (`29-team-rocket/`), create a new file named `.env`
2. Add this content:

```env
VITE_API_URL=https://food-delivery-server.onrender.com
```

**Replace `https://food-delivery-server.onrender.com` with your actual Render backend URL!**

### Step 3: Verify File Location

Your file structure should look like this:

```
29-team-rocket/
├── .env                    ← Create this file here (project root)
├── package.json
├── vite.config.js
├── src/
│   ├── api/
│   │   └── auth.js         ← Already uses VITE_API_URL
│   └── ...
└── server/
    ├── .env                ← Different file (for server)
    └── ...
```

### Step 4: Test Locally

1. **Stop your frontend dev server** if it's running (Ctrl+C)

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Check the console** - you should see API calls going to your Render URL instead of localhost

4. **Test signup/login:**
   - Try signing up a new user
   - Check browser DevTools → Network tab
   - You should see requests to: `https://food-delivery-server.onrender.com/api/auth/signup`

### Step 5: Verify It's Working

**Option A: Check Browser Console**
1. Open your app in browser
2. Open DevTools (F12)
3. Go to Console tab
4. Look for API calls - they should show your Render URL

**Option B: Check Network Tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Try to signup/login
4. Look for requests - they should go to `https://your-backend.onrender.com`

**Option C: Test API Directly**
```bash
# Test your Render backend health endpoint
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

## How It Works

### Environment Variables in Vite

- Vite uses `VITE_` prefix for environment variables
- Variables are available as `import.meta.env.VITE_API_URL`
- `.env` file is automatically loaded by Vite
- Variables are embedded at build time

### Your Current Code

In `src/api/auth.js`, you already have:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';
```

This means:
- **If `.env` has `VITE_API_URL`** → Uses that (production)
- **If not** → Falls back to `localhost:5000` (development)

## Troubleshooting

### Problem: Still using localhost

**Solution:**
1. Make sure `.env` file is in project root (not `server/`)
2. Make sure variable name is exactly `VITE_API_URL` (case-sensitive)
3. Restart dev server after creating/updating `.env`
4. Check for typos in the URL

### Problem: CORS errors

**Solution:**
- Your backend already has CORS enabled
- If you see CORS errors, check that your backend URL is correct
- Verify backend is running on Render

### Problem: API calls failing

**Check:**
1. Backend is deployed and running on Render
2. Backend URL in `.env` is correct (no trailing slash)
3. Backend health endpoint works: `https://your-backend.onrender.com/api/health`
4. Check Render logs for backend errors

### Problem: Environment variable not loading

**Solution:**
1. Variable must start with `VITE_`
2. Restart dev server after changing `.env`
3. Clear browser cache
4. Check file is named exactly `.env` (not `.env.txt`)

## Example `.env` File

```env
# Frontend Environment Variables
# This file is for the React/Vite frontend

# Your Render backend URL (replace with your actual URL)
VITE_API_URL=https://food-delivery-server.onrender.com

# Note: No quotes needed, no spaces around =
```

## For Different Environments

### Development (Local)
```env
VITE_API_URL=http://localhost:5000
```

### Production (Render)
```env
VITE_API_URL=https://food-delivery-server.onrender.com
```

### Staging (Optional)
```env
VITE_API_URL=https://food-delivery-server-staging.onrender.com
```

## Next Steps

After updating `.env` and testing locally:

1. ✅ `.env` file created with Render backend URL
2. ✅ Tested locally - frontend connects to Render backend
3. ✅ Signup/login works with production API
4. ⏭️ Ready for Step 3: Deploy frontend to Render

## Quick Verification Commands

```bash
# 1. Check if .env file exists
ls -la .env

# 2. View .env contents (Windows PowerShell)
Get-Content .env

# 3. Test backend is accessible
curl https://food-delivery-server.onrender.com/api/health

# 4. Start dev server
npm run dev
```

## Common Mistakes to Avoid

❌ **Wrong location**: `.env` in `server/` folder (that's for backend)
✅ **Correct location**: `.env` in project root

❌ **Wrong variable name**: `API_URL` or `REACT_APP_API_URL`
✅ **Correct name**: `VITE_API_URL`

❌ **Quotes around value**: `VITE_API_URL="https://..."`
✅ **No quotes**: `VITE_API_URL=https://...`

❌ **Trailing slash**: `VITE_API_URL=https://.../`
✅ **No trailing slash**: `VITE_API_URL=https://...`

## Need Help?

If you're stuck:
1. Check browser console for errors
2. Check Network tab to see where requests are going
3. Verify backend URL is correct
4. Make sure backend is deployed and running

