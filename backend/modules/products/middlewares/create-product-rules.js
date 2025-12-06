const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createProductRules = [
  body("name").isString().withMessage("Name must be a string").trim(),

  body("category")
    .notEmpty()
    .withMessage("Category is required.")
    .isString()
    .withMessage("Category must be a string."),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required.")
    .isNumeric()
    .withMessage("Rating must be a number."),

  body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("weight")
    .notEmpty()
    .withMessage("Weight is required.")
    .isNumeric()
    .withMessage("Weight must be a number."),

  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isNumeric()
    .withMessage("Price must be a number."),

  // body("image")
  //     .notEmpty()
  //     .withMessage("Image is required."),

  checkValidation,
];

module.exports = createProductRules;
