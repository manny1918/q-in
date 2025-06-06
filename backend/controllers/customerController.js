const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customerModel');

const createCustomer = asyncHandler(async (req, res) => {
    const { name, identification } = req.body;
    if (!name || !identification) {
        throw new Error('Please include all the fields');
    }

    const customerExists = await Customer.findOne({ identification });
    if (customerExists) {
        res.status(400);
        throw new Error('Customer already exists');
    }

    const customer = await Customer.create({
        name,
        identification,
    });

    return res.status(201).json(customer);
})

module.exports = {
    createCustomer
}