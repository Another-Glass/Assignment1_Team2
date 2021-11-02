const Board = require("../models/Board");
const Count = require("../models/Count");

/*
  게시글 조회 시 count 증가
  같은 User가 게시글을 읽는 경우 count 수 그대로 유지
*/
// 직접 호출하지 마시오
const updateCount = (userId, boardId, board) => {
  return new Promise((resolve, reject) => {
    Count.find({ userId, boardId })
      .then((count) => {
        if (count.length === 0) {
          const newCount = new Count({ userId, boardId });
          newCount
            .save()
            .then(() => {
              board.count++;
              board.save();
              resolve(board);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          resolve(board);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
  * 모든 게시글 가져오기
  * @return : 게시글들 전체 정보 Array<Object>
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
    },
    {
      ...
    }
    ...
  ]
*/
const findAllBoards = () => {
  return new Promise((resolve, reject) => {
    Board.find({})
      .then((boards) => {
        resolve(boards);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
  * 게시글 검색하기
  * @param : 검색필터종류 String, 검색내용 String
  * @return : 검색된 게시글들 정보 Array<Object>
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
    },
    {
      ...
    }
    ...
  ]
*/
const searchBoards = (type, content) => {
  let options = [];
  if (type === "title") options = [{ title: new RegExp(content) }];
  else if (type === "category") options = [{ category: new RegExp(content) }];
  else if (type === "autherId") options = [{ autherId: new RegExp(content) }];
  return new Promise((resolve, reject) => {
    Board.find({ $or: options })
      .then((boards) => {
        resolve(boards);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
  * 특정 게시글 하나 가져오기
  * @param : 현재유저ID String, 게시글ID String
  * @return : 특정 게시글 정보 Object
  {
    _id,
    autherId,
    title,
    category,
    content,
    count,
    createdAt,
    updatedAt,
  }
*/
const findOneBoard = (userId, boardId) => {
  return new Promise((resolve, reject) => {
    Board.findById(boardId)
      .then((board) => {
        updateCount(userId, boardId, board)
          .then((_board) => {
            resolve(_board);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
  * 게시글 생성하기
  * @param : 작성한 게시글 정보 Object
  {
    autherId,
    title,
    category,
    content,
  }
  * @return : 생성된 게시글 정보 Object
  {
    _id,
    autherId,
    title,
    category,
    content,
    count,
    createdAt,
    updatedAt,
  }
*/
const createBoard = (body) => {
  return new Promise((resolve, reject) => {
    const newBoard = new Board(body);
    newBoard
      .save()
      .then((board) => {
        resolve(board);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
  * 게시글 수정하기
  * @param : 게시글Id String, 수정한 게시글 정보 Object
  boardId,
  {
    autherId,
    title,
    category,
    content,
  }
  * @return : 수정된 게시글 정보 Object
  {
    _id,
    autherId,
    title,
    category,
    content,
    count,
    createdAt,
    updatedAt,
  }
*/
const updateBoard = (boardId, body) => {
  return new Promise((resolve, reject) => {
    Board.findByIdAndUpdate(
      boardId,
      {
        $set: body,
      },
      { new: true }
    )
      .then((board) => {
        resolve(board);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 게시글 삭제하기
 * @param : 게시글Id String
 * @return : 삭제된 게시글Id String
 */
const deleteBoard = (boardId) => {
  return new Promise((resolve, reject) => {
    Board.findByIdAndDelete(boardId)
      .then(() => {
        resolve(boardId);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  findAllBoards,
  findOneBoard,
  searchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
};
