const brand = require("../../Models/brand");
const cloudinary = require("cloudinary");

const deletebrand = async (req, res) => {
  try {
    // Find the brand by ID
    const branddata = await brand.findById(req.params.id);

    if (!branddata) {
      return res.status(404).json({ status: "failed", message: "Brand not found" });
    }

    // Delete brand image from Cloudinary
    if (branddata.brand_image && branddata.brand_image.public_id) {
      try {
        await cloudinary.v2.uploader.destroy(branddata.brand_image.public_id);
      } catch (error) {
        console.error("Failed to delete brand image from Cloudinary:", error);
      }
    }

    // Delete the brand from the database
    await brand.findByIdAndDelete(req.params.id);

    res.send({
      status: "successfully delete",
      data: branddata,
    });
  } catch (err) {
    console.error("Error deleting brand:", err);
    res.status(500).send({ error: "An error occurred while deleting brand" });
  }
};

module.exports = deletebrand;
