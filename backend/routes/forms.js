const express = require('express');
const { submitForm } = require('../controllers/formController');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Submit form with file uploads
router.post('/submit', upload.array('documents', 10), handleUploadError, submitForm);

module.exports = router;










