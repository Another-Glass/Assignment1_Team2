const PORT = 5000;
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Board = require("./models/Board");
const { setLastPostId } = require("./functions/board");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    Board.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((boards) => {
        setLastPostId(boards[0].postId ?? 0);
        app.listen(port, () => {
          console.log(`${port} 서버가 잘 돌아가고 있습니다.`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
