const express = require("express");
const userRouter = require("./routers/user");
// const { addUser } = require("./utils/utils");
// const User = require("./models/user");

//
const cors = require("cors");
// const path = require("path");
// const { resourceUsage } = require("process");
const { getUsers } = require("./utils/utils");
//

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
// console.log(uri);

mongoose.connect(uri, () => console.log("Connected"));

//
// const publicPath = path.join(__dirname, "client/build");
const publicPath = path.join(__dirname, "client/public");

app.use(cors());
app.use(express.static(publicPath));
//

app.use(express.json());
app.use(userRouter);

app.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/api/user", async (req, res) => {
  try {
    console.log("req.body", req.body);
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
