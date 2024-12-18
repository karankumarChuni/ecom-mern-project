const brand = require("../../Models/brand");
const cloudinary = require('cloudinary');
const fs = require("fs");

const createbrand = async (req, res) => {
  console.log("re22");

  const userHasUploadedAvatarImage = req.files?.brand_image?.[0];
  console.log('rq.file?', userHasUploadedAvatarImage);

  let url;
  let public_id;

  if (userHasUploadedAvatarImage) {
    const file = req.files.brand_image[0];
    try {
      const myCloud = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'brands',
        resource_type: 'image',
      });
      public_id = myCloud?.public_id;
      url = myCloud?.secure_url;
      console.log('url?', url);

      // Delete temporary uploaded files
      fs.unlinkSync(file.path);
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({ status: "fail", error: "Failed to upload image to Cloudinary" });
    }
  }

  try {
    const { brand_name, description, status } = req.body;
    const newBrand = new brand({
      brand_name,
      description,
      status,
      brand_image: {
        url: url,
        public_id: public_id,
      },
    });
    const data = await newBrand.save();
    res.status(201).json({ status: "success", data });
  } catch (error) {
    console.error("Database save error:", error);
    res.status(500).json({ status: "fail", error: "Failed to create brand" });
  }
};

module.exports = createbrand;
