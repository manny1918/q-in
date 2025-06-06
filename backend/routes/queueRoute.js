const express = require('express')
const router = express.Router();
const { addCustomer } = require('../controllers/queueController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(addCustomer)

module.exports = router;
