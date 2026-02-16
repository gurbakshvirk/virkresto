import React, { useEffect, useState } from "react";
import axios from "axios";

const Admincoupons = () => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    endDate: ""
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  // Load Products + Offers
  useEffect(() => {
    fetchProducts();
    fetchOffers();
  }, []);


  //api link
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API}/api/products`);
    setProducts(data);
  };

  const fetchOffers = async () => {
    const { data } = await axios.get(`${API}/api/offers`);
    setOffers(data);
  };

  // 🔹 Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Select / Unselect Products
  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  // 🔹 Create Offer
  const handleCreateOffer = async () => {
    if (!selectedProducts.length) {
      alert("Select at least one product");
      return;
    }

    await axios.post(`${API}/api/offers`, {
      ...form,
      discountValue: Number(form.discountValue),
      products: selectedProducts
    });

    alert("Offer Created ✅");

    setForm({
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      startDate: "",
      endDate: ""
    });
    setSelectedProducts([]);

    fetchOffers();
  };

  // 🔹 Delete Offer
  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/offers/${id}`);
    fetchOffers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Offers</h1>

      {/* ================= CREATE OFFER ================= */}
      <div className="border p-4 rounded mb-8">
        <h2 className="font-semibold mb-4">Create New Offer</h2>

        <input
          type="text"
          name="title"
          placeholder="Offer Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        >
          <option value="percentage">Percentage Discount</option>
          <option value="flat">Flat Discount</option>
        </select>

        <input
          type="number"
          name="discountValue"
          placeholder="Discount Value"
          value={form.discountValue}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <div className="flex gap-4 mb-3">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* ================= PRODUCT SELECT ================= */}
        <h3 className="font-semibold mb-2">Select Products</h3>
        <div className="max-h-40 overflow-y-auto border p-3 mb-4">
          {products.map((p) => (
            <label key={p._id} className="block">
              <input
                type="checkbox"
                checked={selectedProducts.includes(p._id)}
                onChange={() => toggleProduct(p._id)}
                className="mr-2"
              />
              {p.name} – ₹{p.price}
            </label>
          ))}
        </div>

        <button
          onClick={handleCreateOffer}
          className="bg-black text-white px-6 py-2"
        >
          Create Offer
        </button>
      </div>

      {/* ================= EXISTING OFFERS ================= */}
      <div>
        <h2 className="font-semibold mb-4">Existing Offers</h2>

        {offers.map((offer) => (
          <div key={offer._id} className="border p-4 mb-3">
            <h3 className="font-bold">{offer.title}</h3>
            <p>{offer.description}</p>

            <p className="mt-2">
              Discount:{" "}
              {offer.discountType === "percentage"
                ? `${offer.discountValue}%`
                : `₹${offer.discountValue}`}
            </p>

            <p>
              Valid: {offer.startDate?.slice(0, 10)} →{" "}
              {offer.endDate?.slice(0, 10)}
            </p>

            <button
              onClick={() => handleDelete(offer._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admincoupons;
