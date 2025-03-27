const WebSocket = require('ws');

let clients = new Set();

const initializeWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection established.');
        clients.add(ws);

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                handleMessage(ws, data);
            } catch (error) {
                console.error('Invalid WebSocket message:', message);
            }
        });

        ws.on('close', () => {
            clients.delete(ws);
            console.log('WebSocket connection closed.');
        });
    });

    console.log('WebSocket server initialized.');
};

const broadcast = (data) => {
    const message = JSON.stringify(data);
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

const handleMessage = (ws, data) => {
    switch (data.type) {
        case 'JOIN_STREAM':
            console.log(`${data.username} joined the stream.`);
            broadcast({ type: 'USER_JOINED', username: data.username });
            break;
        case 'PLAY_SONG':
            console.log(`Playing song: ${data.song}`);
            broadcast({ type: 'PLAY_SONG', song: data.song });
            break;
        case 'UPDATE_QUEUE':
            console.log('Queue updated.');
            broadcast({ type: 'QUEUE_UPDATED', queue: data.queue });
            break;
        default:
            console.log('Unknown WebSocket message type:', data.type);
    }
};

module.exports = { initializeWebSocket, broadcast };