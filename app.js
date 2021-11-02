const express = require("express");

// Routes
const posts = require("./routes/post");
const auth = require("./routes/auth");

const app = express();

//express 빌트인 body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/posts", posts);
app.use("/auth", auth);

module.exports = app;
