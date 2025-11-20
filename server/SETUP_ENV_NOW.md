# ⚠️ URGENT: Fix Your .env File

## The Problem
Your `.env` file is missing or has incorrect `SUPABASE_SERVICE_ROLE_KEY`.

## Quick Fix (2 minutes)

### Step 1: Open your `.env` file
It should be at: `server/.env`

### Step 2: Add/Update these lines:

```env
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzAyNjYsImV4cCI6MjA3OTI0NjI2Nn0.Ose6e0ndw7bL-DEpZrNMhMyh3hB92WGq_9xYvIhXQDU
SUPABASE_SERVICE_ROLE_KEY=GET_THIS_FROM_SUPABASE_DASHBOARD
PORT=5000
```

### Step 3: Get Service Role Key

**CRITICAL:** You MUST get the service role key from Supabase:

1. **Go to:** https://supabase.com/dashboard/project/ovisawqwfapvmedivuam/settings/api
2. **Scroll to:** "Project API keys" section
3. **Find:** The key labeled **"service_role"** (NOT "anon" or "public")
4. **Copy:** The entire key (it's a very long JWT token starting with `eyJ...`)
5. **Paste:** Replace `GET_THIS_FROM_SUPABASE_DASHBOARD` in your `.env` file

### Step 4: Save and Restart

1. Save the `.env` file
2. Restart your server: `npm run dev`

## What the Keys Look Like

**Correct format (JWT tokens):**
- Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzAyNjYsImV4cCI6MjA3OTI0NjI2Nn0.Ose6e0ndw7bL-DEpZrNMhMyh3hB92WGq_9xYvIhXQDU`
- Service role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY3MDI2NiwiZXhwIjoyMDc5MjQ2MjY2fQ...` (much longer)

**Wrong format (what you might have):**
- `sb_publishable_...` ❌
- `sb_secret_...` ❌

These look like they might be from a different service or an old format.

## After Fixing

You should see:
```
✅ Supabase database connection: OK
✅ Supabase Auth connection: OK
🚀 Server ready!
```

Instead of the error you're seeing now.

