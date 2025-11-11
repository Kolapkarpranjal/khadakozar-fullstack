const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: './config.env' });

// Import routes
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/forms');
const adminRoutes = require('./routes/admin');
const galleryRoutes = require('./routes/gallery');
const eventsRoutes = require('./routes/events');
const bannersRoutes = require('./routes/banners');
const membersRoutes = require('./routes/members');
const committeesRoutes = require('./routes/committees');
const committeeMembersRoutes = require('./routes/committeeMembers');
const { createDefaultAdmin } = require('./controllers/authController');

const app = express();

// Security middleware (allow cross-origin resource loading for images from frontend dev server)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS configuration - Allow all origins in production for now
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In production, allow all origins (for client delivery)
    if (process.env.NODE_ENV === 'production') {
      callback(null, true);
    } else {
      // In development, only allow localhost
      const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware - increased limit for file uploads
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root endpoint (must be before static middleware)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Khadak Ozar Grampanchayat API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      adminPanel: '/admin-panel/',
      api: {
        auth: '/api/auth',
        forms: '/api/forms',
        admin: '/api/admin',
        gallery: '/api/gallery',
        events: '/api/events',
        banners: '/api/banners',
        members: '/api/members',
        committees: '/api/committees',
        committeeMembers: '/api/committee-members'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve admin panel static files
app.use('/admin-panel', express.static(path.join(__dirname, 'admin-panel')));
// Serve admin panel index.html for root admin-panel route
app.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-panel', 'index.html'));
});
app.get('/admin-panel/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-panel', 'index.html'));
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat_khadak_ozar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  // Create default admin user
  await createDefaultAdmin();
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/committees', committeesRoutes);
app.use('/api/committee-members', committeeMembersRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Khadak Ozar Grampanchayat API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);
  console.log('Request path:', req.path);
  console.log('All registered routes:', app._router?.stack?.map(r => r.route?.path || r.regexp).filter(Boolean));
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;
