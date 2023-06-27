const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = new Schema(
  {
    video: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("video", videoSchema);
