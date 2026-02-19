const Matatu = require('../models/Matatu');
const { matatus: inMemoryMatatus } = require('../inMemoryDB');

// @desc    Get all matatus
// @route   GET /api/matatus
// @access  Private
const getMatatus = async (req, res) => {
  try {
    // Try database first
    const matatus = await Matatu.find({}).populate('assignedRouteId', 'name');
    if (matatus.length > 0) {
      return res.status(200).json(matatus);
    }
    // Fallback to in-memory data
    res.status(200).json(inMemoryMatatus);
  } catch (error) {
    console.error(error);
    // Fallback to in-memory data on error
    res.status(200).json(inMemoryMatatus);
  }
};

// @desc    Get single matatu
// @route   GET /api/matatus/:id
// @access  Private
const getMatatu = async (req, res) => {
  try {
    const matatu = await Matatu.findById(req.params.id).populate('assignedRouteId', 'name');
    if (!matatu) {
      return res.status(404).json({ message: 'Matatu not found' });
    }
    res.status(200).json(matatu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a matatu
// @route   POST /api/matatus
// @access  Private (Admin/Operator)
const createMatatu = async (req, res) => {
  try {
    const { plateNumber, capacity, status, assignedRouteId, owner, model, year } = req.body;

    const matatu = await Matatu.create({
      plateNumber,
      capacity,
      status: status || 'active',
      assignedRouteId,
      owner,
      model,
      year,
    });

    res.status(201).json(matatu);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Plate number already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Update matatu
// @route   PUT /api/matatus/:id
// @access  Private (Admin/Operator)
const updateMatatu = async (req, res) => {
  try {
    const matatu = await Matatu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedRouteId', 'name');

    if (!matatu) {
      return res.status(404).json({ message: 'Matatu not found' });
    }

    res.status(200).json(matatu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete matatu
// @route   DELETE /api/matatus/:id
// @access  Private (Admin)
const deleteMatatu = async (req, res) => {
  try {
    const matatu = await Matatu.findById(req.params.id);

    if (!matatu) {
      return res.status(404).json({ message: 'Matatu not found' });
    }

    await matatu.remove();
    res.status(200).json({ message: 'Matatu removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMatatus,
  getMatatu,
  createMatatu,
  updateMatatu,
  deleteMatatu,
};
