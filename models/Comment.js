const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    parentType: {
      type: String,
      enum: ["comment", "board"],
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 300,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
