const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: [
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
      'takrar-suchana'
    ]
  },
  applicantName: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  
  // Form-specific fields (stored as JSON for flexibility)
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // File uploads
  documents: [{
    fieldName: String,
    originalName: String,
    filename: String,
    path: String,
    size: Number,
    mimetype: String
  }],
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'under-review', 'completed'],
    default: 'pending'
  },
  
  // Admin notes
  adminNotes: {
    type: String,
    trim: true
  },
  
  // Processing details
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: {
    type: Date
  },
  
  // Submission tracking
  submittedAt: {
    type: Date,
    default: Date.now
  },
  
  // IP and user agent for tracking
  submittedFrom: {
    ip: String,
    userAgent: String
  }
}, {
  timestamps: true
});

// Index for better query performance
formSubmissionSchema.index({ formType: 1, status: 1 });
formSubmissionSchema.index({ submittedAt: -1 });
formSubmissionSchema.index({ applicantName: 1 });

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);


