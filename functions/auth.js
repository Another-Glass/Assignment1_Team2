const User = require("../models/User");

const findUser = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createUser = (body) => {
  return new Promise((resolve, reject) => {
    const newUser = new User(body);
    newUser
      .save()
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { findUser, createUser };
