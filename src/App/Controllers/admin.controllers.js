const Reservation = require("../Models/reservation.models");
const Role = require("../Models/role.models");

module.exports = {
  async user_reserve_ticket(req, res) {
    try {
      const { user_id } = req.params;
      const get_my_reservations = await Reservation.find({ user_id }).populate(
        "event_id"
      );
      return res.status(200).json({
        status_code: 200,
        status: "Successful",
        message: "Successfully fetched user reservations",
        results: get_my_reservations,
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
  async view_all_roles(req, res) {
    try {
      const get_all_roles = await Role.find();
      return res.status(200).json({
        status_code: 200,
        status: "Successful",
        message: "Successfully fetched all user roles",
        results: get_all_roles,
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
};
