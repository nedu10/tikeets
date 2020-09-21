const Event = require("../Models/event.models");
const { validationResult } = require("express-validator");

module.exports = {
  async create_event(req, res) {
    const { name, location, details, event_date, reservation_limit } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const eventObj = {
      name,
      location,
      details,
      event_date,
      reservation_limit,
    };
    const event = new Event(eventObj);
    try {
      await event.save();
      return res.status(201).json({
        status_code: 201,
        status: "Successful",
        message: "Event Created Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status_code: 500,
        status: "Error",
        message: "Opps! Something went wrong.",
        error: error.message,
      });
    }
  },
};
