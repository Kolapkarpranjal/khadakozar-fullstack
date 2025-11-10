const Event = require('../models/Event');
const mongoose = require('mongoose');

// List events
const listEvents = async (req, res) => {
  try {
    const items = await Event.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load events' });
  }
};

// Create event
const createEvent = async (req, res) => {
  try {
    const { title, titleEn, titleMr, description, descriptionEn, descriptionMr, altText, altTextEn, altTextMr, status, date } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    const imageUrl = `/uploads/events/${file.filename}`;
    const item = await Event.create({
      title,
      titleEn,
      titleMr,
      description,
      descriptionEn,
      descriptionMr,
      altText,
      altTextEn,
      altTextMr,
      status,
      date,
      imageUrl,
      uploadedBy: req.user?._id
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ success: false, message: 'Failed to add event', error: err.message });
  }
};

// Get single event
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching event with ID:', id);
    
    if (!id || id === 'undefined') {
      return res.status(400).json({ success: false, message: 'Event ID is required' });
    }
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID format' });
    }
    
    const item = await Event.findById(id);
    if (!item) {
      console.log('Event not found for ID:', id);
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    console.log('Event found:', item.title);
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ success: false, message: 'Failed to load event', error: err.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
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
      status,
      date
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
    if (status !== undefined) updateData.status = status;
    if (date !== undefined) updateData.date = date;
    
    if (file) {
      updateData.imageUrl = `/uploads/events/${file.filename}`;
    }
    
    const item = await Event.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update event', error: err.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
};

module.exports = { listEvents, getEvent, createEvent, updateEvent, deleteEvent };










