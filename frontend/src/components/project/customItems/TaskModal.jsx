import React, { useState, useEffect } from "react";
import axios from "../../../Axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TaskModal({id,onClose}) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [taskData, setTaskData] = useState({});
  const [modalTask, setModalTask] = useState({ });
  const saveTask = async (e) => {
    e.preventDefault();
    console.log("save task");
    console.log(modalTask);
    await axios.patch( "/user/project/indivitual/addtask",
        { task: modalTask ,projectId:id},
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message + "   in modal");
          setModalTask({})
          onClose({ success: true,projectData:res.data.projectData ,message: "Task added successfully from modal" });
          closeModal()
        }
      }).catch((error) => {
        // if (error.response.status === 404) {
        //   navigate('/user/projects');
        // }
         // onClose({ success: true, message: "Some error occurred" });
    closeModal()
      });
   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(modalTask);
  };
  useEffect(() => {
    console.log(id);
  }, [modalTask]);
  return (
    <div>
      <Button onClick={openModal}
      fullWidth
      variant="contained"
      sx={{
        borderRadius: "3px",
        height: "35px",
        fontWeight: "700",
        backgroundColor: "green",
      }}
      >Add Task</Button>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={saveTask} sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">ADD TASK</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                name="taskname"
                label="Task Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                name="description"
                label="Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="startdate"
                name="startdate"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                name="enddate"
                label="enddate"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "3px",
                height: "40px",
                fontWeight: "700",
                backgroundColor: "green",
              }}
              >Add Task</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}


