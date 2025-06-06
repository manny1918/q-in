const express = require('express');
const router = express.Router();
const { createCustomer } = require('../controllers/customerController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(protect, createCustomer)

module.exports = router;
