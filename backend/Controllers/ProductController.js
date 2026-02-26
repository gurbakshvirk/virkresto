const Product = require("../Models/ProductModal");
const Category = require("../Models/CategoryModal");


//  Create Product
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, price, description, shortdescription, category, isAvailable, isVisible, isPopular    } = req.body;
      
//     // Check category exists
//     const categoryExists = await Category.findById(category);
//     if (!categoryExists) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     //  Get uploaded images from multer
//     // const images = req.files.map(file => file.path);

//     const images = req.files.map(file => ({
//   url: file.path,
//   public_id: file.filename,
// }));


//     // const images = req.files.map(file => `/uploads/products/${file.filename}`);

//     const product = new Product({
//       name,
//       price,
//       description,
//       shortdescription,
//       category,
//       images,
//       isAvailable,

//       isVisible,
//       isPopular,
//     });

//     await product.save();

//     res.status(201).json(product);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      shortdescription,
      category,
      isAvailable,
      isVisible,
      isPopular,
      images,
    } = req.body;

    // Check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = new Product({
      name,
      price,
      description,
      shortdescription,
      category,
      images, // direct from frontend
      isAvailable,
      isVisible,
      isPopular,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






//  Get All Products (with filtering)
exports.getProducts = async (req, res) => {
  try {
    const { category, foodType } = req.query;

    let filter = {};

    // Filter by category
    if (category) filter.category = category;

    let products = await Product.find(filter)
      .populate("category", "name foodType");

    // Filter by veg/nonveg through category
    if (foodType) {
      products = products.filter(
        (p) => p.category.foodType === foodType
      );
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name foodType");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  Update Product
// exports.updateProduct = async (req, res) => {
//   try {
//     const { name, price, description, shortdescription, category,  isAvailable, isVisible, isPopular } = req.body;

//     const updateData = {
//       name,
//       price,
//       description,
//       shortdescription,
//       category,
//       isAvailable,
//       isVisible,
//     isPopular,
//     };

//     //  If new images uploaded, update them
//     if (req.files && req.files.length > 0) {
//       // updateData.images = req.files.map(file => `/uploads/products/${file.filename}`);
//       updateData.images = req.files.map(file => file.path);

//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      shortdescription,
      category,
      isAvailable,
      isVisible,
      isPopular,
      images,
    } = req.body;

    const updateData = {
      name,
      price,
      description,
      shortdescription,
      category,
      isAvailable,
      isVisible,
      isPopular,
      images, // directly update images array
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// const cloudinary = require("cloudinary").v2;
// const Product = require("../models/Product");

// Delete Product + Cloudinary Images
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     //  Delete all images from Cloudinary
//     if (product.images && product.images.length > 0) {
//       for (const img of product.images) {
//         if (img.public_id) {
//           await cloudinary.uploader.destroy(img.public_id);
//         }
//       }
//     }

//     //  Delete product from MongoDB
//     await Product.findByIdAndDelete(req.params.id);

//     res.json({ message: "Product and images deleted successfully" });

//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };.

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
