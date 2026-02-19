const express = require('express');
const router = express.Router();
const {
  getMatatus,
  getMatatu,
  createMatatu,
  updateMatatu,
  deleteMatatu,
} = require('../controllers/matatuController');
// const protect = require('../middleware/protect');

// All routes are protected
// router.use(protect);

router.route('/')
  .get(getMatatus)
  .post(createMatatu);

router.route('/:id')
  .get(getMatatu)
  .put(updateMatatu)
  .delete(deleteMatatu);

module.exports = router;
