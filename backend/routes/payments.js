const express = require('express');
const router = express.Router();
const { initiatePayment, mpesaCallback } = require('../controllers/paymentController');

// public callback from safaricom
router.post('/callback', express.json({ type: '*/*' }), mpesaCallback);

// create payment (protected in real app)
router.post('/', initiatePayment);

module.exports = router;
