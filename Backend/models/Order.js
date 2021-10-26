const mongoose = require('mongoose')

const Order = mongoose.model('Order', {

    code: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },

})

module.exports = Order