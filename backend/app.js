// Import necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const queueRoutes = require('./api/queue');
const userRoutes = require('./api/user');
const playlistRoutes = require('./api/playlist');
const connectDB = require('./models/db'); // DB connection
const socketHandler = require('./ws/socket');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());

// API Routes
app.use('/api/queue', queueRoutes);
app.use('/api/user', userRoutes);
app.use('/api/playlist', playlistRoutes);

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socketHandler(socket, io);
});

// Database Connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));