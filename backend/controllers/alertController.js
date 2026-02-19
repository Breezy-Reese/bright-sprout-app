const Alert = require('../models/Alert');
const { alerts: inMemoryAlerts } = require('../inMemoryDB');

// @desc    Get all alerts
// @route   GET /api/alerts
// @access  Private
const getAlerts = async (req, res) => {
  try {
    // Try database first
    const alerts = await Alert.find({})
      .populate('matatuId', 'plateNumber')
      .sort({ timestamp: -1 });
    if (alerts.length > 0) {
      return res.status(200).json(alerts);
    }
    // Fallback to in-memory data
    res.status(200).json(inMemoryAlerts);
  } catch (error) {
    console.error(error);
    // Fallback to in-memory data on error
    res.status(200).json(inMemoryAlerts);
  }
};

// @desc    Get single alert
// @route   GET /api/alerts/:id
// @access  Private
const getAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id).populate('matatuId', 'plateNumber');
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create an alert
// @route   POST /api/alerts
// @access  Private (System/Automated)
const createAlert = async (req, res) => {
  try {
    const { matatuId, type, severity, message, timestamp, status } = req.body;

    const alert = await Alert.create({
      matatuId,
      type,
      severity,
      message,
      timestamp: timestamp || new Date(),
      status: status || 'new',
    });

    res.status(201).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update alert
// @route   PUT /api/alerts/:id
// @access  Private (Operator/Admin)
const updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('matatuId', 'plateNumber');

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete alert
// @route   DELETE /api/alerts/:id
// @access  Private (Admin)
const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    await alert.remove();
    res.status(200).json({ message: 'Alert removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAlerts,
  getAlert,
  createAlert,
  updateAlert,
  deleteAlert,
};
