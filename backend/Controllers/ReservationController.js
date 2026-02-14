const Reservation = require("../Models/Reservation");
const Table = require("../Models/Table");


//  Get Available Tables
exports.getAvailableTables = async (req, res) => {
  try {
    const { date, time, guests } = req.query;

    const booked = await Reservation.find({ date, time }).select("tableId");
    const bookedIds = booked.map(r => r.tableId);

    const tables = await Table.find({
      _id: { $nin: bookedIds },
      seats: { $gte: guests },
      status: "active"
    });

    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: "Error fetching availability" });
  }
};


//  Create Reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Error creating reservation" });
  }
};
