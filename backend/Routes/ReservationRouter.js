const express = require("express");
const ensureAuthenticated = require("../Middleware/Auth");
const router = express.Router();

const {
  getAvailableTables,
  createReservation,
  updateReservationStatus,
  getReservations,
   getMyReservations
} = require("../Controllers/ReservationController");


// check available tables
router.get("/available", getAvailableTables);


// Update route Admin
router.put("/:id/status",updateReservationStatus);



router.get("/my", ensureAuthenticated, getMyReservations);

router.get("/", getReservations);


// book table
router.post("/", createReservation);

module.exports = router;
