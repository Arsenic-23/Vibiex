const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    theme: { type: String, default: 'dark' },  // User-selected theme (dark, light, custom)
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // Liked songs
    playlists: [{ 
        name: { type: String, required: true },
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
    }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // Previously played songs
    stats: {
        totalPlays: { type: Number, default: 0 },
        totalSongsListened: { type: Number, default: 0 },
        totalArtistsListened: { type: Number, default: 0 },
        totalHoursListened: { type: Number, default: 0 },
        topSongs: [{ songId: String, playCount: Number }],  // Track most played songs
        topArtists: [{ artistName: String, playCount: Number }]  // Track most played artists
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);