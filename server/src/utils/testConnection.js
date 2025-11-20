// Test Supabase connection on server startup
const { supabaseAdmin } = require('../supabase');

async function testSupabaseConnection() {
    try {
        // Test database connection
        const { data, error } = await supabaseAdmin
            .from('vendors')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Supabase connection test failed:', error.message);
            return false;
        }

        console.log('✅ Supabase database connection: OK');
        
        // Test auth connection
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (authError) {
            console.warn('⚠️  Supabase Auth connection warning:', authError.message);
        } else {
            console.log('✅ Supabase Auth connection: OK');
        }

        return true;
    } catch (error) {
        console.error('❌ Supabase connection test error:', error.message);
        return false;
    }
}

module.exports = { testSupabaseConnection };

