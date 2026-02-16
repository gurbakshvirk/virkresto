import React, { useEffect, useState } from "react";
import { getAllTables } from "../services/tableservice";
import { getAvailableTables, createReservation } from "../services/reservationservice";

const BookTable = () => {
  const [allTables, setAllTables] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [search, setSearch] = useState({ date: "", time: "", guests: 2 });

  const [bookingDone, setBookingDone] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  // Load all restaurant tables once
  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    const data = await getAllTables();
    setAllTables(data);
  };

  // Check availability from backend
  const handleCheck = async (e) => {
    e.preventDefault();

    const available = await getAvailableTables(
      search.date,
      search.time,
      Number(search.guests)
    );

    setAvailableIds(available.map((t) => t._id));
  };

  // Book selected table
  const handleBook = async (table) => {
    await createReservation({
      tableId: table._id,
      date: search.date,
      time: search.time,
      guests: Number(search.guests),
    });

    setBookingDone(true);
    setBookingInfo({
      tableNumber: table.tableNumber,
      date: search.date,
      time: search.time,
      guests: search.guests,
    });

    setAvailableIds([]);
  };

  // Confirmation Screen
  if (bookingDone) {
    return (
      <div className="text-center py-24">
        <h2 className="text-4xl font-bold mb-6">
          ✅ Table Reserved Successfully
        </h2>

        <p className="text-lg">Table: {bookingInfo.tableNumber}</p>
        <p className="text-lg">Date: {bookingInfo.date}</p>
        <p className="text-lg">Time: {bookingInfo.time}</p>
        <p className="text-lg">Guests: {bookingInfo.guests}</p>

        <p className="mt-6 text-gray-500">
          Please arrive 10 minutes before your time.
        </p>
      </div>
    );
  }

  const hasSearched = availableIds.length > 0;

  return (
    <div className="mt-24 max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Reserve Your Table
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleCheck}
        className="flex flex-wrap gap-4 justify-center mb-12"
      >
        <input
          type="date"
          required
          className="border p-3"
          onChange={(e) => setSearch({ ...search, date: e.target.value })}
        />

        <input
          type="time"
          required
          className="border p-3"
          onChange={(e) => setSearch({ ...search, time: e.target.value })}
        />

        <input
          type="number"
          min="1"
          value={search.guests}
          className="border p-3 w-24"
          onChange={(e) => setSearch({ ...search, guests: e.target.value })}
        />

        <button className="bg-black text-white px-8 py-3">
          Check Availability
        </button>
      </form>

      {/* Tables Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {allTables.map((table) => {
          const isAvailable = availableIds.includes(table._id);
          const isMaintenance = table.status !== "active";

          return (
            <div
              key={table._id}
              className={`border p-6 rounded text-center transition
                ${isMaintenance && "bg-gray-200"}
                ${isAvailable && "bg-green-100 border-green-600"}
                ${
                  !isAvailable &&
                  hasSearched &&
                  !isMaintenance &&
                  "bg-red-100"
                }
              `}
            >
              <h3 className="font-bold text-xl">
                Table {table.tableNumber}
              </h3>

              <p>{table.seats} Seats</p>
              <p className="text-sm text-gray-500">{table.type}</p>

              {isMaintenance && (
                <p className="text-xs text-gray-500 mt-2">Maintenance</p>
              )}

              {hasSearched && isAvailable && (
                <button
                  onClick={() => handleBook(table)}
                  className="mt-4 bg-green-600 text-white px-4 py-2"
                >
                  Book Now
                </button>
              )}

              {!isAvailable && hasSearched && !isMaintenance && (
                <p className="text-sm text-red-600 mt-3">Already Booked</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookTable;
