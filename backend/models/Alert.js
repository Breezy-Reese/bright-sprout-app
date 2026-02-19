const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  matatuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matatu',
    required: true,
  },
  type: {
    type: String,
    enum: ['overloading', 'off-route', 'safety', 'speed', 'maintenance'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'acknowledged', 'resolved'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Alert', alertSchema);
