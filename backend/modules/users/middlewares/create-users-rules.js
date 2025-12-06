const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createUserRules = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),
  
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{3}-\d{3}-\d{4}$/)
    .withMessage("Please enter the correct format."),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string")
    .trim(),

  checkValidation,
];

module.exports = createUserRules;
