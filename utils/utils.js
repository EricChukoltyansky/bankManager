const User = require("../models/user");
const Account = require("../models/account");
const AccountLog = require("../models/transition");

async function getUsers() {
  try {
    return await User.find({});
  } catch (e) {
    throw new Error({ error: e.message });
  }
}
async function getAccounts() {
  try {
    return await Account.find({});
  } catch (e) {
    throw new Error({ error: e.message });
  }
}

async function addUser({ name, mobile, email, password, cash, credit }) {
  if (!name || !mobile || !email || !password)
    throw new Error(
      "parameters name ,mobile, password and email must be provide"
    );
  try {
    const user = new User({
      name,
      mobile,
      email,
      password,
    });
    await user.save();
    createBankAccount(user._id, cash, credit);
  } catch (e) {
    throw new Error(e);
  }
}

async function getUser(id) {
  try {
    const userData = [];
    userData.push(await User.findById(id));
    userData.push(await Account.findOne({ ownerId: id }));
    userData.push(await AccountLog.findOne({ ownerId: id }));
    return userData;
  } catch (e) {
    throw new Error(e);
  }
}

async function createBankAccount(ownerId, cash, credit) {
  try {
    const account = new Account({
      ownerId,
      cash,
      credit,
    });
    const logAccount = new AccountLog({
      ownerId,
      log: `Open on account ${new Date().toLocaleString()}`,
    });
    await account.save();
    await logAccount.save();
  } catch (e) {
    throw new Error(e);
  }
}

async function deposit(id, { amount }) {
  validationMoney(amount);
  try {
    if (!(await User.findById(id))) throw new Error("User not found");
    await Account.findOneAndUpdate({ ownerId: id }, { $inc: { cash: amount } });
    await AccountLog.findOneAndUpdate(
      { ownerId: id },
      { $push: { log: `deposit ${amount}$` } }
    );
  } catch (e) {
    throw new Error("User not found");
  }
}

async function updateCredit(id, { amount }) {
  validationMoney(amount);
  try {
    if (!(await User.findById(id))) throw new Error("User not found");
    await Account.findOneAndUpdate(
      { ownerId: id },
      { $inc: { credit: amount } }
    );
    await AccountLog.findOneAndUpdate(
      { ownerId: id },
      { $push: { log: `credit increase by ${amount}$` } }
    );
  } catch (e) {
    throw new Error(e);
  }
}

function validationMoney(amount) {
  if (!amount) throw new Error("parameter amount not provided");
  if (amount < 1) throw new Error("parameter must be positive");
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  createBankAccount,
  deposit,
  updateCredit,
  getAccounts,
};
