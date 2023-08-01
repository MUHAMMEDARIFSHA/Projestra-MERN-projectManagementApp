// import React, { useEffect, useState,useRef } from "react";
// import axios from "../../../../Axios";
// import Lottie from 'react-lottie'
// import { isSameSender, isLastMessage } from "./ChatLogics";
// import { useLocation } from "react-router-dom";
// import animationData from './Animations/typing.json'
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   Grid,
//   Paper,
//   Skeleton,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { useSelector } from "react-redux";
// import io from 'socket.io-client'
// const ENDPOINT = 'http://localhost:4000'
// var socket,selectedChatCompare

// const ChatUI = () => {
//   const [groupProjectData, setGroupProjectData] = useState({});
//   const [projectId, setProjectId] = useState("");
//   const [loggedUser, setLoggedUser] = React.useState("initialState");
//   const [users, setUsers] = useState("");
//   const location = useLocation();
//   const userData = useSelector((state) => state.userReducer.user);
//   // for messages
//   const [chatId, setChatId] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState();
//   const [socketConnected,setsocketConnected] = useState(false)
//   const [typing,setTyping] = useState(false)
//   const [isTyping,setIsTyping] = useState(false)
//  const defaultOptions ={
//   loop :true,
//   autoplay :true,
//   animationData : animationData,
//   rendererSettings:{
//     preserveAspectRatio :' xMidYMid slice'
//   }
//  }
  
//   useEffect(() => {
//     getProjectData();
//   }, []);

//   const getProjectData = async () => {
//     const Id = new URLSearchParams(location.search).get("id");
//     console.log(Id + " project Id");
//     setProjectId(Id);
//     axios
//       .post(
//         "/user/project/group",
//         { projectId: Id },
//         { headers: { "x-access-token": localStorage.getItem("token") } }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(`${res.data.message}`);
//           console.log(res.data.projectData + " in add members");
//           setGroupProjectData(res.data.projectData);
//           console.log(res.data.usersData + "users data");
//           setUsers(res.data.usersData);
//           console.log(res.data.projectData.chatId + " chat id");
//           setChatId(res.data.projectData.chatId);
//           //   setTasks(res.data.projectData.tasks);
//         }
//       })
//       .catch((error) => {});
//   };

//   const getMessageData = () => {
//     console.log("get chat data messages");
//     setLoading(true);
//     axios
//       .post(
//         `/chat/message/getdata`,
//         { chatId },
//         { headers: { "x-access-token": localStorage.getItem("token") } }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(res.data.messageData);
//           setMessages(res.data.messageData); // Ensure res.data.messageData is an array
//           setLoading(false);
//           socket.emit('join chat',chatId)
//         }
//       })
//       .catch((err) => {
//         // Handle error
//       });
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     console.log(newMessage);
//     setNewMessage("");
//     setLoading(true);
//     socket.emit('stop typing', chatId)
//     if (newMessage !== "") {
//       axios
//         .post(
//           "/chat/message",
//           { content: newMessage, chatId: groupProjectData.chatId },
//           { headers: { "x-access-token": localStorage.getItem("token") } }
//         )
//         .then((res) => {
//           if (res.status === 200) {
//             console.log("message saved succesfully");
//             console.log(res.data);
//             socket.emit('new message', res.data)
//             setMessages((prevMessages) => [...prevMessages, res.data]);
//             setLoading(false);
//           }
//         })
//         .catch((err) => {});
//     }
//   };

//   const handleInputChange = (event) => {
//     setNewMessage(event.target.value);

//     if(!socketConnected) return

//     if(!typing){
//       setTyping(true)
//       socket.emit("typing",chatId)
//     }
//     let lastTypingTime = new Date().getTime()
//     var timerLength = 3000
//     setTimeout(()=>{
//       var timeNow = new Date().getTime()
//       var timeDiff = timeNow - lastTypingTime

//       if(timeDiff >= timerLength && typing){
//         socket.emit('stop typing', chatId)
//         setTyping(false)
//       }
//     },timerLength)
//   };
//   // const typingHandler = (e)=>{
//   //   se
//   // }


//   useEffect(() => {
//     getMessageData();

//   }, [chatId]);

// useEffect(()=>{
//     socket = io(ENDPOINT)
//     socket.emit('setup',userData)
//     socket.on('connected',()=>setsocketConnected(true))
//     socket.on('typing',()=>setIsTyping(true))
//     socket.on('stop typing',()=> setIsTyping(false))
//     return () => {
//       socket.off('setup');
      
