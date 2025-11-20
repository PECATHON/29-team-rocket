# 🚀 Quick Start Guide

## Setup Your Environment (2 minutes)

### 1. Create `.env` file in `server/` directory

```env
SUPABASE_URL=https://ovisawqwfapvmedivuam.supabase.co
SUPABASE_ANON_KEY=sb_publishable_EMqpn0IxVO1CpA3Su2l-FQ_8vsM_O0d
SUPABASE_SERVICE_ROLE_KEY=sb_secret_T5yh7OAhEYn010csmMCvaw_KrnNjaQS
PORT=5000
```

### 2. Get Service Role Key (if needed)

If the service role key above doesn't work:

1. Go to: https://supabase.com/dashboard/project/ovisawqwfapvmedivuam/settings/api
2. Find **Project API keys** section
3. Copy the **`service_role`** key (it's a long JWT token)
4. Replace `SUPABASE_SERVICE_ROLE_KEY` in your `.env`

### 3. Install & Run

```bash
cd server
npm install
npm run dev
```

### 4. Test It

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

**Create Vendor:**
```bash
curl -X POST http://localhost:5000/api/vendors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -d '{
    "name": "Restaurant ABC",
    "email": "restaurant@example.com",
    "phone": "9876543210",
    "address": "123 Main St"
  }'
```

## That's it! 🎉

Your server should now be running with Supabase!

