const User = require("../models/User");

/**
 * Adds or updates a user in the database.
 */
async function upsertUser(telegramId, username) {
    let user = await User.findOne({ telegramId });

    if (!user) {
        user = new User({ telegramId, username });
    } else {
        user.username = username; // Update username if changed
    }

    await user.save();
    return user;
}

/**
 * Adds a user to a room.
 */
async function joinRoom(telegramId, roomId) {
    let user = await User.findOne({ telegramId });

    if (!user) throw new Error("User not found!");

    // Avoid duplicate room joins
    const alreadyJoined = user.joinedRooms.some(room => room.roomId === roomId);
    if (!alreadyJoined) {
        user.joinedRooms.push({ roomId });
        await user.save();
    }

    return user;
}

/**
 * Fetches user details by Telegram ID.
 */
async function getUser(telegramId) {
    return await User.findOne({ telegramId });
}

/**
 * Checks if a user is an admin.
 */
async function isAdmin(telegramId) {
    const user = await User.findOne({ telegramId });
    return user ? user.isAdmin : false;
}

module.exports = { upsertUser, joinRoom, getUser, isAdmin };