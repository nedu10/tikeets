const { body } = require("express-validator");

exports.loginValidator = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
