import React, { createContext, useContext, useState, useEffect } from 'react';
import { signup as apiSignup, login as apiLogin, getMe, logout as apiLogout } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = await getMe();
                setUser(user);
            } catch (err) {
                console.error('Auth initialization failed:', err);
                // If getMe fails (e.g. invalid token), user remains null
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const signup = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiSignup(userData);
            if (response && response.user) {
                setUser(response.user);
                return { success: true, user: response.user };
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiLogin(email, password);
            if (response && response.user) {
                setUser(response.user);
                return { success: true, user: response.user };
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    const refreshUser = async () => {
        setLoading(true);
        try {
            const user = await getMe();
            setUser(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Derived state for backward compatibility and convenience
    const isAuthenticated = !!user;
    const isVendor = user?.role === 'RESTAURANT_OWNER' || user?.role === 'ADMIN'; // Adjust based on backend roles
    const isCustomer = user?.role === 'CUSTOMER';

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        refreshUser,
        isAuthenticated,
        isVendor,
        isCustomer
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
