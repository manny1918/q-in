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

const getService = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const service = await Service.findById(req.params.id)

    res.status(200).json(service)
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

    if(!service){
        res.status(404)
        throw new Error('Service not found')
    }

    res.status(201).json(service)
})

const updateService = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const service = await Service.findById(req.params.id)

    if(!service){
        res.status(404)
        throw new Error('Service not found')
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedService)
})

const deleteService = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const service = await Service.findById(req.params.id)

    if(!service){
        res.status(404)
        throw new Error('Service not found')
    }

    await Service.findByIdAndDelete(req.params.id)

    res.status(200).json({success: true})
})

module.exports = {
    createService,
    getService,
    getServices,
    updateService,
    deleteService
}