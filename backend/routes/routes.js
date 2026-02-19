const express = require('express');
const router = express.Router();
const {
  getRoutes,
  getRoute,
  createRoute,
  updateRoute,
  deleteRoute,
} = require('../controllers/routeController');
// const protect = require('../middleware/protect');

// All routes are protected
// router.use(protect);

router.route('/')
  .get(getRoutes)
  .post(createRoute);

router.route('/:id')
  .get(getRoute)
  .put(updateRoute)
  .delete(deleteRoute);

module.exports = router;
