const { Router } = require("express");
const createProductRules = require("./middlewares/create-product-rules");
const updateProductRules = require("./middlewares/update-product-rules");
const authorize = require("../../shared/middlewares/authorize");

const ProductModel = require("./products-model");

const productsRoute = Router();

productsRoute.get("/products", async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    let products, totalCount;

    if (!search) {
      products = await ProductModel.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      totalCount = await ProductModel.countDocuments();
    } else {
      const query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
      products = await ProductModel.find(query, {
        name: 1,
        price: 1,
        color: 1,
        rating: 1,
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      totalCount = await ProductModel.countDocuments(query);
    }

    return res.json({
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      dataPerPage: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

productsRoute.get("/products/:id", async (req, res) => {
  const productID = req.params.id;
  const foundProduct = await ProductModel.findById(productID);
  if (!foundProduct) {
    return res.status(404).send(`Product with ID ${productID} does not exist.`);
  } else {
    console.log("Product found.");
    res.status(200).json(foundProduct);
  }
});

productsRoute.post(
  "/products",
  createProductRules,
  authorize(["admin", "seller"]),
  async (req, res) => {
    const newProduct = req.body;

    const addedProduct = await ProductModel.create({
      name: newProduct.name,
      category: newProduct.category,
      rating: newProduct.rating,
      description: newProduct.description,
      weight: newProduct.weight,
      // image: newProduct.image,
      price: newProduct.price,
    });

    if (!addedProduct) {
      return res.status(500).send(`Oops! Product couldn't be added!`);
    }
    console.log("Product added.");
    res.status(201).json(addedProduct);
  }
);

productsRoute.put(
  "/products/:id",
  updateProductRules,
  authorize(["admin", "staff"]),
  async (req, res) => {

    const productID = req.params.id;
    const newProduct = req.body;
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
      return res
        .status(404)
        .send(`Product with ID ${productID} does not exist.`);
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      {
        $set: {
          name: newProduct.name,
          category: newProduct.category,
          rating: newProduct.rating,
          description: newProduct.description,
          weight: newProduct.weight,
          price: newProduct.price,
          // image: newProduct.image,
        },
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(500).send(`Oops! Product couldn't be updated!`);
    }
    console.log("Product updated.");
    res.status(200).json(updatedProduct);
  }
);

productsRoute.delete(
  "/products/:id",
  authorize(["admin", "staff"]),
  async (req, res) => {

    const productID = req.params.id;
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
      return res
        .status(404)
        .send(`Product with ID ${productID} does not exist.`);
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(productID);
    if (!deletedProduct) {
      return res.status(500).send("Oops! Product could not be deleted!");
    }
    console.log("Product deleted.");
    res.status(200).json(deletedProduct);
  }
);

module.exports = { productsRoute };
