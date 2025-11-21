# 🗄️ Supabase Database Integration for Menu Items & Orders

Complete database integration for menu items management and order tracking using Supabase.

## ✅ What's Been Implemented

### Backend (Server)

#### 1. Menu Items Controller (`server/src/controllers/menuItemController.js`)
- ✅ `createMenuItem` - Create new menu items for vendors
- ✅ `getMenuItems` - Fetch menu items with filters (vendor_id, category, is_available)
- ✅ `getMenuItemById` - Get single menu item
- ✅ `updateMenuItem` - Update menu item details
- ✅ `deleteMenuItem` - Delete menu items
- ✅ `getCategories` - Get unique categories for a vendor

#### 2. Orders Controller (`server/src/controllers/orderController.js`)
- ✅ `createOrder` - Create new orders with items
- ✅ `getOrders` - Fetch orders with filters (customer_id, vendor_id, status)
- ✅ `getOrderById` - Get single order with items
- ✅ `updateOrderStatus` - Update order status (pending → confirmed → preparing → ready → delivered)
- ✅ `getOrderTracking` - Get order tracking history

#### 3. API Routes
- ✅ `/api/menu-items` - Menu items CRUD operations
- ✅ `/api/orders` - Orders CRUD and tracking operations

### Frontend (Client)

#### 1. API Clients
- ✅ `src/api/menuItems.js` - Menu items API client (already existed, works with backend)
- ✅ `src/api/orders.js` - Orders API client (already existed, works with backend)

#### 2. Updated Components
- ✅ `ProductsManagement.jsx` - Now fetches menu items from Supabase
- ✅ `History.jsx` - Now fetches orders from Supabase
- ✅ `App.jsx` - Creates orders via API when payment is completed
- ✅ `AddDishCard.jsx` - Already uses API (no changes needed)
- ✅ `DishCard.jsx` - Already uses API (no changes needed)

## 📊 Database Schema

The following tables are already set up in Supabase:

### `menu_items`
- `id` (UUID, Primary Key)
- `vendor_id` (UUID, Foreign Key → vendors)
- `name` (Text)
- `description` (Text, nullable)
- `price` (Numeric)
- `category` (Text)
- `image_url` (Text, nullable)
- `available_quantity` (Integer, default: 0)
- `is_available` (Boolean, default: true)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### `orders`
- `id` (UUID, Primary Key)
- `customer_id` (Text, Foreign Key → User)
- `vendor_id` (UUID, Foreign Key → vendors, nullable)
- `order_number` (Text, unique)
- `status` (Text: pending, confirmed, preparing, ready, out_for_delivery, delivered, cancelled)
- `total_amount` (Numeric)
- `payment_method` (Text, nullable)
- `payment_status` (Text: pending, paid, failed, refunded)
- `delivery_address` (Text, nullable)
- `delivery_instructions` (Text, nullable)
- `order_type` (Text: delivery, pickup, dine_in)
- `table_number` (Text, nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### `order_items`
- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key → orders)
- `menu_item_id` (UUID, Foreign Key → menu_items)
- `quantity` (Integer)
- `unit_price` (Numeric)
- `subtotal` (Numeric)
- `special_instructions` (Text, nullable)
- `created_at` (Timestamp)

### `order_tracking`
- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key → orders)
- `status` (Text)
- `notes` (Text, nullable)
- `created_at` (Timestamp)

## 🚀 How to Use

### For Vendors (Restaurant Owners)

#### Adding Menu Items
1. Go to **Food Items** page (`/products`)
2. Select a category
3. Click **"Add new dish"** card
4. Fill in:
   - Name (required)
   - Description (optional)
   - Price (required)
   - Category (required)
   - Available Quantity
   - Image URL (optional)
   - Available toggle
5. Click **"Add Dish"**

#### Viewing Menu Items
- Menu items are automatically filtered by your vendor account
- Items are grouped by category
- You can edit or delete items using the buttons on each card

### For Customers

#### Placing Orders
1. Browse menu items (currently using hardcoded data in `MainContent.jsx`)
2. Add items to cart
3. Complete payment
4. Order is automatically created in Supabase
5. Order appears in order history

