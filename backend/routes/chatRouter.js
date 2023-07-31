const express = require("express")
const router  =express.Router()
const verifyToken = require('../middlewares/Authorization')
 const {sendMessage,allMessages} = require('../controllers/messageController')
 const {accessChat,getChatData,createGroupChat} = require('../controllers/chatController')



//  chat routes 

// router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

router.post('/',verifyToken,accessChat)
router.get('/',verifyToken,getChatData)
router.post('/group',verifyToken,createGroupChat)

// chat routes

//  message routes
router.post('/message',verifyToken, sendMessage)
router.post('/message/getdata',verifyToken,allMessages)

module.exports = router