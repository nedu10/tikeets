const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const userSchema = new Schema(
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
