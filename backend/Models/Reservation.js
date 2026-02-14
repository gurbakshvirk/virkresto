const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  date: String,
  time: String,
  guests: Number,

  status: {
    type: String,
    default: "confirmed"
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
