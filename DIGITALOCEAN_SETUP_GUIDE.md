# 🚀 DigitalOcean Gradient AI Setup Guide

Complete step-by-step guide to get your DigitalOcean Gradient AI chatbot working.

## 📋 Prerequisites

1. **DigitalOcean Account**: Sign up at https://www.digitalocean.com/
2. **Access to Gradient AI Platform**: Available in your DigitalOcean dashboard

---

## 🎯 Step-by-Step Setup

### Step 1: Access Gradient AI Platform

1. **Log in** to your DigitalOcean account
2. Navigate to **Gradient AI Platform** or go to: https://cloud.digitalocean.com/gradient
3. If you don't see it, check if Gradient AI is available in your region

---

### Step 2: Create an AI Agent

1. **Click "Create Agent"** or **"New Agent"** button
2. **Fill in Agent Details:**
   - **Name**: `Food Delivery Assistant` (or your preferred name)
   - **Instructions**: 
     ```
     You are a helpful assistant for a food delivery application. 
     Help users with:
     - Menu inquiries and food recommendations
     - Order status and tracking
     - Restaurant information
     - Delivery times and options
     - General food delivery questions
     - Troubleshooting issues
     
     Be friendly, concise, and helpful. If you don't know something, 
     politely direct users to contact support.
     ```
   - **Model Selection**: Choose a foundation model (e.g., Llama 3.3, Claude, GPT-4)
   - **Knowledge Base** (Optional): You can add a knowledge base later
3. **Click "Create Agent"** or **"Save"**

---

### Step 3: Get Your Agent Endpoint

1. **Go to your Agent's Overview page**
2. **Find the "ENDPOINT" section**
3. **Copy the endpoint URL** - it looks like:
   ```
   https://api.gradient.ai/v1/agents/your-agent-id
   ```
   or
   ```
   https://your-workspace.gradient.ai/agents/your-agent-id
   ```
4. **Make sure the endpoint is set to "Public"**:
   - Click **"Edit"** in the ENDPOINT section
   - Select **"Public"**
   - Save changes

**This is your `DIGITALOCEAN_AGENT_ENDPOINT`**

---

### Step 4: Generate Access Key

1. **Go to your Agent's Settings tab**
2. **Find "Endpoint Access Keys" section**
3. **Click "Create Key"**
4. **Provide a name** (e.g., "Food Delivery App Key")
5. **Click "Create"**
6. **⚠️ IMPORTANT: Copy the access key immediately!**
   - It will look like: `grad_live_abc123xyz789...`
   - **You won't be able to see it again!**
   - Store it securely

**This is your `DIGITALOCEAN_AGENT_ACCESS_KEY`**

---

### Step 5: Configure Environment Variables

#### Local Development (`server/.env`):

Add these two variables:

```env
# DigitalOcean Gradient AI Configuration
DIGITALOCEAN_AGENT_ENDPOINT=https://api.gradient.ai/v1/agents/your-agent-id
DIGITALOCEAN_AGENT_ACCESS_KEY=grad_live_your_access_key_here
```

**Example:**
```env
DIGITALOCEAN_AGENT_ENDPOINT=https://api.gradient.ai/v1/agents/abc123def456
DIGITALOCEAN_AGENT_ACCESS_KEY=grad_live_xyz789abc123def456ghi789
```

**Important Notes:**
- ✅ **No trailing slash** on the endpoint URL
- ✅ **Full endpoint URL** (not just the agent ID)
- ✅ **Complete access key** (starts with `grad_live_` or similar)

#### Production (Render Dashboard):

1. Go to https://render.com/dashboard
2. Click on your backend service (`29-team-rocket`)
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add these two variables:
   - `DIGITALOCEAN_AGENT_ENDPOINT` = `your_endpoint_url_here`
   - `DIGITALOCEAN_AGENT_ACCESS_KEY` = `your_access_key_here`
6. Click **Save Changes**
7. **Restart your service** (Render will do this automatically)

---

## ✅ Step 6: Test Your Setup

### Test Locally:

1. **Start your backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Test the API endpoint:**
   ```bash
   curl -X POST http://localhost:5000/api/chatbot \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, can you help me?"}'
   ```

