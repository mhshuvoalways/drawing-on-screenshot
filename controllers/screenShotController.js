const ScreenShots = require("../Model/ScreenShots");
const serverError = require("../utils/serverError");
const cloudinary = require("cloudinary").v2;

const uploadScreenShots = async (req, res) => {
  const { note } = req.body;
  const files = req.files;
  const filterPictures = files.filter((file) =>
    file.mimetype.includes("image")
  );
  const findAudio = files.find((file) => file.mimetype.includes("audio"));
  const newObj = {
    pictures: filterPictures,
    audio: findAudio?.path,
    note,
  };
  new ScreenShots(newObj)
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getVideos = (req, res) => {
  ScreenShots.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getVideo = (req, res) => {
  const id = req.params.id;
  ScreenShots.findOne({ _id: id })
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
  ScreenShots.findOneAndRemove({ _id: id })
    .then(async (response) => {
      res.status(200).json(response);
      response.pictures.forEach(async (pic) => {
        const identifier = findId(pic.path);
        await cloudinary.uploader.destroy("baseball/images/" + identifier);
      });
      const identifier = findId(response.audio);
      const result = await cloudinary.uploader.destroy(
        "baseball/audios/" + identifier,
        {
          resource_type: "video",
        }
      );
      console.log(result);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  uploadScreenShots,
  deleteVideo,
  getVideos,
  getVideo,
};
