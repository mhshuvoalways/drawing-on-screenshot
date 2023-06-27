const express = require("express");
const router = express.Router();
const {
  uploadVideo,
  getVideos,
  deleteVideo,
} = require("../controllers/videoController");
const fileUploader = require("../middlewares/fileUploader");

router.post("/postvideo", fileUploader.single("video"), uploadVideo);
router.get("/getvideos", getVideos);
router.delete("/deletevideo/:id", deleteVideo);

module.exports = router;
