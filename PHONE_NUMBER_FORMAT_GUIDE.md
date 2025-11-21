# 📱 Phone Number Format Guide

## Quick Answer

**NO, you don't need to add +91 when registering!**

The system **automatically formats** phone numbers for Twilio SMS. Just enter your 10-digit number.

## How It Works

### During Registration

**You enter**: `9876543210` (just the 10 digits)

**System stores**: `9876543210` (as entered)

**When sending SMS**: System automatically converts to `+919876543210`

### Automatic Formatting

The SMS service automatically:
1. ✅ Removes any non-digit characters (spaces, dashes, etc.)
2. ✅ Removes leading zero if present (`09876543210` → `9876543210`)
3. ✅ Adds country code `91` if missing (for 10-digit numbers)
4. ✅ Adds `+` prefix for Twilio

## Accepted Formats

All of these will work and be converted to `+919876543210`:

| What You Enter | What Gets Sent |
|----------------|----------------|
| `9876543210` | `+919876543210` ✅ |
| `09876543210` | `+919876543210` ✅ |
| `+919876543210` | `+919876543210` ✅ |
| `91 98765 43210` | `+919876543210` ✅ |
| `98765-43210` | `+919876543210` ✅ |
| `(98765) 43210` | `+919876543210` ✅ |

## Examples

### Customer Registration

**Enter**: `9876543210`
- Stored in database: `9876543210`
- When SMS sent: Automatically formatted to `+919876543210`

### Vendor Registration

**Enter**: `9876543210`
- Stored in database: `9876543210`
- When SMS sent: Automatically formatted to `+919876543210`

## Important Notes

### ✅ What You Should Do

- **Just enter 10 digits**: `9876543210`
- **Or enter with country code**: `+919876543210` (also works)
- **System handles the rest automatically**

### ❌ What You Don't Need

- ❌ Don't worry about formatting
- ❌ Don't need to add +91 manually
- ❌ Don't need to add country code
- ❌ System handles everything

## For Different Countries

Currently, the system defaults to **India (+91)** for 10-digit numbers.

If you need to support other countries:

1. **Option 1**: Enter with country code
   - US: `+15551234567`
   - UK: `+447911123456`

2. **Option 2**: Update the SMS service default country code
   - Edit `server/src/services/smsService.js`
   - Change line 37: `if (!cleaned.startsWith('91') && cleaned.length === 10)`

## Testing

### Test Phone Number Formatting

```javascript
// The formatPhoneNumber function handles:
'9876543210'      → '+919876543210'
'09876543210'     → '+919876543210'
'+919876543210'   → '+919876543210'
'91 98765 43210'  → '+919876543210'
```

### Verify in Database

```sql
-- Check phone numbers stored
SELECT id, name, phone, email
FROM "User"
WHERE phone IS NOT NULL;

-- Phone numbers are stored as entered
-- Formatting happens only when sending SMS
```

## Troubleshooting

### SMS Not Received

**Check**:
1. Phone number is 10 digits (for India)
2. Phone number is stored in database
3. Twilio credentials are configured
4. Phone number is verified in Twilio (for trial accounts)

**Verify Phone Format**:
```sql
-- Check phone numbers
SELECT id, name, phone, 
       LENGTH(phone) as phone_length
FROM "User"
WHERE phone IS NOT NULL;
```

### Wrong Country Code

**Issue**: SMS going to wrong country

**Fix**: 
- Enter phone with country code: `+919876543210`
- Or update default country in SMS service

## Best Practice

**Recommended**: Just enter **10 digits** for Indian numbers
- Simple for users
- System handles formatting
- Works automatically

**Example**:
- ✅ `9876543210` (recommended)
- ✅ `+919876543210` (also works)
- ❌ `+91 98765 43210` (works but unnecessary)

---

**Summary**: Just enter your 10-digit phone number. The system automatically adds +91 when sending SMS! 📱

