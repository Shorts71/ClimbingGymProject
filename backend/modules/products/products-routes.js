const { Router } = require("express");
const createProductRules = require("./middlewares/create-product-rules");
const updateProductRules = require("./middlewares/update-product-rules");
const authorize = require("../../shared/middlewares/authorize");

const ProductModel = require("./products-model");
const upload = require("../../shared/middlewares/upload");
const { cloudinary } = require("../../shared/cloudinary-utils");

const productsRoute = Router();

productsRoute.get("/products", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;

    const products = await ProductModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await ProductModel.countDocuments();

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
      price: newProduct.price,
    });

    if (!addedProduct) {
      return res.status(500).send(`Oops! Product couldn't be added!`);
    }
    console.log("Product added.");
    res.status(201).json(addedProduct);
  }
);

productsRoute.post(
  "/upload-image",
  upload.single("image"),
  async (req, res) => {
    const productID = req.body.id;
    if (!productID) return res.status(400).send(`Required product id`);
    if (!req.file) return res.status(400).send(`Required product image`);
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
      return res.status(404).send(`Product with ${productID} doesn't exist`);
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "Peak-images" },
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Failed to upload product image" });
          return;
        }

        foundProduct.imageUrl = result.secure_url;
        foundProduct.save();

        res.json({
          message: "Image uploaded successfully",
          product: foundProduct,
        });
      }
    );

    stream.end(req.file.buffer);
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
