const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    autherId: {
      type: String,
      required: true,
    },
    postId: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      max: 50,
      required: true,
    },
    category: {
      type: String,
      enum: ["wecode", "wanted"],
    },
    content: {
      type: String,
      max: 500,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

BoardSchema.index({
  title: "text",
  category: "text",
  autherId: "text",
});

module.exports = mongoose.model("Board", BoardSchema);
