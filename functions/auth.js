const User = require("../models/User");

/*
  이메일을 이용한 유저정보 가져오기
  @param : 이메일 String
  @return : 유저정보 Object
  {
    _id,
    email,
    password,
    createdAt,
    updatedAt
    __v:0,
  }
*/
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

/*
  유저 생성
  @param : 작성한 유저 정보 Object
  {
    email,
    password,
  }
  @return : 유저정보 Object
  {
    _id,
    email,
    password,
    createdAt,
    updatedAt
    __v:0,
  }
*/
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
