const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { listEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

// Public routes
router.get('/', listEvents);

// Admin routes - specific routes first, then parameterized routes
router.post('/', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, createEvent);

// Get single event - must be after router.get('/') to avoid conflicts
router.get('/:id', (req, res, next) => {
  console.log('✅ Event GET /:id route matched!');
  console.log('ID:', req.params.id);
  console.log('Path:', req.path);
  next();
}, authenticateToken, requireAdmin, getEvent);

router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, updateEvent);
router.delete('/:id', authenticateToken, requireAdmin, deleteEvent);

module.exports = router;










