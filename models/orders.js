const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema( {
    itemId:{
        type: String
    },
    orderDescription: {
        type: String,
        required: true,
        trim: true
    },
   
    Quentity:{
        type: Number,
        default: 1
    },
    totalCost:{
        type: Number
    }
}, {
    timestamps: true
})

const Order = mongoose.model('orders',orderSchema)
module.exports = Order