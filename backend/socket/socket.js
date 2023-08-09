const { Server } = require("socket.io");
const Message = require ('../models/messageSchema')
const Chat = require('../models/chatSchema')



const io = new Server({
    pingTimeout: 60000,
    cors: {
      origin: '*',
    },
  })

  io.on('connection',socket=>{
    console.log('connected to socket.io aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    socket.on('setup',(userData)=>{
      socket.join(userData._id)
      console.log(userData._id  +"  socket user id");
      socket.emit('connected')
    })

    socket.on('join chat',(room)=>{
      socket.join(room)
      console.log("User Joined Room=> " +   room);
    })
socket.on("typing",(room)=> socket.in(room).emit("typing"))
socket.on('stop typing', (room)=> socket.in(room).emit('stop typing'))


socket.on('new message', (newMessageReceived) => {
  console.log(newMessageReceived);
  var chat = newMessageReceived.chat;
  if (!chat.users) {
    return console.log("chat.users not defined");
  }

  // Assuming you want to add the task only once, you can get the first user in the array
  // const user = chat.users[0];
  // if (user._id === newMessageReceived.sender._id) {
  //   return; // The task sender is also the user in the chat, no need to emit the message again.
  // }

  console.log(newMessageReceived.chat);
  socket.in(chat._id).emit('message received', newMessageReceived);
});

  })
  


  module.exports = io
  
