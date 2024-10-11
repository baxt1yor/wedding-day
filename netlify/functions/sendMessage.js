// netlify/functions/sendMessage.js
const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    const { message } = JSON.parse(event.body);

    if (!message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Message is required' }),
        };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    try {
        const response = await axios.get(`https://api.telegram.org/bot${token}/sendMessage`, {
            params: {
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send message', details: error.message }),
        };
    }
};
