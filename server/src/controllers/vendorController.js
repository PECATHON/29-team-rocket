const { supabaseAdmin } = require('../supabase');

// Create vendor
const createVendor = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Check if vendor with email already exists
        const { data: existingVendor } = await supabaseAdmin
            .from('vendors')
            .select('id')
            .eq('email', email)
            .single();

        if (existingVendor) {
            return res.status(400).json({ error: 'Vendor with this email already exists' });
        }

        // Create vendor
        const { data: vendor, error } = await supabaseAdmin
            .from('vendors')
            .insert({
                name,
                email,
                phone: phone || null,
                address: address || null
            })
            .select()
            .single();

        if (error) {
            console.error('Create vendor error:', error);
            return res.status(500).json({ error: 'Failed to create vendor' });
        }

        res.status(201).json({ vendor });
    } catch (error) {
        console.error('Create vendor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get vendor by ID
const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: vendor, error } = await supabaseAdmin
            .from('vendors')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        res.json({ vendor });
    } catch (error) {
        console.error('Get vendor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// List all vendors
const listVendors = async (req, res) => {
    try {
        const { limit = 100, offset = 0 } = req.query;

        const { data: vendors, error, count } = await supabaseAdmin
            .from('vendors')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

        if (error) {
            console.error('List vendors error:', error);
            return res.status(500).json({ error: 'Failed to fetch vendors' });
        }

        res.json({
            vendors: vendors || [],
            count: count || 0,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('List vendors error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update vendor
const updateVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;

        // Check if vendor exists
        const { data: existingVendor } = await supabaseAdmin
            .from('vendors')
            .select('id')
            .eq('id', id)
            .single();

        if (!existingVendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // If email is being updated, check for duplicates
        if (email && email !== existingVendor.email) {
            const { data: emailExists } = await supabaseAdmin
                .from('vendors')
                .select('id')
                .eq('email', email)
                .single();

            if (emailExists) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }

        // Build update object
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;

        // Update vendor
        const { data: vendor, error } = await supabaseAdmin
            .from('vendors')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Update vendor error:', error);
            return res.status(500).json({ error: 'Failed to update vendor' });
        }

        res.json({ vendor });
    } catch (error) {
        console.error('Update vendor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete vendor
const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if vendor exists
        const { data: existingVendor } = await supabaseAdmin
            .from('vendors')
            .select('id')
            .eq('id', id)
            .single();

        if (!existingVendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Delete vendor
        const { error } = await supabaseAdmin
            .from('vendors')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete vendor error:', error);
            return res.status(500).json({ error: 'Failed to delete vendor' });
        }

        res.json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        console.error('Delete vendor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createVendor,
    getVendorById,
    listVendors,
    updateVendor,
    deleteVendor
};

