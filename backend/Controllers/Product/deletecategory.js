const product = require("../../Models/product");
const cloudinary = require("cloudinary");

const deleteproduct = async (req, res) => {
  try {
    // Find the product by ID
    const Product = await product.findById(req.params.id);

    if (!Product) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    // Delete images from Cloudinary
    for (let i = 1; i <= 4; i++) {
      const imageFieldName = `product_image${i}`;

      if (Product[imageFieldName] && Product[imageFieldName].public_id) {
        try {
          await cloudinary.v2.uploader.destroy(Product[imageFieldName].public_id);
        } catch (error) {
          console.error(`Failed to delete image ${imageFieldName} from Cloudinary:`, error);
        }
      }
    }

    // Delete the product from the database
    await product.findByIdAndDelete(req.params.id);

    res.send({
      status: "successfully delete",
      data: Product,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send({ error: "An error occurred while deleting the product" });
  }
};

module.exports = deleteproduct;
