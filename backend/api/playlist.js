const express = require('express');
const router = express.Router();
const axios = require('axios');

// Import playlist from external URL
router.post('/import', async (req, res) => {
    const { playlistUrl } = req.body;
    if (!playlistUrl) {
        return res.status(400).json({ msg: 'Playlist URL is required' });
    }

    try {
        // Call external API to fetch playlist data
        const response = await axios.get(playlistUrl);
        const playlistData = response.data;

        if (!playlistData || !playlistData.tracks) {
            return res.status(404).json({ msg: 'Invalid or empty playlist' });
        }

        res.json({ msg: 'Playlist imported successfully', tracks: playlistData.tracks });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error while importing playlist');
    }
});

// Fetch playlist details
router.get('/:id', async (req, res) => {
    try {
        const playlistId = req.params.id;
        // Simulate fetching from database or API
        const playlist = { id: playlistId, name: 'My Playlist', tracks: [] };
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;