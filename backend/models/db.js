// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL from environment variable
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vibie';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handle connection success
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully!');
});

// Handle connection error
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Handle disconnection
mongoose.connection.on('disconnected', () => {
  console.log('⚡ MongoDB disconnected.');
});

// Export the connection
module.exports = mongoose;