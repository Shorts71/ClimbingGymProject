const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, min: 5, default: 0 },
  rating: { type: Number, required: true, min: 0, max: 10, default: 5 },
  description: {
    type: String,
    max: [500, "Description must be 500 characters or less."],
    required: true,
  },
  weight: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0, default: 0 },
  imageUrl: { type: String, required: false },
});

ProductSchema.index({ name: "text", description: "text" });

const ProductModel = new mongoose.model("Product", ProductSchema, "Products");

module.exports = ProductModel;
