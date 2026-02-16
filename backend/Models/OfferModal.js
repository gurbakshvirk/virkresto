const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    startDate: Date,
    endDate: Date,

    isActive: {
      type: Boolean,
      default: true,
    },

    bannerImage: String, // optional for frontend display
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
