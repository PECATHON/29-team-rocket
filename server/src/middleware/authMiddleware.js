const { supabaseAdmin } = require('../supabase');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token with Supabase
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Get user profile
        const { data: userProfile } = await supabaseAdmin
            .from('User')
            .select('*')
            .eq('id', user.id)
            .single();

        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        // Attach user to request
        req.user = {
            id: user.id,
            email: user.email,
            ...userProfile
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ error: 'Unauthorized: Authentication failed' });
    }
};

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
};
