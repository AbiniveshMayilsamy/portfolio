const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, enum: ['event', 'prize', 'photo'], default: 'photo' },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  cloudinaryId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
