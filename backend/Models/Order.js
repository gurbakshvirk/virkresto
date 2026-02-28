const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  customer: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    }
  },

  orderType: {
    type: String,
    enum: ["pickup", "delivery"],
    required: true
  },

  // Only required if delivery
  deliveryAddress: {
    type: String
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: String,        // snapshot of product name
      price: Number,       // snapshot price (important)
      quantity: Number,
      image: String        // optional snapshot
    }
  ],

  subtotal: {
  type: Number,
  required: true
},

discountAmount: {
  type: Number,
  default: 0
},

totalAmount: {
  type: Number,
  required: true
},

  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "completed"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
