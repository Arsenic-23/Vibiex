// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL from environment variable
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vibie';

// Connect to MongoDB with improved settings
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s if MongoDB is unreachable
  autoIndex: true // Automatically build indexes
});

// Handle connection success
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully!');
});

// Handle connection error with retries
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  setTimeout(() => mongoose.connect(MONGO_URI), 5000); // Retry after 5s
});

// Handle disconnection
mongoose.connection.on('disconnected', () => {
  console.log('⚡ MongoDB disconnected.');
});

// Gracefully close MongoDB connection on app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to app termination.');
  process.exit(0);
});

// Export the connection
module.exports = mongoose;