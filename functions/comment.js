const Comment = require("../models/Comment");

/**
  * 모든 댓글과 대댓글 불러오기
  * @param : 게시글Id String
  * @return : 검색된 댓글과 대댓글들 정보 Array<Object>
  [
    {
      _id,
      autherId,
      title,
      category,
      content,
      count,
      createdAt,
      updatedAt,
      nestedComments: {
        _id,
        autherId,
        title,
        category,
        content,
        count,
        createdAt,
        updatedAt,
      }
    },
    {
      ...
    }
    ...
  ]
*/
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

/*
  대댓글 불러오기
*/
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

/**
  * 댓글 및 대댓글 생성
  * @param : 작성한 댓글 or 대댓글 정보 Object
  {
    parentType,
    parentId,
    userId,
    content,
  }
  * @return : 생성한 댓글 or대댓글 정보 Object
  {
    _id,
    parentType,
    parentId,
    userId,
    content,
    createdAt,
    updatedAt,
    _v
  }
*/
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

/**
  * 댓글 및 대댓글 수정
  * @param : 댓글Id or 대댓글Id String, 수정한 댓글 or 대댓글 정보 Object
  commentId,
  {
    parentType,
    parentId,
    userId,
    content,
  }
  * @return : 수정된 댓글 or대댓글 정보 Object
  {
    _id,
    parentType,
    parentId,
    userId,
    content,
    createdAt,
    updatedAt,
    _v
  }
*/
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

/**
 * 댓글 및 대댓글 삭제
 * @param : 댓글Id or 대댓글Id String
 * @return : 삭제된 댓글Id or 대댓글Id String
 */
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
  createComment,
  updateComment,
  deleteComment,
};