//     };
//     },[])

//     const messagesContainerRef = useRef(null);


//     // Step 3: Helper function to scroll to the bottom of the chat box
//     const scrollToBottom = () => {
//       if (messagesContainerRef.current) {
//         messagesContainerRef.current.scrollTop =
//           messagesContainerRef.current.scrollHeight;
//       }
//     };
    
  
//     // Step 4: Call the scrollToBottom function whenever new messages are added
//     useEffect(() => {
//       scrollToBottom();
//     }, [messages]);

//   // useEffect(() => {
//   //   socket.on('message received', (newMessageRecieved) => {
//   //     console.log('inside message receiver');
//   //     setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
//   //   });
//   //   return () => {
//   //     socket.off('message received');
//   //   };
//   // });

//   // ...
// useEffect(() => {
//   socket.on('message received', (newMessageRecieved) => {
//     console.log('inside message receiver');
//     // Check if the received message belongs to the current chat before updating the state
//     if (newMessageRecieved.chat._id === chatId) {
//       setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
//     }
//   });

//   return () => {
//     socket.off('message received');
//   };
// }, [chatId]); // Add chatId to the dependency array to re-subscribe when the chat changes
// // ...

  



//   return (
//     <Box
//       m={2}
//       sx={{
//         height: "90vh",
//         display: "flex",
//         flexDirection: "column",
//         bgcolor: "grey.200",
//         borderRadius: "20px",
//       }}
//     >
//       <Box
//        ref={messagesContainerRef}
//        sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>

//         {messages &&
//           messages.map((message, index) => {
//             const isUser = message.sender?._id === userData._id;
//             return loading ? (
//               <Typography variant="h1">
//                 {loading ? <Skeleton /> : "h1"}
//               </Typography>
//             ) : (
           
//               <Box
              
//                 sx={{
//                   display: "flex",
//                   justifyContent: isUser ? "flex-end" : "flex-start",
//                   mb: 2,
//                 }}
//               >
                
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: isUser ? "row-reverse" : "row",
//                     alignItems: "center",
//                   }}
//                 >
                  
//                   {(isSameSender(messages, message, index, userData._id) ||
//                     isLastMessage(messages, index, userData._id)) && (
//                     <Avatar
//                       src={message.sender?.profilePicture}
//                       sx={{
//                         bgcolor: isUser ? "primary.main" : "secondary.main",
//                       }}
//                     ></Avatar>
//                   )}

//                   <Paper
//                     variant="outlined"
//                     sx={{
//                       p: 1,
//                       ml: isUser ? 0 : 1,
//                       mr: isUser ? 1 : 0,
//                       backgroundColor: isUser
//                         ? "primary.light"
//                         : "secondary.light",
//                       borderRadius: isUser
//                         ? "15px 15px 1px 15px "
//                         : "15px 15px 15px 1px",
//                     }}
//                   >
                     
//                     <Typography variant="body1"> {message.content}</Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             );
//           })}
//       </Box>
     
     
//       <Box sx={{ p: 2, backgroundColor: "background.default" }}>
    
//         <Grid container spacing={2}>
//           <Grid item xs={10}>
       
//             <TextField
           
//               size="small"
//               fullWidth
//               placeholder="Type a message"
//               variant="outlined"
//               value={newMessage}
//               onChange={handleInputChange}
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <Button
//               onClick={handleSend}
//               endIcon={<SendIcon />}
//               fullWidth
//               variant="contained"
//               sx={{
//                 borderRadius: "3px",
//                 height: "40px",
//                 fontWeight: "700",
//                 backgroundColor: "green",
//               }}
//             >
//               Sent
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ChatUI;

import React, { useEffect, useState, useRef } from "react";
import axios from "../../../../Axios";
import Lottie from 'react-lottie'
import { isSameSender, isLastMessage } from "./ChatLogics";
import { useLocation } from "react-router-dom";
import animationData from './Animations/typing.json'
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
  Skeleton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:4000'
var socket, selectedChatCompare

