const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');

const logger = require('./middleware/logger'); // Request Logger
const errorHandler = require('./middleware/error'); // Global Error Handler
const socketHandler = require('./ws/socket'); // WebSocket Logic

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } }); // Allow CORS for WebSockets

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Logs all requests

// API Routes
app.use('/api/playlist', require('./api/playlist'));
app.use('/api/queue', require('./api/queue'));
app.use('/api/user', require('./api/user'));

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socketHandler(socket, io);
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Global Error Handling Middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));