# Quick Start: Migrate to Cloud Database

## Fastest Way (Supabase - 5 minutes)

### 1. Create Database (2 min)
1. Go to https://supabase.com → Sign up
2. Click "New Project"
3. Set password and region → Create
4. Wait for setup

### 2. Get Connection String (1 min)
1. Settings → Database
2. Copy "Connection string" (URI format)
3. Replace `[YOUR-PASSWORD]` with your actual password

### 3. Update Files (1 min)

**Update `server/.env`:**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET=your-secret-key
PORT=5000
```

**The schema.prisma is already updated to use PostgreSQL!**

### 4. Install & Setup (1 min)
```bash
cd server
npm install
npx prisma generate
npx prisma db push
```

### 5. Test
```bash
npm run dev
# Test your API endpoints
```

## Done! ✅

Your database is now in the cloud. The schema has been updated to PostgreSQL.

## Next: Deploy Your Server

When deploying (Railway, Render, Heroku, etc.), just add the same `DATABASE_URL` to your environment variables.

