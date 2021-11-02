const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middleware/auth");
const {
  findAllBoards,
  findOneBoard,
  searchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  findPageBoards,
  setLastPostId,
} = require("../functions/board");
const router = express.Router();

// @routes     GET /posts
// @desc       페이징 게시글 가져오기
// @access     public
router.get("/block/:page", (req, res) => {
  const page = req.params.page;
  findPageBoards(page)
    .then((page_block) => {
      res.status(200).json({ page_block });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     GET /posts
// @desc       모든 게시글 가져오기
// @access     public
router.get("/", (req, res) => {
  findAllBoards().then((postAll) => {
    res.status(200).json({ postAll });
  });
});

// @routes     POST /posts/write
// @desc       글 작성
// @access     user
router.post("/write", verifyToken, (req, res) => {
  const { title, category, content } = req.body;
  console.log(req.body, req.user);
  const autherId = req.user.id;
  // 간단한 유효성 검사
  if (!autherId || !title || !category || !content) {
    return res.status(400).json({ message: "모든 필드를 채워주세요" });
  }
  createBoard({ title, content, category, autherId })
    .then((post) => {
      res.status(200).json({
        post,
      });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     GET /posts/detail/:id
// @desc       글 확인
// @access     user
router.get("/detail/:boardId", (req, res) => {
  const userId = req.query.userId;
  const boardId = req.params.boardId;
  console.log(userId, boardId);
  findOneBoard(userId, boardId)
    .then((post) => {
      res.status(200).json({
        post,
      });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     GET /posts/delete/:id
// @desc       글 삭제
// @access     user
router.delete("/delete/:id", verifyTokenAndAuthorization, (req, res) => {
  const boardId = req.params.id;
  deleteBoard(boardId)
    .then(() => {
      res.status(200).send("게시물 삭제 완료");
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     PUT /posts/edit/:id
// @desc       글 수정
// @access     user
router.put("/edit/:id", verifyTokenAndAuthorization, (req, res) => {
  const body = req.body;
  const boardId = req.params.id;
  updateBoard(boardId, body)
    .then(() => {
      res.status(200).send("게시물 수정 완료");
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     GET /posts/search
// @desc       글 검색
// @access     public
router.get("/search", (req, res) => {
  const type = req.query.type;
  const content = req.query.content;
  searchBoards(type, content)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

module.exports = router;
