const express = require('express')
const router = express.Router();
const { addCustomerToTheQueue } = require('../controllers/queueController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(addCustomerToTheQueue)

module.exports = router;
