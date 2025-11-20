# Database Migration Guide: SQLite to Cloud PostgreSQL

This guide will help you migrate your Prisma database from SQLite to a cloud PostgreSQL database.

## Popular Cloud Database Options

### 1. **Supabase** (Recommended for beginners)
- **Free tier**: 500MB database, 2GB bandwidth
- **URL**: https://supabase.com
- **Pros**: Easy setup, includes auth, storage, real-time features
- **Cons**: Limited free tier

### 2. **Neon** (Serverless PostgreSQL)
- **Free tier**: 3GB storage, unlimited projects
- **URL**: https://neon.tech
- **Pros**: Serverless, auto-scaling, branching
- **Cons**: Newer platform

### 3. **Railway**
- **Free tier**: $5 credit/month
- **URL**: https://railway.app
- **Pros**: Easy deployment, good for full-stack apps
- **Cons**: Credit-based pricing

### 4. **Render**
- **Free tier**: 90-day free PostgreSQL
- **URL**: https://render.com
- **Pros**: Simple setup, good documentation
- **Cons**: Free tier expires after 90 days

### 5. **PlanetScale** (MySQL)
- **Free tier**: 5GB storage, 1 billion reads/month
- **URL**: https://planetscale.com
- **Pros**: Serverless MySQL, branching
- **Cons**: Uses MySQL (not PostgreSQL)

## Step-by-Step Migration (Using Supabase as Example)

### Step 1: Create a Cloud Database

1. Go to https://supabase.com and sign up
2. Create a new project
3. Wait for the database to be provisioned
4. Go to **Settings** → **Database**
5. Copy the **Connection String** (URI format)
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 2: Update Prisma Schema

Update `server/prisma/schema.prisma` to use PostgreSQL instead of SQLite.

### Step 3: Update Environment Variables

Add your cloud database URL to `.env` file.

### Step 4: Run Migrations

Run Prisma migrations to create tables in the cloud database.

### Step 5: (Optional) Migrate Existing Data

If you have data in SQLite, export and import it to PostgreSQL.

## Quick Start Commands

After setting up your cloud database:

```bash
# 1. Update schema.prisma (change provider to postgresql)
# 2. Update .env with DATABASE_URL
# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to cloud database (for development)
npx prisma db push

# OR create a migration (for production)
npx prisma migrate dev --name migrate_to_postgresql

# 5. Verify connection
npx prisma studio
```

## Important Notes

- **Backup your SQLite database** before migrating
- **Test the connection** before deploying
- **Use connection pooling** for production (recommended)
- **Keep your DATABASE_URL secure** - never commit it to git

