const express = require('express');
const {
  getAllSubmissions,
  getSubmission,
  updateSubmissionStatus,
  getFormStats
} = require('../controllers/formController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Get all form submissions with pagination and filters
router.get('/submissions', getAllSubmissions);

// Get single submission details
router.get('/submissions/:id', getSubmission);

// Update submission status
router.patch('/submissions/:id/status', updateSubmissionStatus);

// Get form statistics
router.get('/stats', getFormStats);

module.exports = router;















