# Fix: Missing SUPABASE_SERVICE_ROLE_KEY

## Quick Fix Steps

### 1. Create `.env` file in `server/` directory

Create a file named `.env` (no extension) in the `server` folder with this content:

```env
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=sb_publishable_EMqpn0IxVO1CpA3Su2l-FQ_8vsM_O0d
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
PORT=5000
```

### 2. Get Your Service Role Key

The key you provided (`sb_secret_T5yh7OAhEYn010csmMCvaw_KrnNjaQS`) might not be the correct format. 

**Get the correct key:**

1. Go to: https://supabase.com/dashboard/project/ovisawqwfapvmedivuam/settings/api
2. Scroll down to **Project API keys** section
3. Find the **`service_role`** key (it's a long JWT token)
4. It should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aXNhd3F3ZmFwdm1lZGl2dWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY3MDI2NiwiZXhwIjoyMDc5MjQ2MjY2fQ...`
5. Copy the ENTIRE key (it's very long)
6. Paste it as the value for `SUPABASE_SERVICE_ROLE_KEY` in your `.env` file

### 3. Alternative: Use the Anon Key Temporarily

If you can't find the service role key right now, you can temporarily use the anon key, but this has limited permissions:

```env
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_EMqpn0IxVO1CpA3Su2l-FQ_8vsM_O0d
```

**Note:** This might not work for all operations. The service role key is required for admin operations.

### 4. Restart Server

After creating/updating `.env`:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## File Location

Make sure your `.env` file is here:
```
server/
  ├── .env          ← Create this file here
  ├── package.json
  ├── src/
  └── ...
```

## Verify It's Working

After restarting, you should see:
```
✅ Supabase database connection: OK
✅ Supabase Auth connection: OK
🚀 Server ready!
```

If you still see errors, check:
1. `.env` file exists in `server/` folder
2. No extra spaces around the `=` sign
3. Keys are on separate lines
4. No quotes around the values (unless needed)

