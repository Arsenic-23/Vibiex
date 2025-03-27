
const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
    roomId: { 
        type: String, 
        required: true, 
        index: true // Optimizes query performance
    },
    tracks: [
        {
            title: { 
                type: String, 
                required: true, 
                trim: true // Removes unnecessary spaces
            },
            url: { 
                type: String, 
                required: true, 
                validate: {
                    validator: function(v) {
                        return /^https?:\/\/.+\..+/.test(v); // Ensures valid URL format
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
        min: 0 // Ensures it's never negative
    },
    isPlaying: { 
        type: Boolean, 
        default: false 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

// Middleware: Update `lastUpdated` before saving the document
QueueSchema.pre("save", function (next) {
    this.lastUpdated = new Date();
    next();
});

const Queue = mongoose.model("Queue", QueueSchema);

module.exports = Queue;