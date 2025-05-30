const mongoose = require('mongoose')

const queueSchema = mongoose.Schema({
    userEmailAddress:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add the operator email address']
    },
    customers:{
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, 'Please add an email'],
        unique: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Queue', queueSchema)