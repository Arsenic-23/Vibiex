const User = require('../models/User');

const updateTheme = async (req, res) => {
    try {
        const { userId } = req.params;
        const { theme } = req.body;

        if (!theme) {
            return res.status(400).json({ error: 'Theme is required' });
        }

        const user = await User.findOneAndUpdate(
            { userId },
            { $set: { theme } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Theme updated successfully', user });
    } catch (error) {
        console.error('Error updating theme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTheme = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ theme: user.theme });
    } catch (error) {
        console.error('Error fetching theme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    updateTheme,
    getTheme
};