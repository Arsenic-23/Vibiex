// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL from environment variable
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vibie';

// Limit retries to prevent infinite loops
let retryCount = 0;
const maxRetries = 5;

// Connect to MongoDB with improved settings
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s if MongoDB is unreachable
    autoIndex: process.env.NODE_ENV !== 'production' // Disable autoIndex in production
});

// Handle connection success
mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully!');
});

// Handle connection error with limited retries
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
    if (retryCount < maxRetries) {
        retryCount++;
        console.log(`🔄 Retrying MongoDB connection (${retryCount}/${maxRetries})...`);
        setTimeout(() => mongoose.connect(MONGO_URI), 5000);
    } else {
        console.error("🚨 Max retries reached. Exiting...");
        process.exit(1);
    }
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