const axios = require('axios');

/**
 * Chatbot Controller - DigitalOcean Gradient AI Only
 */
const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ 
                error: 'Message is required and must be a non-empty string' 
            });
        }

        const userMessage = message.trim();

        // Check if DigitalOcean Gradient AI is configured
        const agentEndpoint = process.env.DIGITALOCEAN_AGENT_ENDPOINT;
        const agentAccessKey = process.env.DIGITALOCEAN_AGENT_ACCESS_KEY;

        if (!agentEndpoint || !agentAccessKey) {
            return res.status(500).json({ 
                error: 'DigitalOcean Gradient AI is not configured. Please set DIGITALOCEAN_AGENT_ENDPOINT and DIGITALOCEAN_AGENT_ACCESS_KEY in your environment variables.',
                hint: 'See DIGITALOCEAN_SETUP_GUIDE.md for complete setup instructions'
            });
        }

        // Use DigitalOcean Gradient AI
        return await handleDigitalOcean(userMessage, res);

    } catch (error) {
        console.error('Chatbot error:', error);
        
        // Provide helpful error messages
        if (error.response) {
            const status = error.response.status;
            const errorData = error.response.data;
            
            if (status === 401) {
                return res.status(401).json({ 
                    error: 'Authentication failed. Please check your DIGITALOCEAN_AGENT_ACCESS_KEY.' 
                });
            } else if (status === 404) {
                return res.status(404).json({ 
                    error: 'Agent endpoint not found. Please verify your DIGITALOCEAN_AGENT_ENDPOINT is correct.' 
                });
            } else if (status === 429) {
                return res.status(429).json({ 
                    error: 'Rate limit exceeded. Please try again later.' 
                });
            } else {
                return res.status(500).json({ 
                    error: `AI service error: ${errorData?.error || errorData?.message || 'Unknown error'}` 
                });
            }
        } else if (error.request) {
            return res.status(503).json({ 
                error: 'Unable to reach DigitalOcean AI service. Please check your network connection and endpoint URL.' 
            });
        } else {
            return res.status(500).json({ 
                error: 'An error occurred while processing your request. Please try again later.' 
            });
        }
    }
};

/**
 * Handle DigitalOcean Gradient AI requests
 * Uses the chat completions endpoint format
 */
const handleDigitalOcean = async (message, res) => {
    const agentEndpoint = process.env.DIGITALOCEAN_AGENT_ENDPOINT;
    const agentAccessKey = process.env.DIGITALOCEAN_AGENT_ACCESS_KEY;

    // Ensure endpoint doesn't have trailing slash
    const baseEndpoint = agentEndpoint.replace(/\/$/, '');
    const apiUrl = `${baseEndpoint}/api/v1/chat/completions`;

    const response = await axios.post(
        apiUrl,
        {
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant for a food delivery application. Help users with menu inquiries, order status, restaurant information, and general food delivery questions. Be friendly, concise, and helpful.'
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            stream: false,
            include_functions_info: false,
            include_retrieval_info: false,
            include_guardrails_info: false
        },
        {
            headers: {
                'Authorization': `Bearer ${agentAccessKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        }
    );

    // Extract response from DigitalOcean format
    const aiResponse = response.data?.choices?.[0]?.message?.content || 
                      response.data?.response || 
                      response.data?.message || 
                      'I apologize, but I couldn\'t process your request. Please try again.';

    return res.json({
        response: aiResponse,
        provider: 'DigitalOcean Gradient AI',
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    chatWithAI
};
