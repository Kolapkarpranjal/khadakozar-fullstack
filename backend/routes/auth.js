const express = require('express');
const { adminLogin, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Admin login
router.post('/login', adminLogin);

// Get current user profile
router.get('/profile', authenticateToken, getProfile);

module.exports = router;


















