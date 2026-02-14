import React from 'react'
import { useEffect, useState } from "react";
import { getAllTables, createTable, deleteTable, updateTable } from "../../services/tableservice";

const Adminreservations = () => {

  const [tables, setTables] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    tableNumber: "",
    seats: "",
    type: "2-seater",
    status: "active"
  });

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    const data = await getAllTables();
    setTables(data);
  };
  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const payload = {
      ...form,
      seats: Number(form.seats)
    };

    if (editingId) {
      await updateTable(editingId, payload);
    } else {
      await createTable(payload);
    }

    setForm({ tableNumber: "", seats: "", type: "2-seater", status: "active" });
    setEditingId(null);
    loadTables();
  };

  const handleDelete = async (id) => {
    await deleteTable(id);
    loadTables();
  };
  const handleEdit = (table) => {
    setForm({
      tableNumber: table.tableNumber,
      seats: table.seats,
      type: table.type,
      status: table.status
    });
    setEditingId(table._id);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Table Setup</h2>
      {/* Add Table Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input name="tableNumber" value={form.tableNumber} onChange={handleChange} placeholder="Table Number" className="border p-2" required />
        <input name="seats" value={form.seats} onChange={handleChange} placeholder="Seats" type="number" className="border p-2" required />
        <select name="type" value={form.type} onChange={handleChange} className="border p-2">
          <option>2-seater</option>
          <option>4-seater</option>
          <option>6-seater</option>
          <option>family</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="border p-2">
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button className="bg-black text-white px-4">
          {editingId ? "Update" : "Add"}
        </button>
      </form>
      {/* Table List */}
      <div className="grid gap-3">
        {tables.map((table) => (
          <div key={table._id} className="border p-3 flex justify-between">
            <div>
              <strong>{table.tableNumber}</strong> — {table.seats} Seats — {table.type}

              <span
                className={`ml-3 px-2 py-1 text-xs rounded ${table.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {table.status}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(table)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(table._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>

  )
}

export default Adminreservations
