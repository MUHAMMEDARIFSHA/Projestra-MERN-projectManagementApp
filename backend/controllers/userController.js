const User = require("../models/userSchema");
const tokenSchema = require("../models/tokenSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const twilio = require("../utils/twilio");
const cloudinary = require("../utils/cloudinary");
const verifyEmail = require('../utils/nodemailer')
const crypto = require("crypto")

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
  // const image = '../models/new logo.jpeg'
  // const result = await cloudinary.v2.uploader.upload("https://images.unsplash.com/photo-1686841812861-d22f3ce23a58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80",{
  //   folder:"logoTest"
  // })
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
        return res.status(200).json({ success: true, jwtToken: token });
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
      const token = new tokenSchema({userId:user._id,token:crypto.randomBytes(16).toString('hex')})
      console.log(token)
      await token.save()
      console.log("verify email 1")
      const link = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`
      await verifyEmail(user.email,link);
      console.log("verify email")
      res.status(200).json({success:true,message:"check your email"})
    } else {
      return res.status(404).json({ success: false, message: "user with email not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
const emailVerified = async(req,res)=>{
   try{
    const token = await tokenSchema.findOne({token:req.params.token})
    if(token){
      await tokenSchema.findByIdAndDelete(token._id)
      return res.status(200).json({success:true,message:"email verified"})
    }
    else{
      return res.status(404).json({success:false,message:"email not verified"})
    }
   }catch(error){
    res.status(500).json({success:false,error:error})
   }
}

module.exports = { registerUser, signInUser, verifySignUpOtp, forgotPassword ,emailVerified};
