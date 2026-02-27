const Order = require("../Models/Order");

/*
========================================
CREATE ORDER
POST /api/orders
Protected Route
========================================
*/
const createOrder = async (req, res) => {
  try {
    const { customer, orderType, deliveryAddress, items, totalAmount } = req.body;

    // 1️⃣ Basic validation
    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: "Customer details required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!orderType) {
      return res.status(400).json({ message: "Order type required" });
    }

    // 2️⃣ Conditional validation for delivery
    if (orderType === "delivery" && !deliveryAddress) {
      return res.status(400).json({
        message: "Delivery address required for delivery orders"
      });
    }

    // 3️⃣ Create order
    const newOrder = new Order({
      user: req.user._id,   // 🔥 From JWT middleware (SECURE)
      customer,
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
      items,
      totalAmount,
      status: "pending"
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder._id
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


/*
========================================
GET MY ORDERS
GET /api/orders/my
Protected Route
========================================
*/
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Get My Orders Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


/*
========================================
GET ALL ORDERS (Admin Only)
GET /api/orders
Protected Route
========================================
*/
const getAllOrders = async (req, res) => {
  try {

    // Optional: restrict to admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders
};