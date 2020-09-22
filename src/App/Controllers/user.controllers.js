const Reservation = require("../Models/reservation.models");

module.exports = {
  async user_reserve_ticket(req, res) {
    try {
      const user_id = req.current_user.id;
      const get_my_reservations = await Reservation.find({ user_id }).populate(
        "event_id"
      );
      return res.status(200).json({
        status_code: 200,
        status: "Successful",
        message: "Successfully fetched all my reservations",
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
};
