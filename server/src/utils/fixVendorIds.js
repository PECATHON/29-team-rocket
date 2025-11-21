const { supabaseAdmin } = require('../supabase');

/**
 * Utility script to fix existing restaurant owners who don't have vendor_id
 * Run this once to fix existing users
 */
const fixVendorIds = async () => {
    try {
        console.log('Starting vendor_id fix for existing restaurant owners...');

        // Get all restaurant owners without vendor_id
        const { data: users, error: usersError } = await supabaseAdmin
            .from('User')
            .select('id, name, email, phone, role, vendor_id')
            .eq('role', 'RESTAURANT_OWNER')
            .is('vendor_id', null);

        if (usersError) {
            console.error('Error fetching users:', usersError);
            return;
        }

        if (!users || users.length === 0) {
            console.log('No restaurant owners need vendor_id fix.');
            return;
        }

        console.log(`Found ${users.length} restaurant owner(s) without vendor_id`);

        for (const user of users) {
            try {
                // Check if vendor already exists with this email
                const { data: existingVendor } = await supabaseAdmin
                    .from('vendors')
                    .select('id')
                    .eq('email', user.email)
                    .single();

                let vendorId;

                if (existingVendor) {
                    // Use existing vendor
                    vendorId = existingVendor.id;
                    console.log(`Found existing vendor for ${user.email}`);
                } else {
                    // Create new vendor
                    const { data: newVendor, error: vendorError } = await supabaseAdmin
                        .from('vendors')
                        .insert({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            address: null
                        })
                        .select()
                        .single();

                    if (vendorError) {
                        console.error(`Failed to create vendor for ${user.email}:`, vendorError);
                        continue;
                    }

                    vendorId = newVendor.id;
                    console.log(`Created vendor for ${user.email}`);
                }

                // Update user with vendor_id
                const { error: updateError } = await supabaseAdmin
                    .from('User')
                    .update({ vendor_id: vendorId })
                    .eq('id', user.id);

                if (updateError) {
                    console.error(`Failed to update user ${user.email}:`, updateError);
                } else {
                    console.log(`✓ Fixed vendor_id for ${user.email}`);
                }
            } catch (error) {
                console.error(`Error processing user ${user.email}:`, error);
            }
        }

        console.log('Vendor ID fix completed!');
    } catch (error) {
        console.error('Fix vendor IDs error:', error);
    }
};

// Run if called directly
if (require.main === module) {
    fixVendorIds()
        .then(() => {
            console.log('Done!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

module.exports = { fixVendorIds };

