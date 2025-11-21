# Local Development & Deployment Workflow

## ✅ Yes, You Can Make Changes Locally and Push to Git!

Your setup is configured for automatic deployment. Here's how it works:

---

## 🔄 Your Current Workflow

### 1. **Make Changes Locally**
- Edit your code in your IDE
- Test locally using `npm run dev`
- Your local `.env` file uses: `VITE_API_URL=https://two9-team-rocket.onrender.com`

### 2. **Commit and Push**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 3. **Automatic Deployment**
- Render detects the push (because of `autoDeployTrigger: commit` in `render.yaml`)
- Automatically builds and deploys your changes
- Takes 3-5 minutes for deployment

---

## 🔒 Important: Environment Variables

### ✅ What's Protected (Not in Git)
Your `.gitignore` correctly excludes:
- `.env` files (contains your Supabase keys)
- `node_modules/`
- `dist/` (build output)

### ⚙️ Environment Variables in Render

**You MUST set these in Render Dashboard** (not just in `.env` file):

#### Backend Service (`29-team-rocket`):
1. Go to https://render.com/dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Set these variables:
   - `SUPABASE_URL` = `https://ovisawqwfapvmedivuam.supabase.co`
   - `SUPABASE_ANON_KEY` = `sb_publishable_EMqpn0IxVO1CpA3Su2l-FQ_8vsM_O0d`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your full key)
   - `NODE_ENV` = `production`
   - `PORT` = `10000`

#### Frontend Service (`food-delivery-frontend`):
1. Go to https://render.com/dashboard
2. Click on your frontend service
3. Go to "Environment" tab
4. Set these variables:
   - `VITE_API_URL` = `https://two9-team-rocket.onrender.com`
   - `NODE_ENV` = `production`

**⚠️ Important**: These environment variables are stored in Render, NOT in your Git repository. This is correct and secure!

---

## 📝 Typical Development Workflow

### Step 1: Make Changes Locally
```bash
# 1. Make your code changes
# Edit files in your IDE

# 2. Test locally
npm run dev
# Visit http://localhost:5173 (or whatever port Vite shows)
```

### Step 2: Test Your Changes
- Test the feature you're working on
- Check browser console for errors
- Verify API calls work (they'll go to your Render backend)

### Step 3: Commit and Push
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add new feature: [describe what you did]"

# Push to GitHub
git push origin main
```

### Step 4: Monitor Deployment
1. Go to https://render.com/dashboard
2. Watch your services deploy automatically
3. Check the "Logs" tab if there are any issues
4. Wait 3-5 minutes for deployment to complete

### Step 5: Verify on Production
- Visit your deployed frontend URL
- Test the changes you made
- Check that everything works as expected

---

## 🎯 Best Practices

### ✅ DO:
- ✅ Test locally before pushing
- ✅ Write clear commit messages
- ✅ Push frequently (small commits are better)
- ✅ Check Render logs if deployment fails
- ✅ Keep environment variables in Render dashboard (not in Git)

### ❌ DON'T:
- ❌ Commit `.env` files (already in `.gitignore`)
- ❌ Commit `node_modules/` (already in `.gitignore`)
- ❌ Commit sensitive keys or passwords
- ❌ Push broken code (test first!)

---

## 🔍 Checking Your Setup

### Verify `.env` is Ignored:
```bash
git status
# Should NOT show .env file
```

### Verify Environment Variables in Render:
1. Go to Render dashboard
2. Click on each service
3. Go to "Environment" tab
4. Verify all required variables are set

---

## 🐛 Troubleshooting

### Issue: Changes Not Deploying
**Solution**: 
- Check Render dashboard for deployment status
- Verify `autoDeployTrigger: commit` is in `render.yaml`
- Check if there are any build errors in Render logs

### Issue: Build Fails on Render
**Solution**:
- Check Render logs for specific error
- Test build locally: `npm run build`
- Verify all dependencies are in `package.json`

### Issue: Environment Variables Not Working
**Solution**:
- Verify variables are set in Render dashboard (not just `.env`)
- Restart the service after adding new variables
- Check variable names match exactly (case-sensitive)

### Issue: Local vs Production Differences
**Solution**:
- Local uses `.env` file
- Production uses Render environment variables
- Make sure both are configured correctly

---

## 📊 Quick Reference

| Action | Local | Production |
|--------|-------|------------|
| **Environment File** | `.env` | Render Dashboard |
| **API URL** | `VITE_API_URL` in `.env` | `VITE_API_URL` in Render |
| **Test** | `npm run dev` | Visit deployed URL |
| **Deploy** | N/A | Automatic on `git push` |

---

## 🚀 Example Workflow

```bash
# 1. Make a change (e.g., update a component)
# Edit src/components/Login.jsx

# 2. Test locally
npm run dev
# Test in browser at http://localhost:5173

# 3. If it works, commit and push
git add src/components/Login.jsx
git commit -m "Update login form styling"
git push origin main

# 4. Wait for Render to deploy (3-5 min)
# Check https://render.com/dashboard

# 5. Verify on production
# Visit https://food-delivery-frontend.onrender.com
```

---

## ✅ Summary

**Yes, your workflow will work perfectly!**

1. ✅ `.env` is in `.gitignore` (secure)
2. ✅ `autoDeployTrigger: commit` is set (auto-deploy)
3. ✅ Environment variables need to be in Render dashboard
4. ✅ Just push to Git and Render deploys automatically

**Your workflow**: Make changes → Test locally → Push to Git → Auto-deploy to Render → Done! 🎉

