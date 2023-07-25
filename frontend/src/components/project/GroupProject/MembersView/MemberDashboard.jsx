import React, { useState, useEffect } from "react";
import MemberSidebar from "./MemberSidebar";
import { useSelector } from "react-redux";
import axios from "../../../../Axios";
import { FcBusinessman, FcFlowChart, FcComboChart } from "react-icons/fc";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function MemberDashboard() {
  let userData = useSelector((state) => state.userReducer.user);

  const [projectId, setProjectId] = useState("");
  const [groupProjectData, setGroupProjectData] = useState({});
  const [taskCount, setTaskCount] = useState(0);
  const [memberTask, setMemberTask] = useState({});
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setLoading(false);
    }
  }, [userData]);

  function countTasksForMember(email) {
    let taskCount = 0;

    // Loop through the tasks array in the project data
    groupProjectData.tasks?.forEach((task) => {
      // Check if the task has any members assigned to it
      if (task.members && task.members.length > 0) {
        // Check if the specific member's ID exists in the task's members array
        if (
          task.members.map((m) => m.email?.toString() === email?.toString())
        ) {
          console.log("it is in count");
          taskCount++;
        }
      }
    });
    setTaskCount(taskCount);
  }
  const getMemberProjectData = () => {
    const Id = new URLSearchParams(location.search).get("id");

    setUser(userData);
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
          console.log(res.data.projectData);
          setGroupProjectData(res.data.projectData);
          //   setTasks(res.data.projectData.tasks);
        }
      })
      .catch((error) => {});
  };
 
  useEffect(() => {
    getMemberProjectData();
  }, []);

  useEffect(() => {
    console.log(user.email + "  email of the user");
    countTasksForMember(user.email);
  }, [groupProjectData]);
  return (
    <div>
      <Box display="flex">
        <MemberSidebar />
        <Box flex="1" ml={3}>
          <Grid container>
            <Grid item xs={12}>
              <Grid item alignContent="center" xs={11}>
                <h1>member dashboard</h1>
                {isLoading ? (
                  "user is loading"
                ) : (
                  <h1>
                    {userData.email ? userData.email : "user is not in user"}
                  </h1>
                )}

                {/* <h1>{userData.email?userData.email:"user not found in userData"}</h1> */}
                <Box my={4} textAlign="start">
                  <Typography variant="h3" color="primary" gutterBottom>
                    {groupProjectData.projectname}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {groupProjectData.description}
                  </Typography>
                </Box>

                <Box my={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent>
                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <Grid item>
                              <FcBusinessman size={"50px"} />
                            </Grid>
                            <Grid item>
                              <Typography variant="h6">
                                Total Members
                              </Typography>
                              <Typography variant="h4">
                                {groupProjectData?.members?.length || 0}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent>
                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <Grid item>
                              <FcFlowChart size={"50px"} />
                            </Grid>
                            <Grid item>
                              <Typography variant="h6">Total Tasks</Typography>
                              <Typography variant="h4">
                                {groupProjectData?.tasks?.length || 0}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent>
                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <Grid item>
                              <FcFlowChart size={"50px"} />
                            </Grid>
                            <Grid item>
                              <Typography variant="h6">Your Tasks</Typography>
                              <Typography variant="h4">
                                {/* {groupProjectData?.tasks?.filter((t)=>t.members.filter((m)=>m.email ==="rafia@gmail.com")).length || 0} */}
                                {taskCount}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent>
                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <Grid item>
                              <FcComboChart size={"50px"} />
                            </Grid>
                            <Grid item>
                              <Typography variant="h6">Completed</Typography>
                              <Typography variant="h4">
                                {groupProjectData?.completionPercentage}%
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Add one more card here */}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default MemberDashboard;
