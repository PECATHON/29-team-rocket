const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
// Use service role key for server-side operations (bypasses RLS)
const supabaseUrl = process.env.SUPABASE_URL || 'https://ovisawqwfapvmedivuam.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
    console.error('');
    console.error('❌ ERROR: SUPABASE_SERVICE_ROLE_KEY is required for server operations!');
    console.error('');
    console.error('📋 How to fix:');
    console.error('   1. Go to: https://supabase.com/dashboard/project/ovisawqwfapvmedivuam/settings/api');
    console.error('   2. Scroll to "Project API keys" section');
    console.error('   3. Copy the "service_role" key (long JWT token starting with eyJ...)');
    console.error('   4. Add it to server/.env as: SUPABASE_SERVICE_ROLE_KEY=your_key_here');
    console.error('');
    console.error('💡 The key should look like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    console.error('');
    process.exit(1);
}

if (!supabaseAnonKey) {
    console.warn('Warning: SUPABASE_ANON_KEY not found. Some operations may fail.');
}

// Service role client for admin operations (bypasses RLS)
// This is used for all server-side operations
const supabaseAdmin = createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

// Regular client for user operations (respects RLS)
// Used when you need RLS policies to apply
const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey || supabaseServiceKey, // Fallback to service key if anon not provided
    {
        auth: {
            autoRefreshToken: true,
            persistSession: false
        }
    }
);

module.exports = {
    supabase,      // For user operations (respects RLS)
    supabaseAdmin  // For admin operations (bypasses RLS)
};

