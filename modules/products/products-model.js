const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, max: [500, 'Desciprtion must be 500 characters or less.'], required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
})

const ProductModel = new mongoose.model("Product", ProductSchema, "Products");

module.exports = ProductModel;