const express = require('express')
const router = express.Router();
const { addCustomerToTheQueue, getQueues } = require('../controllers/queueController');

const { protect } = require('../middleware/authMidleware');

router.route('/').post(addCustomerToTheQueue).get(protect, getQueues)

module.exports = router;
