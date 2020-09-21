const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const roleSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuid.v1();
      },
    },
    label: { type: String, trim: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Role", roleSchema);
