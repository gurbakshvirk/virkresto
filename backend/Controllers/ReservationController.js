const Reservation = require("../Models/Reservation");
const Table = require("../Models/TableModal");


//  Get Available Tables
exports.getAvailableTables = async (req, res) => {
  try {
    const { date, guests } = req.query;

    // block tables that are still ACTIVE
    const activeReservations = await Reservation.find({
      date,
      status: { $in: ["reserved", "occupied"] }
    }).select("tableId");

    const blockedIds = activeReservations.map(r => r.tableId);

    // Get tables that are NOT blocked
    const tables = await Table.find({
      _id: { $nin: blockedIds },
      seats: { $gte: guests },
      status: "active"
    });

    res.json(tables);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching availability" });
  }
};



//  Create Reservation
exports.createReservation = async (req, res) => {
  try {

    // Extra safety → prevent double booking race condition
    const exists = await Reservation.findOne({
      tableId: req.body.tableId,
      date: req.body.date,
      status: { $in: ["reserved", "occupied"] }
    });

    if (exists) {
      return res.status(400).json({ message: "Table already booked" });
    }

    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating reservation" });
  }
};



// Update Reservation (Admin)
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(reservation);

  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};



exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("tableId")
      .sort({ date: 1, time: 1 });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservations" });
  }
};
