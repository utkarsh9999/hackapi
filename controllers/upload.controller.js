const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "react_native_uploads"
    });

    fs.unlinkSync(req.file.path); // delete local file

    res.status(200).json({
      message: "Upload successful",
      url: result.secure_url
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: "react_native_uploads"
      })
    );

    const results = await Promise.all(uploadPromises);

    // delete all local files
    req.files.forEach(file => fs.unlinkSync(file.path));

    const urls = results.map(r => r.secure_url);

    res.status(200).json({
      message: "Multiple upload successful",
      urls
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};