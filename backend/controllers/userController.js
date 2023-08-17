const User = require("../models/userSchema");
const tokenSchema = require("../models/tokenSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const twilio = require("../utils/twilio");
const cloudinary = require("../utils/cloudinary");
const verifyEmail = require("../utils/nodemailer");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  console.log("sign up");
  console.log(req.body.FormValues);
  const { username, email, number, password } = req.body.FormValues;

  const user = await User.findOne({ email: email, isVerified: true });
  const number1 = await User.findOne({ number: number, isVerified: true });
  if (user) {
    res
      .status(409)
      .json({ success: false, message: "User already exists with email" });
  } else if (number1) {
    res
      .status(409)
      .json({ success: false, message: "User already exists with number" });
  } else {
    const newUser = new User({
      username: username,
      email: email,
      number: number,
      password: password,
    });
    console.log(newUser,'=>new user');
    try {
      await newUser.save();
      await twilio.sentotp(number);
      res.json({ success: true, useremail: email });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to save user" });
    }
  }
};

const verifySignUpOtp = async (req, res) => {
  console.log(req.body.otp);
  const otpCode = req.body.otp;
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!otpCode) {
      res.status(400).json({ success: false, message: "Please enter the otp" });
    } else {
      const check = await twilio.check(otpCode, user.number);
      console.log(check + "check");
      if (check.status == "approved") {
        await User.findOneAndUpdate(
          { email: email },
          { $set: { isVerified: true } }
        );
        res
          .status(200)
          .json({ success: true, message: "Otp verified sucessfully" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to verify the otp" });
  }
};

const signInUser = async (req, res) => {
  console.log("hi sign in ");
  
  const { email, password } = req.body.FormValues;
  console.log(email);
  const user = await User.findOne({
    email: email,
  });
  console.log(user);
  try {
    if (user) {
      if (user.isBlocked === true) {
        return res
          .status(401)
          .json({ success: false, message: "user is blocked" });
      } else if (user.isVerified === false) {
        return res
          .status(401)
          .json({ success: false, message: "user is not verified" });
      } else if (user.isGoogle === true) {
        return res
          .status(401)
          .json({ success: false, message: "google authenticated user " });
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // jwt token creation
        const token = jwt.sign(
          { username: user.username, email: email },
          process.env.SECRET_KEY_JWT,
          { expiresIn: "3d" }
        );
        console.log(token);
        // jwt token creation
        return res.status(200).json({ success: true, jwtToken: token,user:user });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect Password" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "email not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};
const forgotPassword = async (req, res) => {
  console.log("pass");
  const email = req.body.email;
  console.log(email);
  const user = await User.findOne({
    email: email,
    isVerified: true,
    isBlocked: false,
  });
  try {
    if (user) {
      console.log("inside user");
      const token = new tokenSchema({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      console.log(token);
      await token.save();
      console.log("verify email 1");
      const link = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}/editpassword`;
      await verifyEmail(user.email, link);
      console.log("verify email");
      res.status(200).json({ success: true, message: "Mail sent to your email" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User with email not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: " try after 24 hours" });
  }
};

const removeTokenAfterVerification = async (req, res) => {
  const userId = req.body.userId;
  const token = req.body.token;
  console.log(userId, token);
  try {
    const tokenDelete = await tokenSchema.findOne({ token: token });
    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (tokenDelete) {
      console.log("token found");
      await tokenSchema.findByIdAndDelete(tokenDelete._id);
      return res
        .status(200)
        .json({
          success: true,
          userEmail: user.email,
          message: "email verified",
        });
    } else {
      return res
        .status(404)
        .json({ success: false, messege: "token not correct" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to verify" });
  }
};

const editPassword = async (req, res) => {
  console.log("edit");
  const newPassword = req.body.password;
  const userEmail = req.body.userEmail;
  console.log(newPassword, userEmail);
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email: userEmail },
      { $set: { password:hashedPassword } }
    );

    return res
      .status(200)
      .json({ success: true, message: "password updated succesfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "update password failed" });
  }
};

const getUserData = async(req,res)=>{
  console.log("get user data")
  const email = req.email
  console.log(email);
  const user = await User.findOne({
    email: email,
    isVerified: true,
    isBlocked: false,
    },"-password")
    try{
    if(user){
      return res.status(200).json({user:user,message:"user data found"})
    }
    else{
      return res.status(404).json({message:"user not found in the database"})
    }
  }
  catch(error){
    return res.status(500).json({message: "some server error occured ",error:error})
  }
}
module.exports = {
  registerUser,
  signInUser,
  verifySignUpOtp,
  forgotPassword,
  removeTokenAfterVerification,
  editPassword,
  getUserData,
};
