import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {

  const API = import.meta.env.VITE_API_URL;

  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchReservations();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders/my`, {
        withCredentials: true
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API}/api/reservations/my`, {
        withCredentials: true
      });
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations", err);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {

      const res = await axios.get(
        `${API}/api/orders/${orderId}/invoice`,
        {
          responseType: "blob",
          withCredentials: true
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);

      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error("Failed to download invoice");
    }
  };

 return (
//   <div className="max-w-6xl mx-auto px-6 py-16 mt-20">
<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 md:px-24 ">

    {/* PAGE TITLE */}
    <h1 className="text-4xl font-bold mb-12 text-gray-800 pt-30">
      My Orders
    </h1>

    {/* FOOD ORDERS */}
    <div className="mb-20">

      <h2 className="text-2xl font-semibold mb-8 text-gray-700">
        Food Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="space-y-8">

        {orders.map((order) => (

        <div
  key={order._id}
  className="backdrop-blur-lg bg-white/40 border border-white/30 
  rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300"
>

  {/* ORDER HEADER */}
  <div className="flex justify-between items-center mb-5">

    <p className="text-sm text-gray-600">
      Order ID: <span className="font-medium">{order._id}</span>
    </p>

    <span className="px-3 py-1 text-xs rounded-full bg-yellow-400/20 text-yellow-700 backdrop-blur">
      {order.status}
    </span>

  </div>


  {/* ITEMS */}
  <div className="space-y-4">

    {order.items.map((item, index) => (

      <div
        key={index}
        className="flex items-center justify-between gap-4"
      >

        {/* FOOD PREVIEW */}
        <div className="flex items-center gap-4">

          {/* <img
            src={item.url}
            alt={item.name}
            className="w-14 h-14 rounded-lg object-cover"
          /> */}
          <img
  src={item.images?.[0]?.url}
  alt={item.name}
  className="w-16 h-16 rounded-xl object-cover hover:scale-105 transition"
/>

          <div>

            <p className="font-medium text-gray-800">
              {item.name}
            </p>

            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>

          </div>

        </div>


        {/* PRICE */}
        <p className="font-semibold text-gray-800">
          ₹{item.price * item.quantity}
        </p>

      </div>

    ))}

  </div>


  {/* TOTAL */}
  <div className="mt-6 border-t border-white/40 pt-4 space-y-1 text-sm">

    <div className="flex justify-between text-gray-600">
      <p>Subtotal</p>
      <p>₹{order.subtotal}</p>
    </div>

    <div className="flex justify-between text-gray-600">
      <p>Discount</p>
      <p>₹{order.discountAmount}</p>
    </div>

    <div className="flex justify-between font-semibold text-gray-900 text-base mt-1">
      <p>Total</p>
      <p>₹{order.totalAmount}</p>
    </div>

  </div>


  {/* BUTTON */}
  <button
    onClick={() => downloadInvoice(order._id)}
    className="mt-5 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition"
  >
    Download Invoice
  </button>

</div>

        ))}

      </div>

    </div>


    {/* RESERVATIONS */}
    <div>

      <h2 className="text-2xl font-semibold mb-8 text-gray-700">
        Table Reservations
      </h2>

      {reservations.length === 0 && (
        <p className="text-gray-500">No reservations yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">

        {reservations.map((reservation) => (

          <div
            key={reservation._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            <p className="font-semibold text-gray-800 mb-2">
              {reservation.tableId?.name || "Table"}
            </p>

            <div className="text-gray-600 text-sm space-y-1">

              <p>Guests: {reservation.guests}</p>
              <p>Date: {reservation.date}</p>
              <p>Time: {reservation.time}</p>

              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 capitalize">
                {reservation.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
);
};

export default MyOrders;