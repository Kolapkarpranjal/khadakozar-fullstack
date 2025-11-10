const mongoose = require('mongoose');

const CommitteeSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    titleMarathi: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      default: '' 
    },
    descriptionMarathi: { 
      type: String, 
      default: '' 
    },
    path: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    route: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    order: { 
      type: Number, 
      required: true,
      default: 0
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    hasCustomPage: {
      type: Boolean,
      default: false
    },
    customPageComponent: {
      type: String,
      default: ''
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  },
  { timestamps: true }
);

// Index for sorting
CommitteeSchema.index({ order: 1, isActive: 1 });
CommitteeSchema.index({ path: 1 });
CommitteeSchema.index({ route: 1 });

module.exports = mongoose.model('Committee', CommitteeSchema);





