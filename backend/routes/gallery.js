const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { listGallery, getGallery, createGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');

const router = express.Router();

// Public routes
router.get('/', listGallery);

// Admin routes - specific routes first, then parameterized routes
router.post('/', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, createGallery);

// Get single gallery item - must be after router.get('/') to avoid conflicts
// Test route handler first
router.get('/:id', (req, res, next) => {
  console.log('✅ Gallery GET /:id route matched!');
  console.log('ID:', req.params.id);
  console.log('Path:', req.path);
  next();
}, authenticateToken, requireAdmin, getGallery);

router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, updateGallery);
router.delete('/:id', authenticateToken, requireAdmin, deleteGallery);

module.exports = router;









