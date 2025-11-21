const axios = require('axios');

/**
 * SMS Service using Twilio
 * Sends SMS notifications for order events
 */
class SMSService {
    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID;
        this.authToken = process.env.TWILIO_AUTH_TOKEN;
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
        this.enabled = !!(this.accountSid && this.authToken && this.fromNumber);
        
        if (!this.enabled) {
            console.warn('⚠️  SMS Service is disabled. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to enable.');
        }
    }

    /**
     * Format phone number for Twilio (E.164 format)
     * @param {string} phone - Phone number to format
     * @returns {string} Formatted phone number
     */
    formatPhoneNumber(phone) {
        if (!phone) return null;
        
        // Remove all non-digit characters
        let cleaned = phone.replace(/\D/g, '');
        
        // If it starts with 0, remove it (common in some countries)
        if (cleaned.startsWith('0')) {
            cleaned = cleaned.substring(1);
        }
        
        // If it doesn't start with country code, assume it's Indian (+91)
        // You can modify this based on your default country
        if (!cleaned.startsWith('91') && cleaned.length === 10) {
            cleaned = '91' + cleaned;
        }
        
        // Add + prefix
        return '+' + cleaned;
    }

    /**
     * Send SMS using Twilio API
     * @param {string} to - Recipient phone number
     * @param {string} message - Message to send
     * @returns {Promise<Object>} Twilio response
     */
    async sendSMS(to, message) {
        if (!this.enabled) {
            console.log('📱 SMS Service disabled. Would send:', { to, message });
            return { success: false, reason: 'SMS service not configured' };
        }

        if (!to || !message) {
            console.error('SMS: Missing recipient or message');
            return { success: false, reason: 'Missing recipient or message' };
        }

        try {
            const formattedTo = this.formatPhoneNumber(to);
            
            if (!formattedTo) {
                console.error('SMS: Invalid phone number:', to);
                return { success: false, reason: 'Invalid phone number' };
            }

            const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
            
            const params = new URLSearchParams();
            params.append('To', formattedTo);
            params.append('From', this.fromNumber);
            params.append('Body', message);

            const response = await axios.post(url, params, {
                auth: {
                    username: this.accountSid,
                    password: this.authToken
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 10000 // 10 second timeout
            });

            console.log('✅ SMS sent successfully:', {
                to: formattedTo,
                sid: response.data.sid,
                status: response.data.status
            });

            return {
                success: true,
                sid: response.data.sid,
                status: response.data.status
            };
        } catch (error) {
            console.error('❌ SMS send error:', {
                to,
                error: error.response?.data || error.message
            });
            
            // Don't throw error - SMS failure shouldn't break order flow
            return {
                success: false,
                reason: error.response?.data?.message || error.message
            };
        }
    }

    /**
     * Send order confirmation to customer
     * @param {Object} order - Order object
     * @param {Object} customer - Customer user object
     * @returns {Promise<Object>} SMS result
     */
    async sendOrderConfirmation(order, customer) {
        if (!customer?.phone) {
            console.warn('Cannot send order confirmation: customer phone not found');
            return { success: false, reason: 'Customer phone not found' };
        }

        const itemsList = order.order_items?.slice(0, 3).map(item => 
            `• ${item.menu_items?.name || 'Item'} x${item.quantity}`
        ).join('\n') || '';

        const message = `🍽️ Order Confirmed!\n\n` +
            `Order #${order.order_number}\n` +
            `Total: ₹${parseFloat(order.total_amount).toFixed(2)}\n\n` +
            `${itemsList}${order.order_items?.length > 3 ? `\n+${order.order_items.length - 3} more items` : ''}\n\n` +
            `Status: ${order.status}\n` +
            `We'll notify you when your order is ready!`;

        return await this.sendSMS(customer.phone, message);
    }

    /**
     * Send new order notification to vendor
     * @param {Object} order - Order object
     * @param {Object} vendor - Vendor object
     * @param {Object} customer - Customer user object
     * @returns {Promise<Object>} SMS result
     */
    async sendNewOrderNotification(order, vendor, customer) {
        if (!vendor?.phone) {
            console.warn('Cannot send new order notification: vendor phone not found');
            return { success: false, reason: 'Vendor phone not found' };
        }

        const itemsCount = order.order_items?.length || 0;
        const totalItems = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

        const message = `🆕 New Order Received!\n\n` +
            `Order #${order.order_number}\n` +
            `Customer: ${customer?.name || 'Guest'}\n` +
            `Items: ${itemsCount} items (${totalItems} total)\n` +
            `Total: ₹${parseFloat(order.total_amount).toFixed(2)}\n` +
            `Type: ${order.order_type || 'Delivery'}\n` +
            `${order.table_number ? `Table: ${order.table_number}\n` : ''}` +
            `${order.delivery_address ? `Address: ${order.delivery_address}\n` : ''}\n` +
            `Please check your dashboard to accept or reject.`;

        return await this.sendSMS(vendor.phone, message);
    }

    /**
     * Send order status update to customer
     * @param {Object} order - Order object
     * @param {Object} customer - Customer user object
     * @param {string} oldStatus - Previous status
     * @param {string} newStatus - New status
     * @returns {Promise<Object>} SMS result
     */
    async sendOrderStatusUpdate(order, customer, oldStatus, newStatus) {
        if (!customer?.phone) {
            console.warn('Cannot send status update: customer phone not found');
            return { success: false, reason: 'Customer phone not found' };
        }

        let message = '';
        let emoji = '📦';

        switch (newStatus) {
            case 'accepted':
                emoji = '✅';
                message = `${emoji} Order Accepted!\n\n` +
                    `Order #${order.order_number} has been accepted.\n` +
                    `We're preparing your order now!`;
                break;
            case 'rejected':
                emoji = '❌';
                message = `${emoji} Order Update\n\n` +
                    `Order #${order.order_number} has been cancelled.\n` +
                    `We apologize for any inconvenience.`;
                break;
            case 'preparing':
                emoji = '👨‍🍳';
                message = `${emoji} Order Being Prepared!\n\n` +
                    `Order #${order.order_number} is now being prepared.\n` +
                    `We'll notify you when it's ready!`;
                break;
            case 'ready':
                emoji = '🎉';
                message = `${emoji} Order Ready!\n\n` +
                    `Order #${order.order_number} is ready for ${order.order_type === 'Dine In' ? 'pickup' : 'delivery'}!\n` +
                    `${order.order_type === 'Dine In' && order.table_number ? `Table: ${order.table_number}\n` : ''}` +
                    `Thank you for your order!`;
                break;
            case 'delivered':
                emoji = '🚚';
                message = `${emoji} Order Delivered!\n\n` +
                    `Order #${order.order_number} has been delivered.\n` +
                    `Enjoy your meal! 🍽️`;
                break;
            default:
                message = `📦 Order Status Update\n\n` +
                    `Order #${order.order_number}\n` +
                    `Status: ${newStatus}`;
        }

        return await this.sendSMS(customer.phone, message);
    }
}

// Export singleton instance
module.exports = new SMSService();

