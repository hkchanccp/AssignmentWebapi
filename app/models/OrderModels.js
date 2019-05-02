const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },
        delivery_address: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'orders',
        timestamps: true
    }
);


module.exports = mongoose.model('Order', ProductSchema);