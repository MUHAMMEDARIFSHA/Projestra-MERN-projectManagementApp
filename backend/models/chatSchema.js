const mongoose = require ("mongoose")

const chatModal = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Project"
    }
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat",chatModal)

module.exports  = Chat