const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  listCommittees,
  listAllCommittees,
  getCommittee,
  getCommitteeByRoute,
  createCommittee,
  updateCommittee,
  deleteCommittee
} = require('../controllers/committeeController');

const router = express.Router();

// Public routes
router.get('/', listCommittees);
router.get('/route/:route', getCommitteeByRoute);

// Admin routes
router.get('/all', authenticateToken, requireAdmin, listAllCommittees);
router.get('/:id', authenticateToken, requireAdmin, getCommittee);
router.post('/', authenticateToken, requireAdmin, createCommittee);
router.put('/:id', authenticateToken, requireAdmin, updateCommittee);
router.delete('/:id', authenticateToken, requireAdmin, deleteCommittee);

module.exports = router;





