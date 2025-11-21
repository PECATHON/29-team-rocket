# 🚀 DigitalOcean Gradient AI - Quick Start

Your chatbot is now configured for **DigitalOcean Gradient AI ONLY**.

## ✅ What You Need

You need **TWO** things from DigitalOcean:

1. **Agent Endpoint** - From your agent's Overview page
2. **Access Key** - From your agent's Settings page

---

## 🎯 Quick Setup (3 Steps)

### Step 1: Create Agent & Get Endpoint

1. Go to https://cloud.digitalocean.com/gradient
2. Click **"Create Agent"**
3. Fill in name and instructions
4. Click **"Create"**
5. On the **Overview** page, find **"ENDPOINT"** section
6. **Copy the endpoint URL** (make sure it's set to "Public")
7. This is your `DIGITALOCEAN_AGENT_ENDPOINT`

### Step 2: Get Access Key

1. Go to your agent's **Settings** tab
2. Find **"Endpoint Access Keys"** section
3. Click **"Create Key"**
4. Give it a name and click **"Create"**
5. **⚠️ Copy the key immediately!** (You won't see it again)
6. This is your `DIGITALOCEAN_AGENT_ACCESS_KEY`

### Step 3: Add to Environment Variables

**Local (`server/.env`):**
```env
DIGITALOCEAN_AGENT_ENDPOINT=https://api.gradient.ai/v1/agents/your-agent-id
DIGITALOCEAN_AGENT_ACCESS_KEY=grad_live_your_key_here
```

**Production (Render):**
- Go to Render Dashboard → Your backend service
- **Environment** tab → Add both variables
- Save and restart

---

## ✅ Test It!

```bash
# Start backend
cd server && npm run dev

# Test API
curl -X POST http://localhost:5000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

---

## 📖 Full Guide

For detailed instructions, see: **`DIGITALOCEAN_SETUP_GUIDE.md`**

---

## 🐛 Common Issues

**"Not configured" error?**
- Check both variables are set
- Restart server after adding variables

**"Authentication failed" (401)?**
- Verify access key is correct
- Try generating a new key

**"Endpoint not found" (404)?**
- Check endpoint URL is complete
- Ensure endpoint is set to "Public"

---

**That's it!** Your chatbot will now use DigitalOcean Gradient AI! 🎉

