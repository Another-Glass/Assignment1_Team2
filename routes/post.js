const express = require("express");
const auth = require("../middleware/auth");
const page_ctrl = require("../util/paginate.ctrl");
const router = express.Router();

//model
const Post = require("../models/Board");

// @routes     POST /posts/write
// @desc       글 작성
// @access     user
router.post("/write", auth, (req, res) => {
  const { title, content, nickname } = req.body;
  // 간단한 유효성 검사
  if (!title || !content || !nickname) {
    return res.status(400).json({ message: "모든 필드를 채워주세요" });
  }
  Post.create({ title, content, nickname })
    .then(({ title, content, nickname, id }) => {
      res.status(200).json({
        title,
        content,
        nickname,
        id,
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
// @access     public
router.get("/detail/:id", (req, res) => {
  Post.findByPk(req.params.id)
    .then(({ title, content, nickname, id }) => {
      res.status(200).json({
        title,
        content,
        nickname,
        id,
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
router.delete("/delete/:id", auth, (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
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

// @routes     GET /posts/edit/:id
// @desc       글 수정
// @access     user
router.put("/edit/:id", auth, (req, res) => {
  const { title, content, nickname } = req.body;
  Post.updateMany(
    { title, content, nickname },
    { where: { id: req.params.id } }
  )
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
