const User = require("../models/userSchema");
const twilio = require("../utils/twilio");

const getUserDataForEdit = async (req, res) => {
  console.log("get user data for edit");
  const email = req.email;
  console.log(email + " edit");
  const user = await User.findOne(
    {
      email: email,
      isVerified: true,
      isBlocked: false,
    },
    "-password"
  );
  try {
    if (user) {
      return res.status(200).json({ user: user, message: "user data found" });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error occured ", error: error });
  }
};
const editUserProfile = async (req, res) => {
  console.log("edit user profile");
  const email = req.email;
  const userData = req.body.profileData;
  const user = await User.findOne({ email: email });
  const number = userData.number
  delete userData.number
  console.log(userData, email, "data=>", userData.email, number);
  try {
    await User.findOneAndUpdate({ email: email }, userData);
    if (user.number!==number){
        console.log(user.number+"   "+ number)
      try {
        console.log("not same number");
        // await twilio.sentotp(number);
        return res.status(202).json({ success: true,number:number});
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to update number" });
      }
    }
   return res.status(200).json({success:true,message:"data updated succesfully"})
  } catch (error) {
    return res
      .status(500)
      .json({
        message: " some error occure while updating the user ",
        error: error,
      });
  }
};
const editUserNumber =(req,res)=>{
    console.log("inside otp number");
 const otp = req.body.otp
console.log(otp)}

module.exports = { getUserDataForEdit, editUserProfile,editUserNumber };