#### Viewing Order History
1. Go to **History** page (`/history`)
2. View all your orders
3. Filter by: All, Today, This Week, This Month
4. See order details including:
   - Order number
   - Items ordered
   - Total amount
   - Payment method
   - Order status

## 🔧 API Endpoints

### Menu Items

```
POST   /api/menu-items              - Create menu item
GET    /api/menu-items              - List menu items (with filters)
GET    /api/menu-items/:id          - Get menu item by ID
PUT    /api/menu-items/:id          - Update menu item
DELETE /api/menu-items/:id          - Delete menu item
GET    /api/menu-items/categories   - Get categories for vendor
```

**Query Parameters for GET /api/menu-items:**
- `vendor_id` - Filter by vendor
- `category` - Filter by category
- `is_available` - Filter by availability (true/false)
- `limit` - Number of results (default: 100)
- `offset` - Pagination offset (default: 0)

### Orders

```
POST   /api/orders                  - Create order
GET    /api/orders                  - List orders (with filters)
GET    /api/orders/:id              - Get order by ID
PUT    /api/orders/:id/status       - Update order status
GET    /api/orders/:id/tracking     - Get order tracking history
```

**Query Parameters for GET /api/orders:**
- `customer_id` - Filter by customer
- `vendor_id` - Filter by vendor
- `status` - Filter by status
- `limit` - Number of results (default: 50)
- `offset` - Pagination offset (default: 0)

## 🔐 Authentication & Authorization

- All endpoints require authentication (Bearer token)
- Vendors can only manage their own menu items
- Customers can only view their own orders
- Vendors can only view orders for their restaurant
- Admins have full access

## 📝 Example API Requests

### Create Menu Item
```javascript
POST /api/menu-items
Headers: { Authorization: Bearer <token> }
Body: {
  "name": "Spicy Noodles",
  "description": "Delicious spicy noodles",
  "price": 12.99,
  "category": "Hot Dishes",
  "available_quantity": 50,
  "is_available": true,
  "image_url": "https://example.com/image.jpg"
}
```

### Create Order
```javascript
POST /api/orders
Headers: { Authorization: Bearer <token> }
Body: {
  "items": [
    {
      "menu_item_id": "uuid-here",
      "quantity": 2,
      "special_instructions": "Extra spicy"
    }
  ],
  "payment_method": "credit_card",
  "payment_status": "paid",
  "order_type": "delivery",
  "delivery_address": "123 Main St"
}
```

### Update Order Status
```javascript
PUT /api/orders/:id/status
Headers: { Authorization: Bearer <token> }
Body: {
  "status": "preparing",
  "notes": "Order is being prepared"
}
```

## 🐛 Troubleshooting

### "Vendor ID not found" Error
- Ensure you're logged in as a restaurant owner
- Check that your user account has a `vendor_id` set
- You may need to create a vendor profile first

### "Menu item not found" Error
- Verify the menu item ID is correct
- Check that the menu item belongs to your vendor account

### "Order creation failed" Error
- Ensure all cart items have valid `menu_item_id`
- Check that menu items are available and have sufficient quantity
- Verify you're authenticated

### Orders Not Appearing
- Check that orders are being created successfully
- Verify your user ID matches the customer_id in orders
- Check browser console for API errors

## 🔄 Next Steps (Optional Enhancements)

1. **Update MainContent.jsx** - Fetch menu items from API instead of hardcoded data
2. **Order Tracking UI** - Add real-time order status updates
3. **Vendor Dashboard** - Show order statistics and revenue
4. **Inventory Management** - Auto-update quantities when orders are placed
5. **Order Notifications** - Email/SMS notifications for order status changes

## ✅ Testing Checklist

- [ ] Vendor can create menu items
- [ ] Vendor can view their menu items
- [ ] Vendor can edit menu items
- [ ] Vendor can delete menu items
- [ ] Customer can place orders
- [ ] Orders appear in customer history
- [ ] Orders appear in vendor view
- [ ] Order status can be updated
- [ ] Order tracking history works
- [ ] Menu items are filtered by vendor
- [ ] Orders are filtered by customer/vendor

---

**All database operations are now handled through Supabase!** 🎉

