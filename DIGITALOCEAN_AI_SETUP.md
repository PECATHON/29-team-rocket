# DigitalOcean AI Agent Integration Guide

> **⚠️ IMPORTANT:** This chatbot is now configured for **DigitalOcean Gradient AI ONLY**.
> 
> **📖 For the complete, up-to-date setup guide, see: `DIGITALOCEAN_SETUP_GUIDE.md`**

This is the legacy guide. The new guide has clearer instructions and the correct API format.

## 📋 Prerequisites

1. **DigitalOcean Account**: Sign up at https://www.digitalocean.com/
2. **Gradient AI Access**: Access to DigitalOcean's Gradient AI Platform
3. **API Keys**: Get your Gradient AI API key and workspace ID

---

## 🚀 Step 1: Create a DigitalOcean Gradient AI Agent

### 1.1 Access Gradient AI Platform

1. Go to [DigitalOcean Gradient AI Platform](https://www.digitalocean.com/blog/gradientai-platform-generally-available)
2. Sign in to your DigitalOcean account
3. Navigate to the Gradient AI dashboard

### 1.2 Create a New Agent

1. Click "Create Agent" or "New Agent"
2. Fill in the agent details:
   - **Name**: `Food Delivery Assistant` (or your preferred name)
   - **Description**: `AI assistant for food delivery app customer support`
   - **Instructions**: 
     ```
     You are a helpful assistant for a food delivery application. 
     Help users with:
     - Menu inquiries
     - Order status
     - Restaurant information
     - General food delivery questions
     - Troubleshooting issues
     
     Be friendly, concise, and helpful. If you don't know something, 
     politely direct users to contact support.
     ```
3. **Choose a Model**: Select from available models (Anthropic, Meta, Mistral, or OpenAI)
4. Click "Create" or "Save"

### 1.3 Get Your Agent ID

After creating the agent, you'll see:
- **Agent ID**: Copy this (you'll need it for `DIGITALOCEAN_GRADIENT_AGENT_ID`)

---

## 🔑 Step 2: Get API Credentials

### 2.1 Get API Key

1. Go to DigitalOcean Dashboard
2. Navigate to **API** → **Tokens/Keys**
3. Click "Generate New Token"
4. Select **Gradient AI** scope
5. Copy the API key (you'll need it for `DIGITALOCEAN_GRADIENT_API_KEY`)

### 2.2 Get Workspace ID

1. In the Gradient AI dashboard, go to **Settings** or **Workspace**
2. Find your **Workspace ID**
3. Copy it (you'll need it for `DIGITALOCEAN_GRADIENT_WORKSPACE_ID`)

---

## ⚙️ Step 3: Configure Environment Variables

### 3.1 Local Development (server/.env)

Add these variables to your `server/.env` file:

```env
# DigitalOcean Gradient AI Configuration
DIGITALOCEAN_GRADIENT_API_KEY=your_api_key_here
DIGITALOCEAN_GRADIENT_WORKSPACE_ID=your_workspace_id_here
DIGITALOCEAN_GRADIENT_AGENT_ID=your_agent_id_here
```

**Example:**
```env
DIGITALOCEAN_GRADIENT_API_KEY=grad_live_abc123xyz789
DIGITALOCEAN_GRADIENT_WORKSPACE_ID=ws_1234567890abcdef
DIGITALOCEAN_GRADIENT_AGENT_ID=agent_9876543210fedcba
```

### 3.2 Production (Render Dashboard)

1. Go to https://render.com/dashboard
2. Click on your backend service (`29-team-rocket`)
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add these three variables:
   - `DIGITALOCEAN_GRADIENT_API_KEY` = `your_api_key_here`
   - `DIGITALOCEAN_GRADIENT_WORKSPACE_ID` = `your_workspace_id_here`
   - `DIGITALOCEAN_GRADIENT_AGENT_ID` = `your_agent_id_here`
6. Click **Save Changes**
7. Restart your service (Render will do this automatically)

---

## 📦 Step 4: Install Dependencies

The chatbot integration requires `axios` for making HTTP requests to the DigitalOcean API.

### Install on Server

```bash
cd server
npm install axios
```

This should already be in your `package.json`, but if not, run the command above.

---

## ✅ Step 5: Verify Installation

### 5.1 Test Locally

1. Start your backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Test the chatbot endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/chatbot \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, can you help me?"}'
   ```

3. You should receive a response from the AI agent.

### 5.2 Test in Frontend

1. Start your frontend:
   ```bash
   npm run dev
   ```

2. Open your app in the browser
3. Look for the chatbot button (bottom-right corner)
4. Click it and send a test message
5. You should see the AI response

---

## 🎨 Customization

### Customize Chatbot Appearance

Edit `src/components/Chatbot.css` to customize:
- Colors and gradients
- Size and position
- Animations
- Responsive breakpoints

### Customize AI Behavior

1. Go to your DigitalOcean Gradient AI dashboard
2. Edit your agent
3. Update the **Instructions** field to change how the AI responds
4. Save changes

### Add Context to Requests

Edit `server/src/controllers/chatbotController.js` to add more context:

```javascript
const payload = {
    message: message.trim(),
    context: {
        app: 'Food Delivery Application',
        purpose: 'Customer support',
        userRole: req.user?.role, // If authenticated
        // Add more context as needed
    }
};
```

---

## 🔒 Security Considerations

### API Key Security

- ✅ **Never commit** API keys to Git
- ✅ **Always use** environment variables
- ✅ **Rotate keys** periodically
- ✅ **Use different keys** for development and production

### Rate Limiting

Consider adding rate limiting to prevent abuse:

```javascript
// In server/src/index.js
const rateLimit = require('express-rate-limit');

const chatbotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

app.use('/api/chatbot', chatbotLimiter, chatbotRoutes);
```

### Authentication (Optional)

If you want to protect the chatbot endpoint:

1. Edit `server/src/routes/chatbotRoutes.js`
2. Uncomment the authentication middleware:
   ```javascript
   router.post('/', authenticate, chatWithAI);
   ```

---

## 🐛 Troubleshooting

### Error: "AI service is not configured"

**Solution**: 
- Check that all three environment variables are set
- Verify variable names are correct (case-sensitive)
- Restart your server after adding variables

### Error: "AI service authentication failed"

**Solution**:
- Verify your API key is correct
- Check that the API key has the correct permissions
- Ensure the key hasn't expired

### Error: "AI agent not found"

**Solution**:
- Verify your Agent ID is correct
- Check that the agent exists in your workspace
- Ensure the agent is active/enabled

### Chatbot Not Appearing

**Solution**:
- Check browser console for errors
- Verify the frontend is connecting to the correct backend URL
- Ensure `VITE_API_URL` is set correctly

### Slow Responses

**Solution**:
- Check your internet connection
- Verify DigitalOcean AI service status
- Consider adding a loading indicator (already included)
- Check API rate limits

---

## 📊 API Endpoint

### POST `/api/chatbot`

**Request:**
```json
{
  "message": "What's on the menu today?"
}
```

**Response:**
```json
{
  "response": "I'd be happy to help you with the menu! Here are today's specials...",
  "timestamp": "2024-11-21T12:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

---

## 📚 Additional Resources

- [DigitalOcean Gradient AI Documentation](https://gradientai-sdk.digitalocean.com/)
- [Gradient Agent Templates](https://github.com/digitalocean/gradient-agent-templates)
- [DigitalOcean AI Tutorials](https://www.digitalocean.com/community/tutorials)

---

## ✅ Checklist

- [ ] DigitalOcean account created
- [ ] Gradient AI agent created
- [ ] API key obtained
- [ ] Workspace ID obtained
- [ ] Agent ID copied
- [ ] Environment variables added to `server/.env`
- [ ] Environment variables added to Render dashboard
- [ ] `axios` installed (`npm install` in server folder)
- [ ] Backend server restarted
- [ ] Chatbot tested locally
- [ ] Chatbot tested in production

---

## 🎉 You're Done!

Your chatbot should now be working! Users can click the chat button in the bottom-right corner to interact with your AI assistant.

**Need Help?** Check the troubleshooting section or refer to DigitalOcean's documentation.

