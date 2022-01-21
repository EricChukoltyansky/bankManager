const User = require("../models/user");

async function getUsers() {
  try {
    return await User.find({});
  } catch (e) {
    throw new Error({ error: e.message });
  }
}

async function addUser({ name, mobile, email, password }) {
  try {
    if (!name || !mobile || !email || !password) {
      throw new Error("All paramaters must be provided");
    }
    // const user = new User({ name, mobile, email, password });
    const user = new User({ name, mobile });
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  addUser,
  getUsers,
};
