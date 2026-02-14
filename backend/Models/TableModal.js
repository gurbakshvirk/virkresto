const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableSchema = new Schema(
  {
    tableNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      required: true,
      enum: ["2-seater", "4-seater", "6-seater", "family", "custom"],
    },

    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "maintenance"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", TableSchema);
