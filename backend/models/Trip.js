const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  matatuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matatu',
    required: true,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  conductor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  passengerCount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);
