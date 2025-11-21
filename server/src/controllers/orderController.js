const { supabaseAdmin } = require('../supabase');
const smsService = require('../services/smsService');

/**
 * Create a new order
 */
const createOrder = async (req, res) => {
    try {
        const {
            items,
            vendor_id,
            payment_method,
            payment_status,
            delivery_address,
            delivery_instructions,
            order_type,
            table_number
        } = req.body;

        const userId = req.user?.id;

        // Validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }

        if (!userId) {
            return res.status(401).json({ error: 'User authentication required' });
        }

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            if (!item.menu_item_id || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ error: 'Each item must have a valid menu_item_id and quantity > 0' });
            }

            // Get menu item details
            const { data: menuItem, error: menuError } = await supabaseAdmin
                .from('menu_items')
                .select('*')
                .eq('id', item.menu_item_id)
                .single();

            if (menuError || !menuItem) {
                return res.status(404).json({ error: `Menu item ${item.menu_item_id} not found` });
            }

            if (!menuItem.is_available) {
                return res.status(400).json({ error: `Menu item ${menuItem.name} is not available` });
            }

            if (menuItem.available_quantity < item.quantity) {
                return res.status(400).json({ error: `Insufficient quantity for ${menuItem.name}. Available: ${menuItem.available_quantity}` });
            }

            const unitPrice = parseFloat(menuItem.price);
            const subtotal = unitPrice * item.quantity;
            totalAmount += subtotal;

            orderItems.push({
                menu_item_id: item.menu_item_id,
                quantity: item.quantity,
                unit_price: unitPrice,
                subtotal: subtotal,
                special_instructions: item.special_instructions || null
            });
        }

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Determine vendor_id if not provided (from first menu item)
        let finalVendorId = vendor_id;
        if (!finalVendorId && orderItems.length > 0) {
            const { data: firstMenuItem } = await supabaseAdmin
                .from('menu_items')
                .select('vendor_id')
                .eq('id', orderItems[0].menu_item_id)
                .single();

            if (firstMenuItem) {
                finalVendorId = firstMenuItem.vendor_id;
            }
        }

        // Create order
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert({
                customer_id: userId,
                vendor_id: finalVendorId || null,
                order_number: orderNumber,
                status: 'pending',
                total_amount: totalAmount,
                payment_method: payment_method || null,
                payment_status: payment_status || 'pending',
                delivery_address: delivery_address || null,
                delivery_instructions: delivery_instructions || null,
                order_type: order_type || 'delivery',
                table_number: table_number || null
            })
            .select()
            .single();

        if (orderError) {
            console.error('Create order error:', orderError);
            return res.status(500).json({ error: 'Failed to create order' });
        }

        // Create order items
        const orderItemsWithOrderId = orderItems.map(item => ({
            ...item,
            order_id: order.id
        }));

        const { error: itemsError } = await supabaseAdmin
            .from('order_items')
            .insert(orderItemsWithOrderId);

        if (itemsError) {
            console.error('Create order items error:', itemsError);
            // Rollback order creation
            await supabaseAdmin.from('orders').delete().eq('id', order.id);
            return res.status(500).json({ error: 'Failed to create order items' });
        }

        // Create initial tracking entry
        await supabaseAdmin
            .from('order_tracking')
            .insert({
                order_id: order.id,
                status: 'pending',
                notes: 'Order created'
            });

        // Update menu item quantities
        for (const item of orderItems) {
            await supabaseAdmin.rpc('decrement_menu_item_quantity', {
                item_id: item.menu_item_id,
                quantity: item.quantity
            }).catch(async () => {
                // If RPC doesn't exist, do manual update
                const { data: menuItem } = await supabaseAdmin
                    .from('menu_items')
                    .select('available_quantity')
                    .eq('id', item.menu_item_id)
                    .single();

                if (menuItem) {
                    await supabaseAdmin
                        .from('menu_items')
                        .update({ available_quantity: Math.max(0, menuItem.available_quantity - item.quantity) })
                        .eq('id', item.menu_item_id);
                }
            });
        }

        // Fetch complete order with items
        const { data: completeOrder } = await supabaseAdmin
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    menu_items (*)
                )
            `)
            .eq('id', order.id)
            .single();

        // Send SMS notifications (non-blocking)
        (async () => {
            try {
                // Get customer details
                const { data: customer } = await supabaseAdmin
                    .from('User')
                    .select('id, name, phone, email')
                    .eq('id', userId)
                    .single();

                // Get vendor details if vendor_id exists
                let vendor = null;
                if (finalVendorId) {
                    const { data: vendorData } = await supabaseAdmin
                        .from('vendors')
                        .select('id, name, phone, email')
                        .eq('id', finalVendorId)
                        .single();
                    vendor = vendorData;
                }

                const orderForSMS = completeOrder || order;

                // Send confirmation to customer
                if (customer) {
                    await smsService.sendOrderConfirmation(orderForSMS, customer);
                }

                // Send notification to vendor
                if (vendor && customer) {
                    await smsService.sendNewOrderNotification(orderForSMS, vendor, customer);
                }
            } catch (smsError) {
                // Log but don't fail the order creation
                console.error('SMS notification error (non-critical):', smsError);
            }
        })();

        res.status(201).json({ order: completeOrder || order });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get orders with optional filters
 */
const getOrders = async (req, res) => {
    try {
        const { customer_id, vendor_id, status, limit = 50, offset = 0 } = req.query;
        const userId = req.user?.id;

        let query = supabaseAdmin
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    menu_items (*)
                ),
                vendors (*)
            `)
            .order('created_at', { ascending: false })
            .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

        // Apply filters
        if (customer_id) {
            query = query.eq('customer_id', customer_id);
        } else if (userId && req.user?.role === 'CUSTOMER') {
            // Auto-filter by current user if customer
            query = query.eq('customer_id', userId);
        }

        if (vendor_id) {
            query = query.eq('vendor_id', vendor_id);
        } else if (userId && req.user?.role === 'RESTAURANT_OWNER') {
            // Auto-filter by vendor if restaurant owner
            const { data: user } = await supabaseAdmin
                .from('User')
                .select('vendor_id')
                .eq('id', userId)
                .single();

            if (user?.vendor_id) {
                query = query.eq('vendor_id', user.vendor_id);
            }
        }

        if (status) {
            query = query.eq('status', status);
        }

        const { data: orders, error, count } = await query;

        if (error) {
            console.error('Get orders error:', error);
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }

        res.json({
            orders: orders || [],
            count: count || 0,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get order by ID
 */
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const { data: order, error } = await supabaseAdmin
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    menu_items (*)
                ),
                vendors (*)
            `)
            .eq('id', id)
            .single();

        if (error || !order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Verify user has permission to view this order
        if (userId) {
            const isCustomer = req.user?.role === 'CUSTOMER' && order.customer_id === userId;
            const isVendor = req.user?.role === 'RESTAURANT_OWNER' && order.vendor_id;
            
            if (req.user?.role !== 'ADMIN' && !isCustomer && !isVendor) {
                return res.status(403).json({ error: 'You do not have permission to view this order' });
            }
        }

        res.json({ order });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update order status
 */
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const userId = req.user?.id;

        // Valid statuses
        const validStatuses = ['pending', 'accepted', 'rejected', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
        
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
        }

        // Check if order exists
        const { data: existingOrder } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (!existingOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Verify user has permission
        if (userId) {
            const isVendor = req.user?.role === 'RESTAURANT_OWNER' && existingOrder.vendor_id;
            const { data: user } = await supabaseAdmin
                .from('User')
                .select('vendor_id')
                .eq('id', userId)
                .single();

            if (req.user?.role !== 'ADMIN' && !isVendor && user?.vendor_id !== existingOrder.vendor_id) {
                return res.status(403).json({ error: 'You do not have permission to update this order' });
            }
        }

        // Update order status
        const { data: order, error } = await supabaseAdmin
            .from('orders')
            .update({
                status,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Update order status error:', error);
            return res.status(500).json({ error: 'Failed to update order status' });
        }

        // Create tracking entry
        await supabaseAdmin
            .from('order_tracking')
            .insert({
                order_id: id,
                status,
                notes: notes || `Order status updated to ${status}`
            });

        // Send SMS notification to customer (non-blocking)
        (async () => {
            try {
                // Get customer details
                const { data: customer } = await supabaseAdmin
                    .from('User')
                    .select('id, name, phone, email')
                    .eq('id', existingOrder.customer_id)
                    .single();

                // Fetch complete order with items for SMS
                const { data: completeOrder } = await supabaseAdmin
                    .from('orders')
                    .select(`
                        *,
                        order_items (
                            *,
                            menu_items (*)
                        )
                    `)
                    .eq('id', id)
                    .single();

                if (customer && completeOrder) {
                    await smsService.sendOrderStatusUpdate(
                        completeOrder,
                        customer,
                        existingOrder.status,
                        status
                    );
                }
            } catch (smsError) {
                // Log but don't fail the status update
                console.error('SMS notification error (non-critical):', smsError);
            }
        })();

        res.json({ order });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get order tracking history
 */
const getOrderTracking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // Check if order exists and user has permission
        const { data: order } = await supabaseAdmin
            .from('orders')
            .select('customer_id, vendor_id')
            .eq('id', id)
            .single();

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Verify user has permission
        if (userId) {
            const isCustomer = req.user?.role === 'CUSTOMER' && order.customer_id === userId;
            const isVendor = req.user?.role === 'RESTAURANT_OWNER' && order.vendor_id;
            
            if (req.user?.role !== 'ADMIN' && !isCustomer && !isVendor) {
                return res.status(403).json({ error: 'You do not have permission to view this order tracking' });
            }
        }

        // Get tracking history
        const { data: tracking, error } = await supabaseAdmin
            .from('order_tracking')
            .select('*')
            .eq('order_id', id)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Get order tracking error:', error);
            return res.status(500).json({ error: 'Failed to fetch order tracking' });
        }

        res.json({ tracking: tracking || [] });
    } catch (error) {
        console.error('Get order tracking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getOrderTracking
};
