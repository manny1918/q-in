const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Service = require('../models/serviceModel')

const getServices = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const services = await Service.find()

    res.status(200).json(services)
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