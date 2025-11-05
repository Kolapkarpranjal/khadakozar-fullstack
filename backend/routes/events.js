const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { listEvents, createEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

router.get('/', listEvents);
router.post('/', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, createEvent);
router.delete('/:id', authenticateToken, requireAdmin, deleteEvent);

module.exports = router;



