const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    titleEn: { type: String, default: '', trim: true },
    titleMr: { type: String, default: '', trim: true },
    description: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionMr: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    altText: { type: String, default: '' },
    altTextEn: { type: String, default: '' },
    altTextMr: { type: String, default: '' },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Completed' },
    date: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);










