const express = require('express');
const router = express.Router();
const {
  getAlerts,
  getAlert,
  createAlert,
  updateAlert,
  deleteAlert,
} = require('../controllers/alertController');
// const protect = require('../middleware/protect');

// All routes are protected
// router.use(protect);

router.route('/')
  .get(getAlerts)
  .post(createAlert);

router.route('/:id')
  .get(getAlert)
  .put(updateAlert)
  .delete(deleteAlert);

module.exports = router;
