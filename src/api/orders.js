const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/orders`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(orderData)
        });

        // Check content type before parsing
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        if (!response.ok) {
            let errorMessage = 'Failed to create order';
            if (isJson) {
                try {
                    const error = await response.json();
                    errorMessage = error.error || errorMessage;
                } catch (e) {
                    // If JSON parsing fails, try to get text
                    const text = await response.text();
                    errorMessage = text || `Server error (${response.status})`;
                }
            } else {
                const text = await response.text();
                errorMessage = text || `Server error (${response.status})`;
            }
            throw new Error(errorMessage);
        }

        // Parse response
        if (isJson) {
            const data = await response.json();
            return data.order;
        } else {
            const text = await response.text();
            throw new Error(`Unexpected response format: ${text.substring(0, 100)}`);
        }
    } catch (error) {
        console.error('Create order error:', error);
        throw error;
    }
};

export const getOrders = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.customer_id) params.append('customer_id', filters.customer_id);
        if (filters.vendor_id) params.append('vendor_id', filters.vendor_id);
        if (filters.status) params.append('status', filters.status);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.offset) params.append('offset', filters.offset);

        const response = await fetch(`${API_URL}?${params.toString()}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch orders');
        }

        return await response.json();
    } catch (error) {
        console.error('Get orders error:', error);
        throw error;
    }
};

export const getOrder = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch order');
        }

        const data = await response.json();
        return data.order;
    } catch (error) {
        console.error('Get order error:', error);
        throw error;
    }
};

export const updateOrderStatus = async (id, status, notes) => {
    try {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status, notes })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update order status');
        }

        const data = await response.json();
        return data.order;
    } catch (error) {
        console.error('Update order status error:', error);
        throw error;
    }
};

export const getOrderTracking = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}/tracking`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch order tracking');
        }

        const data = await response.json();
        return data.tracking;
    } catch (error) {
        console.error('Get order tracking error:', error);
        throw error;
    }
};

