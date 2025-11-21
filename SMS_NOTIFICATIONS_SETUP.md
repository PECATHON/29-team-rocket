# 📱 SMS Notifications Setup Guide

This guide will help you set up SMS notifications for your food delivery app using Twilio.

## Overview

The app sends SMS notifications for:
- ✅ **Order Confirmation** - Sent to customer when order is placed
- 🆕 **New Order Alert** - Sent to vendor when a new order is received
- 📦 **Status Updates** - Sent to customer when order status changes (accepted, rejected, preparing, ready, delivered)

## Prerequisites

- A Twilio account (sign up at [twilio.com](https://www.twilio.com))
- A Twilio phone number (free trial available)
- Phone numbers stored in your database (User and Vendor tables)

## Step 1: Create Twilio Account

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email and phone number
4. Complete the onboarding process

## Step 2: Get Twilio Credentials

1. **Log in to Twilio Console**: [https://console.twilio.com](https://console.twilio.com)

2. **Get Account SID and Auth Token**:
   - Go to Dashboard
   - You'll see:
     - **Account SID**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
     - **Auth Token**: `your_auth_token_here` (click to reveal)

3. **Get a Phone Number**:
   - Go to **Phone Numbers** → **Manage** → **Buy a number**
   - Select your country
   - Choose a number (free trial numbers are available)
   - Click **Buy**

## Step 3: Configure Environment Variables

Add these to your `server/.env` file:

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Important Notes**:
- `TWILIO_PHONE_NUMBER` must include country code (e.g., `+1234567890` or `+919876543210`)
- Use the format: `+[country code][number]` (e.g., `+91` for India, `+1` for US)

## Step 4: Verify Phone Number Format

The SMS service automatically formats phone numbers to E.164 format:
- Removes non-digit characters
- Adds country code if missing (defaults to +91 for India)
- Adds `+` prefix

**Examples**:
- `9876543210` → `+919876543210` (India)
- `+1-555-123-4567` → `+15551234567` (US)
- `+919876543210` → `+919876543210` (already formatted)

## Step 5: Test SMS Notifications

### Test Order Creation

1. Place an order as a customer
2. Check:
   - Customer receives confirmation SMS
   - Vendor receives new order notification SMS

### Test Status Updates

1. As a vendor, update order status (accept, preparing, ready)
2. Customer should receive status update SMS

## SMS Message Examples

### Order Confirmation (Customer)
```
🍽️ Order Confirmed!

Order #ORD-1234567890-ABC123
Total: ₹250.00

• Spicy Noodles x2
• Pasta x1

Status: pending
We'll notify you when your order is ready!
```

### New Order Alert (Vendor)
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

### Status Update (Customer)
```
✅ Order Accepted!

Order #ORD-1234567890-ABC123 has been accepted.
We're preparing your order now!
```

## Troubleshooting

### SMS Not Sending

1. **Check Environment Variables**:
   ```bash
   # In server directory
   cat .env | grep TWILIO
   ```

2. **Check Server Logs**:
   - Look for SMS-related errors
   - Check if SMS service is enabled

3. **Verify Phone Numbers**:
   - Ensure phone numbers are stored in database
   - Check format (should be valid phone numbers)

4. **Twilio Console**:
   - Check **Monitor** → **Logs** → **Messaging**
   - See if messages are being sent
   - Check for error messages

### Common Errors

**Error: "SMS service not configured"**
- Solution: Add all three Twilio environment variables

**Error: "Invalid phone number"**
- Solution: Ensure phone numbers are in valid format
- Check that country code is included

**Error: "Authentication failed"**
- Solution: Verify `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` are correct
- Check for extra spaces or quotes in `.env` file

**Error: "From number not verified"**
- Solution: In Twilio trial account, you can only send to verified numbers
- Add your test numbers in Twilio Console → Phone Numbers → Verified Caller IDs

### Twilio Trial Account Limitations

- **Free Trial**: Can only send SMS to verified phone numbers
- **Upgrade**: Remove limitations by upgrading your Twilio account
- **Cost**: ~$0.0075 per SMS (varies by country)

## Disabling SMS (Optional)

If you want to disable SMS temporarily:

1. Remove or comment out Twilio environment variables in `.env`
2. The service will log messages but not send them
3. Order flow will continue normally

## Production Considerations

1. **Upgrade Twilio Account**: Remove trial limitations
2. **Add Error Handling**: Consider retry logic for failed SMS
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Cost Monitoring**: Set up Twilio usage alerts
5. **Phone Number Validation**: Validate phone numbers before sending
6. **Opt-out Mechanism**: Allow users to opt-out of SMS notifications

## Alternative SMS Providers

If you prefer a different provider, you can modify `server/src/services/smsService.js`:

- **AWS SNS**: Amazon Simple Notification Service
- **MessageBird**: European-based SMS provider
- **Vonage (Nexmo)**: Global SMS API
- **TextLocal**: Popular in India

## Support

- **Twilio Docs**: [https://www.twilio.com/docs/sms](https://www.twilio.com/docs/sms)
- **Twilio Support**: [https://support.twilio.com](https://support.twilio.com)
- **Twilio Console**: [https://console.twilio.com](https://console.twilio.com)

---

**Note**: SMS notifications are sent asynchronously and won't block order processing. If SMS fails, the order will still be created/updated successfully.

