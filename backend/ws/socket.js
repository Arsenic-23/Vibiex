const WebSocket = require('ws');
const Queue = require('../models/Queue');
const User = require('../models/User');

const socketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection established.');

        // Handle incoming messages
        ws.on('message', async (data) => {
            try {
                const message = JSON.parse(data);

                switch (message.type) {
                    case 'play':
                        await handlePlay(ws, message);
                        break;
                    case 'queueUpdate':
                        await handleQueueUpdate(ws, message);
                        break;
                    case 'joinRoom':
                        await handleJoinRoom(ws, message);
                        break;
                    default:
                        ws.send(JSON.stringify({ error: 'Unknown event type' }));
                }
            } catch (error) {
                console.error('WebSocket Error:', error);
                ws.send(JSON.stringify({ error: 'Invalid request' }));
            }
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });
    });
};

const handlePlay = async (ws, message) => {
    const { roomId, song } = message;
    const queue = await Queue.findOne({ roomId });
    if (queue) {
        queue.songs.push(song);
        await queue.save();
        broadcast(ws, roomId, { type: 'queueUpdate', queue: queue.songs });
    }
};

const handleQueueUpdate = async (ws, message) => {
    const { roomId } = message;
    const queue = await Queue.findOne({ roomId });
    if (queue) {
        broadcast(ws, roomId, { type: 'queueUpdate', queue: queue.songs });
    }
};

const handleJoinRoom = async (ws, message) => {
    const { roomId, userId } = message;
    const user = await User.findOne({ telegramId: userId });
    if (user) {
        user.joinedRooms.push({ roomId });
        await user.save();
        ws.send(JSON.stringify({ type: 'joinSuccess', roomId }));
    } else {
        ws.send(JSON.stringify({ error: 'User not found' }));
    }
};

const broadcast = (ws, roomId, message) => {
    ws.send(JSON.stringify({ roomId, ...message }));
};

module.exports = socketServer;