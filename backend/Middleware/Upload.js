const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store files in Cloudinary (NOT locally)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "virkresto/categories", // separate folder from products
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 600, height: 600, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
