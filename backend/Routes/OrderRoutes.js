const router = require("express").Router();
const ensureAuthenticated = require("../Middleware/Auth");

const {
  createOrder,
  getMyOrders,
  getAllOrders
} = require("../Controllers/OrderController");

router.post("/", ensureAuthenticated, createOrder);
router.get("/my", ensureAuthenticated, getMyOrders);
router.get("/", ensureAuthenticated, getAllOrders);

module.exports = router;