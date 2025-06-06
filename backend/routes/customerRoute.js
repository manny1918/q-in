const express = require('express');
const router = express.Router();
const { createCustomer, getCustomers } = require('../controllers/customerController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(protect, createCustomer).get(protect, getCustomers)

module.exports = router;
