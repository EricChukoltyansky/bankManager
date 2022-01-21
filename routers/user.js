const express = require("express");
const router = new express.Router();
const { addUser, getUsers, getUser } = require("../utils/utils");

router.post("/api/user", async (req, res) => {
  try {
    await addUser(req.body);
    res.status(201).send("User added");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.get("/api/user/:id", async (req, res) => {
  try {
    const user = await getUser();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
module.exports = router;
