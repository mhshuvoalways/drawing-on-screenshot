const express = require("express");
const router = express.Router();
const {
  uploadScreenShots,
  getVideos,
  deleteVideo,
  getVideo
} = require("../controllers/screenShotController");
const fileUploader = require("../middlewares/fileUploader");

router.post("/postscreenshot", fileUploader.array("files"), uploadScreenShots);
router.get("/getscreenshot", getVideos);
router.delete("/deletescreenshot/:id", deleteVideo);
router.get("/getsinglescreenshot/:id", getVideo);

module.exports = router;
