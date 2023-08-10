const User = require("../models/userSchema");
const twilio = require("../utils/twilio");
const cloudinary = require("../utils/cloudinary");

const getUserDataForEdit = async (req, res) => {
  const email = req.email;
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
  const image = req.body.image;
  const email = req.email;
  const userData = JSON.parse(req.body.profileData);
  const user = await User.findOne({ email: email });
  const number = userData.number;
  delete userData.number;
  try {
    if (image) {
      try {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: "Projestra",
        });
        const imageURL = result.secure_url;
      
        userData.profilePicture = imageURL;
      } catch (error) {
    
      }
    }
    await User.findOneAndUpdate({ email: email }, userData);
    if (user.number !== number) {
      try {
        await twilio.sentotp(number);
        return res.status(202).json({ success: true, number: number });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to update number" });
      }
    }
    return res
      .status(200)
      .json({ success: true, user: user, message: "data updated succesfully" });
  } catch (error) {
    return res.status(500).json({
      message: " some error occure while updating the user ",
      error: error,
    });
  }
};
const editUserNumber = async (req, res) => {
  const otp = req.body.otp;
  const number = req.body.number;
  const email = req.email;

  try {
    const user = await User.findOne({ email: email });
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the otp" });
    } else {
      const check = await twilio.check(otp, number);
      if (check.status == "approved") {
        await User.findOneAndUpdate(
          { email: email },
          { $set: { number: number } }
        );
        return res
          .status(200)
          .json({ success: true, message: "Otp verified sucessfully" });
      } else {
        return res
          .status(402)
          .json({ message: "enter valid otp", success: false });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to verify the otp" });
  }
};

module.exports = { getUserDataForEdit, editUserProfile, editUserNumber };
