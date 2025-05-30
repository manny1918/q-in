const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    identification:{
        type: String,
        required: [true, 'Please add an identification'],
        unique: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Customer', customerSchema)