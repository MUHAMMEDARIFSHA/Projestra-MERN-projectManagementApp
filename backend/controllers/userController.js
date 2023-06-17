const User = require("../models/userSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const twilio = require('../utils/twilio')

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
      await twilio.sentotp(number)
      res.json({ success: true, useremail: email });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to save user" });
    }
  }
};

const verifySignUpOtp = async(req,res)=>{
  console.log(req.body.otp)
  const otpCode = req.body.otp
  const email   = req.body.email
 
  try{
    const user =await User.findOne({email:email})
  if(!otpCode){
    res.status(400).json({success:false,message:"Please enter the otp"})
  }
  else{
    const check = await twilio.check(otpCode,user.number)
    if (check.status == 'approved') {
      res.status(200).json({success:true,message:"Otp verified sucessfully"})
    }
  }
}
catch(error){
  res.status(500).json({success:false, message:"Failed to verify the otp"})
}
 

}

const signInUser=async(req,res)=>{
  console.log("hi singn in ")
  const  {email,password} = req.body.FormValues
   const user = await User.findOne({email:email,isBlocked:false})
  try{
    if(user){
      const match = await bcrypt.compare(password, user.password)
      if(match){
        // jwt token creation
        const token = jwt.sign({ username: user.username, email: email },process.env.SECRET_KEY_JWT,{expiresIn:"3d"});
        console.log(token);
        // jwt token creation
       res.status(200).json({success:true,jwtToken:token})
      }
      else{
        res.status(401).json({success:false, message:"Incorrect Password"})
      }
     }
     else{
      res.status(401).json({success:false, message:"email not found"})
     }
  }
  catch(error){
    res.status(500).json({success:false, message:"Failed to login"})
  }
  
}

module.exports = 
{ registerUser,
  signInUser ,
  verifySignUpOtp};
