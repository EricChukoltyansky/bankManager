const User = require("../models/user");

async function getUsers() {
  try {
    return await User.find({});
  } catch (e) {
    throw new Error({ error: e.message });
  }
}

async function addUser({ name, mobile, email, password }) {
  console.log(name);
  console.log(mobile);
  console.log(email);
  console.log(password);
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
    return user;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  addUser,
  getUsers,
};
