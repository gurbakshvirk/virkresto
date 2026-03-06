const PDFDocument = require("pdfkit");

const router = require("express").Router();
const ensureAuthenticated = require("../Middleware/Auth");

// const ensureAuthenticated = require("../Middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  previewOrder
} = require("../Controllers/OrderController");





router.get("/:id/invoice", ensureAuthenticated, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // Header
    doc.fontSize(22).text("Virkresto Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${order.createdAt.toDateString()}`);
    doc.text(`Customer: ${order.customer.name}`);
    doc.text(`Phone: ${order.customer.phone}`);
    doc.text(`Order Type: ${order.orderType}`);
    doc.moveDown();

    doc.text("Items:");
    doc.moveDown(0.5);

    order.items.forEach((item) => {
      doc.text(
        `${item.name} - ₹${item.price} x ${item.quantity} = ₹${
          item.price * item.quantity
        }`
      );
    });

    doc.moveDown();
    doc.text(`Subtotal: ₹${order.subtotal}`);
    doc.text(`Discount: ₹${order.discountAmount}`);
    doc.text(`Total Paid: ₹${order.totalAmount}`);

    doc.moveDown(2);
    doc.text("Thank you for ordering with Virkresto!", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating invoice" });
  }
});






router.post("/", ensureAuthenticated, createOrder);
router.get("/my", ensureAuthenticated, getMyOrders);
router.get("/", ensureAuthenticated, getAllOrders);
router.post("/preview",ensureAuthenticated, previewOrder);

module.exports = router;