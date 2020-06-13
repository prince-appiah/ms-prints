const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    userId: {
        type: String
    },

    cart: {
        type: Object,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    paymentId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('orders', OrderSchema);