const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    user:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    serviceName:{
        type: String,
        required: [true, 'Please select a service'],
        unique: true
    },
    description:{
        type: String
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Service', serviceSchema)