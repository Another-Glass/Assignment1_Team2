const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middleware/auth");
const router = express.Router();
const {
  findAllComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../functions/comment");

// @routes     GET /comment/detail
// @desc       댓글 목록 확인
// @access     user
router.get("/detail/:id", (req, res) => {
  const boardId = req.params.id;
  findAllComments(boardId)
    .then((comment) => {
      res.status(200).json({ comment });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     POST /comment/write/:id
// @desc       댓글 작성
// @access     user
router.post("/write", verifyToken, (req, res) => {
  const body = req.body;
  body.userId = req.user.id;
  createComment(body)
    .then((comment) => {
      res.status(200).json({
        comment,
      });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     DELETE /comment/write
// @desc       댓글 삭제
// @access     user
router.delete("/delete/:id", verifyTokenAndAuthorization, (req, res) => {
  const commentId = req.params.id;
  deleteComment(commentId)
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

// @routes     GET /comment/edit/:id
// @desc       댓글 수정
// @access     user
router.put("/edit/:id", verifyTokenAndAuthorization, (req, res) => {
  const body = req.body;
  const commentId = req.params.id;
  updateComment(commentId, body)
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

module.exports = router;
