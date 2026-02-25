const Payment = require('../models/Payment');

// helper to get access token from safaricom
async function getMpesaToken() {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  const creds = Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${creds}`,
    },
  });
  const data = await res.json();
  return data.access_token;
}

// @desc    Initiate MPESA STK push for a passenger
// @route   POST /api/payments
// @access  Private
const initiatePayment = async (req, res) => {
  console.log('initiatePayment body', req.body);

  // ensure core env vars (APP_BASE_URL is optional – fall back to localhost)
  const required = ['MPESA_CONSUMER_KEY','MPESA_CONSUMER_SECRET','MPESA_SHORTCODE','MPESA_PASSKEY'];
  for (const name of required) {
    if (!process.env[name]) {
      const msg = `missing environment variable ${name}`;
      console.error(msg);
      return res.status(500).json({ message: msg });
    }
  }

  try {
    const { tripId, phone, amount } = req.body;
    // basic validation
    if (!tripId || !phone || !amount) {
      return res.status(400).json({ message: 'tripId, phone and amount are required' });
    }
    // create a payment record
    let payment;
    try {
      payment = await Payment.create({ tripId, phone, amount });
    } catch (err) {
      console.error('payment create error', err);
      throw err;
    }

    const token = await getMpesaToken();
    console.log('mpesa token', token && token.slice(0,10));
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const baseUrl = process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 5001}`;
    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: `${baseUrl}/api/payments/callback`,
      AccountReference: tripId,
      TransactionDesc: 'Fare payment',
    };
    console.log('using callback URL', `${baseUrl}/api/payments/callback`);

    console.log('stk payload', payload);
    const resp = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await resp.json();
    console.log('stk push response', result);

    // store response data if needed
    payment.transactionId = result.CheckoutRequestID || payment.transactionId;
    await payment.save();

    res.status(201).json({ payment, result });
  } catch (error) {
    console.error('initiatePayment error', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
};

// @desc    MPESA callback endpoint (public)
// @route   POST /api/payments/callback
// @access  Public
const mpesaCallback = async (req, res) => {
  try {
    const body = req.body;
    // body contains the result of the STK push
    // you would parse the JSON structure and update the payment record accordingly
    const checkoutId = body.Body.stkCallback.CheckoutRequestID;
    const statusCode = body.Body.stkCallback.ResultCode;

    const payment = await Payment.findOne({ transactionId: checkoutId });
    if (payment) {
      payment.status = statusCode === 0 ? 'completed' : 'failed';
      await payment.save();
    }

    // respond to safaricom with success
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (err) {
    console.error('callback error', err);
    res.status(500).json({});
  }
};

module.exports = {
  initiatePayment,
  mpesaCallback,
};
