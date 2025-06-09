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


module.exports = {
    addCustomerToTheQueue
}

