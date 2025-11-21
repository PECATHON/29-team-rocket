# ✅ Render Deployment Checklist

## Before Deployment

- [ ] Code is pushed to GitHub
- [ ] All environment variables documented
- [ ] `.env` files are in `.gitignore`
- [ ] Frontend API URL uses environment variable
- [ ] Backend has proper error handling

## Backend Deployment Steps

- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `server`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `SUPABASE_URL=...`
  - [ ] `SUPABASE_ANON_KEY=...`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY=...`
- [ ] Deploy and wait for success
- [ ] Test health endpoint: `https://your-app.onrender.com/api/health`
- [ ] Save backend URL

## Frontend Updates

- [ ] Create `.env` file with `VITE_API_URL=your-backend-url`
- [ ] Test locally with production API
- [ ] Build frontend: `npm run build`
- [ ] Verify `dist` folder is created

## Frontend Deployment Steps

- [ ] Create new Static Site in Render
- [ ] Connect GitHub repository
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Publish Directory: `dist`
- [ ] Add environment variable: `VITE_API_URL=your-backend-url`
- [ ] Deploy and wait for success
- [ ] Test frontend URL

## Post-Deployment Testing

- [ ] Test signup endpoint
- [ ] Test login endpoint
- [ ] Test vendor creation
- [ ] Test vendor listing
- [ ] Test protected routes
- [ ] Check Render logs for errors
- [ ] Verify database connection

## Troubleshooting

If something fails:
- [ ] Check Render deployment logs
- [ ] Verify environment variables
- [ ] Check Supabase dashboard for errors
- [ ] Test API endpoints with curl/Postman
- [ ] Review server logs in Render dashboard

## Success Criteria

- ✅ Backend responds to health check
- ✅ Frontend loads without errors
- ✅ Signup works
- ✅ Login works
- ✅ Vendors CRUD works
- ✅ No errors in Render logs