3. **You should receive a response** from your DigitalOcean AI agent!

### Test in Frontend:

1. **Start your frontend:**
   ```bash
   npm run dev
   ```

2. **Open your app** in the browser
3. **Click the chat button** (bottom-right corner)
4. **Send a test message**
5. **You should see the AI response!**

---

## 🔍 Troubleshooting

### Error: "DigitalOcean Gradient AI is not configured"

**Solution:**
- Check that both `DIGITALOCEAN_AGENT_ENDPOINT` and `DIGITALOCEAN_AGENT_ACCESS_KEY` are set
- Verify variable names are correct (case-sensitive)
- Restart your server after adding variables
- Check `server/.env` file exists and has the variables

### Error: "Authentication failed" (401)

**Solution:**
- Verify your `DIGITALOCEAN_AGENT_ACCESS_KEY` is correct
- Check that you copied the complete key (no truncation)
- Ensure the key hasn't expired or been revoked
- Try generating a new access key

### Error: "Agent endpoint not found" (404)

**Solution:**
- Verify your `DIGITALOCEAN_AGENT_ENDPOINT` is correct
- Check that the endpoint URL is complete (not just the agent ID)
- Ensure the endpoint is set to "Public" in the DigitalOcean dashboard
- Remove any trailing slashes from the endpoint URL

### Error: "Unable to reach DigitalOcean AI service" (503)

**Solution:**
- Check your internet connection
- Verify the endpoint URL is accessible
- Check DigitalOcean service status
- Ensure the endpoint is set to "Public"

### Chatbot Not Appearing

**Solution:**
- Check browser console for errors
- Verify backend is running
- Check `VITE_API_URL` is set correctly
- Ensure frontend can reach the backend

---

## 📝 Environment Variables Summary

You need **TWO** environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DIGITALOCEAN_AGENT_ENDPOINT` | Full endpoint URL from agent overview | `https://api.gradient.ai/v1/agents/abc123` |
| `DIGITALOCEAN_AGENT_ACCESS_KEY` | Access key from agent settings | `grad_live_xyz789...` |

---

## 🎨 Customizing Your Agent

### Update Agent Instructions:

1. Go to your agent in DigitalOcean dashboard
2. Click **"Edit"** or **"Settings"**
3. Update the **Instructions** field
4. Save changes

### Change Model:

1. Go to agent settings
2. Select a different foundation model
3. Save changes

---

## 🔒 Security Best Practices

- ✅ **Never commit** access keys to Git
- ✅ **Always use** environment variables
- ✅ **Use different keys** for development and production
- ✅ **Rotate keys** periodically
- ✅ **Don't share** access keys publicly
- ✅ **Store keys** securely (use password managers)

---

## 📊 API Request Format

Your chatbot uses this format:

```javascript
POST {DIGITALOCEAN_AGENT_ENDPOINT}/api/v1/chat/completions
Headers:
  Authorization: Bearer {DIGITALOCEAN_AGENT_ACCESS_KEY}
  Content-Type: application/json

Body:
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant..."
    },
    {
      "role": "user",
      "content": "User message here"
    }
  ],
  "stream": false
}
```

---

## ✅ Checklist

- [ ] DigitalOcean account created
- [ ] Gradient AI agent created
- [ ] Agent endpoint copied (from Overview page)
- [ ] Endpoint set to "Public"
- [ ] Access key generated (from Settings)
- [ ] Access key copied and stored securely
- [ ] Environment variables added to `server/.env`
- [ ] Environment variables added to Render dashboard
- [ ] Backend server restarted
- [ ] API endpoint tested with curl
- [ ] Frontend chatbot tested

---

## 🎉 You're Done!

Your DigitalOcean Gradient AI chatbot should now be working!

**Need Help?**
- Check the troubleshooting section above
- Verify your environment variables are set correctly
- Test the API endpoint directly with curl
- Check DigitalOcean dashboard for agent status

**Questions?** Refer to [DigitalOcean Gradient AI Documentation](https://docs.digitalocean.com/products/gradient-ai-platform/)

