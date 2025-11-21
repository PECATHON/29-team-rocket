# Your Website URLs

## 🌐 Current URLs

### Backend API (Already Deployed)
**URL**: `https://two9-team-rocket.onrender.com`

**Status**: ✅ Already deployed and working

**What it does**: 
- Handles authentication (signup, login, logout)
- Manages vendor data
- Provides API endpoints for your app

**Test it**: 
- Health check: https://two9-team-rocket.onrender.com/api/health
- API base: https://two9-team-rocket.onrender.com/api

---

### Frontend Website (After Deployment)
**URL**: `https://food-delivery-frontend.onrender.com`

**Status**: ⏳ Will be available after deployment

**What it is**: 
- Your main website/application
- User interface for customers and vendors
- React application that connects to your backend

**Note**: The exact URL might vary slightly based on:
- Service name availability
- Render's URL generation
- You can always check in Render dashboard after deployment

---

## 📍 How to Find Your Exact URLs

### After Deployment:

1. **Go to Render Dashboard**: https://render.com/dashboard

2. **Find Your Services**:
   - **Backend**: Look for service named `29-team-rocket` or `two9-team-rocket`
   - **Frontend**: Look for service named `food-delivery-frontend`

3. **Click on Each Service**:
   - The URL will be displayed at the top of the service page
   - Format: `https://[service-name].onrender.com`

4. **Copy the URLs**:
   - Backend URL: Use this for `VITE_API_URL` in frontend environment variables
   - Frontend URL: This is your main website URL

---

## 🔗 URL Structure

```
Backend API:
https://two9-team-rocket.onrender.com
├── /api/health          (Health check)
├── /api/auth           (Authentication)
│   ├── /signup
│   ├── /login
│   ├── /logout
│   └── /me
└── /api/vendors        (Vendor management)

Frontend Website:
https://food-delivery-frontend.onrender.com
├── /                   (Home page)
├── /login              (Login/Signup)
├── /dashboard          (Vendor dashboard)
└── /products           (Food items management)
```

---

## 🎯 Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| **Backend** | `https://two9-team-rocket.onrender.com` | API Server |
| **Frontend** | `https://food-delivery-frontend.onrender.com` | Website/App |

---

## ⚙️ Environment Variables Needed

### Frontend Service (Set in Render Dashboard):
```
VITE_API_URL=https://two9-team-rocket.onrender.com
NODE_ENV=production
```

### Backend Service (Already Set):
```
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
PORT=10000
```

---

## 🚀 After Deployment Checklist

- [ ] Frontend service deployed on Render
- [ ] Frontend URL accessible in browser
- [ ] `VITE_API_URL` environment variable set correctly
- [ ] Can access login page
- [ ] Can sign up as customer
- [ ] Can sign up as vendor
- [ ] Vendor dashboard loads correctly
- [ ] Backend API calls work from frontend

---

## 💡 Custom Domain (Optional)

You can add a custom domain later:

1. Go to your service in Render dashboard
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `myfoodapp.com`)
4. Follow DNS configuration instructions

---

## 📝 Notes

- **Free Tier**: Services may take ~30 seconds to wake up after inactivity
- **URL Format**: Render URLs are always `https://[service-name].onrender.com`
- **HTTPS**: All Render URLs use HTTPS automatically
- **Region**: Your services are in Singapore region

---

**Your Main Website**: `https://food-delivery-frontend.onrender.com` (after deployment)

