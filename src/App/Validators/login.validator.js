const { check } = require("express-validator");

exports.loginValidator = [
  check("email").not().isEmpty().withMessage("Email is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
];
