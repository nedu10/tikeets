const Event = require("../Models/event.models");
const Reservation = require("../Models/reservation.models");
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
  async update_event(req, res) {
    const { name, location, details, event_date, reservation_limit } = req.body;
    const { event_id } = req.params;
    const eventObj = {};
    name ? (eventObj.name = name) : null;
    location ? (eventObj.location = location) : null;
    details ? (eventObj.details = details) : null;
    event_date ? (eventObj.event_date = event_date) : null;
    reservation_limit ? (eventObj.reservation_limit = reservation_limit) : null;
    try {
      await Event.updateOne({ _id: event_id }, eventObj);
      return res.status(202).json({
        status_code: 202,
        status: "Successful",
        message: "Event Updated Successfully",
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
  async delete_event(req, res) {
    const { event_id } = req.params;
    try {
      await Event.deleteOne({ _id: event_id });
      return res.status(200).json({
        status_code: 200,
        status: "Successful",
        message: "Event Deleted Successfully",
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
  async get_all_upcoming_events(req, res) {
    try {
      const get_events = await Event.find({
        event_date: { $gte: new Date().toISOString() },
      });
      return res.status(200).json({
        status_code: 200,
        status: "Successful",
        message: "Successfully fetched all upcoming events",
        results: get_events,
      });
    } catch (error) {
      console.log("error >> ", error);
      return res.status(500).json({
        status_code: 500,
        status: "Error",
        message: "Opps! Something went wrong.",
        error: error.message,
      });
    }
  },
  async book_ticket(req, res) {
    const user_id = req.current_user.id;
    const { event_id } = req.params;
    const eventObj = {
      user_id,
      event_id,
    };
    const reservation = new Reservation(eventObj);
    try {
      await reservation.save();
      return res.status(201).json({
        status_code: 201,
        status: "Successful",
        message: "Reservation Booked Successfully",
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
  async cancel_reservation(req, res) {
    const user_id = req.current_user.id;
    const { event_id, ticket_id } = req.params;
    try {
      await Reservation.find();
      return res.status(201).json({
        status_code: 201,
        status: "Successful",
        message: "Reservation Booked Successfully",
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
