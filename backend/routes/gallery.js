const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { listGallery, createGallery, deleteGallery } = require('../controllers/galleryController');

const router = express.Router();

router.get('/', listGallery);
router.post('/', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, createGallery);
router.delete('/:id', authenticateToken, requireAdmin, deleteGallery);

module.exports = router;





