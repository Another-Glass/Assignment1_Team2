const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

//model
const Comment = require("../models/Comment");

// @routes     POST /comment/write
// @desc       댓글 작성
// @access     user
router.post("/write", auth, (req, res) => {
  const { content } = req.body;

  Comment.create({ content })
    .then(({ content }) => {
      res.status(200).json({
        content,
      });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(400)
        .send("요청이 잘못되었습니다. 재검토하고 재요청할 필요가 있습니다.");
    });
});

// @routes     GET /comment/detail/:id
// @desc       댓글 확인
// @access     public
router.get("/detail/:id", (req, res) => {
  Post.findByPk(req.params.id)
    .then(({ content }) => {
      res.status(200).json({
        content,
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

// @routes     GET /comment/edit/:id
// @desc       댓글 수정
// @access     user
router.put("/edit/:id", auth, (req, res) => {
  const { content } = req.body;
  Post.updateOne({ content }, { where: { id: req.params.id } })
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