const ChatUI = () => {
  const [groupProjectData, setGroupProjectData] = useState({});
  const [projectId, setProjectId] = useState("");
  const [loggedUser, setLoggedUser] = React.useState("initialState");
  const [users, setUsers] = useState("");
  const location = useLocation();
  const userData = useSelector((state) => state.userReducer.user);
  // for messages
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    getProjectData();
  }, []);

  const getProjectData = async () => {
    const Id = new URLSearchParams(location.search).get("id");
    console.log(Id + " project Id");
    setProjectId(Id);
    axios
      .post(
        "/user/project/group",
        { projectId: Id },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(`${res.data.message}`);
          console.log(res.data.projectData + " in add members");
          setGroupProjectData(res.data.projectData);
          console.log(res.data.usersData + "users data");
          setUsers(res.data.usersData);
          console.log(res.data.projectData.chatId + " chat id");
          setChatId(res.data.projectData.chatId);
          //   setTasks(res.data.projectData.tasks);
        }
      })
      .catch((error) => { });
  };

  const getMessageData = () => {
    console.log("get chat data messages");
    setLoading(true);
    axios
      .post(
        `/chat/message/getdata`,
        { chatId },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.messageData);
          setMessages(res.data.messageData); // Ensure res.data.messageData is an array
          setLoading(false);
          socket.emit('join chat', chatId)
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if(newMessage.length <=0 ) return
    console.log(newMessage);
    setNewMessage("");
    setLoading(true);
    socket.emit('stop typing', chatId)
    if (newMessage !== "") {
      axios
        .post(
          "/chat/message",
          { content: newMessage, chatId: groupProjectData.chatId },
          { headers: { "x-access-token": localStorage.getItem("token") } }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("message saved succesfully");
            console.log(res.data);
            socket.emit('new message', res.data)
            setMessages((prevMessages) => [...prevMessages, res.data]);
            setLoading(false);
          }
        })
        .catch((err) => { });
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);

    if (!socketConnected) return

    if (!typing) {
      setTyping(true)
      socket.emit("typing", chatId)
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 3000
    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDiff = timeNow - lastTypingTime

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', chatId)
        setTyping(false)
      }
    }, timerLength)
  };

  useEffect(() => {
    getMessageData();

  }, [chatId]);

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', userData)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
    return () => {
      socket.off('setup');

    };
  }, [])

  const messagesContainerRef = useRef(null);

  // Step 3: Helper function to scroll to the bottom of the chat box
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Step 4: Call the scrollToBottom function whenever new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages,isTyping]);

  useEffect(() => {
    socket.on('message received', (newMessageRecieved) => {
      console.log('inside message receiver');
      // Check if the received message belongs to the current chat before updating the state
      if (newMessageRecieved.chat._id === chatId) {
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    });

    return () => {
      socket.off('message received');
    };
  }, [chatId]); // Add chatId to the dependency array to re-subscribe when the chat changes

  return (
    <Box
      m={2}
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
        borderRadius: "20px",
      }}
    >
      <Box ref={messagesContainerRef} sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {/* Messages */}
        {messages &&
          messages.map((message, index) => {
            const isUser = message.sender?._id === userData._id;
            return loading ? (
              <Typography variant="h1">
                {loading ? <Skeleton /> : "h1"}
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isUser ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  {(isSameSender(messages, message, index, userData._id) ||
                    isLastMessage(messages, index, userData._id)) && (
                    <Avatar
                      src={message.sender?.profilePicture}
                      sx={{
                        bgcolor: isUser ? "primary.main" : "secondary.main",
                      }}
                    ></Avatar>
                  )}

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1,
                      ml: isUser ? 0 : 1,
                      mr: isUser ? 1 : 0,
                      backgroundColor: isUser
                        ? "primary.light"
                        : "secondary.light",
                      borderRadius: isUser
                        ? "15px 15px 1px 15px "
                        : "15px 15px 15px 1px",
                    }}
                  >
                    <Typography variant="body1"> {message.content}</Typography>
                  </Paper>
                </Box>
              </Box>
            );
          })}
        
        {/* Lottie Animation */}
         {isTyping &&(
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start", // You can change this to 'flex-end' if you want it on the right side
              mb: 2,
              marginLeft: "auto", // Adjust the alignment to your liking
            }}
          >
            <Box>
              <Lottie width={70} options={defaultOptions} style={{ marginBottom: 15, marginLeft: 0 }} />
            </Box>
          </Box>
        )}
      </Box>
     
      {/* Input field and Send button */}
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={newMessage}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleSend}
              endIcon={<SendIcon />}
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "3px",
                height: "40px",
                fontWeight: "700",
                backgroundColor: "green",
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatUI;

