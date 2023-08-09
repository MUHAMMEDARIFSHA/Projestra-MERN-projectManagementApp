import React, { useState, useEffect } from "react";
import axios from "../../../Axios";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
  Button,
  TextField,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarGroup from "@mui/material/AvatarGroup";
import { Autocomplete } from "@mui/material";
import { CreditCard, Description, Group } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",

  bgcolor: "background.paper",
  borderRadius: "20px", // Adding border radius of 20px
  outline: "none", // Remove the black border
  boxShadow: 24,
};

const TaskCardGroup = ({ tasks, users, projectId, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [newMember, setNewMember] = useState([]);

  const handleChange = (e) => {
    console.log("a change is occuring");
    const { name, value } = e.target;
    setSelectedTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(selectedTask);
  };
  const getStatusValue = (value) => {
    if (value === "to-do") return 0;
    if (value === "ongoing") return 1;
    if (value === "completed") return 2;
  };
  const openDataModal = (task) => {
    console.log("on data modal open");
    setSelectedTask(task);
    setStatus(getStatusValue(task.status));
    setIsModalOpen(true);
  };

  const handleMemberChange = (event, newValue) => {
    setNewMember(newValue);
  };
  const editGroupTask = async (e) => {
    e.preventDefault();
    console.log("edit task");
    await axios
      .post(
        "/group/task/edit",
        { members: newMember, task: selectedTask, projectId },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          setNewMember([]);
          onClose({
            success: true,
            projectData: res.data.projectData,
            message: "group task updated succesfully",
          });
          closeModal();
        }
      })
      .catch((error) => {
        console.log("errror");
        // console.log(error.response.data.message);
      });
  };

  const [status, setStatus] = useState(0); // 0: To-Do, 1: Ongoing, 2: Completed

  // useEffect(() => {
  //   // Update the status whenever the selectedTask changes
  //   setStatus(getStatusValue(selectedTask?.status));
  // }, []);

  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
    const x = getStatusLabel(newValue);
    console.log(x + " status");
    axios
      .patch(
        "/group/task/changestatus",
        { status: x, projectId, task: selectedTask },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          console.log(res.data.task);
          const statusValue = getStatusValue(res.data.task.status);
          console.log(statusValue + "   status value");
          setStatus(statusValue);
          onClose({
            success: true,
            projectData: res.data.projectData,
            message: "group task status changed succesfully",
          });
          closeModal();
        }
      });
  };

  const getStatusLabel = (value) => {
    if (value === 0) return "to-do";
    if (value === 1) return "ongoing";
    if (value === 2) return "completed";
  };

  const sliderStyles = {
    color: "grey", // Change the color of the slider bar to grey
  };

  const railStyles = {
    opacity: 0.5, // Adjust the opacity of the rail
  };

  const trackStyles = {
    color: "grey", // Change the color of the active part of the slider to grey
  };

  const thumbStyles = {
    color: "grey", // Change the color of the thumb (dragging handle) to grey
  };

  const valueLabelStyles = {
    display: "none", // Hide the value label
  };
  const removeMember = async (memberId) => {
    console.log("remove member");
    await axios
      .post(
        "/group/task/member/remove",
        { memberId, projectId, task: selectedTask },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          setSelectedTask(res.data.projectData.tasks);
          onClose({
            success: true,
            projectData: res.data.projectData,
            message: "group task status changed succesfully",
          });
          closeModal();
        }
      })
      .catch((error) => {});
  };
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  };
  const handleTaskDelete = (id)=>{
    console.log("delete task ")
    console.log(id)
    axios.post('/user/group/project/task/delete',{taskId:id,projectId:projectId}, { headers: { "x-access-token": localStorage.getItem("token") } })
    .then((res)=>{
      if(res.status === 200){
        console.log(res.data.message)
        onClose({
          success: true,
          projectData: res.data.projectData,
          message: "group task updated succesfully",
        });
      }
    })
  }
  return (
    <Box my={2}>
      {tasks.map((task) => (
         <Card
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={() => openDataModal(task)}
         key={task.id}
         sx={{
           width: "100%",
           display: "flex",
           justifyContent: "space-between",
           my: 2,
         }}
       >
         <CardContent
           sx={{
             display: "flex",
             flexDirection: "column",
             justifyContent: "flex-start",
             alignItems: "start",
           }}
         >
           <Typography variant="h5" marginBottom={1}>
             {task.taskname}
           </Typography>
           <Typography>{task.description}</Typography>
         </CardContent>
         <Box sx={{ display: "flex", alignItems: "center", paddingRight: 2 }}>
           <AvatarGroup>
             {task.members.map((member) => {
               const user = users.find((user) => user.email === member.email);
               if (user) {
                 return (
                   <Avatar
                     key={user.id}
                     alt={user.username}
                     src={user.profilePicture}
                   />
                 );
               }
               return null;
             })}
           </AvatarGroup>
         </Box>
         {/* Delete button */}
         {showDeleteButton && (
           <Button
             onClick={(e) => {
               e.stopPropagation(); // Prevent card click event from triggering
               handleTaskDelete(task._id);
             }}
             sx={{color:'red'}}
           >
            <DeleteIcon/>
           </Button>
         )}
       </Card>
        // <Card
        //   onClick={() => openDataModal(task)}
        //   key={task.id}
        //   sx={{
        //     width: "100%",
        //     display: "flex",
        //     justifyContent: "space-between",
        //     my: 2,
        //   }}
        // >
        //   <CardContent
        //     sx={{
        //       display: "flex",
        //       flexDirection: "column",
        //       justifyContent: "flex-start",
        //       alignItems: "start",
        //     }}
        //   >
        //     <Typography variant="h5" marginBottom={1}>
        //       {task.taskname}
        //     </Typography>
        //     <Typography>{task.description}</Typography>
        //   </CardContent>
        //   <Box sx={{ display: "flex", alignItems: "center", paddingRight: 2 }}>
        //     <AvatarGroup>
        //       {task.members.map((member) => {
        //         const user = users.find((user) => user.email === member.email);
        //         if (user) {
        //           return (
        //             <Avatar
        //               key={user.id}
        //               alt={user.username}
        //               src={user.profilePicture}
        //             />
        //           );
        //         }
        //         // You can handle the case when a user is not found or provide a default avatar here.
        //         return null;
        //       })}
        //     </AvatarGroup>
        //   </Box>
        // </Card>
      ))}
      {/* Render the modal here based on the isModalOpen state */}
      {isModalOpen && selectedTask && (
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" onSubmit={editGroupTask} sx={style}>
            <Grid container alignContent="center" justifyContent="center">
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignContent="center"
                  justifyContent="center"
                  sx={{
                    backgroundColor: "#f2f2f2",
                    overflow: "auto",
                    borderTopRightRadius: "20px",
                    borderTopLeftRadius: "20px",
                  }}
                >
                  {/* Your content goes here */}
                  <Typography
                    item
                    variant="h5"
                    fontWeight="700"
                    my={2}
                    textAlign="center"
                  >
                    TASK
                  </Typography>
                </Box>
              </Grid>
              <Grid item display="flex" my={4} ml={3} xs={12}>
                <CreditCard sx={{ fontSize: "40px", mr: 2, opacity: 0.5 }} />
                <Typography sx={{ opacity: 0.5, fontWeight: 550 }} variant="h4">
                  {selectedTask.taskname}
                </Typography>
              </Grid>

              <Grid item display="flex" ml={3} xs={12}>
                <Description sx={{ fontSize: "27px", mr: 1, opacity: 0.6 }} />
                <Typography sx={{ opacity: 0.6, fontWeight: 500 }} variant="h6">
                  Description {selectedTask.status}
                </Typography>
              </Grid>
              <Grid item mx={3} xs={12}>
                <TextField
                  name="description"
                  value={selectedTask.description}
                  fullWidth
                  variant="standard" // Use "standard" variant for no outline
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      backgroundColor: "#f2f2f2",
                      borderRadius: "10px",
                      paddingLeft: "20px",
                      height: "45px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#dcdcdc", // Define a darker shade for hover
                      },
                    },
                  }} // Remove the outline
                  onChange={handleChange}
                />
              </Grid>
              <Grid item display="flex" mt={3} ml={3} xs={12}>
                <Group sx={{ fontSize: "27px", mr: 1, opacity: 0.6 }} />
                <Typography sx={{ opacity: 0.6, fontWeight: 500 }} variant="h6">
                  Members
                </Typography>
              </Grid>
              <Grid item mx={3} xs={12}>
                <Box my={2}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {selectedTask.members?.map((member) => {
                          const user = users.find(
                            (user) => user.email === member.email
                          );

                          if (user) {
                            return (
                              <TableRow
                                sx={{ backgroundColor: "#f2f2f2" }}
                                key={user.id}
                              >
                                <TableCell
                                  sx={{ padding: "6px 16px", height: "40px" }}
                                >
                                  {user.username}
                                </TableCell>
                                <TableCell
                                  sx={{ padding: "6px 16px", height: "40px" }}
                                >
                                  {user.email}
                                </TableCell>
                                <TableCell>
                                  <Typography fontWeight={600} color={'blue'}>
                                  {member.status}
                                  </Typography>
                                
                                  </TableCell>
                                <TableCell
                                  sx={{ padding: "6px 16px", height: "40px" }}
                                >

                                  <Button
                                    onClick={() => {
                                      removeMember(user._id);
                                    }}
                                    variant="contained"
                                    sx={{
                                      borderRadius: "3px",
                                      height: "35px",
                                      fontWeight: "700",
                                      backgroundColor: "green",
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                                {/* Add more table cells with member details as needed */}
                              </TableRow>
                            );
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
              <Grid item my={1} ml={3} xs={12}>
                {selectedTask.status === "to-do" ||
                selectedTask.status === "ongoing" ? (
                  <>
                    <Typography>Add members</Typography>
                    <Box display="flex">
                      <Autocomplete
                        multiple // Make sure to set the `multiple` prop to true
                        options={users}
                        getOptionLabel={(user) =>
                          user.email ? user.email : ""
                        }
                        value={newMember}
                        onChange={handleMemberChange}
                        renderInput={(params) => (
                          <TextField
                            variant="standard" // Use "standard" variant for no outline
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                backgroundColor: "#f2f2f2",
                                borderRadius: "10px",
                                paddingLeft: "20px",
                                height: "45px",
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "#dcdcdc", // Define a darker shade for hover
                                },
                              },
                            }} // Remove the outline
                            {...params}
                            placeholder="Enter member email"
                            sx={{ width: 500 }}
                          />
                        )}
                      />
                    </Box>
                  </>
                ) : null}
              </Grid>
              <Grid item m={3} xs={5}>
                <TextField
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    selectedTask.start_date
                      ? new Date(selectedTask.start_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  type="date"
                  label="startdate"
                  name="start_date"
                  fullWidth
                />
              </Grid>
              <Grid item m={3} xs={5}>
                <TextField
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    selectedTask.end_date
                      ? new Date(selectedTask.end_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  type="date"
                  name="end_date"
                  label="enddate"
                  fullWidth
                />
              </Grid>
              <Grid item xs={10}>
                <Box m={3}>
                  <Slider
                    value={status}
                    onChange={handleStatusChange}
                    // valueLabelDisplay="auto"
                    step={1}
                    marks={[
                      {
                        value: 0,
                        label: (
                          <Button variant="contained" color="secondary">
                            To-Do
                          </Button>
                        ),
                      },
                      {
                        value: 1,
                        label: (
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "orange",
                              color: "white",
                            }}
                          >
                            Ongoing
                          </Button>
                        ),
                      },
                      {
                        value: 2,
                        label: (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            Completed
                          </Button>
                        ),
                      },
                    ]}
                    min={0}
                    max={2}
                    track="inverted" // This slows down the dragging speed
                    style={sliderStyles} // Apply the custom styles to the Slider
                    classes={{
                      rail: railStyles,
                      track: trackStyles,
                      thumb: thumbStyles,
                      valueLabel: valueLabelStyles,
                    }}
                  />
                  {/* <div style={{ textAlign: "center" }}>{getStatusLabel(status)}</div> */}
                </Box>
              </Grid>
              <Grid item mb={3} xs={10}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    ml: 2,
                    borderRadius: "3px",
                    height: "45px",
                    fontWeight: "700",
                    backgroundColor: "green",
                  }}
                >
                  Edit Task
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default TaskCardGroup;
