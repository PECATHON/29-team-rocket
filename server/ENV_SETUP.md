# Environment Variables Setup

## Your Supabase Configuration

Based on your provided keys, here's your `.env` file setup:

### Step 1: Create/Update `server/.env`

```env
# Supabase Configuration
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=sb_publishable_EMqpn0IxVO1CpA3Su2l-FQ_8vsM_O0d
SUPABASE_SERVICE_ROLE_KEY=sb_secret_T5yh7OAhEYn010csmMCvaw_KrnNjaQS

# Server
PORT=5000
```

### Step 2: Get Service Role Key (IMPORTANT!)

The **service role key** is critical for server-side operations. If the key you provided doesn't work, get it from:

1. Go to: https://supabase.com/dashboard/project/ovisawqwfapvmedivuam
2. Click **Settings** → **API**
3. Scroll to **Project API keys**
4. Copy the **`service_role`** key (NOT the anon key)
5. It should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT format)

### Step 3: Alternative Anon Key

If your anon key doesn't work, try using the JWT format:
```env
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzAyNjYsImV4cCI6MjA3OTI0NjI2Nn0.Ose6e0ndw7bL-DEpZrNMhMyh3hB92WGq_9xYvIhXQDU
```

### Step 4: Test Configuration

After setting up your `.env` file:

```bash
cd server
npm install
npm run dev
```

Then test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

### Troubleshooting

**If you get "Invalid API key" errors:**
1. Verify keys in Supabase Dashboard → Settings → API
2. Make sure you're using the **service_role** key (not anon key) for `SUPABASE_SERVICE_ROLE_KEY`
3. Keys should be JWT tokens (long strings starting with `eyJ...`)

**If authentication doesn't work:**
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Verify the key has admin permissions
- Check Supabase dashboard logs for errors

### Security Notes

⚠️ **NEVER commit your `.env` file to git!**
- The service role key bypasses all security policies
- Keep it secret and only use it server-side
- Add `.env` to `.gitignore` if not already there

