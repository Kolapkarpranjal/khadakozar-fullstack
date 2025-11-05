const Event = require('../models/Event');

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
    const { title, description, altText, status, date } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    const imageUrl = `/uploads/events/${file.filename}`;
    const item = await Event.create({
      title,
      description,
      altText,
      status,
      date,
      imageUrl,
      uploadedBy: req.user?._id
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add event' });
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

module.exports = { listEvents, createEvent, deleteEvent };



