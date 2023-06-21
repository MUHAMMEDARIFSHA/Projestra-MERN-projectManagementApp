const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const signInUserGoogle =async(req,res)=>{
    console.log("google")
    const userData = req.body.userData
    console.log(userData)
    console.log(userData.name)
  

    const user = await User.findOne({email:userData.email,isVerified:true})
     // jwt token creation
     const token = jwt.sign(
        { email: userData.email },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "3d" }
      );
      console.log(token);
      // jwt token creation

    if(user){
        console.log("user exist with email")
        return res.status(200).json({success:true,userEmail:userData.email,jwtToken:token})
    }
    else{
        const newUser = new User({
            email:userData.email,
            isGoogle:true,
            isVerified:true
        })
        try{
           await newUser.save()
           return res.status(200).json({success:true,userEmail:userData.email,jwtToken:token})
        }
        catch(error){
            return res.status(500).json({ success: false, message: "Failed to login",error:error });
        }
    }

    
  }

  module.exports = signInUserGoogle