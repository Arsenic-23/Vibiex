const Song = require('../models/Song');
const { broadcastMessage } = require('../config/websocket');

const playSong = async (req, res) => {
    try {
        const { songId, title, artist, thumbnail, duration } = req.body;

        if (!songId || !title || !artist || !thumbnail || !duration) {
            return res.status(400).json({ error: 'Missing song details' });
        }

        const newSong = new Song({ songId, title, artist, thumbnail, duration, playedAt: new Date() });
        await newSong.save();

        broadcastMessage({ type: 'PLAY_SONG', song: newSong });

        res.status(200).json({ message: 'Song is playing', song: newSong });
    } catch (error) {
        console.error('Error playing song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addToQueue = async (req, res) => {
    try {
        const { songId, title, artist, thumbnail, duration } = req.body;

        if (!songId || !title || !artist || !thumbnail || !duration) {
            return res.status(400).json({ error: 'Missing song details' });
        }

        const newSong = new Song({ songId, title, artist, thumbnail, duration, playedAt: null });
        await newSong.save();

        broadcastMessage({ type: 'ADD_TO_QUEUE', song: newSong });

        res.status(200).json({ message: 'Song added to queue', song: newSong });
    } catch (error) {
        console.error('Error adding to queue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const skipSong = async (req, res) => {
    try {
        broadcastMessage({ type: 'SKIP_SONG' });
        res.status(200).json({ message: 'Song skipped' });
    } catch (error) {
        console.error('Error skipping song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getQueue = async (req, res) => {
    try {
        const queue = await Song.find({ playedAt: null });
        res.status(200).json({ queue });
    } catch (error) {
        console.error('Error fetching queue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    playSong,
    addToQueue,
    skipSong,
    getQueue
};