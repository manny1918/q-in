const express = require('express');
const router = express.Router();
const { createCustomer, getCustomers, getCustomer, getCustomersByUserId } = require('../controllers/customerController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(createCustomer).get(protect, getCustomers)
router.route('/:customerId').get(protect, getCustomer)
router.route('/:userId').get(protect, getCustomersByUserId)

module.exports = router;
