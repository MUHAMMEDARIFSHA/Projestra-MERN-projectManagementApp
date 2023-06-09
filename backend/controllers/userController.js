const User = require("../models/userSchema");

const registerUser = async (req, res) => {
  console.log("sign up");
  console.log(req.body.FormValues);
  const { username, email, number, password } = req.body.FormValues;

  const user = await User.findOne({ email: email });
  const number1 = await User.findOne({number:number})
  if (user) {
    res.status(409).json({ success: false, message: "User already exists with email" });
  }
  else if(number1){
    res.status(409).json({ success: false, message: "User already exists with number" });
  }
   else {
    const newUser = new User({
      username: username,
      email: email,
      number: number,
      password: password,
    });
    try {
      await newUser.save();
      res.json({ success: true, useremail: email });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to save user" });
    }
  }
};

module.exports = { registerUser };
