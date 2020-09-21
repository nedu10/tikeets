const router = require("express").Router();

router.get("/", (req, res) => res.send("Hello, Welcome to Tikeets API"));

router.use("/", require("./auth.routes"));
router.use("/events", require("./event.routes"));

module.exports = router;
