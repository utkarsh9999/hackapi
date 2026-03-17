const cloudinary = require("../config/cloudinary");

exports.uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert buffer to data URI for Cloudinary
    const dataURI = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "react_native_uploads"
    });

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

    // Convert buffers to data URIs for Cloudinary
    const uploadPromises = req.files.map(file => {
      const dataURI = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      return cloudinary.uploader.upload(dataURI, { folder });
    });

    const results = await Promise.all(uploadPromises);

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