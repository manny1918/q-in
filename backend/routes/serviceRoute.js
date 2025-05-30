const express = require('express');
const router = express.Router();
const { getServices, createService, getService } = require('../controllers/serviceController');

const { protect } = require('../middleware/authMidleware');

router.route('/').get(protect, getServices).post(protect, createService);
router.route('/:id').get(protect, getService);

module.exports = router;
