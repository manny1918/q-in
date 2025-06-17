const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')
const Queue = require('../models/queueModel')
const User = require('../models/userModel')
const CircularJSON = require('circular-json')

const addCustomerToTheQueue = asyncHandler(async (req, res) => {
    const { services, customer: customerId }= req.body
    for (let service of services){
        const user = await User.findOne({ services: { $in: service }})
        const customer = await Customer.findOne({identification: customerId})
        await Queue.create({
            customerId: customer._id,
            userId: user._id
        })
    }

    return res.status(200).json({success: true})
})


const getQueue = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const queue = await Queue.find({userId: req.params.userId})

    return res.status(200).json(queue)
})

const getQueues = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const queues = await Queue.find()

    return res.status(200).json(queues)
})

module.exports = {
    addCustomerToTheQueue,
    getQueue,
    getQueues
}

