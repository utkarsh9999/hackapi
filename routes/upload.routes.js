const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");
const {
  uploadSingleImage,
  uploadMultipleImages
} = require("../controllers/upload.controller");

// Single image
router.post("/single", upload.single("image"), uploadSingleImage);

// Multiple images
router.post("/multiple", upload.array("images", 10), uploadMultipleImages);

module.exports = router;