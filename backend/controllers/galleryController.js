const GalleryItem = require('../models/GalleryItem');

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
    const { title, description, altText, category } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    const imageUrl = `/uploads/gallery/${file.filename}`;
    const item = await GalleryItem.create({
      title,
      description,
      altText,
      category,
      imageUrl,
      uploadedBy: req.user?._id
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add image' });
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

module.exports = { listGallery, createGallery, deleteGallery };



