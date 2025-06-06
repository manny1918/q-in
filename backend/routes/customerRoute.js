const express = require('express');
const router = express.Router();
const { createCustomer, getCustomers, getCustomer } = require('../controllers/customerController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(protect, createCustomer).get(protect, getCustomers)
router.route('/:customerId').get(protect, getCustomer)

module.exports = router;
