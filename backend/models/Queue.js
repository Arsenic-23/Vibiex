const Queue = require("../models/Queue");

/**
 * Adds a song to the queue for a specific room.
 */
async function addToQueue(roomId, song) {
    let queue = await Queue.findOne({ roomId });

    if (!queue) {
        queue = new Queue({ roomId, tracks: [song] });
    } else {
        queue.tracks.push(song);
    }

    await queue.save();
    return queue;
}

/**
 * Removes the currently playing song and moves to the next.
 */
async function removeFromQueue(roomId) {
    let queue = await Queue.findOne({ roomId });

    if (!queue || queue.tracks.length === 0) return null;

    queue.tracks.shift(); // Remove the first track
    queue.currentTrack = 0;
    
    await queue.save();
    return queue;
}

/**
 * Fetches the current queue for a room.
 */
async function getQueue(roomId) {
    const queue = await Queue.findOne({ roomId });
    return queue ? queue.tracks : [];
}

/**
 * Gets the current song playing.
 */
async function getCurrentTrack(roomId) {
    const queue = await Queue.findOne({ roomId });
    if (!queue || queue.tracks.length === 0) return null;

    return queue.tracks[queue.currentTrack];
}

module.exports = { addToQueue, removeFromQueue, getQueue, getCurrentTrack };