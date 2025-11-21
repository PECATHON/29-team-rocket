const { supabaseAdmin } = require('../supabase');

const ALLOWED_ROLES = ['CUSTOMER', 'RESTAURANT_OWNER', 'DELIVERY_PARTNER', 'ADMIN'];

const signup = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Validation
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        if (!ALLOWED_ROLES.includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Check for existing user by email or phone
        const { data: existingUsers } = await supabaseAdmin
            .from('User')
            .select('email, phone')
            .or(`email.eq.${email},phone.eq.${phone}`)
            .limit(1);

        if (existingUsers && existingUsers.length > 0) {
            return res.status(400).json({ error: 'User with this email or phone already exists' });
        }

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email for now
            user_metadata: {
                name,
                phone,
                role
            }
        });

        if (authError) {
            console.error('Supabase auth error:', authError);
            if (authError.message.includes('already registered')) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            return res.status(500).json({ error: 'Failed to create user account' });
        }

        // If RESTAURANT_OWNER, create vendor record first
        let vendorId = null;
        if (role === 'RESTAURANT_OWNER') {
            const { data: vendor, error: vendorError } = await supabaseAdmin
                .from('vendors')
                .insert({
                    name: name,
                    email: email,
                    phone: phone,
                    address: null
                })
                .select()
                .single();

            if (vendorError) {
                console.error('Vendor creation error:', vendorError);
                // Rollback: delete auth user if vendor creation fails
                await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
                return res.status(500).json({ error: 'Failed to create vendor profile' });
            }

            vendorId = vendor.id;
        }

        // Create user profile in User table
        const { data: userProfile, error: profileError } = await supabaseAdmin
            .from('User')
            .insert({
                id: authData.user.id,
                name,
                email,
                phone,
                role,
                vendor_id: vendorId,
                passwordHash: '' // Not needed with Supabase Auth, but keeping for compatibility
            })
            .select()
            .single();

        if (profileError) {
            console.error('Profile creation error:', profileError);
            // Rollback: delete vendor if created, and delete auth user
            if (vendorId) {
                await supabaseAdmin.from('vendors').delete().eq('id', vendorId);
            }
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return res.status(500).json({ error: 'Failed to create user profile' });
        }

        // Get session token
        const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password
        });

        if (sessionError || !sessionData.session) {
            return res.status(500).json({ error: 'Failed to create session' });
        }

        // Return response
        const { passwordHash: _, ...userWithoutPassword } = userProfile;
        res.status(201).json({
            user: userWithoutPassword,
            token: sessionData.session.access_token,
            session: sessionData.session
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password
        });

        if (authError || !authData.user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Get user profile from User table
        const { data: userProfile, error: profileError } = await supabaseAdmin
            .from('User')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (profileError || !userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        // Return response
        const { passwordHash: _, ...userWithoutPassword } = userProfile;
        res.json({
            user: userWithoutPassword,
            token: authData.session.access_token,
            session: authData.session
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const me = async (req, res) => {
    try {
        // Get user from session (set by middleware)
        const userId = req.user.id;

        // Get user profile
        const { data: userProfile, error: profileError } = await supabaseAdmin
            .from('User')
            .select('*')
            .eq('id', userId)
            .single();

        if (profileError || !userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { passwordHash: _, ...userWithoutPassword } = userProfile;
        res.json({ user: userWithoutPassword });

    } catch (error) {
        console.error('Me error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (token) {
            // Sign out the session
            await supabaseAdmin.auth.signOut();
        }

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    signup,
    login,
    me,
    logout
};
