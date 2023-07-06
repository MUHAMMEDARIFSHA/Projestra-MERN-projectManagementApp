const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  number: {
    type: Number,
  },
  password: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
 
  profilePicture: {
    type: String,
  },
    projects: [
      {
        
          projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
          
        },
      },
    ],

  company: {
    type: String,
  },
  about: {
    type: String,
  },
  job:{
type:String
  },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
