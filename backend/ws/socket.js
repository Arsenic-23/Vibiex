const WebSocket = require('ws');
const Queue = require('../models/Queue');
const User = require('../models/User');

const rooms = {}; // Store active WebSocket connections by room

const socketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection established.');

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
            // Remove user from any tracked rooms
            Object.keys(rooms).forEach(roomId => {
                rooms[roomId] = rooms[roomId].filter(client => client !== ws);
            });
        });
    });
};

const handlePlay = async (ws, message) => {
    const { roomId, song } = message;
    const queue = await Queue.findOne({ roomId });

    if (queue) {
        queue.tracks.push(song);
        await queue.save();
        broadcast(roomId, { type: 'queueUpdate', queue: queue.tracks });
    }
};

const handleQueueUpdate = async (ws, message) => {
    const { roomId } = message;
    const queue = await Queue.findOne({ roomId });

    if (queue) {
        broadcast(roomId, { type: 'queueUpdate', queue: queue.tracks });
    }
};

const handleJoinRoom = async (ws, message) => {
    const { roomId, userId } = message;
    
    // Add user to the room in memory
    if (!rooms[roomId]) {
        rooms[roomId] = [];
    }
    rooms[roomId].push(ws);

    await User.findOneAndUpdate(
        { telegramId: userId },
        { $addToSet: { joinedRooms: { roomId } } },
        { new: true, upsert: true }
    );

    ws.send(JSON.stringify({ type: 'joinSuccess', roomId }));
};

// Broadcast message to all clients in the room
const broadcast = (roomId, message) => {
    if (rooms[roomId]) {
        rooms[roomId].forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ roomId, ...message }));
            }
        });
    }
};

module.exports = socketServer;