// const express = require("express");
// const router = express.Router();
// // const upload = require("../Middleware/Upload");
// const categoryController = require("../Controllers/Categorycontroller");


// // Create Category (with image upload)
// router.post("/", upload.single("image"), categoryController.createCategory);


// // Update Category (allow image change)
// router.put("/:id", upload.single("image"), categoryController.updateCategory);


// // Read Routes
// router.get("/", categoryController.getCategories);
// router.get("/:id", categoryController.getCategoryById);


// // Delete
// router.delete("/:id", categoryController.deleteCategory);


// module.exports = router;

const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/Categorycontroller");

// Create Category
router.post("/", categoryController.createCategory);

// Update Category
router.put("/:id", categoryController.updateCategory);

// Read
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Delete
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;