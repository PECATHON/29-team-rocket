const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getCategories
} = require('../controllers/menuItemController');

const router = express.Router();

// All routes require authentication
router.post('/', authenticate, createMenuItem);
router.get('/', authenticate, getMenuItems);
router.get('/categories', authenticate, getCategories);
router.get('/:id', authenticate, getMenuItemById);
router.put('/:id', authenticate, updateMenuItem);
router.delete('/:id', authenticate, deleteMenuItem);

module.exports = router;
