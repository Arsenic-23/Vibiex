const WebSocket = require('ws');
const dotenv = require('dotenv');
dotenv.config();

const BOT_WS_URL = process.env.BOT_WS_URL || 'ws://localhost:3001';

let botSocket = null;

// Function to connect to the bot WebSocket
function connectBotWebSocket() {
    botSocket = new WebSocket(BOT_WS_URL);

    botSocket.on('open', () => {
        console.log('🤖 Connected to the bot WebSocket server');
    });

    botSocket.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleBotMessage(data);
        } catch (error) {
            console.error('❌ Error parsing bot message:', error);
        }
    });

    botSocket.on('close', () => {
        console.warn('⚠️ Bot WebSocket connection closed. Reconnecting in 5 seconds...');
        setTimeout(connectBotWebSocket, 5000);
    });

    botSocket.on('error', (error) => {
        console.error('❌ Bot WebSocket error:', error);
    });
}

// Function to send messages to the bot
function sendToBot(data) {
    if (botSocket && botSocket.readyState === WebSocket.OPEN) {
        botSocket.send(JSON.stringify(data));
    } else {
        console.warn('⚠️ Bot WebSocket is not connected. Retrying...');
    }
}

// Handle messages from the bot
function handleBotMessage(data) {
    if (!data || !data.type) return;

    switch (data.type) {
        case 'userJoined':
            console.log(`👤 User joined the stream: ${data.username}`);
            break;
        case 'songPlayed':
            console.log(`🎵 Now playing: ${data.songTitle} by ${data.artist}`);
            break;
        default:
            console.log('ℹ️ Received unknown message from bot:', data);
    }
}

// Initialize bot WebSocket connection
connectBotWebSocket();

module.exports = { sendToBot };