const express = require("express");
const mongoose = require("mongoose");

// Routes
const posts = require("./routes/post");
const auth = require("./routes/auth");

const app = express();

//express 빌트인 body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

//routes
app.use("/posts", posts);
app.use("/auth", auth);
app.use("/api/search", searchRoutes);

module.exports = app;
