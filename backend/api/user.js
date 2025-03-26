const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create or update user profile
router.post('/', async (req, res) => {
    const { telegramId, username, songsRequested } = req.body;
    try {
        let user = await User.findOne({ telegramId });
        if (user) {
            user.username = username || user.username;
            user.songsRequested = songsRequested || user.songsRequested;
        } else {
            user = new User({ telegramId, username, songsRequested });
        }
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;