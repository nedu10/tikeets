const { check } = require("express-validator");

exports.validatorContent = [
  check("first_name").not().isEmpty().withMessage("First Name is required"),
  check("last_name").not().isEmpty().withMessage("Last Name is required"),
  check("email").not().isEmpty().withMessage("Email is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
  check("role_id").not().isEmpty().withMessage("User Role is required"),
];
