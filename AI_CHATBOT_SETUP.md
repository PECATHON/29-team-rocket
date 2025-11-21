# 🤖 AI Chatbot Setup Guide

Your chatbot supports **multiple AI providers**! Choose the one that's easiest for you to set up.

## 🎯 Quick Setup Options

### Option 1: OpenAI (Recommended - Easiest) ⭐

**Why OpenAI?**
- ✅ Most accessible and well-documented
- ✅ Free tier available ($5 credit)
- ✅ Fast setup (5 minutes)
- ✅ Reliable and widely used

**Steps:**

1. **Get API Key:**
   - Go to https://platform.openai.com/
   - Sign up or log in
   - Go to **API Keys** → **Create new secret key**
   - Copy the key (starts with `sk-`)

2. **Add to Environment Variables:**

   **Local (`server/.env`):**
   ```env
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   ```

   **Production (Render Dashboard):**
   - Go to your backend service → **Environment**
   - Add `OPENAI_API_KEY` = `sk-your-key-here`
   - Add `OPENAI_MODEL` = `gpt-3.5-turbo` (optional, defaults to this)
   - Save and restart

3. **Done!** Your chatbot will now use OpenAI.

**Models Available:**
- `gpt-3.5-turbo` (cheapest, fast) - Recommended
- `gpt-4` (more capable, more expensive)
- `gpt-4-turbo` (best balance)

---

### Option 2: Anthropic Claude

**Why Anthropic?**
- ✅ Excellent for longer conversations
- ✅ Free tier available
- ✅ Great reasoning capabilities

**Steps:**

1. **Get API Key:**
   - Go to https://console.anthropic.com/
   - Sign up or log in
   - Go to **API Keys** → **Create Key**
   - Copy the key (starts with `sk-ant-`)

2. **Add to Environment Variables:**

   **Local (`server/.env`):**
   ```env
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ANTHROPIC_MODEL=claude-3-haiku-20240307
   ```

   **Production (Render Dashboard):**
   - Add `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
   - Add `ANTHROPIC_MODEL` = `claude-3-haiku-20240307` (optional)
   - Save and restart

**Models Available:**
- `claude-3-haiku-20240307` (fastest, cheapest)
- `claude-3-sonnet-20240229` (balanced)
- `claude-3-opus-20240229` (most capable)

---

### Option 3: DigitalOcean Gradient AI

**Steps:**

1. **Get Credentials:**
   - Go to https://www.digitalocean.com/gradientai
   - Create an account
   - Create an AI agent
   - Get API key, Workspace ID, and Agent ID

2. **Add to Environment Variables:**

   **Local (`server/.env`):**
   ```env
   DIGITALOCEAN_GRADIENT_API_KEY=your_api_key
   DIGITALOCEAN_GRADIENT_WORKSPACE_ID=your_workspace_id
   DIGITALOCEAN_GRADIENT_AGENT_ID=your_agent_id
   ```

   **Production (Render Dashboard):**
   - Add all three variables
   - Save and restart

---

### Option 4: Mock Mode (No API Key Needed) 🎭

**For Testing Only**

If you don't add any API keys, the chatbot will work in **Mock Mode** with simple keyword-based responses. This is perfect for:
- ✅ Testing the UI
- ✅ Development without API costs
- ✅ Demonstrating the feature

**No setup needed!** Just start the server and it will work.

---

## 🔄 How It Works

The chatbot automatically tries providers in this order:

1. **OpenAI** (if `OPENAI_API_KEY` is set)
2. **Anthropic** (if `ANTHROPIC_API_KEY` is set)
3. **DigitalOcean** (if `DIGITALOCEAN_GRADIENT_API_KEY` is set)
4. **Mock Mode** (if none are set)

**You only need ONE API key** - the first one found will be used!

---

## ✅ Testing

### Test Locally:

1. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Chatbot:**
   - Click the chat button (bottom-right)
   - Send a message
   - Check the response

### Test API Directly:

```bash
curl -X POST http://localhost:5000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "What\'s on the menu?"}'
```

---

## 💰 Cost Comparison

| Provider | Free Tier | Paid Pricing |
|----------|-----------|--------------|
| **OpenAI** | $5 credit | ~$0.002 per 1K tokens (GPT-3.5) |
| **Anthropic** | $5 credit | ~$0.25 per 1M tokens (Haiku) |
| **DigitalOcean** | Varies | Check their pricing |
| **Mock Mode** | Free | Free (limited responses) |

**Recommendation:** Start with OpenAI GPT-3.5-turbo for the best balance of cost and quality.

---

## 🔒 Security

- ✅ **Never commit** API keys to Git
- ✅ **Always use** environment variables
- ✅ **Use different keys** for dev and production
- ✅ **Rotate keys** periodically

---

## 🐛 Troubleshooting

### "AI service is not configured"

**Solution:** Add at least one API key (OpenAI, Anthropic, or DigitalOcean)

### "Authentication failed"

**Solution:**
- Verify your API key is correct
- Check the key hasn't expired
- Ensure you have credits/quota remaining

### "Rate limit exceeded"

**Solution:**
- Wait a few minutes
- Check your API usage limits
- Consider upgrading your plan

### Chatbot shows "Mock Mode"

**Solution:** This is normal if no API keys are set. Add an API key to enable full AI.

---

## 📊 Response Format

All providers return the same format:

```json
{
  "response": "AI response text here",
  "provider": "OpenAI",
  "timestamp": "2024-11-21T12:00:00.000Z"
}
```

---

## 🎉 You're All Set!

Choose the provider that works best for you:
- **Easiest:** OpenAI ⭐
- **Best for long conversations:** Anthropic
- **If you have DigitalOcean:** Use Gradient AI
- **Just testing:** Mock Mode (no setup needed)

**Need help?** Check the troubleshooting section or test with Mock Mode first!

