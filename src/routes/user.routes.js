const router = require("express").Router();

const { user_reserve_ticket } = require("../App/Controllers/user.controllers");
const { auth } = require("../App/Middleware/auth.middleware");

router.post("/tickets", auth, user_reserve_ticket);

module.exports = router;
