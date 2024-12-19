const banner = require("../../Models/banner");
const cloudinary = require('cloudinary');
const fs = require("fs");

const deletebanner = async (req, res) => {
  try {
    // Find the banner by ID
    const bannerdel = await banner.findById(req.params.id);

    if (!bannerdel) {
      return res.status(404).json({ status: "failed", message: "Banner not found" });
    }

    // Delete the banner image from Cloudinary
    if (bannerdel.banner && bannerdel.banner.public_id) {
      try {
        await cloudinary.v2.uploader.destroy(bannerdel.banner.public_id);
      } catch (error) {
        console.error("Failed to delete banner image from Cloudinary:", error);
      }
    }

    // Delete the banner from the database
    await banner.findByIdAndDelete(req.params.id);

    res.send({
      status: "successfully delete",
      data: bannerdel,
    });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).send({ error: "An error occurred while deleting banner" });
  }
};

module.exports = deletebanner;
