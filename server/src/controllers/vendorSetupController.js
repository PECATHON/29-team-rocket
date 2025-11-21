const { supabaseAdmin } = require('../supabase');

/**
 * Create or link vendor profile for existing restaurant owner
 * This helps existing users who don't have a vendor_id
 */
const setupVendorProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, email, phone, address } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'User authentication required' });
        }

        // Check if user is a restaurant owner
        const { data: user } = await supabaseAdmin
            .from('User')
            .select('role, vendor_id, email, name, phone')
            .eq('id', userId)
            .single();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role !== 'RESTAURANT_OWNER' && user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Only restaurant owners can create vendor profiles' });
        }

        // If user already has a vendor_id, return existing vendor
        if (user.vendor_id) {
            const { data: existingVendor } = await supabaseAdmin
                .from('vendors')
                .select('*')
                .eq('id', user.vendor_id)
                .single();

            if (existingVendor) {
                return res.json({
                    vendor: existingVendor,
                    message: 'Vendor profile already exists'
                });
            }
        }

        // Create new vendor
        const vendorData = {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            address: address || null
        };

        const { data: vendor, error: vendorError } = await supabaseAdmin
            .from('vendors')
            .insert(vendorData)
            .select()
            .single();

        if (vendorError) {
            console.error('Vendor creation error:', vendorError);
            return res.status(500).json({ error: 'Failed to create vendor profile' });
        }

        // Update user with vendor_id
        const { error: updateError } = await supabaseAdmin
            .from('User')
            .update({ vendor_id: vendor.id })
            .eq('id', userId);

        if (updateError) {
            console.error('User update error:', updateError);
            // Rollback: delete vendor
            await supabaseAdmin.from('vendors').delete().eq('id', vendor.id);
            return res.status(500).json({ error: 'Failed to link vendor to user' });
        }

        res.status(201).json({
            vendor,
            message: 'Vendor profile created successfully'
        });

    } catch (error) {
        console.error('Setup vendor profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get vendor profile for current user
 */
const getMyVendorProfile = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'User authentication required' });
        }

        // Get user with vendor_id
        const { data: user } = await supabaseAdmin
            .from('User')
            .select('vendor_id, role')
            .eq('id', userId)
            .single();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.vendor_id) {
            return res.status(404).json({ 
                error: 'Vendor profile not found',
                needsSetup: true 
            });
        }

        // Get vendor details
        const { data: vendor, error: vendorError } = await supabaseAdmin
            .from('vendors')
            .select('*')
            .eq('id', user.vendor_id)
            .single();

        if (vendorError || !vendor) {
            return res.status(404).json({ error: 'Vendor profile not found' });
        }

        res.json({ vendor });

    } catch (error) {
        console.error('Get vendor profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    setupVendorProfile,
    getMyVendorProfile
};

