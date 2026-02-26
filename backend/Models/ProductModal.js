const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String
  },
  shortdescription: {
    type: String
  },

//    images: [
//   {
//     url: String,
//     public_id: String,
//   }
// ],
images: [
  {
    url: {
      type: String,
      required: true
    }
  }
],

  // Reference to Category
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  isAvailable: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true, // product shows by default
  },
  isPopular: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
