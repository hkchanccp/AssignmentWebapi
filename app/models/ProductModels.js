const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Schema.Types.Decimal128,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'products',
        timestamps: true
    }
);


module.exports = mongoose.model('Product', ProductSchema);