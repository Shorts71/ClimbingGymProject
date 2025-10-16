const { body } = require("express-validator");
const checkValidation = require("../../../shared/check-validation");

const updateMembershipRules = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .trim(),
    
    body("size")
        .notEmpty()
        .withMessage("Size is required.")
        .isNumeric()
        .withMessage("Duration must be a number."),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isNumeric()
        .withMessage("Quantity must be a number."),

    body("color")
        .notEmpty()
        .withMessage("Color must be specified.")
        .isString()
        .withMessage("Color must be a string value."),
    
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

    
    checkValidation,
]

module.exports = updateMembershipRules;