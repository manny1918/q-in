const express = require('express')
const router = express.Router()
const {getServices, createService} = require('../controllers/serviceController')

const { protect } = require('../middleware/authMidleware')

router.route('/').get(protect, getServices).post(protect, createService)
module.exports = router