const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    isAdmin: {
        type: Boolean,
        default: true
    },

    // productIds: {
    //     type: [String]
    // },

    emailAddress: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('admins', AdminSchema);