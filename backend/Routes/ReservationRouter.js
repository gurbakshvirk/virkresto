const express = require("express");
const router = express.Router();

const {
  getAvailableTables,
  createReservation
} = require("../Controllers/ReservationController");


// check available tables
router.get("/available", getAvailableTables);

// book table
router.post("/", createReservation);

module.exports = router;
