import React, { useEffect, useState } from "react";
import { getAllTables } from "../services/tableservice";
import { getAvailableTables, createReservation } from "../services/reservationservice";

const BookTable = () => {
  const [allTables, setAllTables] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [search, setSearch] = useState({ date: "", time: "", guests: 2 });

  // Load all tables ONCE (restaurant layout)
  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    const data = await getAllTables();
    setAllTables(data);
  };

  // Check availability
  const handleCheck = async (e) => {
    e.preventDefault();

    const available = await getAvailableTables(
      search.date,
      search.time,
      Number(search.guests)
    );

    // Save only available table IDs
    setAvailableIds(available.map(t => t._id));
  };

  // Book selected table
  const handleBook = async (table) => {
    await createReservation({
      tableId: table._id,
      date: search.date,
      time: search.time,
      guests: Number(search.guests)
    });

    alert(`Table ${table.tableNumber} booked!`);
    setAvailableIds([]);
  };

  return (
    <div className="mt-30 max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Select Your Table</h1>

      {/* Date Time Search */}
      <form onSubmit={handleCheck} className="flex gap-4 mb-10">
        <input
          type="date"
          required
          className="border p-2"
          onChange={(e) => setSearch({ ...search, date: e.target.value })}
        />

        <input
          type="time"
          required
          className="border p-2"
          onChange={(e) => setSearch({ ...search, time: e.target.value })}
        />

        <input
          type="number"
          min="1"
          className="border p-2 w-24"
          value={search.guests}
          onChange={(e) => setSearch({ ...search, guests: e.target.value })}
        />

        <button className="bg-black text-white px-6">
          Check Availability
        </button>
      </form>

      {/* Restaurant Tables Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {allTables.map((table) => {
          const isAvailable = availableIds.includes(table._id);
          const isMaintenance = table.status !== "active";

          return (
            <div
              key={table._id}
              className={`border p-6 rounded transition
                ${isMaintenance && "bg-gray-200"}
                ${isAvailable && "bg-green-100 border-green-600"}
                ${!isAvailable && availableIds.length > 0 && !isMaintenance && "bg-red-100"}
              `}
            >
              <h3 className="font-bold text-lg">Table {table.tableNumber}</h3>
              <p>{table.seats} Seats</p>
              <p className="text-sm text-gray-500">{table.type}</p>

              {isMaintenance && (
                <p className="text-xs text-gray-500 mt-2">Maintenance</p>
              )}

              {isAvailable && (
                <button
                  onClick={() => handleBook(table)}
                  className="mt-4 bg-green-600 text-white px-4 py-2"
                >
                  Book Now
                </button>
              )}

              {!isAvailable && availableIds.length > 0 && !isMaintenance && (
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
