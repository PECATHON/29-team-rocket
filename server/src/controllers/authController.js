const prisma = require('../prisma');
const { signToken, hashPassword, comparePassword } = require('../utils/auth');

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

        // Check for existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or phone already exists' });
        }

        // Hash password and create user
        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                passwordHash,
                role
            }
        });

        // Generate token
        const token = signToken(user);

        // Return response (exclude passwordHash)
        const { passwordHash: _, ...userWithoutPassword } = user;
        res.status(201).json({ user: userWithoutPassword, token });

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

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = signToken(user);

        // Return response
        const { passwordHash: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const me = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { passwordHash: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });

    } catch (error) {
        console.error('Me error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    signup,
    login,
    me
};
