const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songId: { type: String, required: true, unique: true }, // Unique song identifier (YouTube/Spotify ID)
    title: { type: String, required: true },
    artist: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in seconds
    thumbnail: { type: String, required: true }, // Song thumbnail URL
    source: { type: String, enum: ['YouTube', 'Spotify'], required: true }, // Song source type
    likes: { type: Number, default: 0 }, // Total likes count
    playCount: { type: Number, default: 0 } // Number of times the song has been played
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
