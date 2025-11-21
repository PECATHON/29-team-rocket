# 🔧 Fix Order Acceptance & SMS Issues

## Issues Fixed

### 1. Vendor Assignment on Acceptance
- ✅ When vendor accepts order, `vendor_id` is now properly assigned
- ✅ Order is linked to accepting vendor in database

### 2. SMS Notifications
- ✅ Customer receives SMS when order is accepted
- ✅ Accepting vendor receives SMS notification
- ✅ SMS sent for all status updates (preparing, ready, delivered)

### 3. Database Schema
- ✅ `vendor_id` is nullable - orders can be created without vendor
- ✅ Foreign key constraint allows vendor assignment on acceptance
- ✅ No schema changes needed - already supports the flow

## How It Works Now

### Order Acceptance Flow

1. **Customer places order**
   - Order created with `status: 'pending'`
   - `vendor_id` may be null (available for any vendor)

2. **Vendor accepts order**
   - Vendor clicks "Accept" button
   - Backend updates order:
     - `status: 'accepted'`
     - `vendor_id: <accepting_vendor_id>` (if not already set)
   - SMS sent to:
     - ✅ Customer: "Order Accepted!"
     - ✅ Accepting Vendor: "New Order Received!"

3. **Vendor manages order**
   - Updates status: preparing → ready → delivered
   - Customer receives SMS at each stage

## Testing Steps

### Test Order Acceptance

1. **Create a test order** (as customer)
   ```bash
   # Order should be created with status 'pending'
   # vendor_id may be null
   ```

2. **Accept order** (as vendor)
   ```bash
   # Vendor clicks "Accept" button
   # Check database:
   # - order.status should be 'accepted'
   # - order.vendor_id should be set to accepting vendor
   ```

3. **Check SMS**
   - Customer should receive: "✅ Order Accepted!"
   - Vendor should receive: "🆕 New Order Received!"

### Verify Database

```sql
-- Check order status and vendor assignment
SELECT 
    id, 
    order_number, 
    status, 
    vendor_id,
    customer_id,
    created_at
FROM orders
ORDER BY created_at DESC
LIMIT 5;

-- Check if vendor has phone number
SELECT id, name, phone, email
FROM vendors
WHERE id IN (SELECT vendor_id FROM orders WHERE status = 'accepted');
```

## Common Issues & Fixes

### Issue: Order Not Accepting

**Symptoms**: 
- Accept button doesn't work
- Order status doesn't change

**Check**:
1. Browser console for errors
2. Server logs for API errors
3. Verify vendor is logged in
4. Check order exists and status is 'pending'

**Fix**:
- Ensure vendor has `vendor_id` in User table
- Check API endpoint is accessible
- Verify authentication token is valid

### Issue: SMS Not Sending

**Symptoms**:
- Order accepted but no SMS received

**Check**:
1. Server logs for SMS errors
2. Twilio credentials in `.env`
3. Phone numbers in database
4. Twilio console for message status

**Fix**:
```bash
# Check environment variables
cd server
cat .env | grep TWILIO

# Should have:
# TWILIO_ACCOUNT_SID=AC...
# TWILIO_AUTH_TOKEN=...
# TWILIO_PHONE_NUMBER=+...
```

### Issue: Vendor Not Assigned

**Symptoms**:
- Order accepted but vendor_id is null

**Check**:
```sql
SELECT id, order_number, status, vendor_id
FROM orders
WHERE status = 'accepted' AND vendor_id IS NULL;
```

**Fix**:
- Ensure vendor has `vendor_id` in User table
- Check order acceptance logic in `updateOrderStatus`
- Verify vendor_id is being set in updateData

## Database Verification

### Check Orders Table

```sql
-- View recent orders with vendor assignment
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.vendor_id,
    v.name as vendor_name,
    u.email as customer_email,
    o.created_at
FROM orders o
LEFT JOIN vendors v ON o.vendor_id = v.id
LEFT JOIN "User" u ON o.customer_id = u.id
ORDER BY o.created_at DESC
LIMIT 10;
```

### Check Vendor Setup

```sql
-- Verify vendors have phone numbers
SELECT 
    v.id,
    v.name,
    v.phone,
    v.email,
    u.id as user_id,
    u.email as user_email
FROM vendors v
JOIN "User" u ON u.vendor_id = v.id
WHERE u.role = 'RESTAURANT_OWNER';
```

## API Testing

### Test Order Acceptance

```bash
# 1. Get authentication token (vendor login)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@example.com","password":"password"}'

# 2. Accept an order
curl -X PUT http://localhost:5000/api/orders/<order_id>/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status":"accepted","notes":"Order accepted by vendor"}'
```

### Expected Response

```json
{
  "order": {
    "id": "...",
    "order_number": "ORD-...",
    "status": "accepted",
    "vendor_id": "<vendor_uuid>",
    ...
  }
}
```

## Server Logs to Check

When accepting an order, you should see:

```
✅ Order status updated: pending → accepted
✅ SMS sent successfully: { to: '+91...', sid: 'SM...', status: 'queued' }
✅ SMS sent successfully: { to: '+91...', sid: 'SM...', status: 'queued' }
```

If SMS fails, you'll see:
```
❌ SMS send error: { to: '...', error: '...' }
⚠️ SMS Service is disabled...
```

## Next Steps

1. **Test order acceptance** - Place order and accept as vendor
2. **Check SMS delivery** - Verify both customer and vendor receive SMS
3. **Monitor server logs** - Check for any errors
4. **Verify database** - Confirm vendor_id is set correctly

---

**Note**: SMS notifications are sent asynchronously and won't block order processing. If SMS fails, the order will still be accepted successfully.

