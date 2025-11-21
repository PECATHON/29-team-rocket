# 🔧 Update Frontend Environment Variables

## Current Situation

You have a `.env` file in the project root, but it only has server/backend variables. You need to add the frontend API URL.

## Quick Fix

### Option 1: Add to Existing `.env` File

Open your `.env` file in the project root and **add this line**:

```env
# Frontend API URL (add this line)
VITE_API_URL=https://food-delivery-server.onrender.com
```

**Replace `https://food-delivery-server.onrender.com` with your actual Render backend URL!**

### Option 2: Complete `.env` File Example

Your complete `.env` file should look like this:

```env
# Frontend Configuration
VITE_API_URL=https://food-delivery-server.onrender.com

# Backend/Server Configuration (if you need these locally)
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=sb_publishable_EMqpn0IxVO1CpA3Su2l-FQ_8vsM_O0d
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY3MDI2NiwiZXhwIjoyMDc5MjQ2MjY2fQ.BX9ppmYCDQalr2SxzIiqEksv0V074qAXDAUNhXup2rI
PORT=5000
```

## Step-by-Step Instructions

### 1. Get Your Render Backend URL

1. Go to https://render.com/dashboard
2. Click on your backend service
3. Copy the URL (e.g., `https://food-delivery-server.onrender.com`)

### 2. Update `.env` File

1. Open `.env` in your project root
2. Add this line at the top:

   ```env
   VITE_API_URL=https://your-actual-render-url.onrender.com
   ```

3. Save the file

### 3. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

### 4. Verify It's Working

**Test 1: Check Console**
- Open browser DevTools (F12)
- Go to Console
- Try to signup/login
- Look for API calls - they should show your Render URL

**Test 2: Check Network Tab**
- Open DevTools (F12)
- Go to Network tab
- Try signup
- Click on the request
- Check "Request URL" - should be your Render URL

**Test 3: Direct API Test**
```bash
# Replace with your actual Render URL
curl https://food-delivery-server.onrender.com/api/health
```

## What Happens Now

### Before (Development)
- Frontend → `http://localhost:5000` (local server)

### After (Production)
- Frontend → `https://food-delivery-server.onrender.com` (Render backend)

### How It Works

Your code in `src/api/auth.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';
```

- **With `.env`**: Uses `VITE_API_URL` from `.env` → Production API
- **Without `.env`**: Falls back to `localhost:5000` → Development API

## Important Notes

1. **File Location**: `.env` must be in project root (same level as `package.json`)
2. **Variable Name**: Must be exactly `VITE_API_URL` (Vite requires `VITE_` prefix)
3. **No Quotes**: Don't use quotes around the URL
4. **No Trailing Slash**: Don't add `/` at the end
5. **Restart Required**: Always restart dev server after changing `.env`

## Troubleshooting

### Still using localhost?

1. ✅ Check `.env` file is in project root
2. ✅ Variable name is `VITE_API_URL` (not `API_URL`)
3. ✅ Restarted dev server after updating `.env`
4. ✅ No typos in the URL

### CORS errors?

- Your backend has CORS enabled
- If you see CORS errors, verify backend URL is correct
- Check backend is actually running on Render

### Can't connect to backend?

1. Test backend directly: `curl https://your-backend.onrender.com/api/health`
2. Check Render dashboard - is service running?
3. Verify URL has no typos
4. Check Render logs for errors

## Example: Complete Workflow

```bash
# 1. Get your Render backend URL
# (from Render dashboard)

# 2. Update .env file
# Add: VITE_API_URL=https://food-delivery-server.onrender.com

# 3. Restart dev server
npm run dev

# 4. Test in browser
# Open app → Try signup → Check Network tab → Should see Render URL
```

## Next: Deploy Frontend

Once you've verified the frontend works with your Render backend:

1. ✅ Frontend connects to Render backend
2. ✅ Signup/login works
3. ⏭️ Ready to deploy frontend to Render (Step 3)

