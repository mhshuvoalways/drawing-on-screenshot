const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ssSchema = new Schema(
  {
    pictures: [
      {
        path: String,
      },
    ],
    audio: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("screenshot", ssSchema);
