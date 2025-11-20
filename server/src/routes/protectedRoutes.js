const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/test', authenticate, (req, res) => {
    res.json({ message: 'Protected route working', user: req.user });
});

module.exports = router;
