const router = require("express").Router();

const { create_event } = require("../App/Controllers/event.controllers");
const {
  createEventValidator,
} = require("../App/Validators/create-event.validator");

router.post("/", createEventValidator, create_event);

module.exports = router;
