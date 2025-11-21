const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/menu-items`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getMenuItems = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.vendor_id) params.append('vendor_id', filters.vendor_id);
        if (filters.category) params.append('category', filters.category);
        if (filters.is_available !== undefined) params.append('is_available', filters.is_available);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.offset) params.append('offset', filters.offset);

        const response = await fetch(`${API_URL}?${params.toString()}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch menu items');
        }

        return await response.json();
    } catch (error) {
        console.error('Get menu items error:', error);
        throw error;
    }
};

export const getMenuItem = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch menu item');
        }

        const data = await response.json();
        return data.menuItem;
    } catch (error) {
        console.error('Get menu item error:', error);
        throw error;
    }
};

export const createMenuItem = async (menuItemData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(menuItemData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create menu item');
        }

        const data = await response.json();
        return data.menuItem;
    } catch (error) {
        console.error('Create menu item error:', error);
        throw error;
    }
};

export const updateMenuItem = async (id, menuItemData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(menuItemData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update menu item');
        }

        const data = await response.json();
        return data.menuItem;
    } catch (error) {
        console.error('Update menu item error:', error);
        throw error;
    }
};

export const deleteMenuItem = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete menu item');
        }

        return true;
    } catch (error) {
        console.error('Delete menu item error:', error);
        throw error;
    }
};

export const getCategories = async (vendorId) => {
    try {
        const response = await fetch(`${API_URL}/categories?vendor_id=${vendorId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch categories');
        }

        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Get categories error:', error);
        throw error;
    }
};

