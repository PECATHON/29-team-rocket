# 🤖 Chatbot Quick Start

Your chatbot is configured for **DigitalOcean Gradient AI ONLY**.

## ✅ What's Already Done

- ✅ Chatbot component created (`src/components/Chatbot.jsx`)
- ✅ Chatbot styling added (`src/components/Chatbot.css`)
- ✅ Backend API endpoint created (`/api/chatbot`)
- ✅ Chatbot added to App.jsx (visible on all pages)
- ✅ **DigitalOcean Gradient AI integration**
- ✅ Dependencies installed (`axios`)

## 🚀 Quick Setup

### DigitalOcean Gradient AI Setup

You need **TWO** things from DigitalOcean:

1. **Agent Endpoint** - From agent Overview page
2. **Access Key** - From agent Settings page

**Quick Steps:**

1. **Create Agent:**
   - Go to https://cloud.digitalocean.com/gradient
   - Click "Create Agent"
   - Fill in details and create

2. **Get Endpoint:**
   - Go to agent Overview page
   - Copy the ENDPOINT URL (set to "Public")
   - This is `DIGITALOCEAN_AGENT_ENDPOINT`

3. **Get Access Key:**
   - Go to agent Settings tab
   - "Endpoint Access Keys" → "Create Key"
   - Copy the key (you won't see it again!)
   - This is `DIGITALOCEAN_AGENT_ACCESS_KEY`

4. **Add to `server/.env`:**
   ```env
   DIGITALOCEAN_AGENT_ENDPOINT=https://api.gradient.ai/v1/agents/your-id
   DIGITALOCEAN_AGENT_ACCESS_KEY=grad_live_your_key_here
   ```

5. **For Production (Render):**
   - Add both variables in Render Dashboard
   - Save and restart

**📖 For detailed instructions, see: `DIGITALOCEAN_SETUP_GUIDE.md`**

---

## ✅ Test It!

1. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Look for chat button** (bottom-right corner)
4. **Click and send a message!**

---

## 📖 Full Documentation

- **Complete Setup Guide:** `DIGITALOCEAN_SETUP_GUIDE.md` ⭐
- **Quick Reference:** `DIGITALOCEAN_QUICK_START.md`

---

## 🎨 Features

- ✨ Beautiful floating chat button
- 💬 Real-time AI conversations
- 🎯 Multiple AI provider support
- 📱 Fully responsive design
- ⚡ Fast and smooth animations
- 🔒 Secure API integration
- 🎭 Mock mode for testing

---

## 🐛 Troubleshooting

**"Not configured" error?**
- Check both `DIGITALOCEAN_AGENT_ENDPOINT` and `DIGITALOCEAN_AGENT_ACCESS_KEY` are set
- Restart server after adding variables

**"Authentication failed"?**
- Verify access key is correct
- Try generating a new key

**"Endpoint not found"?**
- Check endpoint URL is complete
- Ensure endpoint is set to "Public" in DigitalOcean dashboard

---

**Ready to go!** Follow the setup steps above to get your DigitalOcean credentials! 🚀
