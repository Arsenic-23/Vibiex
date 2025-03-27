const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');

// Get user theme settings
router.get('/:userId', themeController.getThemeSettings);

// Update user theme settings
router.put('/:userId', themeController.updateThemeSettings);

module.exports = router;