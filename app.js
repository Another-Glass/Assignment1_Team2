const express = require("express");
const mongoose = require("mongoose");
const { setLastPostId } = require("./functions/board");
// Routes
const posts = require("./routes/post");
const auth = require("./routes/auth");
const commment = require("./routes/comment");
const Board = require("./models/Board");

const app = express();
const MONGO_URI =
  "mongodb+srv://khh0604:subi7135@cluster0.3zojk.mongodb.net/news?retryWrites=true&w=majority";

//express 빌트인 body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connecting success mongoDB!");
    Board.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((boards) => {
        setLastPostId(boards[0].postId ?? 0);
      });
  })
  .catch((e) => console.log(e));

//routes
app.use("/posts", posts);
app.use("/auth", auth);
app.use("/comment", commment);

module.exports = app;
