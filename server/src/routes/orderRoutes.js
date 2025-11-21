const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getOrderTracking
} = require('../controllers/orderController');

const router = express.Router();

// All routes require authentication
router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);
router.get('/:id/tracking', authenticate, getOrderTracking);
router.put('/:id/status', authenticate, updateOrderStatus);

module.exports = router;
