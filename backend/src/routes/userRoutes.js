const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile data
router.get('/profile/:userId', userController.getUserProfile);

// Update user settings (theme, volume, etc.)
router.put('/settings/:userId', userController.updateUserSettings);

// Get user listening history
router.get('/history/:userId', userController.getUserHistory);

// Get user favorite songs and playlists
router.get('/favorites/:userId', userController.getUserFavorites);

// Add a song to favorites
router.post('/favorites/:userId', userController.addToFavorites);

// Remove a song from favorites
router.delete('/favorites/:userId/:songId', userController.removeFromFavorites);

// Get user stats (top songs, total plays, etc.)
router.get('/stats/:userId', userController.getUserStats);

module.exports = router;