const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const socketServer = require('../ws/socket'); // Import WebSocket server
const http = require('http');

let server, wss, client;

beforeAll((done) => {
    server = http.createServer();
    wss = socketServer(server);
    server.listen(5001, done);
});

afterAll((done) => {
    wss.close();
    server.close(done);
});

describe('WebSocket API Security & Functionality', () => {
    it('should reject connection without authentication', (done) => {
        client = new WebSocket('ws://localhost:5001');

        client.on('open', () => {
            client.send(JSON.stringify({ type: 'joinRoom', roomId: '123' }));
        });

        client.on('message', (data) => {
            const response = JSON.parse(data);
            expect(response.error).toBe('Unauthorized');
            client.close();
            done();
        });
    });

    it('should allow authenticated users to join a room', (done) => {
        const token = jwt.sign({ id: 'testUser' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        client = new WebSocket(`ws://localhost:5001?token=${token}`);

        client.on('open', () => {
            client.send(JSON.stringify({ type: 'joinRoom', roomId: '123' }));
        });

        client.on('message', (data) => {
            const response = JSON.parse(data);
            expect(response.msg).toBe('Joined room 123');
            client.close();
            done();
        });
    });

    it('should allow authenticated users to add songs to queue', (done) => {
        const token = jwt.sign({ id: 'testUser' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        client = new WebSocket(`ws://localhost:5001?token=${token}`);

        client.on('open', () => {
            client.send(JSON.stringify({ type: 'play', roomId: '123', song: { title: 'Test Song', url: 'http://example.com' } }));
        });

        client.on('message', (data) => {
            const response = JSON.parse(data);
            expect(response.type).toBe('queueUpdate');
            expect(response.queue).toEqual(expect.arrayContaining([{ title: 'Test Song', url: 'http://example.com' }]));
            client.close();
            done();
        });
    });
});