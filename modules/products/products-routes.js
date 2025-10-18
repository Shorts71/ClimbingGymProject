const { Router } = require("express");
const createProductRules = require("./middlewares/create-product-rules");
const updateProdcutRules = require("./middlewares/update-product-rules");

const ProductModel = require("./products-model");

const productsRoute = Router();

productsRoute.get("/products", async(req, res) => {
    const allProducts = await ProductModel.find();
    if (!allProducts) {
        res.json([]);
    } else {
        console.log("All products found.");
        res.status(200).json(allProducts);
    } 
})

productsRoute.get("/products/:id", async (req, res) => {
    const productID = req.params.id;
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
        return res.status(404).send(`Product with ID ${productID} does not exist.`);
    } else {
        console.log("Product found.");
        res.status(200).json(foundProduct);
    }
})

productsRoute.post("/products", createProductRules, async (req, res) => {
    const addedProduct = await ProductModel.create({
        name: "Scarpa Vapor V",
        size: 12,
        quantity: 20,
        color: "Ocean/Red",
        rating: 9.4,
        description: "With small edges and a stiff midsole, this shoe will help you immensely with your climbing experience.",
        weight: 480,
        image: "image.png",
        price: 239.99
    });
    if (!addedProduct) {
        return res.status(500).send(`Oops! Product couldn't be added!`);
    }
    console.log("Product added.");
    res.status(201).json(addedProduct)
});

productsRoute.put("/products/:id", updateProdcutRules, async (req, res) => {
    const productID = req.params.id
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
        return res.status(404).send(`Product with ID ${productID} does not exist.`);
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productID,
        { $set: { name: "Scarpa Instinct VS Climbing Shoes"} },
        { new: true }
    )
    if (!updatedProduct) {
        return res.status(500).send(`Oops! Product couldn't be updated!`);
    }
    console.log("Product updated.");
    res.status(200).json(updatedProduct);
});

productsRoute.delete("/products/:id", async (req, res) => {
    const productID = req.params.id;
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
        return res.status(404).send(`Product with ID ${productID} does not exist.`);
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(productID);
    if (!deletedProduct) {
        return res.status(500).send('Oops! Product could not be deleted!');
    }
    console.log("Product deleted.");
    res.status(200).json(deletedProduct);
});


module.exports = { productsRoute }