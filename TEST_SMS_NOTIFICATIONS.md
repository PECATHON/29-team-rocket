# 🧪 Testing SMS Notifications

## Quick Test Guide

### Step 1: Verify Environment Variables

Make sure your `server/.env` file has:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### Step 2: Restart Your Server

**Important**: After adding environment variables, you MUST restart the server:

```bash
cd server
# Stop the current server (Ctrl+C)
npm run dev
```

Look for this message in the console:
- ✅ If SMS is enabled: No warning message
- ⚠️ If SMS is disabled: "⚠️ SMS Service is disabled..."

### Step 3: Verify Phone Numbers in Database

Make sure your users have phone numbers:

**For Customer:**
- Check `User` table - the customer placing the order must have a `phone` field

**For Vendor:**
- Check `vendors` table - the vendor must have a `phone` field

### Step 4: Place a Test Order

1. **Login as Customer** in your app
2. **Add items to cart**
3. **Complete the payment/order**
4. **Check server logs** - You should see:
   ```
   ✅ SMS sent successfully: { to: '+919876543210', sid: 'SM...', status: 'queued' }
   ```

### Step 5: Check Your Phone

**Customer should receive:**
```
🍽️ Order Confirmed!

Order #ORD-1234567890-ABC123
Total: ₹250.00

• Item Name x2
• Another Item x1

Status: pending
We'll notify you when your order is ready!
```

**Vendor should receive:**
```
🆕 New Order Received!

Order #ORD-1234567890-ABC123
Customer: John Doe
Items: 2 items (3 total)
Total: ₹250.00
Type: Delivery
Address: 123 Main St

Please check your dashboard to accept or reject.
```

## Troubleshooting

### SMS Not Sending?

1. **Check Server Logs**:
   ```bash
   # Look for these messages:
   ✅ SMS sent successfully
   ❌ SMS send error
   ⚠️ SMS Service is disabled
   ```

2. **Verify Twilio Credentials**:
   - Go to [Twilio Console](https://console.twilio.com)
   - Check Dashboard for Account SID
   - Verify Auth Token is correct

3. **Check Phone Number Format**:
   - Twilio phone number must be in E.164 format: `+1234567890`
   - Customer/Vendor phone numbers will be auto-formatted

4. **Trial Account Limitations**:
   - **Free Trial**: Can only send to verified phone numbers
   - **Solution**: Add your test numbers in Twilio Console:
     - Go to **Phone Numbers** → **Verified Caller IDs**
     - Add your test phone numbers

5. **Check Twilio Console**:
   - Go to **Monitor** → **Logs** → **Messaging**
   - See if messages are being sent
   - Check for error messages

### Common Issues

**Issue: "SMS Service is disabled"**
- **Cause**: Environment variables not loaded
- **Fix**: Restart server after adding `.env` variables

**Issue: "Invalid phone number"**
- **Cause**: Phone number not in database or invalid format
- **Fix**: Ensure `User.phone` and `vendors.phone` are set

**Issue: "Authentication failed"**
- **Cause**: Wrong Twilio credentials
- **Fix**: Double-check `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`

**Issue: "From number not verified"**
- **Cause**: Using trial account with unverified numbers
- **Fix**: Verify recipient numbers in Twilio Console

## Testing Checklist

- [ ] Environment variables added to `server/.env`
- [ ] Server restarted after adding env variables
- [ ] Customer has phone number in database
- [ ] Vendor has phone number in database
- [ ] Test phone numbers verified in Twilio (if using trial)
- [ ] Order placed successfully
- [ ] Server logs show SMS sent
- [ ] Customer received SMS
- [ ] Vendor received SMS

## Next Steps

Once SMS is working:
1. Test status update notifications (accept, preparing, ready)
2. Monitor Twilio usage and costs
3. Consider upgrading from trial account for production

