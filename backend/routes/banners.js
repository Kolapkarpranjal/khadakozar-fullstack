const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { listBanners, getBanner, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');

const router = express.Router();

// Public routes
router.get('/', listBanners);

// Admin routes - specific routes first, then parameterized routes
router.post('/', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, createBanner);

// Get single banner - must be after router.get('/') to avoid conflicts
router.get('/:id', (req, res, next) => {
  console.log('✅ Banner GET /:id route matched!');
  console.log('ID:', req.params.id);
  console.log('Path:', req.path);
  next();
}, authenticateToken, requireAdmin, getBanner);

router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, updateBanner);
router.delete('/:id', authenticateToken, requireAdmin, deleteBanner);

module.exports = router;


