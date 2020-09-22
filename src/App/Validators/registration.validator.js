const { body } = require("express-validator");

exports.validatorContent = [
  body("first_name").not().isEmpty().withMessage("First Name is required"),
  body("last_name").not().isEmpty().withMessage("Last Name is required"),
  body("email").isEmail().not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
