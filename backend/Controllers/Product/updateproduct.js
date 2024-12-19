const product = require("../../Models/product");
const cloudinary = require("cloudinary");
const fs = require("fs");
const slugify = require("slugify");

const updateproduct = async (req, res) => {
  try {
    const {
      product_name,
      product_url,
      meta_title,
      meta_keywords,
      meta_description,
      featuredproduct,
      trendingproduct,
      newarrivedproduct,
      editor,
      parent_category,
      child_category,
      sort_description,
      weight_type,
      weight,
      stock,
      mrp_price,
      selling_price,
      status,
      color,
      brand,
      size,
    } = req.body;

    // Fetch the existing product from the database
    const existingProduct = await product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    const updatedData = {
      product_name,
      sort_description,
      product_url: slugify(product_url),
      description: editor,
      meta_title,
      newarrivedproduct,
      trendingproduct,
      featuredproduct,
      parent_category,
      child_category,
      meta_keywords,
      meta_description,
      weight_type,
      selling_price,
      mrp_price,
      stock,
      status,
      weight,
      size,
      color,
      brand,
    };

    // Handle image updates
    for (let i = 1; i <= 4; i++) {
      const imageFieldName = `product_image${i}`;

      if (req.files && req.files[imageFieldName]) {
        const file = req.files[imageFieldName][0];

        try {
          // Upload the new image to Cloudinary
          const myCloud = await cloudinary.v2.uploader.upload(file.path, {
            folder: "products",
            resource_type: "image",
          });

          // Update the corresponding image field in the data object
          updatedData[imageFieldName] = myCloud.secure_url;

          // Remove the temporary local file
          fs.unlinkSync(file.path);

          // Delete the old image from Cloudinary (if it exists)
          const existingImageField = existingProduct[imageFieldName];
          if (existingImageField && existingImageField.public_id) {
            await cloudinary.v2.uploader.destroy(existingImageField.public_id);
          }
        } catch (uploadError) {
          console.error(`Cloudinary upload error for ${imageFieldName}:`, uploadError);
          return res.status(500).json({ status: "fail", error: `Failed to upload ${imageFieldName}` });
        }
      } else {
        // Retain the existing image URL if no new image is uploaded
        updatedData[imageFieldName] = existingProduct[imageFieldName];
      }
    }

    // Update the product in the database
    const updatedProduct = await product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    res.send({ status: "successfully", data: updatedProduct });
  } catch (err) {
    console.error(`Error updating product: ${err}`);
    res.status(500).send({ status: "failed", errors: err.message });
  }
};

module.exports = updateproduct;
