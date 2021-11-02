const express = require("express");




//express 빌트인 body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/posts", posts);
app.use("/auth", auth);
app.use("/comment", commment);

module.exports = app;
