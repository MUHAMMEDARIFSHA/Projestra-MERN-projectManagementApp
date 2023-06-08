const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
//   projects: [
//     {
//       type: {
//         projectId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Projects",
//         },
//       },
//     },
//   ],

  company: {
    type: String,
  },
  about: {
    type: String,
  },
  location: {
    type: String,
  },
});

// UserSchema.pre('save', async function(next){
//     try {
//       hashedPassword = await bcrypt.hash(this.password, 10)
//       this.password = hashedPassword
//       next();
//     } catch (error) {
//       console.log(error)
//     }
//   })
  const User = mongoose.model('User',UserSchema)
  
  module.exports = User
