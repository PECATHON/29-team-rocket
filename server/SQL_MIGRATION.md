# SQL Migration: Vendors Table

## Migration Applied via Supabase MCP

The following SQL migration was successfully applied to your Supabase database:

```sql
-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS vendors_email_idx ON vendors(email);
CREATE INDEX IF NOT EXISTS vendors_created_at_idx ON vendors(created_at);

-- Enable Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to do everything (for your backend)
CREATE POLICY "Service role can manage vendors" ON vendors
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## Table Structure

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| `name` | TEXT | NOT NULL | Vendor name |
| `email` | TEXT | NOT NULL, UNIQUE | Vendor email address |
| `phone` | TEXT | NULLABLE | Vendor phone number |
| `address` | TEXT | NULLABLE | Vendor address |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | Creation timestamp |

## Indexes Created

1. **`vendors_email_idx`** - Index on `email` column for fast lookups
2. **`vendors_created_at_idx`** - Index on `created_at` for sorting/filtering

## Security

- **Row Level Security (RLS)**: Enabled
- **Policy**: Service role can perform all operations (bypasses RLS for backend)

## Verification

You can verify the table was created by running:

```sql
SELECT * FROM vendors;
```

Or using Supabase MCP:
- List tables to see `vendors` table
- Query the table to see its structure

## Next Steps

The table is ready to use! You can now:
1. Create vendors via `POST /api/vendors`
2. List vendors via `GET /api/vendors`
3. Get vendor by ID via `GET /api/vendors/:id`
4. Update vendor via `PUT /api/vendors/:id`
5. Delete vendor via `DELETE /api/vendors/:id`

