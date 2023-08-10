const express = require("express")
const router  =express.Router()
const verifyToken = require('../middlewares/Authorization')
 const {sendMessage,allMessages} = require('../controllers/messageController')
 const {accessChat,getChatData,createGroupChat} = require('../controllers/chatController')



//  chat routes 

router.post('/',verifyToken,accessChat)
router.get('/',verifyToken,getChatData)
router.post('/group',verifyToken,createGroupChat)

// chat routes

//  message routes
router.post('/message',verifyToken, sendMessage)
router.post('/message/getdata',verifyToken,allMessages)

module.exports = router