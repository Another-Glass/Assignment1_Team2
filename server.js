const port = 5000;
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`${port} 서버가 잘 돌아가고 있습니다.`);
    });
  }
);
