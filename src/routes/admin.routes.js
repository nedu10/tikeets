const router = require("express").Router();

const {
  user_reserve_ticket,
  view_all_roles,
} = require("../App/Controllers/admin.controllers");
const { admin_auth } = require("../App/Middleware/auth.middleware");

router.get("/:user_id/tickets", admin_auth, user_reserve_ticket);
router.get("/admin/roles", admin_auth, view_all_roles);

module.exports = router;
