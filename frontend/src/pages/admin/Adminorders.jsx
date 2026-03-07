import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {

  const API = import.meta.env.VITE_API_URL;

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
    const res = await axios.get(`${API}/api/orders`, {
  withCredentials: true
});
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const updateStatus = async (id, status) => {
  try {
   await axios.patch(`${API}/api/orders/${id}/status`,
  { status },
  { withCredentials: true }
);

    fetchOrders(); // refresh list
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p><b>Order ID:</b> {order._id}</p>
<p><b>Name:</b> {order.customer?.name}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b><select
  value={order.status}
  onChange={(e) => updateStatus(order._id, e.target.value)}
  className="border p-1"
>
  <option value="pending">Pending</option>
  <option value="preparing">Preparing</option>
  <option value="ready">Ready</option>
  <option value="completed">Completed</option>
</select></b> {order.status}</p>

<p className="mt-2 font-semibold">Items:</p>

{order.items.map((item) => (
  <p key={item._id}>
    {item.name} x {item.quantity}
  </p>
))}
        </div>
      ))}

    </div>
  );
};

export default AdminOrders;