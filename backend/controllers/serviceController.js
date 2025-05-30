const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Service = require('../models/serviceModel')

const getServices = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get tickets'
    })
})

const createService = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Create tickets'
    })
})

module.exports = {
    getServices,
    createService
}