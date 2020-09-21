const { body } = require("express-validator");

exports.createEventValidator = [
  body("name").not().isEmpty().withMessage("Event name is required"),
  body("location").not().isEmpty().withMessage("Event location is required"),
  body("event_date").not().isEmpty().withMessage("Event date is required"),
];
