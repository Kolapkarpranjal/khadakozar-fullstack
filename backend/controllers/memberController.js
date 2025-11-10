const Member = require('../models/Member');
const fs = require('fs');
const path = require('path');

// List all active members
const listMembers = async (req, res) => {
  try {
    const members = await Member.find({ isActive: true })
      .sort({ order: 1 })
      .select('-createdBy -__v');
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load members' });
  }
};

// List all members (including inactive) - for admin
const listAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .sort({ order: 1 })
      .populate('createdBy', 'username')
      .select('-__v');
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load members' });
  }
};

// Get single member
const getMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load member' });
  }
};

// Create member
const createMember = async (req, res) => {
  try {
    const { 
      memberName, 
      memberNameMarathi, 
      memberDesignation, 
      memberDesignationMarathi,
      order,
      mobile 
    } = req.body;
    
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const imageUrl = `/uploads/members/${file.filename}`;
    
    // Get max order if not provided
    let memberOrder = order;
    if (!memberOrder || memberOrder === '') {
      const maxOrderMember = await Member.findOne().sort({ order: -1 });
      memberOrder = maxOrderMember ? maxOrderMember.order + 1 : 1;
    }

    const member = await Member.create({
      memberName: memberName || '',
      memberNameMarathi: memberNameMarathi || '',
      memberDesignation: memberDesignation || '',
      memberDesignationMarathi: memberDesignationMarathi || '',
      imageUrl,
      order: memberOrder,
      mobile: mobile || '',
      createdBy: req.user?._id
    });

    res.status(201).json({ success: true, data: member });
  } catch (err) {
    console.error('Create member error:', err);
    res.status(500).json({ success: false, message: 'Failed to add member', error: err.message });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      memberName, 
      memberNameMarathi, 
      memberDesignation, 
      memberDesignationMarathi,
      order,
      isActive,
      mobile 
    } = req.body;
    
    const file = req.file;
    
    const updateData = {
      memberName: memberName || '',
      memberNameMarathi: memberNameMarathi || '',
      memberDesignation: memberDesignation || '',
      memberDesignationMarathi: memberDesignationMarathi || '',
      order: order !== undefined ? order : undefined,
      isActive: isActive !== undefined ? isActive : undefined,
      mobile: mobile || ''
    };

    // If new image uploaded, update imageUrl and delete old image
    if (file) {
      const member = await Member.findById(id);
      if (member && member.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', member.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.imageUrl = `/uploads/members/${file.filename}`;
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const member = await Member.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({ success: true, data: member });
  } catch (err) {
    console.error('Update member error:', err);
    res.status(500).json({ success: false, message: 'Failed to update member', error: err.message });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // Delete image file
    if (member.imageUrl) {
      const imagePath = path.join(__dirname, '..', member.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Member.findByIdAndDelete(id);
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    console.error('Delete member error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete member', error: err.message });
  }
};

module.exports = {
  listMembers,
  listAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
};





