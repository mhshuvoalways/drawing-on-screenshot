const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (_req, file) => {
    let folder;
    if (file.mimetype.includes("video")) {
      folder = "baseball/videos";
    } else if (file.mimetype.includes("audio")) {
      folder = "baseball/audios";
    } else if (file.mimetype.includes("image")) {
      folder = "baseball/images";
    }

    return {
      folder,
      resource_type: "auto",
      allowedFormats: ["png", "jpg", "wav", "mp3", "webm", "mp4", "mov"],
      path: file.path,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
