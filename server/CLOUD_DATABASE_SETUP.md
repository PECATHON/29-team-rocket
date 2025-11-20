# Cloud Database Setup - Step by Step

## Option 1: Supabase (Easiest - Recommended)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" and sign up/login
3. Click "New Project"
4. Fill in:
   - **Name**: Your project name
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### Step 2: Get Connection String

1. In your Supabase project, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you created
6. The final URL should look like:
   ```
   postgresql://postgres:your_actual_password@db.xxxxx.supabase.co:5432/postgres
   ```

### Step 3: Update Your .env File

In `server/.env`, replace the SQLite URL with your PostgreSQL URL:

```env
# OLD (SQLite)
# DATABASE_URL="file:./dev.db"

# NEW (PostgreSQL - Supabase)
DATABASE_URL="postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres?sslmode=require"

# Keep these
JWT_SECRET=your-secret-key-here
PORT=5000
```

**Important**: Add `?sslmode=require` at the end for secure connection.

### Step 4: Install PostgreSQL Client (if needed)

Prisma works with PostgreSQL out of the box, but you might need the `pg` package:

```bash
cd server
npm install pg
```

### Step 5: Generate Prisma Client

```bash
cd server
npx prisma generate
```

### Step 6: Push Schema to Cloud Database

For initial setup (development):
```bash
npx prisma db push
```

For production (creates migration):
```bash
npx prisma migrate dev --name init_postgresql
```

### Step 7: Verify Connection

```bash
npx prisma studio
```

This opens Prisma Studio where you can see your database tables.

---

## Option 2: Neon (Serverless PostgreSQL)

### Step 1: Create Neon Account

1. Go to https://neon.tech
2. Sign up with GitHub
3. Click "Create a project"
4. Choose a name and region
5. Click "Create project"

### Step 2: Get Connection String

1. In your Neon dashboard, you'll see the connection string automatically
2. It looks like:
   ```
   postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Copy this connection string

### Step 3: Update .env

```env
DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Step 4-7: Same as Supabase (steps 4-7 above)

---

## Option 3: Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Provision PostgreSQL"

### Step 2: Get Connection String

1. Click on your PostgreSQL service
2. Go to **Variables** tab
3. Copy the `DATABASE_URL` value

### Step 3: Update .env and continue with steps 4-7

---

## Migration Checklist

- [ ] Created cloud database account
- [ ] Got connection string
- [ ] Updated `schema.prisma` (already done - changed to postgresql)
- [ ] Updated `.env` with new DATABASE_URL
- [ ] Installed `pg` package (if needed)
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma db push` or `npx prisma migrate dev`
- [ ] Verified connection with `npx prisma studio`
- [ ] Tested your API endpoints

## Troubleshooting

### Error: "Can't reach database server"

- Check if your IP is whitelisted (some providers require this)
- Verify the connection string is correct
- Check if SSL mode is required (`?sslmode=require`)

### Error: "relation does not exist"

- Run `npx prisma db push` or migrations
- Check if schema was pushed successfully

### Error: "password authentication failed"

- Double-check your password in the connection string
- Make sure you replaced `[YOUR-PASSWORD]` with actual password

## Production Best Practices

1. **Use Connection Pooling**: For production, use a connection pooler like PgBouncer
2. **Environment Variables**: Never commit `.env` to git
3. **Backup**: Set up automatic backups in your cloud provider
4. **Monitoring**: Enable database monitoring in your provider dashboard
5. **SSL**: Always use SSL connections (`?sslmode=require`)

## Next Steps

After setting up your cloud database:

1. Test all your API endpoints
2. Update your deployment environment variables
3. Set up database backups
4. Monitor database usage

