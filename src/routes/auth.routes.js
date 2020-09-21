const router = require("express").Router();

const { register } = require("../App/Controllers/auth.controllers");

router.route("/register").post(register);
module.exports = router;
