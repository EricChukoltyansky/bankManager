const express = require("express");
const userRouter = require("./routers/user");
require("./db/mongoose");

//
const cors = require("cors");
const path = require("path");
//

const app = express();

const port = process.env.PORT || 5000;

//
const publicPath = path.join(__dirname, "client/public");
// const publicPath = path.join(__dirname, "client/");
app.use(cors());
app.use(express.static(publicPath));
//

app.use(express.json());
app.use(userRouter);


//
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(publicPath, "index.html"));
// });
//

app.listen(port, () => {
  console.log("listening on port " + port);
});
