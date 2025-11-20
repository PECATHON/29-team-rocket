# Supabase MCP Integration Guide

## ✅ Status: Connected and Working!

Your Supabase MCP is already integrated and working! I can directly interact with your Supabase database.

**Your Project URL**: `https://ovisawqwfapvmedivuam.supabase.co`

## What I Can Do With Supabase MCP

I have direct access to your Supabase database through MCP (Model Context Protocol). I can:

### Database Operations
- ✅ **List tables** - See all your database tables
- ✅ **Execute SQL** - Run any SQL queries
- ✅ **Apply migrations** - Create/modify database schema
- ✅ **Generate TypeScript types** - Auto-generate types from your schema
- ✅ **Get project info** - Access project URL and API keys

### Management
- ✅ **List migrations** - See all applied migrations
- ✅ **List extensions** - Check installed PostgreSQL extensions
- ✅ **Get logs** - View database logs for debugging
- ✅ **Get advisors** - Security and performance recommendations

### Edge Functions
- ✅ **List edge functions** - See deployed functions
- ✅ **Deploy edge functions** - Deploy serverless functions
- ✅ **Get edge function code** - View function code

### Branches (Development)
- ✅ **Create branches** - Create dev database branches
- ✅ **Merge branches** - Merge changes to production
- ✅ **Rebase branches** - Sync with production

## Current Database Status

### Tables Created
- ✅ **User** table - Created with all required fields
  - id (UUID, primary key)
  - name, email, phone
  - passwordHash
  - role (CUSTOMER, RESTAURANT_OWNER, etc.)
  - createdAt, updatedAt (auto-managed)

### Security
- ✅ Row Level Security (RLS) enabled
- ✅ Service role policy created (for backend access)
- ✅ Auto-update trigger for `updatedAt` field

## How to Use

### 1. I Can Help You Directly

Just ask me things like:
- "Show me all users in the database"
- "Create a new table for orders"
- "Add an index to improve query performance"
- "Check for security issues"
- "Generate TypeScript types for my frontend"

### 2. Using Prisma + Supabase Together

You have two ways to interact with Supabase:

#### Option A: Prisma (Recommended for your current setup)
```javascript
// Use Prisma Client as you're doing now
const prisma = require('./prisma');
const user = await prisma.user.findUnique({ where: { email } });
```

#### Option B: Supabase JS Client (for real-time, storage, etc.)
```javascript
// For Supabase-specific features (real-time, storage, auth)
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### 3. Environment Variables Needed

Make sure your `server/.env` has:

```env
# For Prisma (direct PostgreSQL connection)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.ovisawqwfapvmedivuam.supabase.co:5432/postgres?sslmode=require"

# For Supabase JS Client (optional, for real-time features)
SUPABASE_URL="https://ovisawqwfapvmedivuam.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

## Common Issues & Solutions

### Issue 1: "Table doesn't exist"
**Solution**: I can create it for you! Just ask me to create any table you need.

### Issue 2: "Connection refused"
**Solution**: Check your DATABASE_URL in .env matches your Supabase connection string.

### Issue 3: "RLS policy blocking queries"
**Solution**: I've already set up a service role policy. If you need user-specific policies, I can help create them.

### Issue 4: "Prisma can't connect"
**Solution**: 
1. Verify DATABASE_URL is correct
2. Make sure `?sslmode=require` is at the end
3. Run `npx prisma generate` to regenerate client
4. Run `npx prisma db pull` to sync schema

## Next Steps

1. **Test the connection**:
   ```bash
   cd server
   npx prisma studio
   ```

2. **Sync Prisma schema** (if needed):
   ```bash
   npx prisma db pull  # Pulls schema from Supabase
   npx prisma generate # Generates Prisma client
   ```

3. **Test your API**:
   ```bash
   npm run dev
   # Try creating a user via your signup endpoint
   ```

## What Would You Like Me to Do?

I can help you with:
- Creating additional tables (Orders, Products, etc.)
- Setting up relationships between tables
- Creating indexes for performance
- Setting up RLS policies
- Migrating data
- Optimizing queries
- And much more!

Just ask! 🚀

