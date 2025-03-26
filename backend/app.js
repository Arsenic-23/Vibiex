// Import necessary modules
require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const morgan = require('morgan'); // Logging middleware

const queueRoutes = require('./api/queue');
const userRoutes = require('./api/user');
const playlistRoutes = require('./api/playlist');
const connectDB = require('./models/db'); // Database connection
const socketHandler = require('./ws/socket');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log API requests

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

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Handle unexpected crashes
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));