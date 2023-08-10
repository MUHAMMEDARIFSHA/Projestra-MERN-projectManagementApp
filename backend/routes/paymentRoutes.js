const express = require('express');
const router = express.Router();
// const paymentController = require('../controllers/paymentController');
const createPayment = require('../controllers/paymentController')
const verifyToken = require('../middlewares/Authorization')

// Define payment routes
router.post('/create-payment',verifyToken, createPayment);
// Add other payment-related routes as needed

module.exports = router;
