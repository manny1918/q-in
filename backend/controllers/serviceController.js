const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Service = require('../models/serviceModel')

const getServices = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const services = await Service.find()

    res.status(200).json(services)
})

const createService = asyncHandler(async (req, res) => {
    const { serviceName, description } = req.body

    if (!serviceName) {
        res.status(400)
        throw new Error('Please add a serviceName')
    }

    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const service = await Service.create({
        serviceName,
        description
    })

    res.status(201).json(service)
})

module.exports = {
    getServices,
    createService
}