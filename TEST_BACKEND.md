# 🧪 Test Your Render Backend

## Quick Test (PowerShell)

Since `curl` isn't available in PowerShell by default, use this command:

```powershell
Invoke-WebRequest -Uri "https://food-delivery-server.onrender.com/api/health" -Method GET -UseBasicParsing
```

Or to see just the response:

```powershell
(Invoke-WebRequest -Uri "https://food-delivery-server.onrender.com/api/health" -UseBasicParsing).Content
```

## Expected Response

If your backend is deployed and running, you should see:

```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-..."
}
```

## Troubleshooting

### Error: "Unable to connect" or "Not Found"

**Possible causes:**
1. **Backend not deployed yet** - You need to deploy it first on Render
2. **Wrong URL** - Check your Render dashboard for the correct URL
3. **Backend still deploying** - Wait a few minutes and try again
4. **Backend crashed** - Check Render logs

### Check Deployment Status

1. Go to https://render.com/dashboard
2. Click on your backend service
3. Check the status:
   - ✅ **Live** = Running and accessible
   - 🟡 **Building** = Still deploying (wait)
   - ❌ **Failed** = Check logs for errors

### If Backend Isn't Deployed Yet

Follow the deployment guide:
1. Go to `DEPLOYMENT_GUIDE.md` or `RENDER_QUICK_START.md`
2. Complete Step 1: Deploy Backend
3. Wait for deployment to finish
4. Then test again

## Alternative: Test in Browser

Simply open this URL in your browser:
```
https://food-delivery-server.onrender.com/api/health
```

You should see JSON response if it's working.

