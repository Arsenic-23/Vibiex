const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');

// Get current queue for a specific room
router.get('/:roomId', async (req, res) => {
    try {
        const queue = await Queue.findOne({ roomId: req.params.roomId });
        if (!queue) {
            return res.status(404).json({ msg: 'Queue not found' });
        }
        res.json(queue);
    } catch (err) {
        console.error('Error fetching queue:', err.message);
        res.status(500).send('Server Error');
    }
});

// Add a song to the queue
router.post('/:roomId', async (req, res) => {
    const { title, url, addedBy } = req.body;

    // Validate input
    if (!title || !url || !/^https?:\/\/.+\..+/.test(url)) {
        return res.status(400).json({ msg: 'Valid title and URL are required' });
    }

    try {
        let queue = await Queue.findOne({ roomId: req.params.roomId });

        // Create a queue if it doesn't exist
        if (!queue) {
            queue = new Queue({ roomId: req.params.roomId, tracks: [] });
        }

        // Add the song to the queue
        queue.tracks.push({ title, url, addedBy });
        await queue.save();

        res.json({ msg: 'Song added to queue', queue });
    } catch (err) {
        console.error('Error adding song:', err.message);
        res.status(500).send('Server Error');
    }
});

// Remove a song from the queue
router.delete('/:roomId/:trackIndex', async (req, res) => {
    try {
        const queue = await Queue.findOne({ roomId: req.params.roomId });

        if (!queue || req.params.trackIndex >= queue.tracks.length) {
            return res.status(404).json({ msg: 'Song not found in queue' });
        }

        queue.tracks.splice(req.params.trackIndex, 1);
        await queue.save();

        res.json({ msg: 'Song removed from queue', queue });
    } catch (err) {
        console.error('Error removing song:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;