const User = require('../models/User');

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUserSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const { volume, theme } = req.body;

        const user = await User.findOneAndUpdate(
            { userId },
            { $set: { volume, theme } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Settings updated', user });
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addFavoriteSong = async (req, res) => {
    try {
        const { userId } = req.params;
        const { songId, title, artist, thumbnail, duration } = req.body;

        if (!songId || !title || !artist || !thumbnail || !duration) {
            return res.status(400).json({ error: 'Missing song details' });
        }

        const user = await User.findOneAndUpdate(
            { userId },
            { $addToSet: { favorites: { songId, title, artist, thumbnail, duration } } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Song added to favorites', user });
    } catch (error) {
        console.error('Error adding favorite song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserStats = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const stats = {
            totalPlays: user.playHistory.length,
            totalSongs: user.favorites.length,
            topSongs: user.topSongs || [],
            topArtists: user.topArtists || []
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUserProfile,
    updateUserSettings,
    addFavoriteSong,
    getUserStats
};