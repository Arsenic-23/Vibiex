const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// Get user profile by ID (Sanitized)
router.get('/:id', async (req, res) => {
    const sanitizedId = mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null;
    if (!sanitizedId) {
        return res.status(400).json({ msg: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(sanitizedId);
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

// Delete user by ID (Sanitized)
router.delete('/:id', async (req, res) => {
    const sanitizedId = mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null;
    if (!sanitizedId) {
        return res.status(400).json({ msg: 'Invalid user ID' });
    }

    try {
        await User.findByIdAndDelete(sanitizedId);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;