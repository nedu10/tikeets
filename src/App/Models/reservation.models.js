const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const reservationSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuid.v1();
      },
    },
    user_id: { type: String, ref: "User" },
    event_id: { type: String, ref: "Event" },
    is_cancelled: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Reservation", reservationSchema);
