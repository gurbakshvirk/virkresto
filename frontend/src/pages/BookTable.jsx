import React, { useEffect, useState } from "react";
import { getAllTables } from "../services/tableservice";
import { getAvailableTables, createReservation } from "../services/reservationservice";

const BookTable = () => {
  const [allTables, setAllTables] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [search, setSearch] = useState({ date: "", time: "", guests: 2 });

  const [bookingDone, setBookingDone] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    const data = await getAllTables();
    setAllTables(data);
  };

  const handleCheck = async (e) => {
    e.preventDefault();

    const available = await getAvailableTables(
      search.date,
      search.time,
      Number(search.guests)
    );

    setAvailableIds(available.map((t) => t._id));
  };

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

  if (bookingDone) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="bg-white/40 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-10 text-center max-w-lg">

          <h2 className="text-4xl font-bold mb-6 text-green-600">
            Table Reserved 🎉
          </h2>

          <div className="space-y-2 text-lg">
            <p>Table: {bookingInfo.tableNumber}</p>
            <p>Date: {bookingInfo.date}</p>
            <p>Time: {bookingInfo.time}</p>
            <p>Guests: {bookingInfo.guests}</p>
          </div>

          <p className="mt-6 text-gray-500">
            Please arrive 10 minutes before your reservation.
          </p>

        </div>
      </div>
    );
  }

  const hasSearched = availableIds.length > 0;

  return (
    // <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-br from-gray-200 via-white to-gray-300">
<div className="min-h-screen pt-32 pb-24 px-4
bg-gradient-to-br
from-black/25
via-gray-100
to-slate-300
relative overflow-hidden">

  <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/40 rounded-full blur-3xl"></div>
<div className="absolute top-40 -right-40 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>


      <div className="max-w-6xl mx-auto">

        {/* <h1 className="text-4xl font-bold text-center mb-10">
          Reserve Your Table
        </h1> */}
        <h1 className="text-5xl font-bold text-center mb-14 tracking-tight">
  Reserve Your Table
</h1>

        {/* SEARCH PANEL */}

        {/* <form
          onSubmit={handleCheck}
          className="bg-white/40 backdrop-blur-lg border border-white/30
          shadow-lg rounded-2xl p-6 flex flex-wrap gap-4 justify-center mb-12"
        > */}
        <form
  onSubmit={handleCheck}
  className="backdrop-blur-xl bg-white/30
  border border-white/40
  shadow-xl shadow-black/10
  rounded-3xl
  p-6
  flex flex-wrap gap-4 justify-center
  mb-14"
>

          <input
            type="date"
            required
            // className="border rounded-lg px-4 py-3"
            className="bg-white/50 backdrop-blur-md
border border-white/40
rounded-xl
px-4 py-3
shadow-inner
focus:outline-none
focus:ring-2 focus:ring-black/30"
            onChange={(e) =>
              setSearch({ ...search, date: e.target.value })
            }
          />

          <input
            type="time"
            required
            // className="border rounded-lg px-4 py-3"
            className="bg-white/50 backdrop-blur-md
border border-white/40
rounded-xl
px-4 py-3
shadow-inner
focus:outline-none
focus:ring-2 focus:ring-black/30"
            onChange={(e) =>
              setSearch({ ...search, time: e.target.value })
            }
          />

          <input
            type="number"
            min="1"
            value={search.guests}
            // className="border rounded-lg px-4 py-3 w-24"
            className="bg-white/50 backdrop-blur-md
border border-white/40
rounded-xl
px-4 py-3
shadow-inner
focus:outline-none
focus:ring-2 focus:ring-black/30"
            onChange={(e) =>
              setSearch({ ...search, guests: e.target.value })
            }
          />

          <button
            className="bg-black text-white px-8 py-3 rounded-lg
            hover:bg-gray-800 transition"
          >
            Check Availability
          </button>

        </form>

        {/* TABLE GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {allTables.map((table) => {
            const isAvailable = availableIds.includes(table._id);
            const isMaintenance = table.status !== "active";

            return (
              <div
                key={table._id}
                className={`p-7 rounded-3xl text-center
backdrop-blur-xl
border border-white/40
shadow-xl shadow-black/10
transition-all duration-300
hover:scale-105 hover:shadow-2xl
${isAvailable && "bg-green-200/40"}
${!isAvailable && hasSearched && !isMaintenance && "bg-red-200/40"}
${isMaintenance && "bg-gray-300/60"}
`}
              >

                <h3 className="text-xl font-bold mb-2">
                  Table {table.tableNumber}
                </h3>

                <p className="text-gray-700">{table.seats} Seats</p>

                <p className="text-sm text-gray-500 mb-2">
                  {table.type}
                </p>

                {isMaintenance && (
                  <p className="text-xs text-gray-600">
                    Under Maintenance
                  </p>
                )}

                {hasSearched && isAvailable && (
                  // <button
                  //   onClick={() => handleBook(table)}
                  //   className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  // >
                  <button
className="bg-black text-white
px-8 py-3 rounded-xl
shadow-lg
hover:scale-105
hover:bg-gray-900
transition"
>
                    Book Now
                  </button>
                )}

                {!isAvailable && hasSearched && !isMaintenance && (
                  <p className="text-red-600 text-sm mt-3">
                    Already Booked
                  </p>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default BookTable;