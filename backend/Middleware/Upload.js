const multer = require("multer");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads"); 
// go OUT of Routes folder → backend/uploads
console.log("Multer saving to:", UPLOAD_DIR);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

module.exports = multer({ storage });
