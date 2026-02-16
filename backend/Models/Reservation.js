const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  // Reservation Status
  status: {
    type: String,
    enum: ["reserved", "occupied", "completed", "cancelled"],
    default: "reserved"
  }

}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
