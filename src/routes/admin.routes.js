const router = require("express").Router();

const { user_reserve_ticket } = require("../App/Controllers/admin.controllers");
const { admin_auth } = require("../App/Middleware/auth.middleware");

router.get("/:user_id/tickets", admin_auth, user_reserve_ticket);

module.exports = router;
