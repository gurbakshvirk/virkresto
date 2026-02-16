const express = require("express");
const router = express.Router();

const {
  getAvailableTables,
  createReservation,
  updateReservationStatus,
  getReservations
} = require("../Controllers/ReservationController");


// check available tables
router.get("/available", getAvailableTables);


// Update route Admin
router.put("/:id/status",updateReservationStatus);



router.get("/", getReservations);


// book table
router.post("/", createReservation);

module.exports = router;
