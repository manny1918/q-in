const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customerModel');
const User = require('../models/userModel');

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

const getCustomers = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const customers = await Customer.find()

    return res.status(200).json(customers)
})

const getCustomersByUserId = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const customers = await Customer.find()

    return res.status(200).json(customers)
})

const getCustomer = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const customer = await Customer.find({identification: req.params.customerId})

    return res.status(200).json(customer)
})

module.exports = {
    createCustomer,
    getCustomer,
    getCustomers,
    getCustomersByUserId
}