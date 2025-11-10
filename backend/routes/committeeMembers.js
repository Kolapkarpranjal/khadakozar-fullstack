const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  listCommitteeMembers,
  listAllCommitteeMembers,
  getCommitteeMember,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
  bulkCreateCommitteeMembers
} = require('../controllers/committeeMemberController');

const router = express.Router();

// Admin routes - must come before public routes to match correctly
router.get('/committee/:committeePath/all', authenticateToken, requireAdmin, listAllCommitteeMembers);

// Public routes - get active members for a committee
router.get('/committee/:committeePath', listCommitteeMembers);
router.get('/:id', authenticateToken, requireAdmin, getCommitteeMember);
router.post('/', authenticateToken, requireAdmin, createCommitteeMember);
router.post('/bulk', authenticateToken, requireAdmin, bulkCreateCommitteeMembers);
router.put('/:id', authenticateToken, requireAdmin, updateCommitteeMember);
router.delete('/:id', authenticateToken, requireAdmin, deleteCommitteeMember);

module.exports = router;

