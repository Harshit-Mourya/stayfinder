import cloudinary from "../config/cloudinary.js";

// POST /api/images
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    res.status(200).json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error("Upload Controller Error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// DELETE /api/images
export const deleteImage = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ message: "Missing public_id" });
  }

  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ message: "Image deleted from Cloudinary" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete image", error: err.message });
  }
};
