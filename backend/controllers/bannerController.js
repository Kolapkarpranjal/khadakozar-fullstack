const Banner = require('../models/Banner');
const mongoose = require('mongoose');

// List banners (only active ones for public)
const listBanners = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    let query = {};
    if (activeOnly === 'true') {
      query.isActive = true;
    }
    const items = await Banner.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load banners' });
  }
};

// Create banner
const createBanner = async (req, res) => {
  try {
    const { title, titleEn, titleMr, altText, altTextEn, altTextMr, order, isActive } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    const imageUrl = `/uploads/banners/${file.filename}`;
    
    const item = await Banner.create({
      title,
      titleEn,
      titleMr,
      altText,
      altTextEn,
      altTextMr,
      order: order ? parseInt(order) : 0,
      isActive: isActive !== 'false',
      imageUrl,
      uploadedBy: req.user?._id
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('Error creating banner:', err);
    res.status(500).json({ success: false, message: 'Failed to add banner', error: err.message });
  }
};

// Get single banner
const getBanner = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching banner with ID:', id);
    
    if (!id || id === 'undefined') {
      return res.status(400).json({ success: false, message: 'Banner ID is required' });
    }
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid banner ID format' });
    }
    
    const item = await Banner.findById(id);
    if (!item) {
      console.log('Banner not found for ID:', id);
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    
    console.log('Banner found:', item.title);
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error fetching banner:', err);
    res.status(500).json({ success: false, message: 'Failed to load banner', error: err.message });
  }
};

// Update banner
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      titleEn, 
      titleMr, 
      altText, 
      altTextEn, 
      altTextMr, 
      order,
      isActive
    } = req.body;
    const file = req.file;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (titleEn !== undefined) updateData.titleEn = titleEn;
    if (titleMr !== undefined) updateData.titleMr = titleMr;
    if (altText !== undefined) updateData.altText = altText;
    if (altTextEn !== undefined) updateData.altTextEn = altTextEn;
    if (altTextMr !== undefined) updateData.altTextMr = altTextMr;
    if (order !== undefined) updateData.order = parseInt(order);
    if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;
    
    if (file) {
      updateData.imageUrl = `/uploads/banners/${file.filename}`;
    }
    
    const item = await Banner.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update banner', error: err.message });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete banner' });
  }
};

module.exports = { listBanners, getBanner, createBanner, updateBanner, deleteBanner };


