const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create subdirectories for different form types
const formTypes = [
  'bandhkam-parvangi',
  'janm-nond-dakhla',
  'mrutyu-nond-dakhla',
  'vivah-nondani-dakhla',
  'namuna-no08',
  'ferfar-nondani',
  'namuna-no04-kam',
  'vyavasay-naharakat-dakhla',
  'daridrya-resha-dakhla',
  'rahivashi-dakhla',
  'takrar-suchana',
  'members',
  'gallery',
  'events',
  'banners'
];

formTypes.forEach(formType => {
  const formDir = path.join(uploadDir, formType);
  if (!fs.existsSync(formDir)) {
    fs.mkdirSync(formDir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if this is a member upload (from members route)
    let uploadType = req.body.formType || 'general';
    
    // Check route path to determine upload type
    if (req.originalUrl && req.originalUrl.includes('/api/members')) {
      uploadType = 'members';
    } else if (req.originalUrl && req.originalUrl.includes('/api/gallery')) {
      uploadType = 'gallery';
    } else if (req.originalUrl && req.originalUrl.includes('/api/events')) {
      uploadType = 'events';
    } else if (req.originalUrl && req.originalUrl.includes('/api/banners')) {
      uploadType = 'banners';
    }
    
    const uploadPath = path.join(uploadDir, uploadType);
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, filename);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Check if this is a gallery or events upload (allow videos)
  const isGalleryOrEvents = req.originalUrl && (
    req.originalUrl.includes('/api/gallery') || 
    req.originalUrl.includes('/api/events')
  );
  
  // Allowed file types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  // Add video types for gallery and events
  if (isGalleryOrEvents) {
    allowedTypes.push(
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm'
    );
  }

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} not allowed. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
};

// Configure multer with different limits for videos and large images
const getFileSizeLimit = (req) => {
  // Check if this is a gallery, events, or banners upload (allow larger files)
  const isLargeFileUpload = req.originalUrl && (
    req.originalUrl.includes('/api/gallery') || 
    req.originalUrl.includes('/api/events') ||
    req.originalUrl.includes('/api/banners')
  );
  
  // For gallery/events/banners, allow larger files (videos and high-res images can be big)
  // Note: Railway has a 100MB request body limit
  if (isLargeFileUpload) {
    return parseInt(process.env.MAX_VIDEO_SIZE) || 100 * 1024 * 1024; // 100MB for videos/large images (Railway limit)
  }
  
  // For other uploads (images, documents), use smaller limit
  return parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB for images/documents
};

// Configure multer - set high limit for all uploads (100MB default, Railway limit)
// This allows large images for banners and videos for gallery/events
// Note: Railway has a 100MB request body limit, so we use 100MB max
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_VIDEO_SIZE) || 100 * 1024 * 1024, // 100MB for large files (Railway limit)
    files: 10 // Maximum 10 files per request
  }
});

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  console.error('Upload error:', error);
  console.error('Request URL:', req.originalUrl);
  console.error('Error code:', error.code);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      // Determine the actual limit based on route
      const isLargeFileUpload = req.originalUrl && (
        req.originalUrl.includes('/api/gallery') || 
        req.originalUrl.includes('/api/events') ||
        req.originalUrl.includes('/api/banners')
      );
      
      const maxSize = isLargeFileUpload 
        ? (parseInt(process.env.MAX_VIDEO_SIZE) || 100 * 1024 * 1024) / (1024 * 1024)
        : (parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024) / (1024 * 1024);
      
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${maxSize}MB. Please compress your image or use a smaller file.`
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (error.message.includes('File type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
};

module.exports = {
  upload,
  handleUploadError
};


















