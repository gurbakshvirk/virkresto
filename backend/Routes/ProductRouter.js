// const express = require("express");
// const router = express.Router();

// const upload = require("../Middleware/productUpload");
// const productController = require("../Controllers/ProductController");


// // ✅ Create Product (WITH MULTIPLE IMAGE UPLOAD)
// router.post(
//   "/",
//   upload.array("images", 5), // accept up to 5 images
//   (req, res, next) => {
//     if (req.files && req.files.length > 0) {
//       // convert files into paths to store in DB
//       req.body.images = req.files.map(
//         (file) => `/uploads/products/${file.filename}`
//       );
//     }
//     next();
//   },
//   productController.createProduct
// );

// // Update Product (allow new images optionally)
// // router.put("/:id", upload.array("images", 5), productController.updateProduct);


// // Get All Products
// router.get("/", productController.getProducts);

// // Get Single Product
// router.get("/:id", productController.getProductById);

// // Update Product
// // router.put("/:id", productController.updateProduct);
// router.put("/:id", 
//   upload.array("images", 5),
//  productController.updateProduct);

// // Delete Product
// router.delete("/:id", productController.deleteProduct);

// module.exports = router;

const express = require("express");
const router = express.Router();

const productController = require("../Controllers/ProductController");

// Create Product (NO multer)
router.post("/", productController.createProduct);

// Get All Products
router.get("/", productController.getProducts);

// Get Single Product
router.get("/:id", productController.getProductById);

// Update Product (NO multer)
router.put("/:id", productController.updateProduct);

// Delete Product
router.delete("/:id", productController.deleteProduct);

module.exports = router;