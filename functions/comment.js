const Comment = require("../models/Comment");

const findAllComments = (boardId) => {
  return new Promise((resolve, reject) => {
    Comment.find({ parentType: "board", parentId: boardId })
      .then((comments) => {
        let size = comments.length;
        let done = [];

        comments.forEach((comment, _, _comments) => {
          findAllNestedComments(comment._id)
            .then((nestedComments) => {
              _comments.nestedComments = nestedComments;
              done.push(comment);
              console.log(`${done.length} / ${size}`);
              if (done.length === size) {
                resolve(_comments);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 직접 호출하지 마시오
const findAllNestedComments = (commentId) => {
  return new Promise((resolve, reject) => {
    Comment.find({ parentType: "comment", parentId: commentId })
      .then((nestedComments) => {
        resolve(nestedComments);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createComment = (body) => {
  return new Promise((resolve, reject) => {
    const newComment = new Comment(body);
    newComment
      .save()
      .then((comment) => {
        resolve(comment);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateComment = (commentId, body) => {
  return new Promise((resolve, reject) => {
    Comment.findByIdAndUpdate(
      commentId,
      {
        $set: body,
      },
      { new: true }
    )
      .then((comment) => {
        resolve(comment);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteComment = (commentId) => {
  return new Promise((resolve, reject) => {
    Comment.findByIdAndDelete(commentId)
      .then(() => {
        resolve(commentId);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  findAllComments,
  findAllNestedComments,
  createComment,
  updateComment,
  deleteComment,
};
