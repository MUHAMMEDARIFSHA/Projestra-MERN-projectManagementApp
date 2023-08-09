import React, { useState, useEffect } from "react";
import GroupSideBar from "./GroupSideBar";
import axios from "../../../Axios";
import { Box, Grid, Button, Typography } from "@mui/material";
import AddTaskModal from "./AddTaskModal";
import TaskCardGroup from "./TaskCardGroup";

function OngoingTasks() {
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
    <div>
      <Box display="flex">
        <GroupSideBar />
        <Box flex="1" ml={3}>
          <Grid container>
            <Grid item xs={12}>
            <Typography variant="h6" my={2} fontWeight={600}>Ongoing</Typography>
              <TaskCardGroup
                onClose={handleModalClose}
                tasks={tasks.filter((t) => t.status === "ongoing")}
                users={users.filter((user) => {
                  // Check if the user email exists in the members array of the projectData
                  return groupProjectData.members.some(
                    (member) => member.email === user.email
                  );
                })}
                projectId={projectId}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default OngoingTasks;
