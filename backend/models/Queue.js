const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    tracks: [
        {
            title: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            addedBy: {
                type: String,
                required: true
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    currentTrack: {
        type: Number,
        default: 0
    },
    isPlaying: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Queue = mongoose.model('Queue', QueueSchema);

module.exports = Queue;