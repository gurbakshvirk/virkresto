const Product = require("../Models/ProductModal");
const Category = require("../Models/CategoryModal");


//  Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, shortdescription, category } = req.body;

    // Check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ Get uploaded images from multer
    const images = req.files.map(file => `/uploads/products/${file.filename}`);

    const product = new Product({
      name,
      price,
      description,
      shortdescription,
      category,
      images
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
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, shortdescription, category, isAvailable } = req.body;

    const updateData = {
      name,
      price,
      description,
      shortdescription,
      category,
      isAvailable
    };

    // ✅ If new images uploaded, update them
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/products/${file.filename}`);
    }

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




//  Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
