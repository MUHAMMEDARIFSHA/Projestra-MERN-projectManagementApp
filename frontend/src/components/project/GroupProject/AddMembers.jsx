import React, { useEffect, useState } from "react";
import GroupSideBar from "./GroupSideBar";

import axios from "../../../Axios";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from "@mui/material";
import { setUser } from "../../../features/user/userSlice";

function AddMembers() {
  const [projectId, setProjectId] = useState("");
  const [groupProjectData, setGroupProjectData] = useState({});
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [users,setUsers] = useState([])

  
const usersData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      profilePicture: 'https://example.com/profiles/john.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      profilePicture: 'https://example.com/profiles/jane.jpg',
    },
    // Add more user data objects as needed
  ];


  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      setMembers((prevMembers) => [...prevMembers, newMember]);
      setNewMember("");
    }
  };
  const getProjectData = async () => {
    const Id = new URLSearchParams(location.search).get("id");
    console.log(Id + " project Id");
    setProjectId(Id);
    await axios
      .post(
        "/user/project/group",
        { projectId: Id },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(`${res.data.message}`);
          console.log(res.data.projectData +" in add members");
          setGroupProjectData(res.data.projectData);
          console.log(res.data.usersData +"users data");
          setUsers(res.data.usersData)
          //   setTasks(res.data.projectData.tasks);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getProjectData();
  }, []);
  return (
    <>
      <Box display="flex">
        <GroupSideBar />
        <Box flex="1" ml={3}>
          <Grid container>
            <Grid item xs={12}>
              <h1>{groupProjectData.projectname}</h1>
              <Container maxWidth="xl">
                <Box mt={5}>
                  <Typography variant="h4" gutterBottom>
                    Group Project Members
                  </Typography>
                  <Divider />
                  {/* <Box mt={2}>
                    <Typography variant="h6">Current Members:</Typography>
                    <List>
                      {members.map((member, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={member} />
                        </ListItem>
                      ))}
                    </List>
                  </Box> */}
                  <Box mt={2}>
                    <Typography variant="h6">Add New Member:</Typography>
                    <Box display="flex">
                      <TextField
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        variant="outlined"
                        placeholder="Enter member name"
                        sx={{ flexGrow: 1, mr: 2 }}
                      />
                      <Button variant="contained" onClick={handleAddMember}>
                        Add Member
                      </Button>
                    </Box>
                  </Box>
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Profile Picture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Avatar src={user.profilePicture} alt={user.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AddMembers;
