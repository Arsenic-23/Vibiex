const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// Get user profile by ID
router.get('/:id', async (req, res) => {
    try {
        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid user ID' });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).send('Server Error');
    }
});

// Create or update user profile
router.post('/', async (req, res) => {
    const { telegramId, username } = req.body;

    // Validate input
    if (!telegramId || typeof telegramId !== 'string') {
        return res.status(400).json({ msg: 'Valid telegramId is required' });
    }
    if (!username || username.length < 3 || username.length > 30) {
        return res.status(400).json({ msg: 'Username must be between 3 and 30 characters' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { telegramId },
            { username },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(user);
    } catch (err) {
        console.error('Error creating/updating user:', err.message);
        res.status(500).send('Server Error');
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid user ID' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;