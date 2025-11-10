const GalleryItem = require('../models/GalleryItem');
const mongoose = require('mongoose');

// List gallery items
const listGallery = async (req, res) => {
  try {
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load gallery' });
  }
};

// Create gallery item
const createGallery = async (req, res) => {
  try {
    const { title, description, altText, category, isVideo } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image or video is required' });
    }
    const imageUrl = `/uploads/gallery/${file.filename}`;
    
    // Determine if it's a video based on file type or isVideo flag
    const isVideoFile = isVideo === 'true' || isVideo === true || 
                       file.mimetype.startsWith('video/');
    
    const item = await GalleryItem.create({
      title,
      description,
      altText,
      category,
      imageUrl,
      isVideo: isVideoFile,
      uploadedBy: req.user?._id
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ success: false, message: 'Failed to add image/video', error: err.message });
  }
};

// Get single gallery item
const getGallery = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching gallery item with ID:', id);
    
    if (!id || id === 'undefined') {
      return res.status(400).json({ success: false, message: 'Gallery item ID is required' });
    }
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid gallery item ID format' });
    }
    
    const item = await GalleryItem.findById(id);
    if (!item) {
      console.log('Gallery item not found for ID:', id);
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    
    console.log('Gallery item found:', item.title);
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error fetching gallery item:', err);
    res.status(500).json({ success: false, message: 'Failed to load gallery item', error: err.message });
  }
};

// Update gallery item
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      titleEn, 
      titleMr, 
      description, 
      descriptionEn, 
      descriptionMr, 
      altText, 
      altTextEn, 
      altTextMr, 
      category,
      isVideo 
    } = req.body;
    const file = req.file;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (titleEn !== undefined) updateData.titleEn = titleEn;
    if (titleMr !== undefined) updateData.titleMr = titleMr;
    if (description !== undefined) updateData.description = description;
    if (descriptionEn !== undefined) updateData.descriptionEn = descriptionEn;
    if (descriptionMr !== undefined) updateData.descriptionMr = descriptionMr;
    if (altText !== undefined) updateData.altText = altText;
    if (altTextEn !== undefined) updateData.altTextEn = altTextEn;
    if (altTextMr !== undefined) updateData.altTextMr = altTextMr;
    if (category !== undefined) updateData.category = category;
    if (isVideo !== undefined) updateData.isVideo = isVideo === 'true' || isVideo === true;
    
    if (file) {
      updateData.imageUrl = `/uploads/gallery/${file.filename}`;
    }
    
    const item = await GalleryItem.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update gallery item', error: err.message });
  }
};

// Delete gallery item
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    await GalleryItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
};

module.exports = { listGallery, getGallery, createGallery, updateGallery, deleteGallery };









