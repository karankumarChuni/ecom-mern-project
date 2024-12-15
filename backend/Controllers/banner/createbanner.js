const banner = require("../../Models/banner");
const cloudinary = require('cloudinary');
const fs = require("fs");


const createbanner = async (req, res) => {


  console.log("re22")

    const userHasUploadedAvatarImage = req.files.banner[0]

    console.log('rq.file?', userHasUploadedAvatarImage)
    let url
    if (userHasUploadedAvatarImage) {
      const file =  req.files.banner[0] // type `any` is necessary to fix eslint error
      myCloud = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'banner',
        // width: 150,
        // crop: 'scale',
        resource_type: 'image',
      })
      const public_id = myCloud?.public_id
      url = myCloud?.secure_url
      console.log('url?', url)
      // delete temporary uploaded files
      fs.unlinkSync(file.path)
    }
  try {
    const { banner_name,banner_link,banner_alt, status, description, banner_type } = req.body;
    const addbanner = new banner({
      banner_name,
      status,
      description,
      banner_type,
      banner_link,
      banner_alt,
      banner: url,
    });
    const data = await addbanner.save();
    res.status(201).json({ status: "successfull", data });
  } catch (error) {
    console.log("error",error)
    res.send({ status: "faild", error: error });
  }
};

module.exports = createbanner;
