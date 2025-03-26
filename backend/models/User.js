const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true,
        index: true // Improves search performance
    },
    username: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
        minlength: 3, // Prevents very short usernames
        maxlength: 30
    },
    joinedRooms: [
        {
            roomId: {
                type: String,
                required: true
            },
            joinedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

const User = mongoose.model('User', UserSchema);

module.exports = User;