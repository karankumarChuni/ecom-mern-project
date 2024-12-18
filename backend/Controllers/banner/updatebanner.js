const banner = require("../../Models/banner");
const cloudinary = require('cloudinary');
const fs = require("fs");

const updatebanner = async (req, res) => {
  try {
    const { banner_name, banner_link, status, description, banner_alt, banner_type } = req.body;
    console.log("First body of banner", req.body);
    
    let bannerobj = {};
    let url;
    let public_id;

    if (req.files.banner) {
      // If there's a new banner image
      const file = req.files.banner[0];

      // Upload the new image to Cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'banner', 
        resource_type: 'image',
      });
      
      // Get the new image URL and public_id
      public_id = myCloud?.public_id;
      url = myCloud?.secure_url;
      
      // Delete the temporary uploaded file
      fs.unlinkSync(file.path);

      // If there's an old image, we need to delete it from Cloudinary
      const oldBanner = await banner.findById(req.params.id);
      if (oldBanner && oldBanner.banner.public_id) {
        await cloudinary.v2.uploader.destroy(oldBanner.banner.public_id); // Delete old image from Cloudinary
      }

      bannerobj = {
        banner_name,
        status,
        description,
        banner_type,
        banner_link,
        banner_alt,
        banner: {
          url: url,
          public_id: public_id,
        },
      };
    } else {
      // If no new banner image, just update other fields
      bannerobj = {
        banner_name,
        status,
        description,
        banner_type,
        banner_link,
        banner_alt,
      };
    }

    const updatedBanner = await banner.findByIdAndUpdate(req.params.id, bannerobj, { new: true });

    if (!updatedBanner) {
      return res.status(404).json({ status: "failed", message: "Banner not found" });
    }

    res.send({ status: "successfully updated", data: updatedBanner });
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    res.status(500).send({ status: "failed", error: err });
  }
};

module.exports = updatebanner;
