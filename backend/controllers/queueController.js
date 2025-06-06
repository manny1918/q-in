const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')

const addCustomer = asyncHandler(async (req, res) => {
    console.log(req.body)

    const customer = await Customer.find({identification: req.params.customerId})


    return res.status(200).json(customer)
})


module.exports = {
addCustomer
}

