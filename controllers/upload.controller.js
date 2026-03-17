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

    const name = req.body.name || "default";

    const safeName = name.replace(/\s+/g, "_").toLowerCase();

    const folder = `${safeName}`;

    console.log("Folder:", folder);

    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, { folder })
    );

    const results = await Promise.all(uploadPromises);

    req.files.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    const urls = results.map(r => r.secure_url);

    res.status(200).json({
      message: "Multiple upload successful",
      urls,
      folder
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};