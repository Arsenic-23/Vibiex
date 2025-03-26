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

// Validate required environment variables
if (!process.env.PORT || !process.env.DB_URI) {
    console.error("❌ Missing required environment variables! Exiting...");
    process.exit(1);
}

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://your-frontend.com",
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
    console.error('❌ Error:', err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({ error: err.message || "Internal Server Error" });
});

// Handle unexpected crashes gracefully
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log("🔄 Shutting down server...");
    server.close(() => {
        console.log("✅ Server shut down successfully.");
        process.exit(0);
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));