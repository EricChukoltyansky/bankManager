const express = require("express");
const router = new express.Router();
const { addUser } = require("../utils/utils");

router.post("/api/user", async (req, res) => {
  try {
    await addUser(req.body);
    res.status(201).send("User added");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
