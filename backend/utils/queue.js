// backend/utils/queue.js 🎼 - Handles the song queue system

const queue = []; // In-memory queue

const addToQueue = (song) => {
    queue.push(song);
    console.log(`[✅] Song added to queue: ${song.title}`);
    return queue;
};

const removeFromQueue = () => {
    if (queue.length > 0) {
        const removedSong = queue.shift();
        console.log(`[❌] Song removed from queue: ${removedSong.title}`);
        return removedSong;
    }
    return null;
};

const getQueue = () => queue;

module.exports = { addToQueue, removeFromQueue, getQueue };