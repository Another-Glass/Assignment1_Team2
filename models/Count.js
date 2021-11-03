const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Count", CountSchema);
