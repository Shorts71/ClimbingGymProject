const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true, min: 5, default: 8 },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    color: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, default: 5 },
    description: { type: String, max: [500, 'Desciprtion must be 500 characters or less.'], required: true },
    weight: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0, default: 0 },
})

const ProductModel = new mongoose.model("Product", ProductSchema, "Products");

module.exports = ProductModel;