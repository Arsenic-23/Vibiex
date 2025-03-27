const express = require('express');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const database = require('./config/database');
const websocket = require('./config/websocket');
const musicRoutes = require('./routes/musicRoutes');
const userRoutes = require('./routes/userRoutes');
const themeRoutes = require('./routes/themeRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/music', musicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/theme', themeRoutes);

// Initialize WebSocket Server
websocket(server);

// Database Connection
database.connect()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server };