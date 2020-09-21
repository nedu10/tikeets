const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const eventSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuid.v1();
      },
    },
    name: { type: String, trim: true },
    event_date: {
      type: Date,
    },
    details: {
      type: String,
    },
    location: {
      type: String,
    },
    reservation_limit: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Event", eventSchema);
