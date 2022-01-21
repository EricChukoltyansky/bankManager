const User = require("../models/user");

async function getUsers() {
  try {
    return await User.find({});
  } catch (e) {
    throw new Error({ error: e.message });
  }
}

async function addUser({ name, mobile, email, password }) {
  if (!name || !mobile || !email || !password) {
    throw new Error("All paramaters must be provided");
  }
  try {
    const user = new User({
      name,
      mobile,
      email,
      password,
    });
    await user.save();
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  addUser,
  getUsers,
};
