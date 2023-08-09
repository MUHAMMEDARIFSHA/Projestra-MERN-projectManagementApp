import React, { useState, useEffect } from "react";
import GroupSideBar from "./GroupSideBar";
import axios from "../../../Axios";
import { Box, Grid, Button, Typography } from "@mui/material";
import AddTaskModal from "./AddTaskModal";
import TaskCardGroup from "./TaskCardGroup";
function ProjectsTasks() {
  const [projectId, setProjectId] = useState("");
  const [groupProjectData, setGroupProjectData] = useState({});
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleModalClose = (response) => {
    console.log("response in main page group");
    // Handle the response here in the main page
    console.log(response.projectData);
    console.log("Modal closed with response:", response.message);
    console.log(response.projectData.tasks);
    setTasks(response.projectData.tasks);
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
          console.log(res.data.projectData + " in add members");
          setGroupProjectData(res.data.projectData);
          console.log(res.data.usersData + "users data");
          setUsers(res.data.usersData);
          setTasks(res.data.projectData.tasks);
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
        <GroupSideBar userData={users} />
        <Box flex="1" ml={3}>
          <Grid container>
            <Grid item xs={12}>

              <Grid item alignContent="center" xs={11}>
              <Typography variant="h6" my={2} fontWeight={600}>Tasks</Typography>
                <TaskCardGroup
                 onClose={handleModalClose}
                  tasks={tasks.filter((t)=>t.status==="to-do")}
                  users={users.filter((user) => {
                    // Check if the user email exists in the members array of the projectData
                    return groupProjectData.members.some(
                      (member) => member.email === user.email
                    );
                  })}
                  projectId={projectId}
                
                />
                <AddTaskModal
                  id={projectId ? projectId : ""}
                  onClose={handleModalClose}
                  users={users.filter((user) => {
                    // Check if the user email exists in the members array of the projectData
                    return groupProjectData.members.some(
                      (member) => member.email === user.email
                    );
                  })}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ProjectsTasks;
