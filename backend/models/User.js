const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;