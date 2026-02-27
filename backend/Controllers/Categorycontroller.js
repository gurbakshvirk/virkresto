// const Category = require("../Models/CategoryModal");
// const Product = require("../Models/ProductModal");
const cloudinary = require("cloudinary").v2;

// Create Category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, foodType } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Category image is required" });
//     }

//     const category = new Category({
//       name,
//       foodType,
//       image: req.file.path, 
//     });

//     await category.save();

//     res.status(201).json(category);
//   }
  
  
  
//   catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

const Category = require("../Models/CategoryModal");
const Product = require("../Models/ProductModal");

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name, foodType, image } = req.body;

    if (!name || !foodType || !image) {
      return res.status(400).json({ message: "All fields required" });
    }

    const category = await Category.create({
      name,
      foodType,
      image,
    });

    res.status(201).json(category);

  } catch (error) {
     console.log("CREATE CATEGORY ERROR:", error); 
    res.status(500).json({ message: error.message });
  }
};


// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const { foodType } = req.query;

    const filter = {};
    if (foodType) filter.foodType = foodType;

    const categories = await Category.find(filter).sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get Single Category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update Category (with optional new image)
// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, foodType, isActive } = req.body;

//     const updateData = { name, foodType, isActive };

//     // If new image uploaded → update to Cloudinary URL
//     if (req.file) {
//       updateData.image = req.file.path; // ✅ Cloudinary URL
//     }

//     const category = await Category.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateCategory = async (req, res) => {
  try {
    const { name, foodType, image, isActive } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, foodType, image, isActive },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete Category (only if unused)
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const productsExist = await Product.findOne({ category: categoryId });

    if (productsExist) {
      return res.status(400).json({
        message: "Cannot delete category. Products exist in this category.",
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ Delete image from Cloudinary
    const publicId = category.image.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`virkresto/categories/${publicId}`);

    await Category.findByIdAndDelete(categoryId);

    res.json({ message: "Category deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

