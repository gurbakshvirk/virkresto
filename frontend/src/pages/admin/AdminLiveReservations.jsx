import { useEffect, useState } from "react";
import {
  getReservations,
  updateReservationStatus
} from "../../services/reservationservice";

const AdminLiveReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getReservations();
    setReservations(data);
  };

  const updateStatus = async (id, status) => {
    await updateReservationStatus(id, status);
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Live Reservations</h2>

      <div className="grid gap-4">
        {reservations.map((r) => (
          <div key={r._id} className="border p-4 flex justify-between">
            <div>
              <strong>Table {r.tableId?.tableNumber}</strong>
              <p>{r.date} at {r.time}</p>
              <p>{r.guests} Guests</p>

              <span className="text-sm px-2 py-1 bg-gray-100">
                {r.status}
              </span>
            </div>

            <div className="flex gap-2">
              {r.status === "reserved" && (
                <button
                  onClick={() => updateStatus(r._id, "occupied")}
                  className="bg-blue-600 text-white px-3"
                >
                  Arrived
                </button>
              )}

              {r.status === "occupied" && (
                <button
                  onClick={() => updateStatus(r._id, "completed")}
                  className="bg-green-600 text-white px-3"
                >
                  Finished
                </button>
              )}

              <button
                onClick={() => updateStatus(r._id, "cancelled")}
                className="bg-red-600 text-white px-3"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLiveReservations;
