// Use environment variable for API URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/auth`;

export const signup = async (userData) => {
    try {
        console.log('Sending signup request:', userData);
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await handleResponse(response);
        localStorage.setItem('token', data.token);
        return { user: data.user, token: data.token };
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        console.log('Sending login request for:', email);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await handleResponse(response);
        localStorage.setItem('token', data.token);
        return { user: data.user, token: data.token };
    } catch (error) {
        // Error will be handled by the UI component
        throw error;
    }
};

export const getMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Handle 401 specifically for getMe (token expired/invalid)
        if (response.status === 401) {
            localStorage.removeItem('token');
            return null;
        }

        const data = await handleResponse(response);
        return data.user;
    } catch (error) {
        console.error('GetMe error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

// Helper to handle response parsing
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        return data;
    } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        if (!response.ok) {
            throw new Error(`Server error (${response.status}): ${text.slice(0, 100)}`);
        }
        throw new Error('Invalid response format from server');
    }
};
