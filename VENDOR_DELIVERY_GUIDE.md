# 📦 Vendor Order Delivery Guide

## How to Approve/Mark Order Delivery

This guide explains how vendors can mark orders as delivered after they've been completed.

## Order Status Flow

The complete order flow is:

1. **Pending** → Customer places order
2. **Accepted** → Vendor accepts the order
3. **Preparing** → Vendor starts preparing the order
4. **Ready** → Order is ready for pickup/delivery
5. **Delivered** → Order has been delivered/completed ✅

## Steps to Mark Order as Delivered

### Step 1: Access Vendor Dashboard

1. Log in as a **Restaurant Owner (Vendor)**
2. Navigate to **Dashboard** (`/dashboard`)
3. You'll see the **Order Management** section

### Step 2: Find Ready Orders

1. Look for orders with status **"Ready"**
2. You can filter orders by clicking the **"Ready"** filter button
3. Ready orders show: "Customer has been notified"

### Step 3: Mark as Delivered

1. Find the order that has been delivered/picked up
2. Click the **"✓ Mark as Delivered"** button
3. Confirm the action in the popup
4. The order status will change to **"Delivered"**

## What Happens When You Mark as Delivered

✅ **Order Status Updates**:
- Status changes from `ready` to `delivered`
- Order is marked as completed

📱 **Customer Notification**:
- Customer receives SMS notification: "Order Delivered! Enjoy your meal! 🍽️"
- Customer sees "Delivered" status in their order history

📊 **Order Tracking**:
- Delivery is recorded in order tracking history
- Order appears in "Delivered" filter

## Viewing Delivered Orders

### Filter by Status

Click the **"Delivered"** filter button to see all completed orders.

### Order Details

Delivered orders show:
- ✅ "Order completed and delivered" notification
- Purple "Delivered" status badge
- All order details (items, total, customer info)

## Order Management Actions

### Available Actions by Status

| Status | Available Actions |
|--------|------------------|
| **Pending** | Accept / Reject |
| **Accepted** | Start Preparing |
| **Preparing** | Mark as Ready |
| **Ready** | **Mark as Delivered** ✅ |
| **Delivered** | (Completed - No actions) |
| **Rejected** | (Cancelled - No actions) |

## Best Practices

1. **Mark as Ready First**: Always mark order as "Ready" before marking as "Delivered"
2. **Confirm Delivery**: Only mark as delivered after:
   - Order has been picked up (for dine-in/to-go)
   - Order has been delivered to customer (for delivery)
3. **Check Order Details**: Verify order items and customer information before marking delivered
4. **Use Filters**: Use status filters to manage orders efficiently

## Troubleshooting

### "Mark as Delivered" Button Not Showing

**Issue**: Button doesn't appear for ready orders

**Solutions**:
- Ensure order status is "ready"
- Refresh the page
- Check that you're logged in as a vendor
- Verify the order belongs to your vendor account

### Can't Mark Order as Delivered

**Issue**: Button is disabled or not working

**Solutions**:
- Check your internet connection
- Verify you have permission (logged in as restaurant owner)
- Check browser console for errors
- Ensure order status is "ready"

### Order Status Not Updating

**Issue**: Status doesn't change after clicking "Mark as Delivered"

**Solutions**:
- Wait a few seconds (updates happen asynchronously)
- Refresh the page
- Check server logs for errors
- Verify API endpoint is accessible

## Quick Reference

### Keyboard Shortcuts
- None currently available

### Status Colors
- 🟡 **Pending**: Yellow
- 🟢 **Accepted**: Green
- 🔵 **Preparing**: Blue
- 🟠 **Ready**: Orange
- 🟣 **Delivered**: Purple
- 🔴 **Rejected**: Red

## API Reference

### Mark Order as Delivered

```javascript
PUT /api/orders/:id/status
Headers: { Authorization: Bearer <token> }
Body: {
  "status": "delivered",
  "notes": "Order has been delivered"
}
```

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Verify your vendor account has proper permissions
4. Ensure phone numbers are set for SMS notifications

---

**Note**: Once an order is marked as "Delivered", it cannot be changed back. Make sure the order is actually delivered before marking it as complete.

