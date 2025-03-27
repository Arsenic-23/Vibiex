const express = require('express');
const { playSong, skipSong, addToQueue, getQueue, getCurrentSong } = require('../controllers/musicController');

const router = express.Router();

// 🎵 Play a song
router.post('/play', async (req, res) => {
    try {
        const { songUrl } = req.body;
        if (!songUrl) return res.status(400).json({ error: 'Song URL is required' });

        const result = await playSong(songUrl);
        res.json({ message: 'Song playing', result });
    } catch (error) {
        console.error('Error playing song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ⏭️ Skip the current song
router.post('/skip', async (req, res) => {
    try {
        const result = await skipSong();
        res.json({ message: 'Song skipped', result });
    } catch (error) {
        console.error('Error skipping song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ➕ Add a song to the queue
router.post('/queue', async (req, res) => {
    try {
        const { songUrl } = req.body;
        if (!songUrl) return res.status(400).json({ error: 'Song URL is required' });

        const result = await addToQueue(songUrl);
        res.json({ message: 'Song added to queue', result });
    } catch (error) {
        console.error('Error adding song to queue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 📃 Get the current queue
router.get('/queue', async (req, res) => {
    try {
        const queue = await getQueue();
        res.json(queue);
    } catch (error) {
        console.error('Error fetching queue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 🎶 Get the currently playing song
router.get('/current', async (req, res) => {
    try {
        const currentSong = await getCurrentSong();
        res.json(currentSong);
    } catch (error) {
        console.error('Error fetching current song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;