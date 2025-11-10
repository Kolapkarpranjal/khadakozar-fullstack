const Committee = require('../models/Committee');

// List all active committees
const listCommittees = async (req, res) => {
  try {
    const committees = await Committee.find({ isActive: true })
      .sort({ order: 1 })
      .select('-createdBy -__v');
    res.json({ success: true, data: committees });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load committees' });
  }
};

// List all committees (including inactive) - for admin
const listAllCommittees = async (req, res) => {
  try {
    const committees = await Committee.find()
      .sort({ order: 1 })
      .populate('createdBy', 'username')
      .select('-__v');
    res.json({ success: true, data: committees });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load committees' });
  }
};

// Get single committee
const getCommittee = async (req, res) => {
  try {
    const { id } = req.params;
    const committee = await Committee.findById(id);
    if (!committee) {
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }
    res.json({ success: true, data: committee });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load committee' });
  }
};

// Get committee by route
const getCommitteeByRoute = async (req, res) => {
  try {
    const { route } = req.params;
    const committee = await Committee.findOne({ route, isActive: true });
    if (!committee) {
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }
    res.json({ success: true, data: committee });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load committee' });
  }
};

// Create committee
const createCommittee = async (req, res) => {
  try {
    const { 
      title, 
      titleMarathi, 
      description, 
      descriptionMarathi,
      path,
      route,
      order,
      hasCustomPage,
      customPageComponent
    } = req.body;
    
    // Generate path and route if not provided
    let committeePath = path;
    let committeeRoute = route;
    
    if (!committeePath && title) {
      // Generate path from title (lowercase, replace spaces with hyphens)
      committeePath = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    if (!committeeRoute && committeePath) {
      // Generate route from path
      committeeRoute = `/samiti/${committeePath}`;
    }
    
    // Get max order if not provided
    let committeeOrder = order;
    if (!committeeOrder || committeeOrder === '') {
      const maxOrderCommittee = await Committee.findOne().sort({ order: -1 });
      committeeOrder = maxOrderCommittee ? maxOrderCommittee.order + 1 : 1;
    }

    const committee = await Committee.create({
      title: title || '',
      titleMarathi: titleMarathi || '',
      description: description || '',
      descriptionMarathi: descriptionMarathi || '',
      path: committeePath,
      route: committeeRoute,
      order: committeeOrder,
      hasCustomPage: hasCustomPage || false,
      customPageComponent: customPageComponent || '',
      createdBy: req.user?._id
    });

    res.status(201).json({ success: true, data: committee });
  } catch (err) {
    console.error('Create committee error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Committee with this path or route already exists' 
      });
    }
    res.status(500).json({ success: false, message: 'Failed to add committee', error: err.message });
  }
};

// Update committee
const updateCommittee = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      titleMarathi, 
      description, 
      descriptionMarathi,
      path,
      route,
      order,
      isActive,
      hasCustomPage,
      customPageComponent
    } = req.body;
    
    const updateData = {
      title: title !== undefined ? title : undefined,
      titleMarathi: titleMarathi !== undefined ? titleMarathi : undefined,
      description: description !== undefined ? description : undefined,
      descriptionMarathi: descriptionMarathi !== undefined ? descriptionMarathi : undefined,
      path: path !== undefined ? path : undefined,
      route: route !== undefined ? route : undefined,
      order: order !== undefined ? order : undefined,
      isActive: isActive !== undefined ? isActive : undefined,
      hasCustomPage: hasCustomPage !== undefined ? hasCustomPage : undefined,
      customPageComponent: customPageComponent !== undefined ? customPageComponent : undefined
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const committee = await Committee.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!committee) {
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }

    res.json({ success: true, data: committee });
  } catch (err) {
    console.error('Update committee error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Committee with this path or route already exists' 
      });
    }
    res.status(500).json({ success: false, message: 'Failed to update committee', error: err.message });
  }
};

// Delete committee
const deleteCommittee = async (req, res) => {
  try {
    const { id } = req.params;
    const committee = await Committee.findById(id);
    
    if (!committee) {
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }

    await Committee.findByIdAndDelete(id);
    res.json({ success: true, message: 'Committee deleted successfully' });
  } catch (err) {
    console.error('Delete committee error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete committee', error: err.message });
  }
};

module.exports = {
  listCommittees,
  listAllCommittees,
  getCommittee,
  getCommitteeByRoute,
  createCommittee,
  updateCommittee,
  deleteCommittee
};





