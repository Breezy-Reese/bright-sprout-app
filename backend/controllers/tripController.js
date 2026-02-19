const Trip = require('../models/Trip');
const { trips: inMemoryTrips } = require('../inMemoryDB');

// @desc    Get all trips
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
  try {
    // Try database first
    const trips = await Trip.find({})
      .populate('matatuId', 'plateNumber')
      .populate('routeId', 'name');
    if (trips.length > 0) {
      return res.status(200).json(trips);
    }
    // Fallback to in-memory data
    res.status(200).json(inMemoryTrips);
  } catch (error) {
    console.error(error);
    // Fallback to in-memory data on error
    res.status(200).json(inMemoryTrips);
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('matatuId', 'plateNumber')
      .populate('routeId', 'name');
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private (Operator/Driver)
const createTrip = async (req, res) => {
  try {
    const { matatuId, routeId, driver, conductor, date, departureTime, arrivalTime, passengerCount } = req.body;

    const trip = await Trip.create({
      matatuId,
      routeId,
      driver,
      conductor,
      date,
      departureTime,
      arrivalTime,
      passengerCount,
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private (Operator/Driver)
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('matatuId', 'plateNumber')
      .populate('routeId', 'name');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private (Admin/Operator)
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await trip.remove();
    res.status(200).json({ message: 'Trip removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
