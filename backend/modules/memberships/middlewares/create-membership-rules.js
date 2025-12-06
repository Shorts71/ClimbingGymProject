const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createMembershipRules = [
  body("name").isString().withMessage("Name must be a string").trim(),

  body("duration")
    .notEmpty()
    .withMessage("Duration (in days) is required.")
    .isNumeric()
    .withMessage("Duration must be a number."),

  body("cost")
    .notEmpty()
    .withMessage("Cost is required.")
    .isNumeric()
    .withMessage("Cost is required."),

  body("rentalInclusion")
    .notEmpty()
    .withMessage("Rental Inclusions must be specified.")
    .isBoolean()
    .withMessage("Must be a true or false value."),

  checkValidation,
];

module.exports = createMembershipRules;
