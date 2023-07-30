const express = require("express")
const router  =express.Router()
const verifyToken = require('../middlewares/Authorization')


// router.post('/',verifyToken, sentMessage)
// router.get('/:chatId',verifyToken.allMessages)

module.exports = router