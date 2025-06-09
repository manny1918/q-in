const mongoose = require('mongoose')

const queueSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add the customer Id']
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add the user Id']
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Queue', queueSchema)