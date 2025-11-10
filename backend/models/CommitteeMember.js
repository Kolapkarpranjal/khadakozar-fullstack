const mongoose = require('mongoose');

const CommitteeMemberSchema = new mongoose.Schema(
  {
    committeeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Committee',
      required: true
    },
    committeePath: {
      type: String,
      required: true,
      trim: true
    },
    srNo: { 
      type: Number, 
      required: true
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    nameMarathi: { 
      type: String, 
      required: true, 
      trim: true 
    },
    designation: { 
      type: String, 
      default: '' 
    },
    designationMarathi: { 
      type: String, 
      default: '' 
    },
    position: {
      type: String,
      default: ''
    },
    positionMarathi: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    addressMarathi: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    contact: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    categoryMarathi: {
      type: String,
      default: ''
    },
    taluka: {
      type: String,
      default: ''
    },
    talukaMarathi: {
      type: String,
      default: ''
    },
    grampanchayat: {
      type: String,
      default: ''
    },
    grampanchayatMarathi: {
      type: String,
      default: ''
    },
    // Additional fields for specific committees
    groupName: {
      type: String,
      default: ''
    },
    groupNameMarathi: {
      type: String,
      default: ''
    },
    presidentName: {
      type: String,
      default: ''
    },
    presidentNameMarathi: {
      type: String,
      default: ''
    },
    secretary: {
      type: String,
      default: ''
    },
    secretaryMarathi: {
      type: String,
      default: ''
    },
    memberCount: {
      type: Number,
      default: 0
    },
    remarks: {
      type: String,
      default: ''
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  },
  { timestamps: true }
);

// Index for sorting and querying
CommitteeMemberSchema.index({ committeeId: 1, srNo: 1 });
CommitteeMemberSchema.index({ committeePath: 1, srNo: 1 });
CommitteeMemberSchema.index({ isActive: 1 });

module.exports = mongoose.model('CommitteeMember', CommitteeMemberSchema);





