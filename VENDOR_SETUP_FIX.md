# 🔧 Vendor ID Setup Fix

## Problem

When logged in as a vendor (restaurant owner), you see the error:
> "Vendor ID not found. Please ensure you are logged in as a restaurant owner."

This happens because existing restaurant owner accounts don't have a `vendor_id` linked to them.

## ✅ Solution Implemented

### 1. Automatic Vendor Creation (New Signups)

**For new restaurant owners signing up:**
- Vendor profile is automatically created
- `vendor_id` is automatically linked to the user account
- No manual setup needed!

### 2. Vendor Setup Prompt (Existing Users)

**For existing restaurant owners:**
- A setup form will automatically appear when you log in
- Fill out the form to create your vendor profile
- Your account will be linked automatically

### 3. Manual Fix Script (Optional)

If you prefer to fix it via command line:

```bash
cd server
npm run fix-vendors
```

This will automatically create vendor profiles for all restaurant owners who don't have one.

## 🚀 Quick Fix Steps

### Option 1: Use the Setup Form (Easiest)

1. **Log in as restaurant owner**
2. **You'll see a setup form** (if vendor_id is missing)
3. **Fill in the details:**
   - Restaurant Name (required)
   - Email (required)
   - Phone (optional)
   - Address (optional)
4. **Click "Create Vendor Profile"**
5. **Done!** Refresh the page and you should see your dashboard

### Option 2: Run Fix Script

1. **Open terminal in the `server` folder**
2. **Run:**
   ```bash
   npm run fix-vendors
   ```
3. **This will automatically create vendor profiles for all restaurant owners**

### Option 3: Use API Endpoint

You can also call the API directly:

```bash
POST /api/vendor-setup/setup
Headers: { Authorization: Bearer <your_token> }
Body: {
  "name": "Your Restaurant Name",
  "email": "your@email.com",
  "phone": "1234567890",
  "address": "Your Address"
}
```

## 📋 What Gets Created

When a vendor profile is created:

1. **Vendor Record** in `vendors` table:
   - Name
   - Email
   - Phone
   - Address

2. **User Account** gets updated:
   - `vendor_id` field is set
   - Links user to vendor profile

## ✅ Verification

After setup, verify it worked:

1. **Check Dashboard** - Should show order management instead of error
2. **Check Products Page** - Should allow adding menu items
3. **Check User Profile** - Should have `vendor_id` set

## 🐛 Troubleshooting

### Setup Form Not Appearing

1. **Check browser console** for errors
2. **Refresh the page**
3. **Log out and log back in**
4. **Check that you're logged in as RESTAURANT_OWNER**

### "Failed to create vendor profile" Error

1. **Check that email is unique** (not used by another vendor)
2. **Check server logs** for detailed error
3. **Try running the fix script** instead

### Still Seeing Error After Setup

1. **Refresh the page** (F5 or Ctrl+R)
2. **Clear browser cache**
3. **Log out and log back in**
4. **Check that `vendor_id` is set** in your user profile

## 📝 API Endpoints

### Setup Vendor Profile
```
POST /api/vendor-setup/setup
Headers: { Authorization: Bearer <token> }
Body: {
  "name": "Restaurant Name",
  "email": "email@example.com",
  "phone": "1234567890",
  "address": "Address"
}
```

### Get My Vendor Profile
```
GET /api/vendor-setup/my-profile
Headers: { Authorization: Bearer <token> }
```

## 🎯 Next Steps After Setup

Once your vendor profile is set up:

1. ✅ **Add Menu Items** - Go to Food Items page
2. ✅ **Manage Orders** - View and manage orders in Dashboard
3. ✅ **Update Profile** - Edit vendor details if needed

---

**The setup form should appear automatically when you log in!** If it doesn't, use one of the other methods above.

