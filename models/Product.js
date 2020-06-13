const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const URLSlugs = require('mongoose-url-slugs');

const ProductSchema = new Schema({

    adminId: {
        type: String
    },

    image: {
        type: String,
        require: true
    },

    name: {
        type: String,
        required: true
    },

    // slug: {
    //     type: String
    // },

    price: {
        type: Number,
        trim: true,
        require: true
    },

    size: {
        type: String,
        require: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    }

});

// Slug Config
// ProductSchema.plugin(URLSlugs('name', {field: 'slug'}));

module.exports = mongoose.model('products', ProductSchema);
