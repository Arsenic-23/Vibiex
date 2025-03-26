const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const Queue = require('../models/Queue');
const User = require('../models/User');

const rooms = {}; // Store active WebSocket connections by room

const socketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        // Extract token from query params
        const token = req.url.split("token=")[1];
        if (!token) {
            ws.close();
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            ws.user = decoded; // Attach user data to WebSocket session
        } catch (err) {
            ws.close();
            return;
        }

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
            // Remove user from any tracked rooms and clean up empty rooms
            Object.keys(rooms).forEach(roomId => {
                rooms[roomId] = rooms[roomId].filter(client => client !== ws);
                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                }
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
    const { roomId } = message;

    if (!rooms[roomId]) {
        rooms[roomId] = [];
    }

    rooms[roomId].push(ws);
    console.log(`User joined room ${roomId}`);
};

// Broadcast message to all clients in a room
const broadcast = (roomId, data) => {
    if (rooms[roomId]) {
        rooms[roomId].forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
};

module.exports = socketServer;