const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const {
  listMembers,
  listAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

const router = express.Router();

// Public route - get active members
router.get('/', listMembers);

// Admin routes
router.get('/all', authenticateToken, requireAdmin, listAllMembers);
router.get('/:id', authenticateToken, requireAdmin, getMember);
router.post('/', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, createMember);
router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), handleUploadError, updateMember);
router.delete('/:id', authenticateToken, requireAdmin, deleteMember);

module.exports = router;





