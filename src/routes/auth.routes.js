const router = require("express").Router();

const { register, login } = require("../App/Controllers/auth.controllers");
const {
  validatorContent,
} = require("../App/Validators/registration.validator");
const { loginValidator } = require("../App/Validators/login.validator");

router.post("/signup", validatorContent, register);
router.post("/login", loginValidator, login);

module.exports = router;
