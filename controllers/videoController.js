const Videos = require("../Model/Videos");
const serverError = require("../utils/serverError");
const videoValidation = require("../validations/videoValidation");
const cloudinary = require("cloudinary").v2;

const uploadVideo = (req, res) => {
  const validation = videoValidation(req.file);
  if (validation.isValid) {
    const products = {
      video: req.file.path,
    };
    new Videos(products)
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getVideos = (req, res) => {
  Videos.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const findId = (path) => {
  const filenameWithExtension = path.substring(path.lastIndexOf("/") + 1);
  const identifier = filenameWithExtension.split(".")[0];
  return identifier;
};

const deleteVideo = (req, res) => {
  const id = req.params.id;
  Videos.findOneAndRemove({ _id: id })
    .then(async (response) => {
      res.status(200).json(response);
      const identifier = findId(response.video);
      console.log(identifier);
      await cloudinary.uploader.destroy("baseball/videos/" + identifier, {
        resource_type: "video",
      });
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  uploadVideo,
  deleteVideo,
  getVideos,
};
