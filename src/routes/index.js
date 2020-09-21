const router = require("express").Router();

router.get("/", (req, res) => res.send("Hello, Welcome to Tikeets API"));

router.use("/", require("./auth.routes"));

module.exports = router;
