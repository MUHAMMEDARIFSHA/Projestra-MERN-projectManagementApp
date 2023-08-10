const User = require('../models/userSchema')
const Message = require ('../models/messageSchema')
const Chat = require('../models/chatSchema');
;

// const sentMessage = async(req,res)=>{

// }
const allMessages = async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.body.chatId })
        .populate("sender", "username profilePicture email")
        .populate("chat");
  
      res.status(200).json({messageData: messages});
    } catch (error) {
      res.status(400).json({message:"some server error "});
    
    }
  };

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      return res.status(400).json({success:false, message:"Ivalid data passed"})
    }
    let user = await User.find({email:req.email})
    let newMessage = {
      sender: user[0]._id,
      content: content,
      chat: chatId,
    };
  
    try {
      let message = await Message.create(newMessage);
  
      message = await message.populate("sender", "username profilePicture")
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profilepicture email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
   res.status(200).json(message);
    } catch (error) {
      res.status(400).json({message:"some server error occured",error:error})
 }
  };

module.exports = {sendMessage,allMessages}