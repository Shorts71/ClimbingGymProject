const { Router } = require("express");
const createProductRules = require("./middlewares/create-product-rules");
const updateProdcutRules = require("./middlewares/update-product-rules");

const ProductModel = require("./products-model");

const productsRoute = Router();

productsRoute.get("/products", async(req, res) => {
    const allProducts = await ProductModel.find();
    if (!allProducts) res.json([]);
    else res.json(allProducts);
})

productsRoute.get("/products/:id", async (req, res) => {
    const productID = req.params.id;
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
        return res.status(404).send(`Membership with ID ${productID} does not exist.`);
    } else {
        res.status(200).json(foundProduct);
    }
})

productsRoute.post("/products/:id", createProductRules, async (req, res) => {
    const addedProduct = await ProductModel.create({
        name: "Scarpa Vapor V",
        size: 11.5,
        quantity: 18,
        color: "Ocean/Yellow",
        rating: 9.2,
        description: "With small edges and a stiff midsole, this shoe will help you immensely with your climbing experience.",
        weight: 480,
        image: "image.png",
        price: 229.99
    });
    if (!addedProduct) {
        return res.status(500).send(`Oops! Membership couldn't be added!`);
    }
    res.json(addedProduct)
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
    res.json(updatedProduct);
});

productsRoute.delete("/products/:id", async (req, res) => {
    const productID = req.params.id;
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
        return res.status(404).send(`Customer with ID ${productID} does not exist.`);
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(productID);
    if (!deletedProduct) {
        return res.status(500).send('Oops! Product could not be deleted!');
    }
    res.json(deletedProduct);
});


module.exports = { productsRoute }