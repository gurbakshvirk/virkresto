const router = require("express").Router();
const ensureAuthenticated = require("../Middleware/Auth");
// const ensureAuthenticated = require("../Middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  previewOrder
} = require("../Controllers/OrderController");

router.post("/", ensureAuthenticated, createOrder);
router.get("/my", ensureAuthenticated, getMyOrders);
router.get("/", ensureAuthenticated, getAllOrders);
router.post("/preview",ensureAuthenticated, previewOrder);

module.exports = router;