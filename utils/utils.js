const User = require("../models/user");

async function getUsers() {
  try {
    return await User.find({});
  } catch (e) {
    throw new Error({ error: e.message });
  }
}

async function addUser({ name, mobile, email, password }) {
  if (!name || !mobile || !email || !password)
    throw new Error(
      "parameters name ,mobile password and email must be provide"
    );
  try {
    const user = new User({
      name,
      mobile,
      email,
      password,
    });
    await user.save();
    createBankAccount(user._id);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  addUser,
  getUsers,
};
