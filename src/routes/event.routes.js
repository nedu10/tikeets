const router = require("express").Router();

const {
  create_event,
  get_all_upcoming_events,
  update_event,
  delete_event,
} = require("../App/Controllers/event.controllers");
const {
  createEventValidator,
} = require("../App/Validators/create-event.validator");
const { admin_auth, auth } = require("../App/Middleware/auth.middleware");

router.post("/", createEventValidator, admin_auth, create_event);
router.get("/", auth, get_all_upcoming_events);
router.patch("/:event_id", admin_auth, update_event);
router.delete("/:event_id", admin_auth, delete_event);
router.post("/:event_id/ticket", admin_auth, delete_event);

module.exports = router;
