const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  // Veg or Non-Veg tagging
  foodType: {
    type: String,
    enum: ["veg", "nonveg"],
    required: true
  },

//   image: {
//     type: String
//   },
image: {
    type: String,
    required: true
  },
  slug: {
  type: String,
  unique: true
},

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  });

module.exports = mongoose.model("Category", categorySchema);
