const { Server } = require("socket.io");
const Message = require ('../models/messageSchema')
const Chat = require('../models/chatSchema')



const io = new Server({
    pingTimeout: 60000,
    cors: {
      origin: process.env.BASE_URL,
    },
  })

  io.on('connection',socket=>{
    console.log('connected to socket.io aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  })
  


  module.exports = io