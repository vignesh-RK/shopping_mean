const mongoose = require('mongoose')

const Item = mongoose.model('items', {
    name:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    quentity:{
        type: Number,
        default: 1
    }
})

module.exports = Item