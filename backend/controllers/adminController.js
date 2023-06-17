const Admin = require('../models/adminSchema')
const User = require('../models/userSchema')

const signInAdmin = async(req,res)=>{
   console.log(req.body.FormValues)
   const username = req.body.FormValues.email
   const password = req.body.FormValues.password
   const admin = await Admin.findOne({username:username})
   try{
   if(admin){
    console.log(" user found")
    if(password === admin.password){
        res.status(200).json({success:true})
    }
    else{
        res.status(401).json({success:false, message:"Incorrect Password"})
    }
   }
   else{
    res.status(401).json({success:false, message:"admin not found"})
   }}
   catch (error){
    res.status(500).json({success:false, message:"Failed to login",error:error})
   }
   

}

const getUserDetails = async(req,res)=>{
    console.log("user details")
    try{
    const users = await User.find()
    console.log(users)
    res.status(200).json({success:true,users:users})
    }
    catch(error){
        res.status(500).json({success:false,error:error})
    }
}

const blockUser = async(req,res)=>{
    console.log(req.body)
    const {id} = req.body
    try{
    await User.findOneAndUpdate({_id:id},{$set:{isBlocked:true}})
    const users = await User.find()
     res.status(200).json({success:true,users:users,message:"user bloceked succesfully"})
}catch(error){
    res.status(500).json({success:false,message:error})
}

}

const unBlockUser = async(req,res)=>{
    const {id}  = req.body
    console.log(id)
    try{
         await User.findOneAndUpdate({_id:id},{$set:{isBlocked:false}})
         const users = await User.find()
        res.status(200).json({success:true,users:users, message:"user unblocked succesfully"})
    }
    catch(error){
        res.status(500).json({success:false,message:error})
    }
}
module.exports = {signInAdmin,getUserDetails,blockUser,unBlockUser}