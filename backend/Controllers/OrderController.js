const Order = require("../Models/Order");

/*
========================================
CREATE ORDER
POST /api/orders
Protected Route
========================================
*/
const Product = require("../Models/ProductModal");
const Offer = require("../Models/OfferModal");

const createOrder = async (req, res) => {
  try {
    const { customer, orderType, deliveryAddress, items } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: "Customer details required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!orderType) {
      return res.status(400).json({ message: "Order type required" });
    }

    if (orderType === "delivery" && !deliveryAddress) {
      return res.status(400).json({
        message: "Delivery address required for delivery orders"
      });
    }

    let subtotal = 0;
    let discountAmount = 0;

    const now = new Date();

    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) continue;

      let itemPrice = product.price;
      let itemTotal = itemPrice * item.quantity;

      subtotal += itemTotal;

      // 🔥 Check active offer for this product
      const offer = await Offer.findOne({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
        products: product._id
      });

      let itemDiscount = 0;

      if (offer) {
        if (offer.discountType === "percentage") {
          itemDiscount = (itemTotal * offer.discountValue) / 100;
        }

        if (offer.discountType === "flat") {
          itemDiscount = offer.discountValue * item.quantity;
        }
      }

      discountAmount += itemDiscount;

      processedItems.push({
        productId: product._id,
        name: product.name,
        price: itemPrice,
        quantity: item.quantity,
        image: product.image
      });
    }

    const totalAmount = Math.max(subtotal - discountAmount, 0);

    const newOrder = new Order({
      user: req.user._id,
      customer,
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
      items: processedItems,
      subtotal,
      discountAmount,
      totalAmount,
      status: "pending"
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder._id,
      subtotal,
      discountAmount,
      totalAmount
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};










/*
========================================
PREVIEW ORDER (Calculate totals only)
POST /api/orders/preview
Protected Route
========================================
*/
const previewOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotal = 0;
    let discountAmount = 0;
    const now = new Date();

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      const offer = await Offer.findOne({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
        products: product._id
      });

      if (offer) {
        if (offer.discountType === "percentage") {
          discountAmount += (itemTotal * offer.discountValue) / 100;
        }

        if (offer.discountType === "flat") {
          discountAmount += offer.discountValue * item.quantity;
        }
      }
    }

    const totalAmount = Math.max(subtotal - discountAmount, 0);

    res.json({
      subtotal,
      discountAmount,
      totalAmount
    });

  } catch (error) {
    console.error("Preview Order Error:", error);
    res.status(500).json({ message: "Server Error" });
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
  previewOrder,
  getMyOrders,
  getAllOrders
};