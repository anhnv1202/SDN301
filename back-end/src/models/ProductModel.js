const mongoose = require('mongoose');
const SubCategory = require("./SubCategoryModel");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    rate: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true
    },
    numberSold: {
        type: Number,
        default: 0
    },
    numberDiscount: {
        type: Number,
        default: 0
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    categoryId: {
        type: String,
    }
}, {
    timestamps: true
})
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
