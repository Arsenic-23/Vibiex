const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');

// Get current queue
router.get('/', async (req, res) => {
    try {
        const queue = await Queue.find().sort({ createdAt: 1 });
        res.json(queue);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a song to the queue
router.post('/', async (req, res) => {
    const { title, url, requestedBy } = req.body;
    try {
        const newSong = new Queue({ title, url, requestedBy });
        await newSong.save();
        res.json(newSong);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Skip current song
router.delete('/:id', async (req, res) => {
    try {
        await Queue.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Song removed from queue' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;