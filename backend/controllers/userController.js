const User = require("../models/userSchema");

const registerUser = (req, res) => {
  console.log("sign up");
  console.log(req.body.FormValues);
};

module.exports = { registerUser };
