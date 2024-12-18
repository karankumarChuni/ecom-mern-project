const brand = require("../../Models/brand");
const cloudinary = require('cloudinary');
const fs = require("fs");

const updatebrand = async (req, res) => {
  try {
    const { brand_name, description, status } = req.body;
    console.log("First body of brand:", req.body);

    // Retrieve the existing brand from the database
    const existingBrand = await brand.findById(req.params.id);
    
    if (!existingBrand) {
      return res.status(404).json({ status: "failed", message: "Brand not found" });
    }

    let brandobj = {
      brand_name,
      description,
      status,
    };

    // Check if a new image is uploaded
    if (req.files && req.files.brand_image) {
      // New image uploaded, upload it to Cloudinary
      const file = req.files.brand_image[0];

      try {
        // Upload the new image to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(file.path, {
          folder: 'brands',
          resource_type: 'image',
        });

        // New image data
        const newPublicId = myCloud.public_id;
        const newUrl = myCloud.secure_url;

        // Delete the old image from Cloudinary (if it exists)
        if (existingBrand.brand_image.public_id) {
          await cloudinary.v2.uploader.destroy(existingBrand.brand_image.public_id);
        }

        // Add the new image data to the brand object
        brandobj.brand_image = {
          public_id: newPublicId,
          url: newUrl
        };

        // Delete the local temporary uploaded file
        fs.unlinkSync(file.path);

      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ status: "fail", error: "Failed to upload image to Cloudinary" });
      }
    } else {
      // No new image uploaded, keep the old image data
      brandobj.brand_image = existingBrand.brand_image;
    }

    // Update the brand with the new data
    const updatedBrand = await brand.findByIdAndUpdate(req.params.id, brandobj, { new: true });

    if (!updatedBrand) {
      return res.status(404).json({ status: "failed", message: "Brand not found" });
    }

    res.send({ status: "successfully update", data: updatedBrand });

  } catch (err) {
    console.log(`Error updating brand: ${err}`);
    res.status(500).send({ status: "failed", error: err.message });
  }
};

module.exports = updatebrand;
