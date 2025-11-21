const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
    setupVendorProfile,
    getMyVendorProfile
} = require('../controllers/vendorSetupController');

const router = express.Router();

// All routes require authentication
router.post('/setup', authenticate, setupVendorProfile);
router.get('/my-profile', authenticate, getMyVendorProfile);

module.exports = router;

