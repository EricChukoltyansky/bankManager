const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const cors = require("cors");

const publicPath = path.join(__dirname, "client/build");

app.use(cors());

app.get("api/users", (req, res) => {
  try {
    res.status(200).send({ userName: "Bob" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/EricChukoltyansky/bankManager.git
// git push -u origin main