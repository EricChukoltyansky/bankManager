const express = require("express");
const userRouter = require("./routers/user");
const { addUser } = require("./utils/utils");
const User = require("./models/user");

//
const cors = require("cors");
const path = require("path");
//

const app = express();

const port = process.env.PORT || 5000;

//
const publicPath = path.join(__dirname, "client/build");
app.use(cors());
app.use(express.static(publicPath));
//

app.use(express.json());
// app.use(userRouter);

app.get("/api/users", (req, res) => {
  try {
    res.status(200).send({ userName: "Bob" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/api/user", async (req, res) => {
  try {
    console.log(req.body);
    await addUser(req.body);
    res.status(201).send("User added");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//
app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});
//

app.listen(port, () => {
  console.log("listening on port " + port);
});
