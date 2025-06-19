const express = require('express')
const router = express.Router();
const { addCustomerToTheQueue, getQueues, getQueue, removeTurn } = require('../controllers/queueController');

const { protect } = require('../middleware/authMidleware');

router.route('/').post(addCustomerToTheQueue).get(protect, getQueues)
router.route('/:userId').get(protect, getQueue)
router.route('/:turnId').delete(protect, removeTurn)

module.exports = router;
