const mongoose = require('mongoose')

const queueSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add the customer Id'],
        ref: 'Customer'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add the user Id'],
        ref: 'User'
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Queue', queueSchema)