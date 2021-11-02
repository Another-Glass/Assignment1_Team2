const Board = require("../models/Board");
const Count = require("../models/Count");

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
  updateCount,
  findAllBoards,
  findOneBoard,
  searchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
};
