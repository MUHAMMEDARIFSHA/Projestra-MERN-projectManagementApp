import React, { useEffect, useState } from "react";
import axios from "../../../../Axios";

import { isSameSender, isLastMessage } from "./ChatLogics";
import { useLocation } from "react-router-dom";
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
const ENDPOINT = 'http://localhost:5000/'
var socket,selectedChatCompare

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
      .catch((error) => {});
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
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  const handleSend = (e) => {
    e.preventDefault();
    console.log(newMessage);
    setNewMessage("");
    setLoading(true);
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
            setMessages((prevMessages) => [...prevMessages, res.data]);
            setLoading(false);
          }
        })
        .catch((err) => {});
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  useEffect(() => {
    getMessageData();
  }, [chatId]);

  useEffect(()=>{
  socket = io(ENDPOINT)
  },[])

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
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
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
      </Box>
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
              Sent
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatUI;
