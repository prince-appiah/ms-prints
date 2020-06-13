const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    isAdmin: {
        type: Boolean,
        default: false
    },

    firstName: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },

    phoneNumber: {
        type: Number,
        require: true
    },

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

module.exports = mongoose.model('users', UserSchema);