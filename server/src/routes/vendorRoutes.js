const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {
    createVendor,
    getVendorById,
    listVendors,
    updateVendor,
    deleteVendor
} = require('../controllers/vendorController');

const router = express.Router();

// All vendor routes require authentication
// Optionally restrict to admin/vendor roles
router.post('/', authenticate, createVendor);
router.get('/', authenticate, listVendors);
router.get('/:id', authenticate, getVendorById);
router.put('/:id', authenticate, updateVendor);
router.delete('/:id', authenticate, deleteVendor);

module.exports = router;

