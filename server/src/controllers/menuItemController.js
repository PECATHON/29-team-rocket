const { supabaseAdmin } = require('../supabase');

/**
 * Create a new menu item
 */
const createMenuItem = async (req, res) => {
    try {
        const { vendor_id, name, description, price, category, image_url, available_quantity, is_available } = req.body;
        const userId = req.user?.id;

        // Validation
        if (!name || !price || !category) {
            return res.status(400).json({ error: 'Name, price, and category are required' });
        }

        if (price < 0) {
            return res.status(400).json({ error: 'Price must be non-negative' });
        }

        // Get vendor_id from user if not provided
        let finalVendorId = vendor_id;
        if (!finalVendorId && userId) {
            // Get user's vendor_id
            const { data: user } = await supabaseAdmin
                .from('User')
                .select('vendor_id')
                .eq('id', userId)
                .single();

            if (user?.vendor_id) {
                finalVendorId = user.vendor_id;
            }
        }

        if (!finalVendorId) {
            return res.status(400).json({ error: 'Vendor ID is required. Please ensure you are logged in as a restaurant owner.' });
        }

        // Verify vendor exists
        const { data: vendor } = await supabaseAdmin
            .from('vendors')
            .select('id')
            .eq('id', finalVendorId)
            .single();

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Create menu item
        const { data: menuItem, error } = await supabaseAdmin
            .from('menu_items')
            .insert({
                vendor_id: finalVendorId,
                name,
                description: description || null,
                price: parseFloat(price),
                category,
                image_url: image_url || null,
                available_quantity: available_quantity || 0,
                is_available: is_available !== undefined ? is_available : true
            })
            .select()
            .single();

        if (error) {
            console.error('Create menu item error:', error);
            return res.status(500).json({ error: 'Failed to create menu item' });
        }

        res.status(201).json({ menuItem });
    } catch (error) {
        console.error('Create menu item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get menu items with optional filters
 */
const getMenuItems = async (req, res) => {
    try {
        const { vendor_id, category, is_available, limit = 100, offset = 0 } = req.query;

        let query = supabaseAdmin
            .from('menu_items')
            .select('*')
            .order('created_at', { ascending: false })
            .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

        // Apply filters
        if (vendor_id) {
            query = query.eq('vendor_id', vendor_id);
        }

        if (category) {
            query = query.eq('category', category);
        }

        if (is_available !== undefined) {
            query = query.eq('is_available', is_available === 'true');
        }

        const { data: menuItems, error, count } = await query;

        if (error) {
            console.error('Get menu items error:', error);
            return res.status(500).json({ error: 'Failed to fetch menu items' });
        }

        res.json({
            menuItems: menuItems || [],
            count: count || 0,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Get menu items error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get menu item by ID
 */
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: menuItem, error } = await supabaseAdmin
            .from('menu_items')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json({ menuItem });
    } catch (error) {
        console.error('Get menu item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update menu item
 */
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, image_url, available_quantity, is_available } = req.body;
        const userId = req.user?.id;

        // Check if menu item exists
        const { data: existingItem } = await supabaseAdmin
            .from('menu_items')
            .select('*')
            .eq('id', id)
            .single();

        if (!existingItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Verify user has permission (vendor owns this item)
        if (userId) {
            const { data: user } = await supabaseAdmin
                .from('User')
                .select('vendor_id, role')
                .eq('id', userId)
                .single();

            if (user?.role !== 'ADMIN' && user?.vendor_id !== existingItem.vendor_id) {
                return res.status(403).json({ error: 'You do not have permission to update this menu item' });
            }
        }

        // Build update object
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) {
            if (price < 0) {
                return res.status(400).json({ error: 'Price must be non-negative' });
            }
            updateData.price = parseFloat(price);
        }
        if (category !== undefined) updateData.category = category;
        if (image_url !== undefined) updateData.image_url = image_url;
        if (available_quantity !== undefined) {
            if (available_quantity < 0) {
                return res.status(400).json({ error: 'Available quantity must be non-negative' });
            }
            updateData.available_quantity = parseInt(available_quantity);
        }
        if (is_available !== undefined) updateData.is_available = is_available;
        updateData.updated_at = new Date().toISOString();

        // Update menu item
        const { data: menuItem, error } = await supabaseAdmin
            .from('menu_items')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Update menu item error:', error);
            return res.status(500).json({ error: 'Failed to update menu item' });
        }

        res.json({ menuItem });
    } catch (error) {
        console.error('Update menu item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete menu item
 */
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // Check if menu item exists
        const { data: existingItem } = await supabaseAdmin
            .from('menu_items')
            .select('*')
            .eq('id', id)
            .single();

        if (!existingItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Verify user has permission
        if (userId) {
            const { data: user } = await supabaseAdmin
                .from('User')
                .select('vendor_id, role')
                .eq('id', userId)
                .single();

            if (user?.role !== 'ADMIN' && user?.vendor_id !== existingItem.vendor_id) {
                return res.status(403).json({ error: 'You do not have permission to delete this menu item' });
            }
        }

        // Delete menu item
        const { error } = await supabaseAdmin
            .from('menu_items')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete menu item error:', error);
            return res.status(500).json({ error: 'Failed to delete menu item' });
        }

        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Delete menu item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get categories for a vendor
 */
const getCategories = async (req, res) => {
    try {
        const { vendor_id } = req.query;

        if (!vendor_id) {
            return res.status(400).json({ error: 'Vendor ID is required' });
        }

        const { data: menuItems, error } = await supabaseAdmin
            .from('menu_items')
            .select('category')
            .eq('vendor_id', vendor_id);

        if (error) {
            console.error('Get categories error:', error);
            return res.status(500).json({ error: 'Failed to fetch categories' });
        }

        // Get unique categories
        const categories = [...new Set(menuItems.map(item => item.category))].filter(Boolean);

        res.json({ categories });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getCategories
};
