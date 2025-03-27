const Queue = require("../models/Queue");

/**
 * Adds a song to the queue.
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

    queue.tracks.shift(); // Remove first track
    queue.currentTrack = 0;
    
    await queue.save();
    return queue;
}

/**
 * Gets the current song playing.
 */
async function getCurrentTrack(roomId) {
    const queue = await Queue.findOne({ roomId });
    return queue ? queue.tracks[queue.currentTrack] : null;
}

module.exports = { addToQueue, removeFromQueue, getCurrentTrack };