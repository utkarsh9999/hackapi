const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
    );

    console.log("✅ Upload Success!");
    console.log("URL:", result.secure_url);

  } catch (error) {
    console.error("❌ Upload Failed:");
    console.error(error.message);
  }
}

testUpload();