const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    titleEn: { type: String, default: '', trim: true },
    titleMr: { type: String, default: '', trim: true },
    imageUrl: { type: String, required: true },
    altText: { type: String, default: '' },
    altTextEn: { type: String, default: '' },
    altTextMr: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', BannerSchema);


