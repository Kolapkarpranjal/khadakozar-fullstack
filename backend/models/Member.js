const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    memberName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    memberNameMarathi: { 
      type: String, 
      required: true, 
      trim: true 
    },
    memberDesignation: { 
      type: String, 
      required: true, 
      trim: true 
    },
    memberDesignationMarathi: { 
      type: String, 
      required: true, 
      trim: true 
    },
    imageUrl: { 
      type: String, 
      required: true 
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
    mobile: {
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
MemberSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Member', MemberSchema);





