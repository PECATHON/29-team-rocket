const express = require('express');
const { chatWithAI } = require('../controllers/chatbotController');
// Optional: Add authentication middleware if you want to protect the chatbot
// const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Chatbot endpoint - can be public or protected
// If you want to make it protected, uncomment the authenticate middleware
router.post('/', chatWithAI);
// router.post('/', authenticate, chatWithAI);

module.exports = router;

