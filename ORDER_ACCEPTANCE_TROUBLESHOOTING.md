# 🔍 Order Acceptance Troubleshooting Guide

## Quick Fix Checklist

### ✅ Step 1: Verify Database Setup

```sql
-- Check if vendors have phone numbers
SELECT v.id, v.name, v.phone, v.email
FROM vendors v
JOIN "User" u ON u.vendor_id = v.id
WHERE u.role = 'RESTAURANT_OWNER';

-- If phone is null or invalid, update it:
UPDATE vendors 
SET phone = '+919876543210'  -- Replace with actual phone
WHERE id = '<vendor_id>';
```

### ✅ Step 2: Verify Twilio Configuration

Check `server/.env`:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Restart server** after updating `.env`:
```bash
cd server
npm run dev
```

### ✅ Step 3: Test Order Acceptance

1. **Place an order** (as customer)
2. **Accept order** (as vendor)
3. **Check server logs** for:
   - `✅ Order status updated: pending → accepted`
   - `📦 Order assigned to vendor`
   - `✅ SMS sent successfully`

### ✅ Step 4: Verify Order Assignment

```sql
-- Check if order was assigned to vendor
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.vendor_id,
    v.name as vendor_name,
    v.phone as vendor_phone
FROM orders o
LEFT JOIN vendors v ON o.vendor_id = v.id
WHERE o.status = 'accepted'
ORDER BY o.updated_at DESC
LIMIT 5;
```

## Common Issues

### Issue 1: "Order not accepting"

**Symptoms**: Click accept but nothing happens

**Debug Steps**:
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check Network tab for API call
4. Verify API response

**Fix**:
- Check authentication token
- Verify vendor is logged in
- Check server is running
- Verify order exists and status is 'pending'

### Issue 2: "SMS not sending"

**Symptoms**: Order accepted but no SMS received

**Debug Steps**:
1. Check server logs for SMS errors
2. Verify Twilio credentials
3. Check phone numbers in database
4. Check Twilio console

**Server Log Check**:
```bash
# Look for these messages:
✅ SMS sent successfully
❌ SMS send error
⚠️ SMS Service is disabled
```

**Fix**:
```bash
# 1. Check environment variables
cd server
cat .env | grep TWILIO

# 2. Restart server
npm run dev

# 3. Check phone numbers
# Ensure vendor.phone and customer.phone are set
```

### Issue 3: "Vendor not assigned"

**Symptoms**: Order accepted but vendor_id is null

**Debug Steps**:
```sql
-- Check if vendor has vendor_id
SELECT u.id, u.email, u.vendor_id, v.name
FROM "User" u
LEFT JOIN vendors v ON u.vendor_id = v.id
WHERE u.role = 'RESTAURANT_OWNER';
```

**Fix**:
- Ensure vendor has `vendor_id` in User table
- Run vendor setup script if needed
- Check server logs for assignment messages

### Issue 4: "Permission denied"

**Symptoms**: 403 error when accepting order

**Debug Steps**:
1. Verify user role is 'RESTAURANT_OWNER'
2. Check authentication token
3. Verify order exists

**Fix**:
- Ensure logged in as restaurant owner
- Check user role in database
- Verify authentication middleware

## Testing Commands

### Test Order Creation

```bash
# Create order via API
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <customer_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"menu_item_id": "<menu_item_id>", "quantity": 2}
    ],
    "payment_method": "Credit Card",
    "payment_status": "paid",
    "order_type": "delivery"
  }'
```

### Test Order Acceptance

```bash
# Accept order via API
curl -X PUT http://localhost:5000/api/orders/<order_id>/status \
  -H "Authorization: Bearer <vendor_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "accepted",
    "notes": "Order accepted"
  }'
```

### Check Server Logs

```bash
# Watch server logs in real-time
cd server
npm run dev

# Look for:
# - Order status updates
# - SMS sending attempts
# - Error messages
```

## Database Queries

### Check Recent Orders

```sql
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.vendor_id,
    v.name as vendor_name,
    u.email as customer_email,
    o.created_at,
    o.updated_at
FROM orders o
LEFT JOIN vendors v ON o.vendor_id = v.id
LEFT JOIN "User" u ON o.customer_id = u.id
ORDER BY o.created_at DESC
LIMIT 10;
```

### Check Vendor Setup

```sql
-- Verify all vendors have phone numbers
SELECT 
    v.id,
    v.name,
    v.phone,
    v.email,
    COUNT(u.id) as user_count
FROM vendors v
LEFT JOIN "User" u ON u.vendor_id = v.id
GROUP BY v.id, v.name, v.phone, v.email;
```

### Check Order Tracking

```sql
-- View order status history
SELECT 
    ot.order_id,
    o.order_number,
    ot.status,
    ot.notes,
    ot.created_at
FROM order_tracking ot
JOIN orders o ON ot.order_id = o.id
ORDER BY ot.created_at DESC
LIMIT 20;
```

## Expected Behavior

### When Vendor Accepts Order

1. **Database Update**:
   - `orders.status` → `'accepted'`
   - `orders.vendor_id` → `<vendor_id>`
   - `orders.updated_at` → current timestamp
   - New entry in `order_tracking`

2. **SMS Sent**:
   - Customer: "✅ Order Accepted!"
   - Vendor: "🆕 New Order Received!"

3. **Server Logs**:
   ```
   ✅ Order <id> status updated: pending → accepted
   📦 Order <id> assigned to vendor <vendor_id>
   ✅ SMS sent successfully: { to: '+91...', ... }
   ✅ SMS sent successfully: { to: '+91...', ... }
   ```

## Still Not Working?

1. **Check all server logs** for errors
2. **Verify database** with SQL queries above
3. **Test API endpoints** directly with curl
4. **Check Twilio console** for SMS delivery status
5. **Verify phone numbers** are in correct format

---

**Need more help?** Check server logs and share the error messages you see.

