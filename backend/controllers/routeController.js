const Route = require('../models/Route');
const { routes: inMemoryRoutes } = require('../inMemoryDB');

// @desc    Get all routes
// @route   GET /api/routes
// @access  Private
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({}).populate('assignedMatatus', 'plateNumber');
    if (routes.length > 0) {
      return res.status(200).json(routes);
    }
    // Fallback to in-memory data
    res.status(200).json(inMemoryRoutes);
  } catch (error) {
    console.error(error);
    // Fallback to in-memory data on error
    res.status(200).json(inMemoryRoutes);
  }
};

// @desc    Get single route
// @route   GET /api/routes/:id
// @access  Private
const getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('assignedMatatus', 'plateNumber');
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a route
// @route   POST /api/routes
// @access  Private (Admin/Operator)
const createRoute = async (req, res) => {
  try {
    const { name, from, to, distance, fare, assignedMatatus } = req.body;

    const route = await Route.create({
      name,
      from,
      to,
      distance,
      fare,
      assignedMatatus: assignedMatatus || [],
    });

    res.status(201).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update route
// @route   PUT /api/routes/:id
// @access  Private (Admin/Operator)
const updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedMatatus', 'plateNumber');

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete route
// @route   DELETE /api/routes/:id
// @access  Private (Admin)
const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    await route.remove();
    res.status(200).json({ message: 'Route removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRoutes,
  getRoute,
  createRoute,
  updateRoute,
  deleteRoute,
};
