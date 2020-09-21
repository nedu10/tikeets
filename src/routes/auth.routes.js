const router = require("express").Router();

const { register } = require("../App/Controllers/auth.controllers");
const {
  validatorContent,
} = require("../App/Validators/registration.validator");

router.post("/register", validatorContent, register);
module.exports = router;
