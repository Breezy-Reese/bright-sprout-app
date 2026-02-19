const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  assignedMatatus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matatu',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Route', routeSchema);
