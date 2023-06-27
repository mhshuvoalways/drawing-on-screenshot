require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const db = require("./config/db");
const cloudinary = require("./config/cloudinary");

const videoRouter = require("./routers/videoRouter");
const screenShotsRouter = require("./routers/screenShotsRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
cloudinary();

app.use("/video", videoRouter);
app.use("/screenshot", screenShotsRouter);

app.get("*", (req, res) => {
  res.send("Baseball direction api");
});

db(app);
