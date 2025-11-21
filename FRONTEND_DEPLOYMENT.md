# Frontend Deployment Guide - Render

This guide will help you deploy your React frontend to Render.

## Prerequisites

✅ Backend already deployed at: `https://two9-team-rocket.onrender.com`  
✅ Frontend code is ready  
✅ Environment variables configured

## Step 1: Install Dependencies Locally (Optional Test)

First, install the new `serve` package:

```bash
npm install
```

Test the build locally:

```bash
npm run build
npm start
```

Visit `http://localhost:10000` to verify it works.

## Step 2: Deploy to Render

### Option A: Using Render Blueprint (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add frontend deployment configuration"
   git push origin main
   ```

2. **Go to Render Dashboard**:
   - Visit https://render.com/dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect `render.yaml` and create both services

3. **Configure Environment Variables**:
   - When the frontend service is created, go to its settings
   - Add environment variable:
     - Key: `VITE_API_URL`
     - Value: `https://two9-team-rocket.onrender.com`

4. **Deploy**:
   - Render will automatically build and deploy
   - Wait 3-5 minutes for the first deployment

### Option B: Manual Deployment

1. **Go to Render Dashboard**:
   - Visit https://render.com/dashboard
   - Click "New +" → "Web Service"

2. **Connect Repository**:
   - Select your GitHub repository
   - Click "Connect"

3. **Configure Service**:
   - **Name**: `food-delivery-frontend`
   - **Region**: `Oregon` (or your preferred region)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of repo)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   - Key: `VITE_API_URL`
   - Value: `https://two9-team-rocket.onrender.com`
   - Key: `NODE_ENV`
   - Value: `production`

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete (3-5 minutes)

## Step 3: Verify Deployment

1. **Get Your Frontend URL**:
   - After deployment, Render will provide a URL like:
     `https://food-delivery-frontend.onrender.com`

2. **Test the Application**:
   - Open the URL in your browser
   - Try signing up or logging in
   - Verify it connects to your backend

3. **Check Logs** (if issues):
   - Go to your service in Render dashboard
   - Click "Logs" tab
   - Look for any errors

## Step 4: Custom Domain (Optional)

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails

**Error**: `serve: command not found`
- **Fix**: Make sure `serve` is in `dependencies` (not `devDependencies`)

**Error**: `VITE_API_URL is not defined`
- **Fix**: Add `VITE_API_URL` environment variable in Render dashboard

### App Doesn't Connect to Backend

**Issue**: API calls fail
- **Check**: Verify `VITE_API_URL` is set correctly in Render
- **Check**: Verify backend is running and accessible
- **Check**: Browser console for CORS errors

### 404 Errors on Refresh

**Issue**: React Router routes return 404
- **Fix**: This is normal for SPAs. Render should handle this automatically with `serve -s`, but if not, you may need to configure redirects.

## Environment Variables Summary

### Frontend Service (Render)
```
VITE_API_URL=https://two9-team-rocket.onrender.com
NODE_ENV=production
```

### Backend Service (Already Deployed)
```
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
PORT=10000
```

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] `render.yaml` updated with frontend service
- [ ] `package.json` has `serve` in dependencies
- [ ] `package.json` has `start` script
- [ ] Frontend service created on Render
- [ ] `VITE_API_URL` environment variable set
- [ ] Deployment successful
- [ ] Frontend URL accessible
- [ ] Login/signup works
- [ ] Backend connection verified

## Next Steps

After successful deployment:

1. **Update CORS** (if needed):
   - Add your frontend URL to backend CORS settings

2. **Test All Features**:
   - Customer signup/login
   - Vendor signup/login
   - Food item management
   - All routes work correctly

3. **Monitor**:
   - Check Render logs regularly
   - Monitor backend health
   - Set up alerts if needed

## Support

If you encounter issues:
1. Check Render logs
2. Check browser console
3. Verify environment variables
4. Test backend API directly

---

**Your URLs**:
- Backend: `https://two9-team-rocket.onrender.com`
- Frontend: `https://food-delivery-frontend.onrender.com` (after deployment)

