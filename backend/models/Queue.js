const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        index: true // Improves search performance
    },
    tracks: [
        {
            title: {
                type: String,
                required: true,
                trim: true // Removes leading/trailing spaces
            },
            url: {
                type: String,
                required: true,
                validate: {
                    validator: function(v) {
                        return /^https?:\/\/.+\..+/.test(v); // Simple URL validation
                    },
                    message: props => `${props.value} is not a valid URL!`
                }
            },
            duration: {
                type: Number,
                required: true,
                min: 1 // Ensures duration is positive
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
        default: 0,
        min: 0 // Ensures it is never negative
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

const Queue = mongoose.model('Queue', QueueSchema);

module.exports = Queue;