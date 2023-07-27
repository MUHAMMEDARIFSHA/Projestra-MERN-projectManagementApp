import React from 'react';
import axios from '../../../../Axios'
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
    Slider
  } from "@mui/material";
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
function MemberModal({ open, onClose, taskData,projectId ,project}) {
  const closeModal = () => {
    console.log(" inside the close modal");
    onClose({ success: true ,projectData:project, message: 'Modal closed without changes' });
  }
    const changeStatusMember = (value)=>{
        console.log("change status of the member task");
        console.log(value);
        console.log(projectId)
        axios.post('/user/group/member/status/change',{status:value,task:taskData,projectId} ,  
        { headers: { "x-access-token": localStorage.getItem("token") } }).then((res)=>{
            if(res.status === 200){
                console.log(res.data.message)
                console.log(res.data.projectData)
                onClose({ success: true,projectData:res.data.projectData ,message: "Task added successfully from modal" });
              
            }
        }).catch((error)=>{

        })
    }
    const handleBackdropClick = (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

  return (
    <Modal
    open={open}
     onClose={closeModal}
     BackdropProps={{ onClick: handleBackdropClick }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box component="form" sx={style}>
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
            <Typography item variant="h5" fontWeight="700" my={2} textAlign="center">
              Task Details
            </Typography>
          </Box>
        </Grid>
        <Grid item display="flex" my={4} ml={3} xs={12}>
          <CreditCard sx={{ fontSize: "40px", mr: 2, opacity: 0.5 }} />
          <Typography sx={{ opacity: 0.5, fontWeight: 550 }} variant="h4">
            {taskData.taskname}
          </Typography>
        </Grid>

        <Grid item display="flex" ml={3} xs={12}>
          <Description sx={{ fontSize: "27px", mr: 1, opacity: 0.6 }} />
          <Typography sx={{ opacity: 0.6, fontWeight: 500 }} variant="h6">
            Description {taskData.status}
          </Typography>
        </Grid>
        <Grid item mx={3} xs={12}>
         <Box ml={4} mt={1}
      xs={12}
      component="textarea" // Use "textarea" element as the replacement
      name="description"
      value={taskData.description}
      fullWidth
      variant="standard"
      sx={{
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
        paddingLeft: "20px",
        paddingTop: "10px",
        height: "45px",
        cursor: "pointer",
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add shadow
        "&:hover": {
          backgroundColor: "#dcdcdc",
        },
        resize: "none", // Disable textarea resize handle
        border: "none", // Remove textarea border
        outline: "none", // Remove textarea outline
        transition: 'box-shadow 0.3s', // Add transition for smooth effect
      }}
    />
        </Grid>
        <Grid item display="flex" mt={3} ml={3} xs={12}>
          <Group sx={{ fontSize: "27px", mr: 1, opacity: 0.6 }} />
          <Typography sx={{ opacity: 0.6, fontWeight: 500 }} variant="h6">
            Members
          </Typography>
        </Grid>
        <Grid item mx={3} xs={12}>
          <Box ml={4} my={2}>
            <TableContainer component={Paper}>
              <Table >
                <TableBody>
                  {taskData.members?.map((member) => {
                                       

                    if (member) {
                      return (
                        <TableRow
                          sx={{ backgroundColor: "#f2f2f2" }}
                          key={member.user}
                        >
                                                 <TableCell
                            sx={{ padding: "6px 16px", height: "40px" }}
                          >
                            {member.email}
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
       

        </Grid>
        <Grid item m={3} xs={5}>
          <TextField
            // onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            value={
              taskData.start_date
                ? new Date(taskData.start_date)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            type=""
            label="startdate"
            name="start_date"
            fullWidth
          />
        </Grid>
        <Grid item m={3} xs={5}>
          <TextField
            // onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            value={
              taskData.end_date
                ? new Date(taskData.end_date)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            type=""
            name="end_date"
            label="enddate"
            fullWidth
          />
        </Grid>
       
        <Grid
      container
      xs={10}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingX={2}
      my={2}
    >
         <Box m={1} borderRadius='20px'  bgcolor={'#FFA500'}>
        <Button 
        onClick={()=>{changeStatusMember('to-do')}}
         sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            padding: '8px 16px',
            boxShadow: 'none',
          }}
          style={{ borderRadius:'5px', backgroundColor: 'red' }}
          variant="contained"
          disableElevation
        >
          To-Do
        </Button>
      </Box>
      <Box m={1} borderRadius='20px'  bgcolor={'#FFA500'}>
        <Button 
        onClick={()=>{changeStatusMember('ongoing')}}
         sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            padding: '8px 16px',
            boxShadow: 'none',
          }}
          style={{ borderRadius:'5px', backgroundColor: '#FFA500' }}
          variant="contained"
          disableElevation
        >
          Ongoing
        </Button>
      </Box>
      <Box m={1}  borderRadius='20px' bgcolor={'#00C853'}>
        <Button
         onClick={()=>{changeStatusMember('completed')}}
       sx={{
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '8px 16px',
        boxShadow: 'none',
      }}
          style={{ borderRadius:"5px",  backgroundColor: '#00C853', color: '#fff' }}
          variant="contained"
          disableElevation
        >
          Completed
        </Button>
      </Box>
    </Grid>
        
      </Grid>
    </Box>
  </Modal>
  );
}

export default MemberModal;
